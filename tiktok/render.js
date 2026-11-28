// usage: node render.js <dir>   -> <dir>/frames/*.jpg を30fpsで書き出し
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const dir = process.argv[2];
  const out = path.join(dir, 'frames');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(dir, 'video.html'));
  await page.evaluate(() => document.fonts.ready);
  const FPS = 30, DUR = 32;
  for (let i = 0; i < FPS * DUR; i++) {
    await page.evaluate(t => window.render(t), i / FPS);
    await page.screenshot({ path: path.join(out, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
  }
  await browser.close();
})();
