#  UFT — University of Fire Tech

> **Excellence in Innovation, Ethics, Research & Student Success.**
> A complete, self-contained digital campus and admissions experience.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Build Step](https://img.shields.io/badge/build-none-0aa?style=flat)
![Multi-language](https://img.shields.io/badge/i18n-EN·ES·FR·DE·PT-7c3aed?style=flat)
![Apache-ready](https://img.shields.io/badge/deploy-Apache%20%2F%20static-00f2ff?style=flat)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-fb7185?style=flat)

---

##  Overview

**UFT University of Fire Tech** is a front‑end–only concept university website that walks
a prospective student through the **entire lifecycle of enrollment** — from discovering a
course, through the online application workspace, and all the way to a **simulated secure
checkout** with an instantly generated receipt.

Beyond the admissions funnel, the site is a complete **digital campus**:

-  Rich undergraduate, postgraduate and digital-learning catalogs with full course details
-  An interactive **events calendar** plus dedicated event detail pages
-  **Clubs & Societies** with profiles, weekly schedules, and a join-with-verification flow
-  **Activities & Sports** performance hub with weekly training plans
-  **Research & Innovation** lab spotlights
-  An **interactive campus map**, **libraries**, **volunteering**, and **international
  students** hubs
-  **Leadership profiles** for the university executive team
-  **Multi-language UI** with no reloads

The entire site is **pure HTML5, CSS3 and vanilla JavaScript** — no frameworks, no
package manager, no build step, and no server-side code. Open the files, and it just works.

---

##  Key Features

###  Admissions Journey
| Stage | Where | What happens |
| --- | --- | --- |
| Explore | `index.html` / `section-view.html` | Browse courses, filter the catalog, search, open full profiles |
| Sign in | `index.html` login modal | Simulated student-portal authentication (`@uft.edu` + 6-char password) |
| Apply | `application.html` | Complete the online application workspace |
| Pay | `payment.html` | Simulated checkout — card methods, breakdown, instant receipt |

###  Campus Life
- **Events** — month calendar with toggleable months, event-day highlighting, and rich
  per-event detail pages (`event-detail.html`) with agenda, audience, takeaways and gallery.
- **Clubs & Societies** — profiles, focus areas, activity lists, weekly schedules and a
  "join" flow with a student-email + motivation verification step.
- **Activities & Sports** — performance hub, weekly training plans, and team programs.
- **Volunteering & Community** — impact-led service projects with sign-up calls-to-action.
- **Libraries** — digital collections, archives, study spaces and research support.
- **Campus Map** — visual floor-plan driven location guide (`assets/maps`).

###  Research & Innovation
Lab spotlight cards (AI Ethics Lab, Quantum Systems Lab, Cyber Range, and more) with live
researcher/project/partner/publication stats — openable in focused pop-up windows.

###  Productivity & Polish
-  **Hero search** across programs and courses
-  **Live clock** in the header
-  **Animated stat counters** throughout
-  **Hero slider** with rotating campus imagery
-  **Cookie-consent bar** (accept / reject) with `localStorage` memory
-  **Custom alert & modal system** replacing native dialogs
-  **PDF downloads** — prospectus, degree specifications, and student handbooks
-  Semantic markup, keyboard-friendly controls, and fully responsive layouts

---

##  Pages & Sitemap

| File | Role |
| --- | --- |
| `index.html` | Main campus home — hero, stats, courses, testimonials, partners, footer |
| `section-view.html` | **Section Explorer engine** — renders 18+ pages from `?section=slug` |
| `section.html` | Section explorer hub / landing |
| `application.html` | Online application workspace |
| `payment.html` | Secure checkout simulation with receipt |
| `event-detail.html` | Rich event detail page (`?id=openDay`, `innovationForum`, …) |
| `leader-profile.html` | Leadership profile page (`?id=elena`, `marcus`, `amir`, …) |
| `fix.js` | QoL override patch loaded after main scripts (club popups, join flow, etc.) |

### Content sections provided by the explorer engine
`undergrad` · `postgrad` · `digital` · `catalog` · `events` · `clubs` · `activities` ·
`research` · `campusmap` · `libraries` · `volunteering` · `international` · `admissions` ·
`faq` · `help` · `business` · `law` · `offcampus` — plus a generic fallback renderer, so any
future section gets a page for free.
##  Project Structure

```text
cs-year-1/
├── index.html                  # Main campus homepage (SPA-style section switching)
├── section-view.html           # Section Explorer engine (renders 18+ pages from a slug)
├── section.html                # Section explorer hub
├── application.html            # Online application workspace
├── payment.html                # Simulated secure checkout + receipt
├── event-detail.html           # Event detail page
├── leader-profile.html         # Leadership profile page
├── fix.js                      # QoL overrides for club popups / join flow
├── fix_tags_run.js             # Small tag-scrubbing helper
├── assets/
│   ├── degrees/                # PDF prospectus, degree specs, handbooks
│   ├── maps/                   # Campus floor-plan imagery
│   ├── modules/                # Module/schedule placeholders
│   └── students/               # Student portrait photography
├── students/                   # Course & admissions imagery (PNG/PDF)
├── public_assets/              # Public-facing images (e.g. outgoing.png)
├── degrees/                    # Mirror copies of degree PDFs
└── modules/                    # Module work area (schedule.html placeholder)
```

> Everything is static. Deploy by copying the folder anywhere a web server can reach it.

---

##  Design System

The visual identity is centralized in CSS custom properties, so the whole brand can be
re-themed by changing a handful of variables.

| Token | Value | Usage |
| --- | --- | --- |
| `--primary` | `#ff5100` | Signature "fire" orange — CTAs, accents, highlights |
| `--secondary` | `#002d5a` | Deep university navy — headings, header, tables |
| `--accent` | `#00f2ff` | Cyan accent — gradients, badges, glow effects |
| `--dark` | `#0f172a` | Near-black — footer, overlays |
| `--success` | `#10b981` | Success states / confirmation |
| `--gold` | `#fbbf24` | Stars, achievements, ratings |
| `--bg` | `#f8fafc` | Page background |

### Typography
- **Inter** (300–900) — the workhorse for UI, navigation, body and data.
- **Playfair Display** — elegant serif accents on hero/event surfaces for a premium feel.

### Iconography & Imagery
- **Font Awesome 6.4** — consistent icon language across every page.
- **Unsplash photography** for campus & program imagery, complemented by local
  `students/*` and `assets/students/*` artwork.
- Inline-SVG favicon with the UFT "F" flame mark — no external favicon file needed.

---

##  Internationalization

Every page ships with first-class locale packs and an in-header language switcher:

| Page | Languages |
| --- | --- |
| `index.html` | 🇬🇧 English · 🇪🇸 Español · 🇫🇷 Français |
| `section-view.html` | English · Español · Français |
| `application.html` / `payment.html` | English · Español · Français · Deutsch · Português |
| `event-detail.html` / `leader-profile.html` | English · Español · Français (+ more on some pages) |

- Preference is persisted in `localStorage` (`uftLanguage`) and rehydrated on load.
- `document.documentElement.lang` is updated for accessibility & SEO.

---

##  Getting Started

Because the project is **100% static**, there are three equally valid ways to run it:

### 1. Just open it
Double-click `index.html` in any modern browser. No server required.

### 2. Local dev server (recommended)
```bash
# from the project root
python3 -m http.server 8080
# then visit http://localhost:8080
```

### 3. Apache (production-style)
The project is already at home in a web root such as
`/var/www/cohorts/cs-year-1` on WSL/Ubuntu:

```bash
sudo cp -r . /var/www/html/uft/   # or serve the folder directly via a vhost
```

### Demo credentials
The **Student Portal** login is a front-end simulation for demo purposes:
- Email: any address containing `@uft.edu`
- Password: any string of **6+ characters**

##  How It Works

### Data-driven everything
All content lives in plain JavaScript objects — no hard-coded locked pages:

- **`ugCourses` / `pgCourses` / `hardSkills`** in `section-view.html` drive the
  searchable tables and course detail pop-ups.
- **`events`**, **`clubs`**, **`profiles`** (leadership) and every **`locale`** pack are
  plain data that you can extend by simply adding another object entry.
- `meta` maps each `?section=slug` to title, badge, subtitle, hero image, brochure PDF and
  payment deep-link.

### Routing model
- The homepage uses lightweight **SPA-style routing** (`showMain()`): most sections
  delegate to the standalone explorer (`section-view.html?section=...`), while core
  homepage sections (home/about/contact) toggle in place — no reloads.
- Deep links work directly: `section-view.html?section=events`,
  `event-detail.html?id=openDay`, `leader-profile.html?id=marcus`,
  `payment.html?course=...&price=...`.

### Modules & window helpers
- Section pages can render rich content into **pop-out windows**
  (`openCourseInWindow`, `openResearchWindow`, `openLoginWindow`) with their own
  self-contained styling.
- `fix.js` is an after-the-fact override layer that upgrades club popups, join-society
  verification and gallery layouts without touching the original page scripts.

---

##  Included Documents & Assets

| Asset | Location | Purpose |
| --- | --- | --- |
| University Prospectus | `assets/degrees/UFT_University_Prospectus.pdf` | Flagship PDF download |
| B.Sc. Course Handbook | `assets/degrees/bsc-handbook.pdf` | Course specifics |
| Degree Specifications | `assets/degrees/degree-specs.pdf` | Accredited program specs |
| Student Handbook | `assets/degrees/Student Handbook.pdf` | Student life & policies |
| Full-time UG fees PDF | `students/full-time-undergraduate-2022-2023.pdf` | Fee schedules |
| Campus floor plan | `assets/maps/floor-plan-level1.png` | Campus map feature |
| Portraits / admissions art | `assets/students/`, `students/*.png` | People & programs imagery |

---

##  Roadmap

- [x] Multi-language UI (EN/ES/FR, plus DE/PT on portals)
- [x] Searchable course catalog with deep-link course details
- [x] Simulated admissions + payment/receipt flow
- [x] Events calendar, clubs & societies, research labs, campus map
- [ ] Backend integration (real auth, real payments, CMS-driven content)
- [ ] Accessibility audit pass (WCAG AA)
- [ ] SEO meta injection + Open Graph per page
- [ ] PWA offline shell and push notifications
- [ ] Analytics & conversion funnels for the admissions path

---

##  Credits & Acknowledgements

> **Designed by** — **Dhurgham ALsaadi**

A big thank-you to everyone who shaped this project — the concept, the brand, and the
craft. UFT is a portfolio/build project for CS Year 1 foundations.

| Role | Name |
| --- | --- |
|  Designer | **Dhurgham ALsaadi** |
|  Front-end engineer | **Dhurgham ALsaadi** |
|  Content & product | **Dhurgham ALsaadi** |

**Third-party resources** — Font Awesome (icons), Google Fonts (Inter & Playfair Display),
Unsplash (campus photography), and the HTML/CSS/JS community tools that made this
possible. All third-party assets remain the property of their respective owners.

---

##  License

**UFT — University of Fire Tech** is a concept/demo project. All rights reserved.
The UFT name, logo mark, and site content are © UFT University / project author —
**Dhurgham ALsaadi**. Third-party libraries and imagery retain their own licenses.

---

*“Where Future Ignites”* — UFT University of Fire Tech · Excellence in Innovation
