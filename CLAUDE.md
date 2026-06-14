# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Project Overview

**Barangay Uswag** is a non-profit website for free coding workshops for kids aged 10–16 in Iloilo City, Philippines. Sessions run inside local libraries and barangay reading centers. Everything is libre: no fees, no conditions, no exceptions.

**Founded by:** Patrick Ortell (Kuya Patrick) — a Techstars mentor and software engineer who moved to Iloilo City and wants to share the tech skills that built his career with the kabataan on his street.

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
| Fonts      | Inter (sans, via `--font-inter`) + Playfair Display (serif, via `--font-playfair`) |

**Key dependencies:**

```json
"gsap": "^3.15.0"
"recharts": "^3.8.1"
"next": "16.2.9"
"react": "19.2.4"
"lucide-react": "^1.18.0"
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

## Site Structure

```
src/
  app/
    layout.tsx          — Root layout: Nav + Footer wrapping all pages
    page.tsx            — Homepage: Hero + AudiencePillars + TheStory
    about/page.tsx      — About: curriculum phases, outcomes, what's next, origin story
    classes/page.tsx    — Classes: 4-phase workshop cards + tab toggle (upcoming/past)
    volunteer/page.tsx  — Volunteer: local roles + remote roles (with hardware donation)
    impact/page.tsx     — Impact: simulated data room with Recharts charts
    contact/page.tsx    — Contact: simple form / reach-out page
    donate/page.tsx     — Donate: hidden from nav (hardware logistics TBD)
  components/
    Nav.tsx             — Sticky header, mobile hamburger, Donate hidden
    Hero.tsx            — Full-bleed video hero with GSAP text animations
    AudiencePillars.tsx — 3 audience cards (parents, leaders, volunteers)
    TheStory.tsx        — Pull-quote band + editorial story + pillars strip
    Footer.tsx          — Volunteer CTA band + nav links + social
    FadeUp.tsx          — Reusable GSAP scroll-triggered fade-up wrapper
    AnimatedPhaseList.tsx  — GSAP animated curriculum phase list (used on About)
    AnimatedOutcomeList.tsx — GSAP animated outcomes list (used on About)
    TribalSun.tsx       — Decorative SVG component
    TribalTeeth.tsx     — Decorative SVG component
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

Four sections:

1. **Page hero** — Dark full-bleed with ambient green glow + film grain texture
2. **Curriculum** — `AnimatedPhaseList` with 4 phases: Think Like an App Builder / Design & User Empathy / The App Code Build / Ipakita
3. **Outcomes** — `AnimatedOutcomeList` with 4 outcomes: real app, certificate, network access, ladder continues
4. **What Comes Next** — advanced cohorts, regional hackathons, mentorship pipeline
5. **The Origin** — Patrick's story: moving to Iloilo, rejecting the expat bubble, learning Filipino values as practice, bringing skills as a neighbor not a benefactor

### Classes (`/classes`)

- Hero: `classes-hero.png` background + dark overlay
- Tab toggle: Upcoming / Past Sessions (client component with `useState`)
- 4 phase cards (grid 2×2): each has image header with dark overlay, phase label, "Coming Soon" badge, title, sub, desc, date/time/venue/ages details
- All register buttons are **disabled** ("Coming Soon" span, `cursor-not-allowed`) — dates TBD
- Bottom CTA: "Have a space in Iloilo City?" → `/contact`

### Volunteer (`/volunteer`)

Two column cards: Local (dark `#1c1a16`) + Remote (light `#f5f3ee`)

**Local roles:** Manong Drivers, Nanay Snack Brigade, Chaperones (Lolo/Lola/Tita/Tito), Hiligaynon Translators, Flyer Crew, Barangay & SK Connectors, Facebook Group Admins

**Remote roles:** Accelerator Alumni & Founders, App Builders & Indie Makers, Industry & Big Tech Speakers, UX & Design Specialists, Specialist Engineers, Remote Work Advocates, **Send Your Old Laptop**, **Send Your Old Android**

### Impact (`/impact`)

Full simulated data room (all data is placeholder — displayed with an amber disclaimer banner). Built with Recharts.

**Charts:**

- **Cohort enrollment** — `BarChart` with grouped bars (Enrolled vs Graduated per cohort). Custom `CustomTooltip` component.
- **Age distribution** — Horizontal `BarChart` with age range on Y axis, percentage on X.
- **Gender split** — `PieChart` with `Cell` fills and center label overlay.
- **Barangay reach** — Horizontal `BarChart` showing % of students per barangay.

**Brand tokens** defined at top of file: `GREEN`, `GREEN_LIGHT`, `MUTED_BG`, `INK`, `MUTED`

**Metrics strip:** 4 KPI cards (Kabataan Served, Apps Shipped, Volunteer Hours, Barangays Reached) each with a tiny 3-point sparkline `AreaChart`.

**Gallery:** Bento grid using local `gallery-*.png` images. CSS grid with `col-span-2 row-span-2` for gallery-1 (the large golden hour image).

**Impact dimensions:** 4 measurement framework cards explaining how metrics are defined.

### Contact (`/contact`)

Simple reach-out page. CTA to email or fill form.

### Donate (`/donate`)

Hidden from Nav and Footer nav links. Hardware shipping logistics TBD. Page exists but is not linked.

---

## Components

### `FadeUp.tsx`

Reusable wrapper. Uses GSAP `fromTo` (`opacity: 0, y: 32` → `opacity: 1, y: 0`) triggered by ScrollTrigger at `top 90%`. Accepts `delay` (number) and `className` props. Starts with `style={{ opacity: 0 }}` to prevent flash.

### `AnimatedPhaseList.tsx`

Client component. Takes `phases: { number, title, sub, desc }[]`. GSAP animates:

- Divider lines: `scaleX: 0 → 1` (origin-left)
- Phase numbers: `opacity: 0, x: -32 → 1, 0`
- Phase content: `opacity: 0, y: 20 → 1, 0` with 0.18s delay

### `AnimatedOutcomeList.tsx`

Client component. Takes `outcomes: { title, desc }[]`. Same divider animation as PhaseList. Numbers animate in from the right (`x: 32`). Content animates up.

### `Nav.tsx`

Sticky, `backdrop-blur-md`, border-bottom. Mobile hamburger with inline SVG (open/close states). Donate link is commented out pending hardware logistics. Links: About, Classes, Impact, Volunteer.

### `Footer.tsx`

Dark (`#1c1a16`). Top band: "Help Us Reach Every Barangay" CTA with Volunteer + Contact buttons (Donate band commented out). Footer grid: brand blurb left, Navigate + Connect columns right. Bottom bar: tagline + copyright.

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
- **Static content only** — no API routes, no database, no auth
- **No Donate link visible** — hidden from nav and footer until hardware shipping logistics are resolved
- **No real session data yet** — Impact page uses simulated projections; amber banner makes this clear
- **Classes are Coming Soon** — all register buttons disabled, dates TBD
- **Image style** — local photography aesthetic, not cinematic. Candid, natural light, Samsung/Pixel camera feel.

---

## Formatting

Prettier is configured. Run `npx prettier --write <file>` after edits. The PostToolUse hook runs Prettier automatically on file save in Claude Code.

---

## Deployment

Netlify. Build command: `npm run build`. The site is SSR (not static export), so publish directory is `.next`. No environment variables required — fully static content, no backend.
