const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const context = await browser.newContext({
    viewport: { width: 375, height: 800 },
  });
  const page = await context.newPage();

  // 1. Home page before
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, 'home_before_375.png') });

  // 2. Menu open before
  const menuBtn = await page.$('.menu-toggle');
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(dir, 'menu_before_375.png') });
  }

  // 3. Contact form before
  await page.goto('http://localhost:3000/contact', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  const form = await page.$('.contact-form');
  if (form) {
    await form.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(dir, 'contact_before_375.png') });

  await browser.close();
  console.log('Before screenshots saved successfully to screenshots/');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
