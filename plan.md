# Community Club Mockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clickable 7-page mockup of a simpler Community Club website, plus a one-page summary, so Norman can show the director what a redesign could look like.

**Architecture:**
- Plain HTML files in `mockup/` share one `style.css`. There is no JavaScript and no build step.
- Every page carries an identical `<header>` and `<footer>` block, copied verbatim from *Global Constraints*.
- The current page is highlighted by a class on `<body>`, so the header block never has to differ between pages.
- A tiny Node script (`check.mjs`) is the test. It checks that every page has the identical header and footer, the mockup notice, no scripts, inline styles or emoji, and that every local link and `#anchor` resolves.
- `shoot.mjs` takes the screenshots used for the visual review and the summary page.

**Tech Stack:** HTML, CSS, Fira Sans (Google Fonts), Node 22 (already installed), `puppeteer-core` driving the installed Google Chrome (screenshots only).

**Spec:** `/Users/normanmoon/Projects/community_club_site/spec.md`

**Working directory for every command:** `/Users/normanmoon/Projects/community_club_site`

## Global Constraints

- Mockup only. Nothing here touches or publishes the real site.
- 7 pages, with exactly these files: `index.html`, `join.html`, `tutors.html`, `students.html`, `about.html`, `donate.html`, `contact.html`. Plus `summary.html` and `style.css`.
- Facts, exactly:
  - School year: "2026–2027".
  - Session time: "Thursdays, 6:30–8:00 pm".
  - Tutors apply through `https://docs.google.com/forms/d/e/1FAIpQLSdMK4b2jfymgICJWqpAs8EPiakZ229cfEo2o1tKdz6OdH72gg/viewform?usp=sf_link`.
  - Students register through a Google form (mocked; it doesn't have to work): `https://docs.google.com/forms/d/e/1FAIpQLSd4CqNwX_Jtbk46z_WEF4C3O3hs175cdf7jF2yXJUlAPbR-Iw/viewform?usp=sf_link`.
- `.band` (bright blue) holds only white cards, never text directly on it.
- Colors:
  - Navy `#17365d`, dark navy `#0f2542`, bright blue `#2f9fe0`, pale blue `#eaf4fb`.
  - Accents: yellow `#ffc933`, green `#2fa37a`, red `#d6363e`.
  - Text `#333` / `#555`, light grey `#f5f5f5`.
- Font: Fira Sans at weights 400, 500 and 800. Nothing else.
- Components are only those defined in `style.css`: `.btn`, `.btn-outline`, `.label`, `.card`, `.steps`, `.band`, `.band-pale`, `.frame`.
- No `<script>`, no `style="…"`, no `<style>` blocks, no emoji, no animations or transforms.
- Each photo appears at most once per page. At most one `.frame` photo per page.
- Logo: `images/logo.png` (the original `image001.png`, unchanged), shown 40px tall.
- Uncertain content is wrapped in `<mark>`. Every `<mark>` must also appear in spec.md's *Content to confirm* list.
- The footer text must include exactly: `Mockup: proposed redesign, not the live site.`

### Shared header block (paste verbatim as the first child of `<body>` on all 7 pages)

```html
<header class="site-header">
  <div class="container header-row">
    <a class="logo" href="index.html"><img src="images/logo.png" alt="Community Club" width="232" height="40"></a>
    <nav class="nav-desktop" aria-label="Main">
      <a class="nav-tutors" href="tutors.html">Tutors</a>
      <a class="nav-students" href="students.html">Students</a>
      <a class="nav-about" href="about.html">About</a>
      <a class="nav-donate" href="donate.html">Donate</a>
      <a class="nav-contact" href="contact.html">Contact</a>
      <a class="btn" href="join.html">Join</a>
    </nav>
    <details class="nav-mobile">
      <summary>Menu</summary>
      <nav aria-label="Main (mobile)">
        <a href="index.html">Home</a>
        <a href="tutors.html">Tutors</a>
        <a href="students.html">Students</a>
        <a href="about.html">About</a>
        <a href="donate.html">Donate</a>
        <a href="contact.html">Contact</a>
        <a class="btn" href="join.html">Join</a>
      </nav>
    </details>
  </div>
  <div class="strip">Now enrolling for 2026–2027 · Thursdays, 6:30–8:00 pm</div>
</header>
```

### Shared footer block (paste verbatim as the last child of `<body>` on all 7 pages)

```html
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="footer-name">Community Club</p>
      <p>New York Avenue Presbyterian Church<br>1313 New York Ave NW, Washington, DC 20005</p>
      <p><a href="mailto:directors@communityclub.org">directors@communityclub.org</a></p>
    </div>
    <div>
      <p><a href="join.html">Join</a> · <a href="tutors.html">Tutors</a> · <a href="students.html">Students</a> · <a href="about.html">About</a> · <a href="donate.html">Donate</a> · <a href="contact.html">Contact</a></p>
      <p><a href="https://www.instagram.com/Communityclubdirectors">Instagram</a> · <a href="https://www.facebook.com/groups/ccalumni">Alumni Facebook group</a> · CFC #25839</p>
    </div>
  </div>
  <p class="container mockup-note">Mockup: proposed redesign, not the live site.</p>
</footer>
```

### Page skeleton (every page uses this; `PAGE` and `TITLE` are given in each task)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TITLE</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="page-PAGE">
  (shared header block)
  <main>
    (the page's <main> content from its task)
  </main>
  (shared footer block)
</body>
</html>
```

## Review Focus

1. **Phone width (390px):**
   - The menu collapses to "Menu" and opens to show every link.
   - No text or photo overflows sideways.
   - Grids become one column.
   - *Covered by:* Task 8, which views every phone screenshot.
2. **Header or footer drift.** Someone edits one page's menu and the pages quietly disagree. That was the live site's worst bug. *Covered by:* `check.mjs` in every task.
3. **Jump links on the long Students page** (`#enroll`, `#current`, `#graduation`, `#college`, `#college-students`) must land on real sections. *Covered by:* the `check.mjs` anchor check (Task 4).
4. **Wrong or stale facts slipping in**, such as "2025–2026", "8:15", "weekday evenings", or "email us" to apply as a tutor. *Covered by:* the `check.mjs` stale-fact check.
5. **Images missing when opened offline** from the folder by double-clicking. *Covered by:* the `check.mjs` local `src` check, plus Task 8 opening `file://` URLs.

---

### Task 1: Foundation: repo, images, stylesheet, check script, Home page

**Files:**
- Create: `.gitignore`, `package.json` (via npm), `check.mjs`, `mockup/style.css`, `mockup/index.html`, `mockup/images/*`
- Modify: `shoot.mjs` (add a `--base` option so it can shoot local files)

**Interfaces:**
- Produces:
  - The CSS classes listed in *Global Constraints*.
  - `node check.mjs`: exits 0 and prints `OK: N pages` when clean; exits 1 and prints one problem per line otherwise.
  - `node shoot.mjs --base <url> page…`: writes `shots/<page>-desktop.png`, `shots/<page>-mobile.png` and `slices/<page>-<size>-<n>.png`.
  - Image files: `images/logo.png`, `tutoring.jpg`, `medals.jpg`, `bowling.jpg`, `wizgame.jpg`, `cc_night.jpg`.

- [ ] **Step 1: Ignore generated files and install the screenshot tool**

The folder is already a git repo, pushed to `https://github.com/NormanMoon/community-club` (private; `~/.gitconfig` routes this folder to the NormanMoon account).

```bash
printf '.superpowers/\nnode_modules/\nshots/\nslices/\n' > .gitignore
npm init -y >/dev/null && npm i puppeteer-core
```

- [ ] **Step 2: Copy the site's images in, unchanged**

```bash
mkdir -p mockup/images
for f in tutoring.jpg medals.jpg bowling.jpg wizgame.jpg cc_night.jpg; do curl -sfo mockup/images/$f https://communityclub.org/$f; done
curl -sfo mockup/images/logo.png https://communityclub.org/image001.png
ls mockup/images
```

Expected: 6 files listed.

- [ ] **Step 3: Write the check script (the test)**

Create `check.mjs`:

```js
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
```

- [ ] **Step 4: Run it to verify it fails**

Run: `node check.mjs`
Expected: exit 1, with 7 lines `missing page: index.html` … `missing page: contact.html`.

- [ ] **Step 5: Write the stylesheet**

Create `mockup/style.css`:

```css
/* Community Club mockup — the only stylesheet. Colors, font and components per spec.md. */
:root {
  --navy: #17365d; --navy-dark: #0f2542; --blue: #2f9fe0; --pale: #eaf4fb;
  --yellow: #ffc933; --green: #2fa37a; --red: #d6363e;
  --text: #333; --muted: #555; --grey: #f5f5f5; --line: #e3e7ec;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: 'Fira Sans', Arial, sans-serif; font-weight: 400; color: var(--text); background: #fff; line-height: 1.6; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--navy); font-weight: 500; }
a:hover { color: var(--blue); }
h1, h2, h3 { font-weight: 800; color: #111; line-height: 1.15; margin: 0 0 .5em; }
h1 { font-size: clamp(2rem, 4.5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
h3 { font-size: 1.15rem; }
p { margin: 0 0 1em; }
ul, ol { margin: 0 0 1em; padding-left: 1.25em; }
mark { background: var(--yellow); color: #111; padding: 0 .2em; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
section { padding: 56px 0; }
.lead { font-size: 1.15rem; color: var(--text); max-width: 42em; }
.muted { color: var(--muted); }

/* Header */
.site-header { background: #fff; border-bottom: 1px solid var(--line); }
.header-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 72px; }
.logo img { height: 40px; width: auto; border-radius: 3px; }
.nav-desktop { display: flex; align-items: center; gap: 22px; }
.nav-desktop a:not(.btn) { color: var(--navy); text-decoration: none; font-weight: 500; text-transform: uppercase; font-size: .85rem; letter-spacing: .04em; }
.nav-desktop a:not(.btn):hover { color: var(--blue); }
.page-tutors .nav-tutors, .page-students .nav-students, .page-about .nav-about,
.page-donate .nav-donate, .page-contact .nav-contact { border-bottom: 3px solid var(--blue); padding-bottom: 2px; }
.nav-mobile { display: none; }
.nav-mobile summary { cursor: pointer; font-weight: 800; color: var(--navy); list-style: none; padding: 8px 16px; border: 2px solid var(--navy); border-radius: 999px; }
.nav-mobile summary::-webkit-details-marker { display: none; }
.nav-mobile nav { position: absolute; left: 0; right: 0; background: #fff; border-bottom: 1px solid var(--line); padding: 8px 24px 20px; display: flex; flex-direction: column; gap: 4px; z-index: 10; }
.nav-mobile nav a:not(.btn) { padding: 10px 0; text-decoration: none; color: var(--navy); border-bottom: 1px solid var(--line); }
.nav-mobile nav .btn { margin-top: 12px; text-align: center; }
.strip { background: var(--navy); color: #fff; text-align: center; font-weight: 500; font-size: .9rem; padding: 8px 16px; }

/* Components */
.btn, .btn-outline { display: inline-block; border-radius: 999px; padding: 12px 24px; font-weight: 800; text-decoration: none; transition: background-color .15s, color .15s; }
.btn { background: var(--navy); color: #fff; border: 2px solid var(--navy); }
.btn:hover { background: var(--navy-dark); color: #fff; }
.btn-outline { background: #fff; color: #111; border: 2px solid #111; }
.btn-outline:hover { color: var(--navy); border-color: var(--navy); }
.btn-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.label { display: block; font-size: .8rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--navy); margin-bottom: 8px; }
.card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(15, 37, 66, .08); }
.card > :last-child { margin-bottom: 0; }
.band { background: var(--blue); }
.band-pale { background: var(--pale); }
.grey { background: var(--grey); }
.grid-2, .grid-3 { display: grid; gap: 20px; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.frame { background: var(--yellow); border-radius: 24px; padding: 18px; }
.frame img { border-radius: 14px; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.photo { border-radius: 16px; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.steps { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; counter-reset: step; }
.steps li { counter-increment: step; }
.steps li::before { content: counter(step); display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; font-size: 1.25rem; font-weight: 800; margin-bottom: 10px; background: var(--yellow); color: var(--navy); }
.steps li:nth-child(2)::before { background: var(--green); color: #fff; }
.steps li:nth-child(3)::before { background: var(--red); color: #fff; }
.steps li:nth-child(4)::before { background: var(--navy); color: #fff; }
.steps.four { grid-template-columns: repeat(4, 1fr); }
.steps.stacked { grid-template-columns: 1fr; gap: 16px; }
.hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
.jump { display: flex; flex-wrap: wrap; gap: 8px 20px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); }
th { font-weight: 800; color: var(--navy); }

/* Footer */
.site-footer { background: var(--navy-dark); color: #d9e2ec; padding: 40px 0 16px; font-size: .95rem; }
.site-footer a { color: #fff; }
.footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.footer-name { font-weight: 800; color: #fff; font-size: 1.1rem; }
.mockup-note { margin-top: 24px; font-size: .85rem; color: var(--yellow); }

/* Phones and small tablets */
@media (max-width: 760px) {
  .nav-desktop { display: none; }
  .nav-mobile { display: block; }
  .grid-2, .grid-3, .hero, .steps, .steps.four, .footer-grid { grid-template-columns: 1fr; }
  section { padding: 40px 0; }
}
```

- [ ] **Step 6: Write the Home page**

Create `mockup/index.html` from the *Page skeleton*, with `TITLE` = `Community Club · Free tutoring in Washington, DC` and `PAGE` = `home`. Paste the shared header and footer blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container hero">
    <div>
      <span class="label">Free tutoring in Washington, DC · since 1962</span>
      <h1>One student. One tutor. One whole school year.</h1>
      <p class="lead">Free one-on-one tutoring for DC public school students in grades 6–11, every Thursday at New York Avenue Presbyterian Church.</p>
      <div class="btn-row">
        <a class="btn" href="join.html#tutor">Become a tutor</a>
        <a class="btn-outline" href="join.html#student">Enroll a student</a>
      </div>
    </div>
    <div class="frame"><img src="images/tutoring.jpg" alt="A student and his tutor working together at a laptop" width="1200" height="900"></div>
  </div>
</section>

<section>
  <div class="container">
    <span class="label">How it works</span>
    <h2>Three simple steps</h2>
    <ol class="steps">
      <li><h3>Apply</h3><p class="muted">Tutors fill out a short online form. Families register their student.</p></li>
      <li><h3>Get matched</h3><p class="muted">Each student is paired with one volunteer tutor for the whole school year.</p></li>
      <li><h3>Meet every Thursday</h3><p class="muted">Thursdays, 6:30–8:00 pm, at New York Avenue Presbyterian Church.</p></li>
    </ol>
  </div>
</section>

<section class="band">
  <div class="container grid-3">
    <div class="card"><h3>For tutors</h3><p class="muted">No teaching experience needed. We provide orientation and support all year.</p><a href="tutors.html">Tutor info →</a></div>
    <div class="card"><h3>For students</h3><p class="muted">Grades 6–11 in DC public schools. Always free.</p><a href="students.html">Student info →</a></div>
    <div class="card"><h3>Support us</h3><p class="muted">Donations keep every session free. Federal employees: CFC #25839.</p><a href="donate.html">Donate →</a></div>
  </div>
</section>

<section>
  <div class="container">
    <span class="label">Beyond the classroom</span>
    <h2>A community that celebrates together</h2>
    <div class="grid-3">
      <img class="photo" src="images/bowling.jpg" alt="Students and tutors at the annual bowling night" width="1200" height="900">
      <img class="photo" src="images/wizgame.jpg" alt="The Community Club group at a Washington Wizards game" width="1200" height="900">
      <img class="photo" src="images/medals.jpg" alt="Students with medals at the year-end award ceremony" width="1200" height="900">
    </div>
    <p><a href="about.html#events">See our events →</a></p>
  </div>
</section>
```

- [ ] **Step 7: Let `shoot.mjs` shoot local files**

In `shoot.mjs`:
- Replace the header comment's `Usage:` block with:

```
Usage:
    node shoot.mjs                                   # every live page, desktop 1440 + mobile 390 -> shots/ + slices/
    node shoot.mjs index join                        # only the named live pages
    node shoot.mjs --base file://$PWD/mockup/ index  # shoot local mockup pages instead of the live site
Also writes viewport-height slices to slices/<page>-<size>-<n>.png for easy viewing.
```

- Replace the `const pages = …` line with:

```js
const args = process.argv.slice(2);
const baseAt = args.indexOf('--base');
const BASE = baseAt >= 0 ? args.splice(baseAt, 2)[1] : 'https://communityclub.org/';
const pages = args.length ? args : ALL;
```

- Replace `` `https://communityclub.org/${p}.html` `` with `` `${BASE}${p}.html` ``.

- [ ] **Step 8: Run the check; Home alone should now pass its own checks**

Run: `node check.mjs`
Expected: exit 1, listing only `missing page:` lines for the 6 other pages (join, tutors, students, about, donate, contact) plus `index.html: broken link join.html#tutor`, `broken link join.html#student`, `tutors.html`, `students.html`, `donate.html`, `about.html#events`, `contact.html`. No lines about header, footer, emoji, style, or `images/`.

- [ ] **Step 9: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ index`, then open `slices/index-desktop-0.png` and `slices/index-mobile-0.png`.
Expected:
- Logo top left, navy "Join" pill top right, navy enrollment strip.
- Headline with a yellow-framed photo. On mobile, a "Menu" pill instead of the links.

- [ ] **Step 10: Commit**

```bash
git add .gitignore package.json package-lock.json check.mjs shoot.mjs spec.md plan.md mockup/
git commit -m "Add mockup foundation: stylesheet, check script, Home page"
```

---

### Task 2: Join page (the only place to apply)

**Files:**
- Create: `mockup/join.html`

**Interfaces:**
- Consumes: the shared header and footer blocks, and `.steps.stacked`, `.btn`, `.btn-outline`, `.card`, `.grid-2`.
- Produces: the anchors `join.html#tutor` and `join.html#student` (linked from Home, Tutors, Students and Contact).

- [ ] **Step 1: Run the check to see the failure this task fixes**

Run: `node check.mjs | grep join`
Expected: `missing page: join.html` and `index.html: broken link join.html#tutor` / `#student`.

- [ ] **Step 2: Write the page**

Create `mockup/join.html` from the *Page skeleton*, with `TITLE` = `Join · Community Club` and `PAGE` = `join`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container">
    <span class="label">Join Community Club · 2026–2027</span>
    <h1>Pick your path</h1>
    <p class="lead">Tutors and students meet one-on-one every Thursday, 6:30–8:00 pm, for the whole school year. Here's how to get started.</p>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div class="card" id="tutor">
      <span class="label">For volunteers</span>
      <h2>Become a tutor</h2>
      <ol class="steps stacked">
        <li><h3>Apply online</h3><p class="muted">Read the <a href="https://drive.google.com/file/d/1IMvbF5KHyQQ1c6bkwn41t5SC7mOpVwFd/view">Child Protection Policy</a>, then fill out the tutor application form.</p></li>
        <li><h3>Attend orientation</h3><p class="muted">A Thursday session that covers how the program works. <a href="tutors.html#orientation">Orientation details</a></p></li>
        <li><h3>Background check and references</h3><p class="muted">Required before you're matched with a student.</p></li>
        <li><h3>Get matched and start</h3><p class="muted">Meet your student every Thursday for the school year.</p></li>
      </ol>
      <div class="btn-row">
        <a class="btn" href="https://docs.google.com/forms/d/e/1FAIpQLSdMK4b2jfymgICJWqpAs8EPiakZ229cfEo2o1tKdz6OdH72gg/viewform?usp=sf_link">Apply to tutor</a>
        <a class="btn-outline" href="tutors.html">What tutoring involves</a>
      </div>
    </div>
    <div class="card" id="student">
      <span class="label">For students and families</span>
      <h2>Enroll a student</h2>
      <ol class="steps stacked">
        <li><h3>Check you're eligible</h3><p class="muted">DC public school students in grades 6–11. Always free.</p></li>
        <li><h3>Fill out the registration form</h3><p class="muted">A short Google form for the student and a parent or guardian.</p></li>
        <li><h3>Get matched</h3><p class="muted">We pair you with a tutor based on your needs.</p></li>
        <li><h3>Start learning</h3><p class="muted">Come every Thursday, 6:30–8:00 pm.</p></li>
      </ol>
      <div class="btn-row">
        <a class="btn" href="https://docs.google.com/forms/d/e/1FAIpQLSd4CqNwX_Jtbk46z_WEF4C3O3hs175cdf7jF2yXJUlAPbR-Iw/viewform?usp=sf_link">Register a student</a>
        <a class="btn-outline" href="students.html">What students get</a>
      </div>
    </div>
  </div>
</section>

<section class="band-pale">
  <div class="container">
    <h2>Questions first?</h2>
    <p>We're happy to help before you apply.</p>
    <a class="btn-outline" href="contact.html">Contact us</a>
  </div>
</section>
```

- [ ] **Step 3: Run the check**

Run: `node check.mjs | grep -E 'join'`
Expected: no `join.html:` problem lines, and no `index.html: broken link join.html#…` lines. Lines about `tutors.html` and `students.html` still appear (their tasks come next).

- [ ] **Step 4: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ join`, then open `slices/join-desktop-0.png` and `slices/join-mobile-0.png`.
Expected:
- Desktop: two cards side by side, each with numbered colored circles.
- Mobile: the cards stacked.
- The two paths look the same: same steps style, same buttons.

- [ ] **Step 5: Commit**

```bash
git add mockup/join.html && git commit -m "Add Join page"
```

---

### Task 3: Tutors page

**Files:**
- Create: `mockup/tutors.html`

**Interfaces:**
- Consumes: the shared blocks, `.grid-2`, `.grid-3`, `.card`, `.photo`, `.band-pale`.
- Produces: the anchors `tutors.html#orientation` (linked from Join) and `tutors.html#resources`.

- [ ] **Step 1: Run the check to see the failure**

Run: `node check.mjs | grep tutors`
Expected: `missing page: tutors.html` plus broken links to it.

- [ ] **Step 2: Write the page**

Create `mockup/tutors.html` from the *Page skeleton*, with `TITLE` = `Tutors · Community Club` and `PAGE` = `tutors`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container hero">
    <div>
      <span class="label">For volunteers</span>
      <h1>Give one evening a week. Change a student's year.</h1>
      <p class="lead">Tutors meet the same student every Thursday, 6:30–8:00 pm, for the whole school year. No teaching experience needed.</p>
      <div class="btn-row"><a class="btn" href="join.html#tutor">Apply to tutor</a></div>
    </div>
    <img class="photo" src="images/cc_night.jpg" alt="Tutors and students working together on a Thursday evening" width="1200" height="900">
  </div>
</section>

<section>
  <div class="container grid-2">
    <div>
      <span class="label">What you'll do</span>
      <h2>How tutoring works</h2>
      <p>Each week you sit down one-on-one with your student and work on whatever they need most: homework, test prep, writing, math, or college planning. Just as important, you're a steady adult who shows up for them all year.</p>
    </div>
    <div class="card">
      <h3>Before you're matched</h3>
      <ul>
        <li>Fill out the tutor application form</li>
        <li>Read and sign the <a href="https://drive.google.com/file/d/1IMvbF5KHyQQ1c6bkwn41t5SC7mOpVwFd/view">Child Protection Policy</a></li>
        <li>Attend orientation</li>
        <li>Complete a background check</li>
        <li>Provide references</li>
      </ul>
      <p class="muted">Tutors can't begin until all of this is complete and approved.</p>
    </div>
  </div>
</section>

<section class="grey" id="orientation">
  <div class="container">
    <span class="label">Orientation</span>
    <h2>New tutor orientation</h2>
    <p>Every new tutor attends an orientation first. It covers the program, what's expected of tutors (attendance, communication, boundaries, student safety), and how to build a good relationship with your student.</p>
    <p><strong>When:</strong> Thursdays, arrive by <mark>6:15 pm</mark><br><strong>Where:</strong> New York Avenue Presbyterian Church, 1313 New York Ave NW, <mark>5th floor</mark><br><strong>Questions:</strong> <a href="contact.html">contact the directors</a></p>
  </div>
</section>

<section class="band-pale" id="resources">
  <div class="container">
    <span class="label">Tutor resources</span>
    <h2>Help for the year ahead</h2>
    <div class="grid-3">
      <div class="card"><h3>Successful approaches</h3><p class="muted">Building rapport first, academic strategies that work, handling difficult sessions, tracking progress.</p></div>
      <div class="card"><h3>Learning differences</h3><p class="muted">Guidance for students with dyslexia, ADHD, dyscalculia and more, and when to reach out for help.</p></div>
      <div class="card"><h3>DCPS links</h3><p class="muted">Curriculum guides, standards and school calendars, so sessions line up with class.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>Ready?</h2>
    <p>Applying takes a few minutes.</p>
    <a class="btn" href="join.html#tutor">Apply to tutor</a>
  </div>
</section>
```

- [ ] **Step 3: Run the check**

Run: `node check.mjs | grep tutors`
Expected: no output.

- [ ] **Step 4: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ tutors`, then open the desktop and mobile slices.
Expected:
- "Tutors" is underlined in blue in the menu.
- The pale blue resources section holds three white cards.
- "6:15 pm" and "5th floor" are highlighted.

- [ ] **Step 5: Commit**

```bash
git add mockup/tutors.html && git commit -m "Add Tutors page"
```

---

### Task 4: Students page (with jump links)

**Files:**
- Create: `mockup/students.html`

**Interfaces:**
- Consumes: the shared blocks, `.jump`, `table`, `.grid-2`, `.card`.
- Produces: the anchors `students.html#enroll`, `#current`, `#graduation`, `#college`, `#college-students`.

- [ ] **Step 1: Run the check to see the failure**

Run: `node check.mjs | grep students`
Expected: `missing page: students.html` plus broken links to it.

- [ ] **Step 2: Write the page**

Create `mockup/students.html` from the *Page skeleton*, with `TITLE` = `Students · Community Club` and `PAGE` = `students`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container">
    <span class="label">For students and families</span>
    <h1>Your own tutor, all year, for free</h1>
    <p class="lead">DC public school students in grades 6–11 get a dedicated volunteer tutor every Thursday, 6:30–8:00 pm.</p>
    <nav class="jump" aria-label="On this page">
      <a href="#enroll">Enroll</a><a href="#current">Current students</a><a href="#graduation">Graduation requirements</a><a href="#college">College timetable</a><a href="#college-students">In college</a>
    </nav>
  </div>
</section>

<section id="enroll">
  <div class="container grid-2">
    <div>
      <span class="label">Enroll</span>
      <h2>Who can join</h2>
      <ul>
        <li>DC public school students in grades 6–11</li>
        <li>Free, with no fees of any kind</li>
        <li>In person at New York Avenue Presbyterian Church, 1313 New York Ave NW</li>
      </ul>
      <a class="btn" href="join.html#student">Enroll a student</a>
    </div>
    <img class="photo" src="images/tutoring.jpg" alt="A student and tutor at work" width="1200" height="900">
  </div>
</section>

<section class="band-pale" id="current">
  <div class="container">
    <span class="label">Current students · 2026–2027</span>
    <h2>What Community Club gives you</h2>
    <div class="grid-3">
      <div class="card"><h3>Your own tutor</h3><p class="muted">The same adult volunteer every week, all year.</p></div>
      <div class="card"><h3>Any subject</h3><p class="muted">Homework, test prep, writing, math, science: whatever you need most.</p></div>
      <div class="card"><h3>Events</h3><p class="muted">Bowling night, a Wizards game and the year-end celebration.</p></div>
    </div>
    <h3>What we ask of you</h3>
    <ol>
      <li>Come every Thursday, and tell your tutor or the directors in advance if you can't.</li>
      <li>Bring your homework and know what you want to work on.</li>
      <li>Respect your tutor and the space.</li>
      <li>Tell your tutor what's working and what isn't.</li>
    </ol>
  </div>
</section>

<section id="graduation">
  <div class="container">
    <span class="label">DCPS graduation requirements</span>
    <h2>24 credits to graduate</h2>
    <table>
      <tr><th>Subject</th><th>Credits</th></tr>
      <tr><td>English</td><td>4.0</td></tr>
      <tr><td>Mathematics (through Algebra II or higher)</td><td>4.0</td></tr>
      <tr><td>Science (including Biology)</td><td>3.0</td></tr>
      <tr><td>Social studies</td><td>3.5</td></tr>
      <tr><td>Physical education and health</td><td>1.5</td></tr>
      <tr><td>Arts</td><td>1.0</td></tr>
      <tr><td>World language</td><td>2.0</td></tr>
      <tr><td>Electives</td><td>5.0</td></tr>
    </table>
    <p class="muted">Requirements can change. Always check with your school counselor or <a href="https://dcps.dc.gov/page/dcps-graduation-requirements">dcps.dc.gov</a>.</p>
  </div>
</section>

<section class="band-pale" id="college">
  <div class="container">
    <span class="label">College timetable</span>
    <h2>Plan for college, grade by grade</h2>
    <div class="grid-2">
      <div class="card"><h3>9th grade</h3><p class="muted">Meet your counselor, build study habits, try activities. Grades start counting now.</p></div>
      <div class="card"><h3>10th grade</h3><p class="muted">Take challenging classes, take the PSAT 10, start a list of colleges you like.</p></div>
      <div class="card"><h3>11th grade</h3><p class="muted">PSAT in October, SAT in spring (free at school), ask teachers for recommendations, start your essay.</p></div>
      <div class="card"><h3>12th grade</h3><p class="muted">Apply by November–January, file the FAFSA from October 1, apply for DC TAG, decide by May 1.</p></div>
    </div>
  </div>
</section>

<section id="college-students">
  <div class="container">
    <span class="label">Already in college</span>
    <h2>Community Club college scholarship</h2>
    <p>Current Community Club college students may qualify for a scholarship each semester by keeping a 2.5 GPA or higher and attending the yearly CC college meeting.</p>
    <a class="btn-outline" href="contact.html">Ask about the scholarship</a>
  </div>
</section>
```

- [ ] **Step 3: Run the check**

Run: `node check.mjs | grep students`
Expected: no output. All five jump links resolve.

- [ ] **Step 4: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ students`, then open every `slices/students-desktop-*.png` and `slices/students-mobile-*.png`.
Expected:
- The jump links wrap cleanly on mobile.
- The table fits the width without sideways scrolling.

- [ ] **Step 5: Commit**

```bash
git add mockup/students.html && git commit -m "Add Students page"
```

---

### Task 5: About page

**Files:**
- Create: `mockup/about.html`

**Interfaces:**
- Consumes: the shared blocks, `.grid-2`, `.grid-3`, `.card`, `.photo`.
- Produces: the anchors `about.html#events` (linked from Home) and `about.html#alumni`.

- [ ] **Step 1: Run the check to see the failure**

Run: `node check.mjs | grep about`
Expected: `missing page: about.html` plus `index.html: broken link about.html#events`.

- [ ] **Step 2: Write the page**

Create `mockup/about.html` from the *Page skeleton*, with `TITLE` = `About · Community Club` and `PAGE` = `about`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container hero">
    <div>
      <span class="label">About us · since 1962</span>
      <h1>One caring relationship can change a life</h1>
      <p class="lead">For more than 60 years, Community Club has paired DC public school students with volunteer tutors, one-on-one and free of charge.</p>
    </div>
    <div class="frame"><img src="images/medals.jpg" alt="Students with medals at the year-end award ceremony" width="1200" height="900"></div>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div>
      <span class="label">Our story</span>
      <h2>Over 60 years in DC</h2>
      <p>Community Club was founded in 1962 on a simple belief: every DC student deserves a caring adult in their corner. Since the 1970s we've met at New York Avenue Presbyterian Church.</p>
      <p>In 1983 we began honoring a Tutor of the Year. In the 1990s we added a college scholarship. Today the New York Avenue Education Foundation helps us receive Combined Federal Campaign gifts.</p>
    </div>
    <div class="card">
      <h3>Who runs it</h3>
      <p class="muted">A small team of volunteer directors matches students with tutors, plans events, and manages scholarships. <mark>Add director names and roles.</mark></p>
      <p><a href="contact.html">Contact the directors</a></p>
    </div>
  </div>
</section>

<section class="band-pale" id="events">
  <div class="container">
    <span class="label">Events</span>
    <h2>More than tutoring</h2>
    <div class="grid-3">
      <div class="card"><img class="photo" src="images/bowling.jpg" alt="Bowling night" width="1200" height="900"><h3>Bowling night</h3><p class="muted">Our annual outing, in Community Club t-shirts.</p></div>
      <div class="card"><img class="photo" src="images/wizgame.jpg" alt="Wizards game" width="1200" height="900"><h3>Wizards game</h3><p class="muted">For many students, their first NBA game.</p></div>
      <div class="card"><h3>Year-end ceremony</h3><p class="muted">Every May we honor students and name the Tutor of the Year. <mark>Confirm which events still happen.</mark></p></div>
    </div>
  </div>
</section>

<section id="alumni">
  <div class="container">
    <span class="label">Alumni</span>
    <h2>Once CC, always CC</h2>
    <p>Alumni are always welcome at events, and alumni with a college degree can apply to tutor. Stay in touch through the <a href="https://www.facebook.com/groups/ccalumni">alumni Facebook group</a>.</p>
  </div>
</section>
```

- [ ] **Step 3: Run the check**

Run: `node check.mjs | grep about`
Expected: no output.

- [ ] **Step 4: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ about` and view the slices.
Expected:
- The medals photo appears once, in the frame.
- The bowling and Wizards photos appear once each, inside cards.

- [ ] **Step 5: Commit**

```bash
git add mockup/about.html && git commit -m "Add About page"
```

---

### Task 6: Donate and Contact pages

**Files:**
- Create: `mockup/donate.html`, `mockup/contact.html`

**Interfaces:**
- Consumes: the shared blocks, `.grid-2`, `.card`, `.btn`, `.btn-outline`, `.btn-row`.
- Produces: nothing new. After this task, all 7 pages exist.

- [ ] **Step 1: Run the check to see the failures**

Run: `node check.mjs`
Expected: `missing page: donate.html`, `missing page: contact.html`, and broken links to both.

- [ ] **Step 2: Write the Donate page**

Create `mockup/donate.html` from the *Page skeleton*, with `TITLE` = `Donate · Community Club` and `PAGE` = `donate`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container">
    <span class="label">Support us</span>
    <h1>Keep every session free</h1>
    <p class="lead">Community Club is free for every student. Your gift pays for tutor training, college-prep resources, and our space at New York Avenue Presbyterian Church.</p>
    <a class="btn" href="https://www.networkforgood.org/donation/MakeDonation.aspx?ORGID2=521379938">Donate online</a>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div class="card">
      <span class="label">Federal employees</span>
      <h2>CFC #25839</h2>
      <p class="muted">Give through the Combined Federal Campaign via the <a href="http://www.nyaef.org/">New York Avenue Education Foundation</a>. Write "Community Club" in the designation box.</p>
    </div>
    <div class="card">
      <span class="label">By mail</span>
      <h2>Send a check</h2>
      <p class="muted">Payable to Community Club:<br>Community Club, c/o New York Avenue Presbyterian Church<br>1313 New York Ave NW, Washington, DC 20005</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write the Contact page**

Create `mockup/contact.html` from the *Page skeleton*, with `TITLE` = `Contact · Community Club` and `PAGE` = `contact`. Paste the shared blocks verbatim. The `<main>` content:

```html
<section class="grey">
  <div class="container">
    <span class="label">Contact</span>
    <h1>Email the directors</h1>
    <p class="lead"><a href="mailto:directors@communityclub.org">directors@communityclub.org</a></p>
    <p>Pick a topic and your email app opens with the subject filled in:</p>
    <div class="btn-row">
      <a class="btn" href="mailto:directors@communityclub.org?subject=I%27d%20like%20to%20tutor">I'd like to tutor</a>
      <a class="btn" href="mailto:directors@communityclub.org?subject=Question%20about%20my%20student">Question about my student</a>
      <a class="btn" href="mailto:directors@communityclub.org?subject=Donations">Donations</a>
      <a class="btn-outline" href="mailto:directors@communityclub.org?subject=Question">Something else</a>
    </div>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div class="card">
      <span class="label">Where</span>
      <h2>New York Avenue Presbyterian Church</h2>
      <p class="muted">1313 New York Ave NW, Washington, DC 20005</p>
      <a href="https://maps.google.com/?q=1313+New+York+Ave+NW,+Washington,+DC+20005">Get directions</a>
    </div>
    <div class="card">
      <span class="label">When</span>
      <h2>Thursdays, 6:30–8:00 pm</h2>
      <p class="muted">Throughout the DC public school year.</p>
      <a href="join.html">Ready to join?</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Run the full check**

Run: `node check.mjs`
Expected: `OK: 7 pages`, exit 0.

- [ ] **Step 5: Look at them**

Run: `node shoot.mjs --base file://$PWD/mockup/ donate contact` and view the slices.
Expected: on mobile, the four topic buttons wrap onto separate lines without overflowing.

- [ ] **Step 6: Commit**

```bash
git add mockup/donate.html mockup/contact.html && git commit -m "Add Donate and Contact pages"
```

---

### Task 7: Director summary page

**Files:**
- Create: `mockup/summary.html`, `mockup/images/before-home.png`, `before-students.png`, `after-home.png`, `after-students.png`

**Interfaces:**
- Consumes: `style.css`, and `shoot.mjs` (live pages and `--base` for the mockup).
- Produces: `summary.html`, which links to `index.html`. It is not one of the 7 pages, so it has no shared header or footer.

- [ ] **Step 1: Capture the before and after screenshots**

```bash
node shoot.mjs index current-students
cp slices/index-desktop-0.png mockup/images/before-home.png
cp slices/current-students-desktop-0.png mockup/images/before-students.png
node shoot.mjs --base file://$PWD/mockup/ index students
cp slices/index-desktop-0.png mockup/images/after-home.png
cp slices/students-desktop-0.png mockup/images/after-students.png
```

- [ ] **Step 2: Write the page**

Create `mockup/summary.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redesign proposal · Community Club</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<section class="grey">
  <div class="container">
    <span class="label">A proposal for the director</span>
    <h1>A simpler Community Club website</h1>
    <p class="lead">Today's site has 22 pages, two different sub-menus, and a lot of moving parts. This mockup shows the same information in 7 pages, with one menu and one look.</p>
    <a class="btn" href="index.html">Open the mockup</a>
  </div>
</section>

<section>
  <div class="container">
    <h2>What changes</h2>
    <div class="grid-3">
      <div class="card"><h3>22 pages → 7</h3><p class="muted">Home, Join, Tutors, Students, About, Donate, Contact. No sub-menus.</p></div>
      <div class="card"><h3>Apply in one click</h3><p class="muted">The Join button is on every page and leads to one clear place to apply.</p></div>
      <div class="card"><h3>One look</h3><p class="muted">One font, one set of colors, two button styles, nothing moving.</p></div>
    </div>
  </div>
</section>

<section class="band-pale">
  <div class="container">
    <h2>Before and after</h2>
    <div class="grid-2">
      <div><span class="label">Before: homepage (no menu at all)</span><img class="photo" src="images/before-home.png" alt="Current homepage" width="1440" height="1400"></div>
      <div><span class="label">After: homepage</span><img class="photo" src="images/after-home.png" alt="Proposed homepage" width="1440" height="1400"></div>
      <div><span class="label">Before: Current Students (garbled text)</span><img class="photo" src="images/before-students.png" alt="Current students page with garbled characters" width="1440" height="1400"></div>
      <div><span class="label">After: Students</span><img class="photo" src="images/after-students.png" alt="Proposed students page" width="1440" height="1400"></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>Worth fixing on today's site, redesign or not</h2>
    <ol>
      <li>The homepage, Join, Current Students and Orientation pages have no menu or footer.</li>
      <li>Current Students shows garbled characters (its character-set setting is wrong).</li>
      <li>Pages disagree on the school year (three different years appear) and on session times. Correct: 2026–2027, Thursdays 6:30–8:00 pm.</li>
      <li>Tutors are told both to email and to use the Google Form. Correct: the Google Form.</li>
    </ol>
  </div>
</section>
</main>
</body>
</html>
```

- [ ] **Step 3: Run the check**

Run: `node check.mjs`
Expected: `OK: 8 pages`. If the stale-fact check flags something, reword the text. Don't weaken the check.

- [ ] **Step 4: Look at it**

Run: `node shoot.mjs --base file://$PWD/mockup/ summary` and view the slices.
Expected:
- The four screenshots are readable in a 2×2 grid, stacked on mobile.
- The "before" garbled text is visible.

- [ ] **Step 5: Commit**

```bash
git add mockup/summary.html mockup/images/before-*.png mockup/images/after-*.png && git commit -m "Add director summary page"
```

---

### Task 8: Final visual pass (definition of done)

**Files:**
- Modify: any `mockup/*.html` or `mockup/style.css` where the review finds a problem.

- [ ] **Step 1: Shoot everything**

Run: `node shoot.mjs --base file://$PWD/mockup/ index join tutors students about donate contact summary`
Expected: 16 full-page shots, with no errors.

- [ ] **Step 2: Review every slice**

Open every `slices/*-desktop-*.png` and `slices/*-mobile-*.png` for the 8 pages. Check each against this list:
- The menu is identical on every page, and the current page is underlined.
- The phone menu reads "Menu".
- No sideways overflow on mobile.
- Grids are one column on mobile.
- Buttons are only navy-solid or black-outline.
- No photo repeats within a page.
- Every `<mark>` is visible.
- The footer mockup notice is present.

Write down each problem found.

- [ ] **Step 3: Check the mobile menu opens**

```bash
node -e "
import('puppeteer-core').then(async ({default:p})=>{const b=await p.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const t=await b.newPage();await t.setViewport({width:390,height:844,isMobile:true,deviceScaleFactor:2});await t.goto('file://'+process.cwd()+'/mockup/tutors.html');await t.click('.nav-mobile summary');await t.screenshot({path:'slices/menu-open.png'});await b.close();})"
```

Open `slices/menu-open.png`.
Expected: 7 stacked links, with a navy "Join" pill at the bottom.

- [ ] **Step 4: Fix the problems found, then re-run the check and re-shoot the affected pages**

Run: `node check.mjs`
Expected: `OK: 8 pages`.

- [ ] **Step 5: Sync the spec's confirm list with the marks**

Run: `grep -o '<mark>[^<]*' mockup/*.html`. Make sure every highlighted item appears in spec.md's *Content to confirm* list, and add any that are missing.

- [ ] **Step 6: Commit**

```bash
git add mockup/ spec.md && git commit -m "Final visual pass on mockup"
```
