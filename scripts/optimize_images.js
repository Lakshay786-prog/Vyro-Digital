const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimize() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. vyro-logo
  const logoPath = path.join(publicDir, 'vyro-logo.png');
  const logoBuffer = fs.readFileSync(logoPath);

  // Compressed PNG under 60KB
  const compressedPng = await sharp(logoBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9, effort: 8 })
    .toBuffer();
  fs.writeFileSync(logoPath, compressedPng);
  console.log('Compressed vyro-logo.png to:', compressedPng.length, 'bytes');

  // Modern WebP under 50KB
  const webpBuffer = await sharp(logoBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'vyro-logo.webp'), webpBuffer);
  console.log('Created vyro-logo.webp:', webpBuffer.length, 'bytes');

  // 2. Work JPGs
  const workDir = path.join(publicDir, 'work');
  const workFiles = fs.readdirSync(workDir).filter((f) => f.endsWith('.jpg') || f.endsWith('.jpeg'));

  for (const file of workFiles) {
    const filePath = path.join(workDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const meta = await sharp(fileBuffer).metadata();
    console.log(`Original ${file}: ${meta.width}x${meta.height} (${fileBuffer.length} bytes)`);

    const optimizedBuffer = await sharp(fileBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(filePath, optimizedBuffer);
    console.log(`Optimized ${file}: ${optimizedBuffer.length} bytes`);
  }

  // 3. Create app/icon.png (48x48)
  const iconBuffer = await sharp(logoBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 11, g: 11, b: 11, alpha: 1 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(appDir, 'icon.png'), iconBuffer);
  console.log('Created app/icon.png');

  // 4. Create public/og-image.jpg (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldGlow" cx="80%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#c9a45c" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#0b0b0b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#070707" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="#0b0b0b"/>
      <rect width="1200" height="630" fill="url(#goldGlow)"/>
      <rect x="80" y="80" width="1040" height="470" fill="none" stroke="#c9a45c" stroke-width="1" stroke-opacity="0.3"/>
      
      <text x="140" y="200" font-family="sans-serif" font-size="16" letter-spacing="6" fill="#c9a45c" font-weight="700">DIGITAL GROWTH STUDIO</text>
      <text x="140" y="300" font-family="sans-serif" font-size="76" letter-spacing="4" fill="#f4efe5" font-weight="700">VYRO DIGITAL</text>
      <text x="140" y="380" font-family="serif" font-style="italic" font-size="38" fill="#c9a45c">Build. Brand. Grow.</text>
      <text x="140" y="470" font-family="sans-serif" font-size="20" letter-spacing="1" fill="#a8a095">High-performance digital products, cinematic branding &amp; measurable scale.</text>
    </svg>
  `;
  const ogBuffer = await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 90 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogBuffer);
  console.log('Created public/og-image.jpg');
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
