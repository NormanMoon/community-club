/* Check the Community Club mockup: identical header/footer on every page, mockup notice,
   no scripts/inline styles/emoji, no stale facts, and every local link, image and #anchor resolves.

No install needed (Node 18+).

Usage:
    node check.mjs    # check mockup/; prints "OK: N pages" or one problem per line (exit 1)
*/
import { readFileSync, existsSync } from 'fs';

const DIR = new URL('./mockup/', import.meta.url);
const PAGES = ['index', 'join', 'tutors', 'students', 'about', 'donate', 'contact'].map(p => `${p}.html`);
const STALE = [/2025[–-]2026/, /2025[–-]26/, /8:15/, /weekday evenings/i, /Email Your Application/i];
const has = f => existsSync(new URL(f, DIR));
const read = f => readFileSync(new URL(f, DIR), 'utf8');
const block = (html, tag) => (html.match(new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`)) || [''])[0];

const problems = [];
const present = PAGES.filter(has);
PAGES.filter(p => !present.includes(p)).forEach(p => problems.push(`missing page: ${p}`));
const files = [...present, ...(has('summary.html') ? ['summary.html'] : [])];
const ref = present.length ? read(present[0]) : '';

for (const p of files) {
  const html = read(p);
  if (PAGES.includes(p)) {
    for (const tag of ['header', 'footer'])
      if (!block(html, tag) || block(html, tag) !== block(ref, tag)) problems.push(`${p}: <${tag}> missing or differs from ${present[0]}`);
    if (!html.includes('Mockup: proposed redesign, not the live site.')) problems.push(`${p}: missing mockup notice`);
  }
  if (/<script|<style|style="/i.test(html)) problems.push(`${p}: has <script>, <style> or style=""`);
  if (/\p{Extended_Pictographic}/u.test(html)) problems.push(`${p}: contains emoji`);
  for (const re of STALE) if (re.test(html)) problems.push(`${p}: stale fact matching ${re}`);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(url)) continue;
    const [file, anchor] = url.split('#');
    const target = file || p;
    if (!has(target)) problems.push(`${p}: broken link ${url}`);
    else if (anchor && !read(target).includes(`id="${anchor}"`)) problems.push(`${p}: missing anchor ${url}`);
  }
}

if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log(`OK: ${files.length} pages`);
