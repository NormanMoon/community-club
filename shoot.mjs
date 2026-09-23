/* Full-page screenshots of communityclub.org at desktop and phone widths (throwaway audit helper).

Setup (in this directory):

    npm i puppeteer-core

Usage:
    node shoot.mjs                                   # every live page, desktop 1440 + mobile 390 -> shots/ + slices/
    node shoot.mjs index join                        # only the named live pages
    node shoot.mjs --base file://$PWD/mockup/ index  # shoot local mockup pages instead of the live site
Also writes viewport-height slices to slices/<page>-<size>-<n>.png for easy viewing.
*/
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const ALL = ['index','about-us','history','special-events','cc-team','contact-us','join','become-a-tutor',
  'become-a-student','orientation','tutor-resources','student-resources','current-students',
  'dcps-graduation-requirements','college-timetable','college-students','alumni','donor-resources'];
const args = process.argv.slice(2);
const baseAt = args.indexOf('--base');
const BASE = baseAt >= 0 ? args.splice(baseAt, 2)[1] : 'https://communityclub.org/';
const pages = args.length ? args : ALL;
const sizes = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 } };

mkdirSync('shots', { recursive: true }); mkdirSync('slices', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const tab = await browser.newPage();
for (const p of pages) for (const [name, vp] of Object.entries(sizes)) {
  await tab.setViewport(vp);
  await tab.goto(`${BASE}${p}.html`, { waitUntil: 'networkidle0' });
  await tab.addStyleTag({ content: '*{animation-play-state:paused!important}' }); // freeze zoom/pulse for stable shots
  await tab.screenshot({ path: `shots/${p}-${name}.png`, fullPage: true });
  const h = await tab.evaluate(() => document.documentElement.scrollHeight);
  const step = name === 'desktop' ? 1400 : 1200;
  for (let y = 0, i = 0; y < h; y += step, i++)
    await tab.screenshot({ path: `slices/${p}-${name}-${i}.png`, clip: { x: 0, y, width: vp.width, height: Math.min(step, h - y) }, captureBeyondViewport: true });
  console.log(`${p}-${name}`);
}
await browser.close();
