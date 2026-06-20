# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Project Overview

**Barangay Uswag** is a non-profit website for free coding workshops for kids aged 10–16 in Iloilo City, Philippines. Sessions run inside local libraries and barangay reading centers. Everything is libre: no fees, no conditions, no exceptions.

**Founded by:** Patrick Ortell (Kuya Patrick) — a Techstars mentor and software engineer who moved to Iloilo City and wants to share the tech skills that built his career with the kabataan on his street.

**Program reality:** Patrick teaches 1 cohort at a time, personally. 4–8 weekly sessions covering 4 phases sequentially. Cannot run multiple cohorts simultaneously.

**Primary audiences:**

- Parents (mga ginikanan) — local Iloilo families browsing on mobile
- Barangay leaders and LGU officials — community trust-builders
- Tech volunteers (local and remote) — engineers, designers, speakers
- Hardware donors — anyone with an old laptop or Android to ship

---

## Narrative & Mission

The site's voice is built on three Filipino values that frame Patrick's story:

- **Kapwa** — you and I are not separate
- **Pakikisama** — belonging through presence, not distance
- **Pagmamalasakit** — care that does something real

The two-part story:

1. _Homepage (TheStory.tsx)_ — establishes the "what and why": 14 years in American startups, Techstars mentor, tech opened doors, wants the same for kabataan. Filipino values as HOW he shows up.
2. _About page (The Origin section)_ — goes deeper: the expat bubble trap, learning these values from the inside as a neighbor, leading to Barangay Uswag.

**Tone rules:**

- No em-dashes in visible copy. They read as AI-generated. Use periods, colons, or commas instead.
- No "not pity from afar" style distancing — the framing is neighbor/kapwa, not savior.
- Authentic, warm, direct. Filipino words used naturally (kabataan, bayanihan, simula, padayon, libre, kinabukasan).
- Mission blockquote: _"When our kabataan learn to build with technology, the whole bayan thrives. Uswag isn't given. It's built. This is bayanihan for the digital age."_

---

## Tech Stack

| Layer      | Choice                                                                             |
| ---------- | ---------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router) — `src/app/` directory only                                |
| Language   | TypeScript (strict mode)                                                           |
| Styling    | Tailwind CSS v4                                                                    |
| Animations | GSAP 3 + ScrollTrigger                                                             |
| Charts     | Recharts 3                                                                         |
| Icons      | Lucide React                                                                       |
| Database   | Firebase Firestore (client SDK only, no auth)                                      |
| Fonts      | Inter (sans, via `--font-inter`) + Playfair Display (serif, via `--font-playfair`) |

**Key dependencies:**

```json
"gsap": "^3.15.0"
"recharts": "^3.8.1"
"next": "16.2.9"
"react": "19.2.4"
"lucide-react": "^1.18.0"
"firebase": "^11.x"
```

---

## Color Palette (actual tokens in use)

| Hex       | Role                                      |
| --------- | ----------------------------------------- |
| `#1c1a16` | Primary ink / dark backgrounds / nav      |
| `#faf9f6` | Off-white page background                 |
| `#f5f3ee` | Section alternating background            |
| `#e8e3d8` | Borders / dividers                        |
| `#059669` | Brand green — CTAs, accents, links        |
| `#4ade80` | Bright green — labels on dark backgrounds |
| `#8a8074` | Muted body text                           |
| `#0d0c0a` | Dark overlay color for hero sections      |

`font-serif` = Playfair Display (headings, blockquotes, big numbers)
`font-sans` = Inter (body, labels, buttons)

---

## Environment Variables

Stored in `.env.local` (gitignored). Must be set in Netlify environment settings for production.

```
# Firebase client SDK (safe to expose — go to the browser)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Firebase Admin SDK (server-only — never commit)
FIREBASE_SERVICE_ACCOUNT_KEY   # Full service account JSON on one line

# Admin page protection
ADMIN_SECRET                   # Random string, used to protect /kuya session log

# Feature flag — flip to "true" when first real cohort data exists in Firestore
NEXT_PUBLIC_LIVE_DATA=false    # "false" = simulated data + amber banner shown
                               # "true"  = live Firestore data, banner hidden
```

---

## Firebase / Firestore Data Model

Project: `barangayuswag`. Four collections, all using cohort-first FK relationships.

### `cohorts`

Source of truth. All other collections reference `cohortId`.

```ts
interface Cohort {
  id?: string;
  name: string;
  status: "upcoming" | "active" | "completed";
  venue: string;
  barangay: string;
  startDate: string;
  endDate: string;
  sessionCount: number;
  description?: string;
  createdAt: Date;
}
```

**Lifecycle:** `upcoming` (registration open) → `active` (in session, registration closed) → `completed` (archived to Past Sessions tab).

### `registrations`

One doc per child sign-up.

```ts
interface Registration {
  id?: string;
  cohortId: string; // FK to cohorts
  cohortName: string;
  childFirstName: string;
  childLastName: string;
  age: number;
  gender: "Male" | "Female" | "Prefer not to say";
  gradeLevel: string;
  schoolName: string;
  barangay: string;
  hasSmartphone: boolean;
  guardianName: string;
  guardianContact: string;
  heardFrom: string;
  createdAt: Date;
}
```

### `sessions`

One doc per weekly session Patrick logs after it runs.

```ts
interface Session {
  id?: string;
  cohortId: string; // FK to cohorts
  cohortName: string;
  venue: string;
  date: string;
  phase: 1 | 2 | 3 | 4;
  kidsPresent: number;
  volunteersPresent: number;
  volunteerHours: number;
  appsShipped: number;
  notes: string;
  createdAt: Date;
}
```

### `volunteers`

One doc per volunteer sign-up (public form).

```ts
interface Volunteer {
  id?: string;
  name: string;
  contact: string;
  type: "local" | "remote";
  localRole?: string;
  remoteRole?: string;
  cohortId?: string; // optional FK to cohorts
  cohortName?: string;
  shippingHardware: boolean;
  hardwareType?: string;
  location?: string;
  notes?: string;
  createdAt: Date;
}
```

---

## Site Structure

```
src/
  app/
    layout.tsx              — Root layout: Nav + Footer wrapping all pages
    page.tsx                — Homepage: Hero + AudiencePillars + TheStory
    about/page.tsx          — About: curriculum phases, outcomes, what's next, origin story
    classes/page.tsx        — Classes: live cohort cards from Firestore + tab toggle
    volunteer/page.tsx      — Volunteer: local + remote role cards, VolunteerCTA buttons
    impact/page.tsx         — Impact: live/simulated data room with Recharts charts
    contact/page.tsx        — Contact: Facebook CTA + Iloilo City location + map
    kuya/page.tsx           — Hidden admin page (not in nav)
    donate/page.tsx         — Donate: hidden from nav (hardware logistics TBD)
  components/
    Nav.tsx                 — Sticky header, mobile hamburger. Order: Classes · Impact · Volunteer · About · Contact
    Hero.tsx                — Full-bleed video hero with GSAP text animations
    AudiencePillars.tsx     — 3 audience cards (parents, leaders, volunteers)
    TheStory.tsx            — Pull-quote band + editorial story + pillars strip
    Footer.tsx              — Volunteer CTA band + nav links + Facebook only in Connect column
    FadeUp.tsx              — Reusable GSAP scroll-triggered fade-up wrapper
    AnimatedPhaseList.tsx   — GSAP animated curriculum phase list (used on About)
    AnimatedOutcomeList.tsx — GSAP animated outcomes list (used on About)
    RegistrationModal.tsx   — Child registration form modal, writes to Firestore registrations
    VolunteerModal.tsx      — Volunteer sign-up modal, writes to Firestore volunteers
    VolunteerCTA.tsx        — Thin "use client" wrapper + React portal for VolunteerModal
    TribalSun.tsx           — Decorative SVG component
    TribalTeeth.tsx         — Decorative SVG component
  lib/
    firebase.ts             — Firebase client SDK init, exports `db`
    types.ts                — TypeScript interfaces: Cohort, Registration, Session, Volunteer
    constants.ts            — ILOILO_BARANGAYS (~70 entries), GRADE_LEVELS, HEARD_FROM_OPTIONS,
                              LOCAL_ROLES, REMOTE_ROLES
public/
  hero.mp4             — Homepage background video (41s loop, 1280×720)
  mission-bg.png       — Pull-quote section background (TheStory.tsx)
  story-photo.png      — Our Story section left photo
  parents-card.png     — AudiencePillars: For Parents card image
  leaders-card.png     — AudiencePillars: For Barangay Leaders card image
  volunteers-card.png  — AudiencePillars: For Volunteers card image
  gallery-1.png        — Impact gallery (coffeeshop meetup, large)
  gallery-2.png        — Impact gallery (hands on laptop)
  gallery-3.png        — Impact gallery (volunteer helping teen)
  gallery-4.png        — Impact gallery (two teens collaborating)
  gallery-5.png        — Impact gallery (teen showing app on phone)
  gallery-6.png        — Impact gallery (golden hour street scene) + volunteer/classes hero bg
  about-next.png       — About page "What Comes Next" section image
  classes-hero.png     — Classes page hero background
```

All gallery images (`gallery-1` through `gallery-6`) are AI-generated in a "candid phone pic" style: Samsung Galaxy / Google Pixel aesthetic, natural light, unposed, nobody looking at camera, digital grain. Meant to feel like real session documentation, not stock photography.

---

## Page Details

### Homepage (`/`)

Three components stacked: `Hero` → `AudiencePillars` → `TheStory`

**Hero.tsx** — Full-bleed `<video>` background (`/hero.mp4`), looping, muted, autoplay. Dark overlay + vignette. GSAP animates the eyebrow label, h1, subtext, and CTA buttons in sequence on load. Scrolling barangay name ticker sits above overlay. CTAs: "Enroll Your Child" → `/contact`, "Learn More" → `/about`.

**AudiencePillars.tsx** — 3 bento-style cards: For Parents · mga Ginikanan, For Barangay Leaders, For Volunteers · Local & Remote. Each has a local image, tag, heading, and body. `large: true` on the parents card makes it span the full grid on mobile.

**TheStory.tsx** — Three sections:

1. Pull-quote band with `mission-bg.png` background + dark overlay. Mission blockquote in large font.
2. Editorial story: photo left (`story-photo.png`), copy right. Patrick's story: Filipino values (kapwa, pakikisama, pagmamalasakit) + tech skills mission. Pull quote with green left border.
3. "Why it matters" dark strip with 3 pillars (Libre. Always / Bayanihan not charity / Padayon built to scale).

### About (`/about`)

Five sections:

1. **Page hero** — Dark full-bleed with ambient green glow + film grain texture
2. **Curriculum** — `AnimatedPhaseList` with 4 phases: Think Like an App Builder / Design & User Empathy / The App Code Build / Ipakita
3. **Outcomes** — `AnimatedOutcomeList` with 4 outcomes: real app, certificate, network access, ladder continues
4. **What Comes Next** — advanced cohorts, regional hackathons, mentorship pipeline
5. **The Origin** — Patrick's story: moving to Iloilo, rejecting the expat bubble, learning Filipino values as practice, bringing skills as a neighbor not a benefactor

### Classes (`/classes`)

- "use client" — fetches cohorts + registration counts from Firestore on mount via `Promise.all`
- Hero: `classes-hero.png` background + dark overlay
- Tab toggle: **Current** / **Past Sessions**
- **CohortCard** (current): dark `#1c1a16` header with status badge, live registration count ("X kabataan registered"), details strip (Venue, Start Date, Ages, Sessions), 4-phase curriculum grid, amber notice when active. Register button only appears when status === "upcoming"
- **PastCohortCard** (completed): compact row with cohort name, venue, end date
- Empty states: polished with faded Lucide icon in soft ring, Filipino eyebrow label ("Simula" / "Padayon"), Facebook CTA on the "coming soon" state
- Bottom CTA: "Have a space in Iloilo City?" → `/contact`
- **RegistrationModal** opens with real `cohortId` + `cohortName` passed in

**Cohort status meanings:**

- `upcoming` — registration open, Register button shown
- `active` — in session, registration closed ("Registration Closed" pill shown)
- `completed` — archived, shown on Past Sessions tab only

### Volunteer (`/volunteer`)

Server component (keeps metadata export). Two column cards: Local (dark `#1c1a16`) + Remote (light `#f5f3ee`).

Each card's CTA is `<VolunteerCTA>` — a thin "use client" wrapper that renders `VolunteerModal` via **React portal** (to escape GSAP stacking context from FadeUp transforms).

**Local roles:** Manong Drivers, Nanay Snack Brigade, Chaperones (Lolo/Lola/Tita/Tito), Hiligaynon Translators, Flyer Crew, Barangay & SK Connectors, Facebook Group Admins

**Remote roles:** Accelerator Alumni & Founders, App Builders & Indie Makers, Industry & Big Tech Speakers, UX & Design Specialists, Specialist Engineers, Remote Work Advocates, Send Your Old Laptop, Send Your Old Android

### Impact (`/impact`)

Live/simulated data room. Controlled by `NEXT_PUBLIC_LIVE_DATA` env var.

**Feature flag behavior:**

- `false` (default): all data is simulated placeholder. Amber sticky banner shown. "Building in Public / Honest from day one" section shown at bottom.
- `true`: `useLiveData()` hook fetches live Firestore data (registrations, sessions, volunteers). Banner and "Building in Public" section hidden automatically (gated on `liveMetrics !== null`).

**`useLiveData()` hook computes from Firestore:**

- `kabataan` — total registrations count
- `appsShipped` — sum of `appsShipped` from phase-4 sessions
- `volHours` — sum of `volunteerHours` across all sessions
- `barangayCount` — unique venue count from sessions
- `volSignups` — total volunteer sign-ups
- `hardwareDonors` — volunteers where `shippingHardware === true`
- Cohort chart data, age buckets, gender split (3 options), barangay reach

**Charts:**

- **Cohort enrollment** — `BarChart` grouped bars (Enrolled vs Graduated). `ChartTooltip` component.
- **Age distribution** — Horizontal `BarChart`, age range on Y axis (width 44), percentage on X.
- **Gender split** — `PieChart` donut. Fully dynamic: `GENDER_COLORS = [GREEN_LIGHT, GREEN, MUTED]` mapped over data — handles 2 or 3 slices. Center label shows largest slice. Legend maps over data. Supports "Male", "Female", "Prefer not to say". Zero-value slices filtered out.
- **Barangay reach** — Horizontal `BarChart`. Y-axis `width={120}` + `left: 8` margin to prevent long barangay names from clipping.

**Brand tokens** defined at top of file: `GREEN`, `GREEN_LIGHT`, `MUTED_BG`, `INK`, `MUTED`

**Metrics strip:** 4 KPI cards with 3-point sparkline `AreaChart` each:

- Kabataan Served: note shows cohort count
- Apps Shipped: note shows completion %
- Volunteer Hours: note shows `"X signed up · Y shipping hardware"`
- Barangays Reached: note lists venue names

**Gallery:** Bento grid using local `gallery-*.png` images.

**Impact methodology table:** 5 dimensions with status column:

- `"tracking"` (green dot "● Tracking") — Direct Educational Reach (currently measured)
- `"planned"` (muted dot "○ Planned") — Digital Skills Density, Economic Opportunity, Community Multiplier, Network Capital

**Mandate alignment section:** DepEd MATATAG, DICT RA 11927, LGU/SK (SK Reform Act RA 10742 + HB 03259).

### Contact (`/contact`)

- Hero: dark, "We'd love to hear from you."
- Left column: Facebook CTA button (Facebook blue `#1877F2`, `href="#"` until page is live) + Location (Iloilo City + link to Classes page for venues)
- Right column: Google Maps embed for Iloilo City
- No email address. No Instagram/Twitter.

### Admin (`/kuya`)

Hidden from nav. No auth — security by obscurity (don't link it anywhere). URL must be kept private.

**Sections in order:**

1. **Quick stats** for active cohort: enrolled, sessions logged, volunteer hours, apps shipped
2. **Cohorts** — list with inline edit (venue, start date, end date), status advance buttons ("Mark In Progress →" / "Mark Completed →"), plus create new cohort form (name, venue, barangay, startDate, endDate, sessionCount, description)
3. **Log a Session** — form: cohort dropdown (real Firestore IDs), date, phase (1–4), kidsPresent, volunteersPresent, volunteerHours, appsShipped, notes
4. **Registrations table** — filterable by cohort, shows all child + guardian info
5. **Session Log table** — all sessions across all cohorts
6. **Volunteer Sign-Ups table** — filter: All / Local / Remote. Columns: Name, Contact, Type badge, Role, Cohort, Hardware, Location, Notes. Header shows: total · local · remote · shipping hardware counts.

### Donate (`/donate`)

Hidden from Nav and Footer. Hardware shipping logistics TBD. Page exists but is not linked.

---

## Components

### `RegistrationModal.tsx`

Props: `cohortId: string, cohortName: string, onClose: () => void`

Two-step flow: form → "Salamat!" success screen. Fields: childFirstName, childLastName, age, gender (3 options), gradeLevel, schoolName, barangay (dropdown from ILOILO_BARANGAYS), hasSmartphone (toggle), guardianName, guardianContact, heardFrom. Writes to `registrations` collection with cohortId/cohortName FK.

### `VolunteerModal.tsx`

Props: `defaultType: "local" | "remote", onClose: () => void`

Two-step: form → "Salamat!" success. Key UI details:

- Sticky header always visible with live type badge (so context isn't lost when scrolled)
- Name + contact in 2-column grid
- Local/Remote toggle resets role when type changes
- Single role dropdown sourced from `LOCAL_ROLES` or `REMOTE_ROLES` constants
- Optional cohort dropdown — fetches upcoming/active cohorts from Firestore
- Hardware as two-button toggle ("Yes, I can ship one" / "Not right now") — not required
- Notes textarea (2 rows)
- Positioned via CSS: `pt-[20vh]` `items-start` — top of card is always 20% from viewport top on both mobile and desktop. `max-h-[75vh]` overflow-y-auto.
- Writes to `volunteers` collection.

### `VolunteerCTA.tsx`

Thin "use client" wrapper so `volunteer/page.tsx` stays a server component. Uses **`createPortal`** to render `VolunteerModal` on `document.body` — this escapes the GSAP `FadeUp` transform stacking context that would otherwise trap `position: fixed` inside the card boundary.

### `FadeUp.tsx`

Reusable wrapper. Uses GSAP `fromTo` (`opacity: 0, y: 32` → `opacity: 1, y: 0`) triggered by ScrollTrigger at `top 90%`. Accepts `delay` (number) and `className` props. Starts with `style={{ opacity: 0 }}` to prevent flash.

**Important:** FadeUp applies CSS `transform` which creates a stacking context. Any `position: fixed` modal rendered as a child will be trapped. Always use `createPortal` for modals that appear inside FadeUp-wrapped containers.

### `Nav.tsx`

Sticky, `backdrop-blur-md`, border-bottom. Mobile hamburger with inline SVG (open/close states). Donate link commented out. Link order (desktop + mobile): **Classes · Impact · Volunteer · About · Contact**

### `Footer.tsx`

Dark (`#1c1a16`). Top band: "Help Us Reach Every Barangay" with Volunteer + Contact buttons. Footer grid: brand blurb left, Navigate + Connect columns right. Connect column: **Facebook only** (dummy `#` link until page is live). Bottom bar: tagline + copyright.

---

## Animation Patterns

All scroll animations use GSAP + ScrollTrigger. Pattern:

```ts
gsap.fromTo(
  el,
  { opacity: 0, y: 32 },
  {
    opacity: 1,
    y: 0,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  },
);
```

Always initialize elements with `opacity: 0` in inline style to prevent flash before JS hydrates.

---

## Design Constraints

- **Mobile-first** — local parents browse on smartphones
- **No Donate link visible** — hidden from nav and footer until hardware shipping logistics are resolved
- **No real session data yet** — Impact page uses simulated projections when `NEXT_PUBLIC_LIVE_DATA=false`; amber banner makes this clear
- **Cohort lifecycle enforced** — registration only open on `upcoming` cohorts; `active` shows "Registration Closed"; `completed` archived to Past Sessions tab
- **1 cohort at a time** — Patrick teaches solo; the UI and data model reflect this constraint
- **Image style** — local photography aesthetic, not cinematic. Candid, natural light, Samsung/Pixel camera feel.
- **Facebook only** — no email, no Instagram, no Twitter anywhere on the site until those are set up

---

## Formatting

Prettier is configured. Run `npx prettier --write <file>` after edits. The PostToolUse hook runs Prettier automatically on file save in Claude Code.

---

## Deployment

Netlify. Build command: `npm run build`. Repo: `github.com/p5150j/BarangayUswag`. Netlify auto-deploys on push to `main`.

All environment variables must be added in Netlify Site Settings → Environment Variables. The `.env.local` file is gitignored and never committed.

---

## Key External Documents

**Location Pitch Deck (Google Slides)**
Used to pitch barangay reading centers, libraries, and community spaces as session venues. Shows LGU officials and barangay captains what hosting looks like — zero cost to them, equipment brought in.
https://docs.google.com/presentation/d/1tL1Ks1ynf0iqKAC4pAPQMdxGzpug6f5SfI9T-VxEMTA/edit?slide=id.g3ec333d6628_0_3#slide=id.g3ec333d6628_0_3

**Outreach Plan (Google Doc)**
Patrick's outreach strategy for reaching parents, barangay leaders, and the community ahead of the first cohort launch.
https://docs.google.com/document/d/124gPr0mIeAXYUInHI26BEv4gBFolNNHoeAMNlgCt3HM/edit?usp=sharing

---

## Roadmap / Future Features

Items discussed but not yet built:

- **Facebook page** — not live yet. Contact page and footer have `href="#"` placeholders. Swap to real URL when ready.
- **Donate flow** — `/donate` page exists but is hidden from nav. Hardware shipping logistics TBD before enabling.
- **Short-form reels** — 9:16 vertical video per curriculum topic, filmed after first cohort runs. Full explainer video is on hold.
- **Alumni survey system** — needed to track Community Multiplier (impact dimension 04). Post-cohort follow-up at 6 and 12 months.
- **Advanced cohorts / hackathons** — mentioned on About page as "What Comes Next" but not built.

### Impact Methodology — 5 Dimensions

The impact page methodology table tracks these dimensions. Build them out in order as the program matures:

| #   | Dimension                     | Status                            | Formula                                           |
| --- | ----------------------------- | --------------------------------- | ------------------------------------------------- |
| 01  | Direct Educational Reach      | **Tracking** (live via Firestore) | Phase 4 graduates ÷ Phase 1 enrollments           |
| 02  | Digital Skills Density        | Planned                           | Apps shipped × complexity score (1–5 rubric)      |
| 03  | Economic Opportunity Unlocked | Planned                           | Graduates × ₱ estimated annual wage lift          |
| 04  | Community Multiplier          | Planned                           | Tracked annually via alumni survey                |
| 05  | Network Capital               | Planned                           | Mentors × active connections + tracked placements |

Dimensions 02–05 need longer program history and/or alumni survey infrastructure before they can be measured. Dimension 02 is next most feasible once sessions run.
