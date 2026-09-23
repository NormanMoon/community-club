# Community Club Site — Mockup Spec

> Slug: community-club-site
> Last updated: 2026-09-23
> Scope: **mockup only**, to show the director. Not a real site.
> Audit, decisions and history: `/Users/normanmoon/AO/plans/community-club-site.md`


## Goal and success criteria

**This is a mockup to show the director, not a real site.** Norman is not rebuilding or launching anything now. The mockup only has to *look and click* like the proposed site, well enough to start a conversation. Anything that only matters for a live site is out of scope (see the end of this document).

It succeeds if, clicking through it on a laptop or phone, the director can see:
1. **Simpler:** 7 pages instead of 22, one menu, and "apply as a tutor" or "enroll a student" one click from any page.
2. **Unified:** every page shares the same menu, footer, buttons, colors and font, with no motion.
3. **Correct on the key facts:** 2026–2027, Thursdays 6:30–8:00 pm, tutors apply through the Google Form. Anything uncertain is visibly highlighted.

## Pages (7)

Menu on every page: **logo · Tutors · Students · About · Donate · Contact · [Join]** (Join is the solid navy button).
Footer on every page: address (1313 New York Ave NW), email, Instagram, alumni Facebook group, and the CFC code.

| Page | File | Its one job | Content drawn from today's pages |
|---|---|---|---|
| Home | `index.html` | Say what it is and send people onward | index |
| Join | `join.html` | **The only place to apply.** Two side-by-side paths. Tutor: Google Form → orientation → matched. Student: Google registration form (mocked; it doesn't have to work) → matched. | join, the apply parts of become-a-tutor and become-a-student |
| Tutors | `tutors.html` | What tutoring involves: Thursdays 6:30–8:00 pm; requirements (orientation, child protection policy, background check, references); tutor resources. Ends with "Ready? → Join." | become-a-tutor, orientation, tutor-resources, successful-approaches, learning-disabilities, dcps-links |
| Students | `students.html` | Who can join (grades 6–11, free); what current students get; college and graduation resources in sections further down, with jump links at the top. Ends with "Ready? → Join." | become-a-student, current-students, student-resources, dcps-graduation-requirements, college-timetable, college-students |
| About | `about.html` | Mission, short history, team, events, alumni | about-us, history, cc-team, special-events, alumni, tutors-of-the-year |
| Donate | `donate.html` | Why it matters, the Network for Good donation button, CFC #25839 via the New York Avenue Education Foundation | donor-resources |
| Contact | `contact.html` | Email made easy: the address shown large, plus four buttons that open a pre-titled email ("I'd like to tutor", "Question about my student", "Donations", "Something else"); where and when we meet, with a directions link. No fake form. | contact-us |

Home layout, top to bottom:
1. Enrollment strip: "Now enrolling for 2026–2027 · Thursdays 6:30–8:00 pm".
2. Hero: headline, one sentence, [Become a tutor] and [Enroll a student] buttons, and one photo in a colored frame.
3. "How it works": 3 numbered circles.
4. Bright-blue band with 3 white cards: Tutors / Students / Donate.
5. A short strip of event photos (each photo used once), linking to About.
6. Footer.

## Visual rules

- **Colors:**
  - Navy `#17365d`: main buttons, links, headings, enrollment strip.
  - Dark navy `#0f2542`: footer.
  - Bright blue `#2f9fe0`: full-width bands behind white cards. Never text on it.
  - Pale blue `#eaf4fb`: alternate section background.
  - Accents only, never text or large areas: yellow `#ffc933`, green `#2fa37a`, red `#d6363e`. Used for step circles and the photo frame.
  - Step-circle numbers are 20px or larger and bold: navy on yellow, white on green or red.
  - Body text `#333` / `#555` on white or `#f5f5f5`.
- **Font:** Fira Sans (Google Fonts). Weight 800 for headings, 400/500 for body text.
- **Components (exactly these, defined once in `style.css`):**
  - `.btn`: solid navy pill.
  - `.btn-outline`: outlined pill.
  - `.label`: small uppercase line above a heading.
  - `.card`: white, rounded, flat or with a very soft shadow.
  - `.steps`: numbered colored circles.
  - `.band`, `.band-pale`: full-width colored sections.
- **No emoji as icons. No motion:** no transitions except link/button color on hover, no transforms, no keyframe animations.
- **Layout:**
  - `.container` is at most 1,100px wide.
  - Everything is a single column at 760px wide and below.
  - The phone menu is a `<details><summary>Menu</summary>` element, with no JavaScript.
- **Photos:** real site photos only, each used at most once per page, with rounded corners. At most one framed photo per page.
- **Logo:** the original `image001.png`, shown about 40px tall, unchanged.

## Build

- Folder: `~/Projects/community_club_site/mockup/` containing 7 `.html` files, one `style.css`, `summary.html` and `images/`. Open `index.html` in any browser; no server or tools needed.
- Plain HTML and CSS, no JavaScript. The menu and footer are copied into each page (7 pages is few enough to keep in sync by hand).
- Images: copy the site's own photos and logo into `images/` so the mockup works offline. No resizing or optimizing.
- Links between the 7 pages work. Outside links (Google Form, donation page, email, Instagram, Facebook) point at the real addresses, since they already exist; the mockup doesn't depend on them.
- Every page footer says **"Mockup: proposed redesign, not the live site."** so nobody mistakes it for the real thing.
- Uncertain content is wrapped in `<mark>` (shown as a yellow highlight) and listed below.

## Director summary (`summary.html`)

One page in the same style:
1. Three before/after screenshot pairs: homepage, Current Students (garbled text), and the menus/page count.
2. What changes: 18 → 7 pages, one set of buttons, colors and fonts, no motion, apply in one click.
3. **Must-fix bugs on the current site**, worth doing even without the redesign: the missing menus, the garbled charset, the conflicting years and times, and the two tutor application routes.
4. A link to open the mockup.

## Checks (definition of done)

1. Screenshots of all 7 pages plus the summary at laptop (1440px) and phone (390px) widths using `shoot.mjs`. Look at each one: nothing broken, overlapping or off-style.
2. Click through: every menu item, button and in-page link between the 7 pages goes where it should.

## Content to confirm (before it goes to the director)

- [ ] Norman's corrections to mockup text (he says some information is wrong; he'll list it).
- [x] Student registration: a Google form (decided 2026-09-23). The mockup links to one; it doesn't have to work. This replaces the 2020–21 PDF.
- [ ] Orientation details: arrival 6:15, 5th floor, and who to contact about orientation.
- [ ] Team names and roles for About.
- [ ] Which events still happen (bowling, Wizards game, year-end awards, college scholarship celebration).
- [ ] The Instagram handle and alumni Facebook group are still current.
- [ ] The Network for Good donation link still works for this organization.

## Out of scope

Everything that only matters for a real, launched site:
- Building or changing the real site, hosting, publishing, and redirects from the old URLs.
- Search-engine tags, image optimization, and formal accessibility or link audits.
- Making the pages easy for the director to maintain long-term.
- A redrawn, crisp logo (ask the director later).
- Final content accuracy beyond the key facts; that's the *Content to confirm* list.
