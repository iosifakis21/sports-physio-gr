---
trigger: always_on
---

# Project Rules — Sports-Physio.gr (Μιχάλης Σιούλης)

You are building a Greek-language physiotherapy marketing + booking website.
The single source of truth is `sports-physio-implementation-plan.md` in the project root.
Never improvise architecture, copy, colors, or components that contradict it.
If a requirement is ambiguous, stop and ask — do not invent.

## Stack
- Framework: Next.js (App Router) with static generation. No server runtime unless the booking form requires an API route.
- Styling: Tailwind CSS only. All colors/spacing come from CSS variables in `src/styles/tokens.css`. Never hardcode hex values in components.
- Language: TypeScript everywhere. Validation with Zod.
- Content lives in `/src/content/*.json` (services, athletes, reviews, faq). Components must render from JSON — never inline this data in JSX.
- No CSS-in-JS, no styled-components, no Bootstrap, no jQuery.

## Design tokens (do not deviate)
- --blue-700: #1D4ED8 (primary CTA), --blue-800: #1E40AF (hover), --blue-600: #2563EB (links/active nav)
- --ink-900: #0F172A (headings), --ink-600: #475569 (body)
- --surface: #FFFFFF, --surface-alt: #F8FAFC, --success: #16A34A
- Border radius on buttons/cards: 12px. Section padding: 96px desktop / 56px mobile. Max content width: 1280px.
- Fonts: display = Manrope (700/800), body = Inter (400/500). Subset Greek + Latin, font-display: swap. Verify Greek tonos glyphs (ά, ύ, ώ) render at heavy weights.

## Copy & language
- All user-facing text is Greek. `<html lang="el">`.
- The primary CTA label is exactly «Κλείστε Ραντεβού» everywhere. Never use synonyms (Ραντεβού τώρα, Επικοινωνία, Book now, etc.).
- Write copy from the patient's perspective, outcome-first («Ανακούφιση από πόνο μέσης»), not technique-first.
- Error messages state what to fix, in Greek, no apologies («Το τηλέφωνο πρέπει να έχει 10 ψηφία»).
- Sentence case, plain verbs, no filler.

## Components
- Reuse, never duplicate: Button, SectionHeading, CheckItem, RatingBadge, Card, Accordion, AthleteCard, ReviewCard, ProcessStep, StickyMobileCTA.
- Exactly one <h1> on the page (hero). Every section heading is an <h2> matching the nav labels.
- Buttons: primary = solid --blue-700, white text, 12px radius; hover = --blue-800 + 2px lift; visible focus outline (2px, offset). Secondary = white with blue border.

## Images
- WebP/AVIF only, lazy-loaded except the hero (which is preloaded and is the LCP element).
- Any text over a photo requires a dark overlay gradient (40–60%) and contrast ≥ 4.5:1.
- Athlete photos ≤ 80KB, blue duotone treatment, dimensions declared to prevent CLS.

## Accessibility (WCAG 2.1 AA — non-negotiable)
- Keyboard operable everywhere: nav drawer (focus trap), carousel (focusable cards + tabbable arrows), accordion (native <details>/<summary> or correct ARIA).
- Respect prefers-reduced-motion: all animations disabled under it.
- Touch targets ≥ 44px. Form errors announced via aria-live.
- Anchor targets use scroll-margin-top so the sticky header never covers headings.

## Performance budget (hard gates)
- Lighthouse ≥ 90 in all four categories.
- JS bundle ≤ 150KB. One preloaded hero image. Booking widget lazy-loads on interaction.
- Zero layout shift from images, fonts, or the sticky mobile CTA.

## Privacy & legal
- No patient data in localStorage/sessionStorage. Booking form data goes server-side only.
- Booking form includes GDPR consent checkbox linking to /politiki-aporritou.
- Never add an athlete to the UI who is not present in athletes.json; the carousel must look intentional with as few as 4 entries.
- Claims about credentials/EOPYY must match the plan verbatim — do not embellish.

## Workflow
- Work on ONE section (§5.x of the plan) per task. Do not touch other sections' files.
- After implementing a section, verify every acceptance criterion listed for it in the plan and report pass/fail for each before finishing.
- Verify in the browser at 375px, 768px, and 1280px widths.
- Never delete or rewrite tokens.css, content JSON schemas, or this rules file without explicit instruction.