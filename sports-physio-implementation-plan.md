# Sports-Physio.gr (Μιχάλης Σιούλης) — Physiotherapy Website: Full Implementation Plan

**Project:** Sports-Physio.gr — marketing + booking website for physiotherapist Μιχάλης Σιούλης (Michalis Sioulis), sports physiotherapy clinic (Greek market)
**Domain:** sports-physio.gr (already brand-perfect for SEO — the domain itself contains the primary keyword)
**Working assumptions:** Single-language (Greek) at launch with architecture ready for EN later; primary conversion goal = booked appointments; secondary = phone calls and Google review proof. The pro-athlete roster (Kambosos Jr, Zambidis, Linardatou, etc.) is used as elite social proof. Adjust anything below if these assumptions are wrong.

---

## 1. Goals, Audience, KPIs

**Primary goal:** Convert visitors into booked appointments in under 60 seconds ("Κράτηση σε λιγότερο από 1 λεπτό" is already a promise on the page — the UX must honor it).

**Audiences (in priority order):**
1. Everyday patients — back/neck/shoulder pain, post-injury, post-surgery rehab (highest volume).
2. Amateur & pro athletes — sports injury rehab, performance recovery (highest prestige, drives the athlete section).
3. EOPYY/insurance patients — need reassurance on coverage before booking.

**KPIs:**
- Booking conversion rate (target ≥ 3–5% of sessions)
- Click-to-call rate on mobile
- Scroll depth to Reviews/Athletes sections
- LCP < 2.5s, CLS < 0.1 on 4G mobile

---

## 2. Tech Stack & Architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) or Astro | Static-first, fast, SEO-friendly. Astro if the site stays mostly static; Next.js if a patient portal is ever planned. |
| Styling | Tailwind CSS + design tokens file | Matches the utility-first prototype workflow (Bolt), fast iteration. |
| CMS (optional, phase 2) | Sanity / Decap | Owner edits reviews, FAQ, athlete entries without a developer. |
| Booking | Embedded scheduler (e.g., a booking widget/iframe or custom form → email/CRM) | The "under 1 minute" promise requires no account creation, max 3 steps. |
| Hosting | Vercel / Netlify + custom domain | The bolt.host prototype URL is replaced with the real domain. |
| Analytics | GA4 + Meta Pixel (if running ads) + call-tracking on the phone number | Attribute bookings to sections. |
| Forms/anti-spam | Server-side validation + honeypot + rate limit | No CAPTCHAs that add friction. |

**Repo structure:**
```
/src
  /components   (Button, Card, RatingBadge, SectionHeader, Accordion, ...)
  /sections     (Hero, Services, Conditions, Process, About, Athletes, Reviews, FAQ, CTA, Footer)
  /content      (services.json, athletes.json, reviews.json, faq.json)
  /styles       (tokens.css)
/public/images  (optimized WebP/AVIF)
```

---

## 3. Design System (foundation for every section)

Derived from the existing prototype screenshot so the build stays consistent with what's approved.

**Colors:**
- `--blue-700: #1D4ED8` (primary CTA blue from the current buttons)
- `--blue-800: #1E40AF` (hover state)
- `--blue-600: #2563EB` (links/nav active)
- `--ink-900: #0F172A` (headings)
- `--ink-600: #475569` (body)
- `--surface: #FFFFFF`, `--surface-alt: #F8FAFC` (alternating section backgrounds)
- `--success: #16A34A` (checkmarks)

**Typography:**
- Display: a Greek-complete geometric sans (e.g., Manrope or Inter Tight) — bold 700/800 for H1/H2. Must fully support Greek glyphs including tonos; test «ά, ύ, ώ» rendering at heavy weights.
- Body: Inter or system sans, 400/500, 16–18px, line-height 1.6.
- Logo mark for Sports-Physio.gr stays as provided SVG — never rasterized text (confirm final logo asset with owner).

**Buttons (the ones from the screenshot):**
- Primary: solid `--blue-700`, white text, 12px radius, 16–20px vertical padding, optional leading icon (calendar), hover = `--blue-800` + subtle lift (2px translateY, shadow), focus = 2px visible outline offset.
- Secondary: white/ghost with blue border for lower-priority actions ("Δείτε υπηρεσίες").
- One primary CTA label used everywhere: **«Κλείστε Ραντεβού»** — never synonyms, so the action is learnable.

**Spacing & grid:** 12-col, max-width 1200–1280px, section padding 96px desktop / 56px mobile. 8px spacing scale.

**Components to build once, reuse everywhere:** `Button`, `SectionHeading` (eyebrow + H2 + subcopy), `CheckItem`, `RatingBadge` (Google 5★ card), `Card`, `Accordion`, `AthleteCard`, `ReviewCard`, `StickyMobileCTA`.

**Imagery rules:** Real treatment photos only (like the massage-gun hero), no generic stock smiles. Dark-overlay gradient (40–60%) whenever text sits on photos. All images WebP/AVIF, lazy-loaded except hero.

---

## 4. Page Map

Single long-form landing page with anchor navigation (matches current nav), plus separate lightweight pages:

1. `/` — main page (all sections below)
2. `/ypiresies/[slug]` — optional per-service pages (phase 2, SEO)
3. `/politiki-aporritou` — privacy policy (GDPR, required because of the booking form)
4. `404`

---

## 5. Section-by-Section Implementation Plans

Each section gets: **Purpose → Content → Layout → Components → Interactions → Acceptance criteria.**

### 5.1 Header / Navigation
- **Purpose:** Orientation + persistent conversion path.
- **Content:** Logo left; anchors: Υπηρεσίες, Φυσικοθεραπεία, Διαδικασία, Γνωρίστε με, Αξιολογήσεις, FAQ; primary CTA right.
- **Layout:** 72–80px tall, white, subtle bottom border on scroll. Mobile: logo + hamburger + compact CTA.
- **Components:** `Header`, `NavLink` (active state via scroll-spy), `Button`.
- **Interactions:** Sticky on scroll with shadow; smooth-scroll to anchors with `scroll-margin-top`; mobile drawer with focus trap; CTA opens booking.
- **Acceptance:** Nav never covers section headings on anchor jump; keyboard navigable; CTA visible at every viewport width.

### 5.2 Hero
- **Purpose:** State the value proposition and start bookings immediately. This is the thesis of the page.
- **Content (already approved):** H1 «Επιστημονικά Τεκμηριωμένη Φυσικοθεραπεία για Πόνους, Τραυματισμούς και Αποκατάσταση.», subcopy naming conditions, 4 trust checkmarks (10+ χρόνια, ΕΟΠΥΥ, ιδιωτικές ασφαλιστικές, κράτηση < 1 λεπτό), primary CTA, Google 5★ badge (70 reviews).
- **Layout:** Full-width photo background (treatment in action), left-aligned text block ~60% width, floating rating card right. Mobile: stacked, rating badge below CTA.
- **Components:** `Hero`, `CheckItem` ×4, `RatingBadge`, `Button`.
- **Interactions:** Rating badge links to the Google reviews profile (new tab). Optional single fade-up on load — no scattered animations. Respect `prefers-reduced-motion`.
- **Acceptance:** LCP element = hero image, preloaded, < 2.5s; text contrast ≥ 4.5:1 over overlay; H1 is the only `<h1>`; CTA above the fold on 375px-wide phones.

### 5.3 Trust Strip (optional, directly under hero)
- **Purpose:** Instant credibility before scrolling.
- **Content:** Logos/labels: ΕΟΠΥΥ, insurance acceptance, years of experience, "Επίσημος φυσικοθεραπευτής αθλητών" style claim if accurate.
- **Layout:** Slim gray band, 4–5 items, single row → 2×2 grid mobile.
- **Acceptance:** Loads with zero layout shift; purely informational (no links needed).

### 5.4 Υπηρεσίες (Services)
- **Purpose:** Let visitors self-identify their problem fast.
- **Content:** 6–8 service cards (e.g., Manual therapy, Sports rehab, Post-op rehab, Dry needling, Massage-gun/IASTM, Kinesiotaping, Home visits — confirm real list with owner). Each: icon, name, 1-line outcome-focused description.
- **Layout:** 3-col grid desktop / 1-col mobile, cards on `--surface-alt`.
- **Components:** `SectionHeading`, `Card` with icon slot.
- **Interactions:** Card hover lift; phase 2: cards link to `/ypiresies/[slug]`.
- **Acceptance:** Copy written from the patient's side ("Ανακούφιση από πόνο μέσης" not "Τεχνική McKenzie"); icons consistent stroke weight; grid keyboard-focusable if linked.

### 5.5 Φυσικοθεραπεία / Παθήσεις (Conditions treated)
- **Purpose:** SEO surface + reassurance "he treats my exact problem."
- **Content:** Grouped condition list — Μέση/Αυχένας, Ώμος, Ισχίο/Γόνατο, Αστράγαλος, Αθλητικοί τραυματισμοί, Μετεγχειρητική αποκατάσταση. Each group: 3–5 named conditions.
- **Layout:** Two-column checklist or tabbed groups; keep scannable, no walls of text.
- **Components:** `SectionHeading`, `CheckItem` lists or `Tabs`.
- **Interactions:** None required; tabs only if content exceeds ~24 items.
- **Acceptance:** Every condition name matches real Greek search phrasing (feeds SEO §7); mobile shows all content without horizontal scroll.

### 5.6 Διαδικασία (Process)
- **Purpose:** Remove fear of the unknown — what happens at the first visit.
- **Content:** A true sequence, so numbered steps are justified here: 1) Αξιολόγηση & ιστορικό → 2) Εντοπισμός αιτίας → 3) Πλάνο αποκατάστασης → 4) Θεραπεία & επανέλεγχος. Each step: title, 2 lines, small visual.
- **Layout:** Horizontal 4-step timeline desktop / vertical mobile, connecting line between steps.
- **Components:** `ProcessStep` with number token.
- **Interactions:** Optional scroll-triggered reveal of steps in order (single orchestrated moment), disabled under reduced-motion.
- **Acceptance:** Numbers encode real order; the section ends with an inline «Κλείστε Ραντεβού» button (mid-page conversion point).

### 5.7 Γνωρίστε με (About the physiotherapist)
- **Purpose:** The person is the product — build personal trust.
- **Content:** Professional portrait of Μιχάλης Σιούλης, name & credentials (πτυχίο, μετεκπαιδεύσεις, άδεια ασκήσεως), 10+ years, philosophy paragraph (evidence-based, cause-first), affiliations. His personal name is the brand's trust anchor — the athletes section (§5.8) reinforces *him*, not an abstract clinic.
- **Layout:** 2-col: photo left (4/12), story right (8/12). Mobile: photo then text.
- **Components:** `About`, credential badge list.
- **Interactions:** None — quiet, confident section.
- **Acceptance:** Real photo (not stock); credentials verifiable and legally accurate for Greek healthcare advertising rules; tone first-person.

### 5.8 Αθλητές (Elite Athletes section — uses the roster we compiled)
- **Purpose:** Signature social proof: "the physio pro fighters trust." This is the page's one bold, memorable element.
- **Content:** The athlete list already gathered, each entry exactly in the agreed format:
  - Name • Sport/discipline • Key accomplishment (short, punchy)
  - Roster: Kambosos Jr, Zambidis, Kiatipis, Michailidis, Linardatou, Pilidis, Tsamalidis, Triphylli ("The Gun"), Ivanov, Stoforidis, Tsochataridis, Arnaoutis (+ future additions).
- **Data:** `athletes.json` — `{ name, nickname, sport, accomplishment, photo, priority }` so adding athletes never touches layout code.
- **Layout:** Dark section (inverts the page rhythm — this is the aesthetic risk, spent here and nowhere else). Horizontal scroll-snap carousel of `AthleteCard`s desktop & mobile; each card: photo (b/w with blue duotone), name, sport tag, one-line accomplishment.
- **Components:** `AthleteCard`, `Carousel` (CSS scroll-snap, no heavy JS), `SectionHeading` («Αθλητές που εμπιστεύονται τον Μιχάλη Σιούλη» — verify claim wording with owner).
- **Interactions:** Drag/swipe scroll; arrow buttons desktop; cards non-clickable at launch (phase 2: modal with story/testimonial).
- **Legal/ethics gate (blocking):** Written permission from each athlete (or their team) to use name & image commercially **before launch**. Any athlete without consent is removed from `athletes.json` — the section must degrade gracefully to fewer cards.
- **Acceptance:** Consent documented per athlete; carousel usable by keyboard (cards focusable, arrows tabbable); images ≤ 80KB each; section still looks intentional with as few as 4 athletes.

### 5.9 Αξιολογήσεις (Reviews)
- **Purpose:** Volume proof (70 ⭐5) to complement the elite proof.
- **Content:** Google aggregate badge repeated + 6–9 curated real reviews (name, initial of surname, star row, 2–4 lines, condition treated if mentioned).
- **Data:** `reviews.json`; optional phase 2: live Google Reviews API sync.
- **Layout:** Masonry/3-col grid desktop, stacked mobile; aggregate badge as header anchor.
- **Components:** `ReviewCard`, `RatingBadge`.
- **Interactions:** "Δείτε όλες τις αξιολογήσεις" outbound link to Google profile.
- **Acceptance:** Reviews are verbatim real (GDPR: only first name + initial); schema.org `AggregateRating` markup only if compliant with Google's guidelines for self-serving reviews — otherwise omit markup, keep visual.

### 5.10 FAQ
- **Purpose:** Kill the last objections (cost, EOPYY, duration, what to wear, parking, first-visit process, cancellations).
- **Content:** 8–12 Q&As, one topic each, answers ≤ 4 lines, every answer ends with a path (link or CTA) where natural.
- **Layout:** Single-column accordion, max-width ~800px.
- **Components:** `Accordion` (native `<details>/<summary>` enhanced, or ARIA-correct custom).
- **Interactions:** One item open at a time optional; deep-linkable via `#faq-eopyy` style anchors.
- **Acceptance:** `FAQPage` schema markup; fully keyboard operable; no answer requires contacting the clinic to be understood.

### 5.11 Final CTA (Booking)
- **Purpose:** The conversion moment — must honor "under 1 minute."
- **Content:** Headline («Ξεκινήστε την αποκατάστασή σας σήμερα»), the 4 trust checkmarks repeated compactly, booking module, phone alternative with tel: link.
- **Booking flow (max 3 steps):** 1) Service + preferred day/time → 2) Name + phone (+email optional) → 3) Confirmation screen + SMS/email. No accounts, no passwords.
- **Layout:** Full-width blue-tinted band, centered; booking widget or 2-field form + button.
- **Components:** `BookingForm` or embedded scheduler, `Button`, `CheckItem`.
- **Interactions:** Inline validation with Greek error messages that say what to fix ("Το τηλέφωνο πρέπει να έχει 10 ψηφία"), success state confirms exactly what was booked; loading state on submit.
- **Acceptance:** Median completion < 60s in testing; works without JS falling back to tel: link; GDPR consent checkbox with link to privacy policy; server-side validation + spam protection; confirmation email/SMS fires.

### 5.12 Footer
- **Content:** Logo, NAP (name-address-phone — identical to Google Business Profile), hours, Google Maps embed or static map link, nav anchors, social links, privacy policy, ΑΦΜ/legal line.
- **Layout:** 3–4 col dark or light footer, single col mobile.
- **Acceptance:** `LocalBusiness`/`Physiotherapy` schema with NAP; phone is tap-to-call; map link opens directions.

### 5.13 Sticky Mobile CTA (cross-cutting)
- Persistent bottom bar on mobile only: «Κλείστε Ραντεβού» + call icon. Hidden when the booking section is in view. This is typically the single highest-converting element on local-service sites.
- **Acceptance:** Never overlaps form inputs (respects keyboard/viewport-safe areas); dismissible not required.

---

## 6. Responsive Plan
- Breakpoints: 375 (design floor), 768, 1024, 1280.
- Hero text scales via `clamp()`; carousel and process flip to vertical/stacked at <768.
- Test matrix: iPhone SE/15, Pixel, iPad, 1366 laptop, 1920 desktop; Safari + Chrome minimum.

## 7. SEO Plan (Greek local)
- One H1; semantic H2 per section matching nav labels.
- Title: «Φυσικοθεραπεία [Περιοχή] | Sports-Physio.gr — Μιχάλης Σιούλης | Αθλητικοί Τραυματισμοί & Αποκατάσταση»; meta description with EOPYY + reviews hook.
- `LocalBusiness` + `FAQPage` schema; OG image (hero-based) for shares.
- Condition/service wording mirrors real search queries (from §5.5); phase 2 service pages target one query each.
- Google Business Profile linked both ways; consistent NAP.
- Greek slugs transliterated (`/ypiresies`), `lang="el"`, hreflang ready for future EN.

## 8. Performance Plan
- Budget: ≤ 150KB JS, ≤ 1 hero image preloaded (AVIF + WebP fallback), fonts subset to Greek+Latin with `font-display: swap`.
- Static generation for everything; booking widget lazy-loaded on interaction/scroll.
- Lighthouse ≥ 90 all categories before launch — a hard gate, not a wish.

## 9. Accessibility Plan
- WCAG 2.1 AA: contrast checked on every photo-overlay text block; visible focus states on all interactive elements; carousel and accordion keyboard-operable; form errors announced (`aria-live`); reduced-motion honored globally; touch targets ≥ 44px.

## 10. Legal & Compliance
- GDPR: privacy policy, cookie consent only if analytics/pixels require it, form consent checkbox, data retention statement.
- Greek healthcare advertising rules: claims must be factual and verifiable (years, credentials, "συμβεβλημένος με ΕΟΠΥΥ").
- Athlete image rights: signed consent per athlete (blocking dependency for §5.8).

## 11. Build Phases & Timeline

| Phase | Scope | Duration |
|---|---|---|
| 0. Content lock | Final copy, real photos, athlete consents, service list confirmed | 1 week (parallel) |
| 1. Foundation | Tokens, components, header/footer, hero | 3–4 days |
| 2. Core sections | Services, Conditions, Process, About | 3–4 days |
| 3. Proof sections | Athletes carousel, Reviews, FAQ | 3 days |
| 4. Conversion | Booking flow + sticky CTA + emails/SMS | 3–4 days |
| 5. Hardening | SEO/schema, performance pass, a11y audit, cross-device QA | 3 days |
| 6. Launch | Domain, analytics, GBP link, redirects from prototype URL | 1 day |

**Definition of done (whole project):** All section acceptance criteria pass • Lighthouse ≥ 90×4 • booking tested end-to-end on a real phone • athlete consents on file • owner can edit reviews/FAQ/athletes via JSON or CMS without a developer.
