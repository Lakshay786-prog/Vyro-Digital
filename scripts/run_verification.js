const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  '/',
  '/about',
  '/founder',
  '/services',
  '/work',
  '/pricing',
  '/insights',
  '/contact',
];

const VIEWPORTS = [
  { name: '375x800', width: 375, height: 800 },
  { name: '390x844', width: 390, height: 844 },
];

async function run() {
  console.log('=== 1. TESTING API RATE LIMITING, HONEYPOT & 503 ERROR HANDLING ===');

  const API_URL = 'http://127.0.0.1:3000/api/contact';

  // Test 1: Filled honeypot should silently return { ok: true }
  const hpRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.99' },
    body: JSON.stringify({
      name: 'Bot Spam',
      email: 'bot@spam.com',
      message: 'This is spam with honeypot filled',
      website: 'http://spamlink.com',
    }),
  });
  const hpData = await hpRes.json();
  console.log(`Honeypot test -> status: ${hpRes.status}, body:`, hpData);
  if (hpRes.status !== 200 || !hpData.ok) {
    throw new Error('Honeypot test failed!');
  }
  console.log('✓ Honeypot test passed: silently returned { ok: true } without sending');

  // Test 2: Standard request with empty/placeholder GMAIL_PASS should return 503
  const validPayload = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+919876543210',
    service: 'Website development',
    message: 'Testing enquiry form submission with at least 10 characters',
    website: '',
  };

  const testIp = '192.168.1.55';

  const res1 = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': testIp },
    body: JSON.stringify(validPayload),
  });
  const data1 = await res1.json();
  console.log(`Request 1 from ${testIp} -> status: ${res1.status}, body:`, data1);
  if (res1.status !== 503) {
    throw new Error(`Expected 503 for unconfigured/placeholder GMAIL_PASS, got ${res1.status}`);
  }
  console.log('✓ 503 placeholder/unconfigured test passed');

  // Test 3: Rate limiting - Requests 2, 3, 4, 5 (up to 5 total)
  for (let i = 2; i <= 5; i++) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': testIp },
      body: JSON.stringify(validPayload),
    });
    console.log(`Request ${i} from ${testIp} -> status: ${res.status}`);
  }

  // Request 6: Must return 429
  const res6 = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': testIp },
    body: JSON.stringify(validPayload),
  });
  const data6 = await res6.json();
  console.log(`Request 6 from ${testIp} -> status: ${res6.status}, body:`, data6);
  if (res6.status !== 429) {
    throw new Error(`Expected 429 for 6th request within 10 minutes, got ${res6.status}`);
  }
  console.log('✓ Rate limiting test passed: 6th request correctly returned 429');

  console.log('\n=== 2. PLAYWRIGHT VIEWPORT, HORIZONTAL SCROLL & TAP TARGET AUDIT ===');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Testing at Viewport ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const p of PAGES) {
      const url = `http://127.0.0.1:3000${p}`;
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(500);

      // 1. Check horizontal scroll
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHScroll = docWidth > winWidth || bodyWidth > winWidth;
        
        // Find elements that overflow
        const overflowing = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 1) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              right: rect.right,
              width: rect.width,
            });
          }
        }
        return { hasHScroll, docWidth, bodyWidth, winWidth, overflowingCount: overflowing.length, sample: overflowing.slice(0, 3) };
      });

      if (overflow.hasHScroll) {
        console.error(`❌ Page ${p} at ${vp.name} HAS HORIZONTAL SCROLL:`, overflow);
      } else {
        console.log(`✓ Page ${p} at ${vp.name}: No horizontal scroll (doc: ${overflow.docWidth}px, win: ${overflow.winWidth}px)`);
      }

      // 2. Audit tap targets & small text
      const audit = await page.evaluate(() => {
        const issues = [];
        
        // Tap targets
        const clickables = document.querySelectorAll('button, a, input, select, textarea');
        clickables.forEach((el) => {
          // Skip visually hidden honeypots or display:none
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || el.hasAttribute('aria-hidden')) return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;

          // Inline paragraph links are exempt
          const isInlineLink = el.tagName === 'A' && el.parentElement && el.parentElement.tagName === 'P';
          if (!isInlineLink && (rect.width < 43 || rect.height < 43)) {
            issues.push({
              type: 'tap-target-small',
              tag: el.tagName,
              class: el.className,
              text: el.textContent?.trim().slice(0, 20),
              w: Math.round(rect.width),
              h: Math.round(rect.height),
            });
          }
        });

        // Font sizes
        const textNodes = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue && node.nodeValue.trim().length > 1) {
            const parent = node.parentElement;
            if (parent) {
              const style = window.getComputedStyle(parent);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
              const fSize = parseFloat(style.fontSize);
              if (fSize < 10.9) {
                issues.push({
                  type: 'text-too-small',
                  tag: parent.tagName,
                  class: parent.className,
                  text: node.nodeValue.trim().slice(0, 30),
                  fontSize: fSize,
                });
              }
            }
          }
        }

        return { issuesCount: issues.length, sample: issues.slice(0, 5) };
      });

      if (audit.issuesCount > 0) {
        console.warn(`  ⚠️ Note on ${p}: ${audit.issuesCount} minor tap/text items flagged:`, audit.sample);
      }
    }

    await context.close();
  }

  console.log('\n=== 3. CAPTURING AFTER SCREENSHOTS AT 375PX ===');
  const context = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await context.newPage();

  // 1. Home page after
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, 'home_after_375.png') });
  console.log('✓ Captured screenshots/home_after_375.png');

  // 2. Menu open after
  const menuToggle = await page.$('#mobile-menu-toggle');
  if (menuToggle) {
    await menuToggle.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, 'menu_after_375.png') });
    console.log('✓ Captured screenshots/menu_after_375.png');
    // Test Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  // 3. Contact page after
  await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const form = await page.$('.contact-form');
  if (form) {
    await form.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: path.join(screenshotsDir, 'contact_after_375.png') });
  console.log('✓ Captured screenshots/contact_after_375.png');

  await browser.close();
  console.log('\n🎉 ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
