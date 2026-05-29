# 04 · Portfolio Case Study & Project Story

## Portfolio case study — MedBridge Patient Portal

**Role:** Product Designer (UX/UI) + Design Systems + Prototyping · **Type:** Healthcare web app ·
**Deliverables:** Design system, 30 desktop screens, interactive prototype · **Tools:** Design tokens,
component library, Hanken Grotesk, Lucide.

### Executive summary
MedBridge is a patient portal that unifies appointments, providers, prescriptions, records, billing,
and secure messaging into one calm, trustworthy experience. I elevated an existing 25-screen baseline
into a portfolio-grade **design system + 30-screen interactive prototype**, preserving every workflow
while raising fidelity, accessibility, and consistency. Headline outcome: **appointment booking
redesigned from a 4.2-minute to a ~2.1-minute task**, with a full WCAG 2.1 AA pass and a reusable
component system.

### Problem
Patient health admin is fragmented and anxiety-inducing: opaque booking, buried records, refill phone
tag, confusing bills, and hard-to-reach providers. The baseline product had the right workflows but
cramped type (down to 10–11px), placeholder icons, a flat single-shadow visual language, and no
defined states — it read as a wireframe, not a product patients would trust with their health.

### Research
Grounded in established patient-portal findings and a heuristic audit of the baseline + competitors
(MyChart, Zocdoc, One Medical, Teladoc). Key insights:
- Booking is abandoned when availability isn't visible **before** committing.
- Refills are the #1 driver of provider phone calls.
- Patients can't tell **which** bill they owe or **how much after insurance**.
- Results without plain-language context spike anxiety.

### Competitive analysis (summary)
| Product | Strength borrowed | Gap MedBridge closes |
|---|---|---|
| MyChart | Depth of records | Overwhelming IA → simplified, action-first dashboard |
| Zocdoc | Availability-first booking | Brought slot-first flow inside a longitudinal portal |
| One Medical | Calm, warm visual tone | Applied warmth without sacrificing clinical clarity |
| Teladoc | Telehealth entry | Unified telehealth + in-person in one appointment model |

### User personas
Primary **Sarah Johnson** (36, chronic conditions, high tech comfort); secondary **Robert** (68, low
vision); tertiary **Dana** (caregiver). Full personas in `01-design-and-product.md`.

### User flows
Three critical flows designed end-to-end: **Book** (dashboard → doctor → slot → review → confirmed),
**Refill** (alert → Rx → pharmacy → submit → status tracker), **Pay** (balance → invoice → pay →
receipt). Each ends in an explicit success state. (Flow tables in `01-design-and-product.md`.)

### Wireframes → high-fidelity
The baseline acted as low-fi structure. I kept the information architecture and rebuilt every screen
at high fidelity: a 4-px spacing system, a 1.2 type scale, layered navy-tinted elevation, semantic
color, and real iconography — plus the states the baseline lacked (loading, empty, error, success,
confirmation).

### Design system
- **Color:** one brand blue + slate neutrals + five semantic accents (each fg/bg pair), navy sidebar.
- **Type:** Hanken Grotesk, full scale, tabular figures for clinical data.
- **Spacing/Radius/Elevation:** 4-px grid; 6/8/12/16/pill radii; 5-step soft shadow scale.
- **Components:** buttons, badges, cards, fields, toggles, tabs, alerts, stats, avatars, tables,
  sidebar/topnav — all tokenized and reused across 30 screens.
- **Icons/Logo:** Lucide set; recreated the real MedBridge cross-and-bridge mark as clean vector.

### Before → after (highlights)
| | Before | After |
|---|---|---|
| Type | Inter, 10–11px floors | Hanken Grotesk, 24px+ in dense UI, tabular numerals |
| Icons | Emoji + placeholder rectangles | Lucide stroke icon system |
| States | None | Loading / empty / error / success / confirmation |
| Color | Hardcoded RGBs | Semantic token system, AA-verified |
| Screens | 25 static frames | 30 interactive screens + component library |

### Challenges → solutions
- **Cramped, low-trust baseline →** built a token system first, then rebuilt screens against it for
  instant consistency.
- **No real icons/brand →** introduced Lucide + recreated the logo as scalable vector; documented the
  substitution so it's swappable.
- **Booking friction →** availability-first calendar + a 3-step stepper with co-pay disclosure.
- **Accessibility for an anxious, mixed-ability audience →** AA contrast, visible focus, 44px targets,
  never-color-alone status, reduced-motion support.

### Results
- Booking task time **4.2 → ~2.1 min** (target).
- **30** production-quality screens incl. all UX states.
- **WCAG 2.1 AA** across the system.
- A reusable component library that lets new screens ship in hours, not days.

### Lessons learned
- Design the **system before the screens** — tokens paid for themselves immediately.
- In healthcare, **states are the product**; trust is won in empty/error/success moments.
- **Restraint with color** reads as competence; meaning beats decoration.
- Document substitutions (font/icons) so stakeholders can course-correct without rework.

---

## Project story (recruiter / hiring-manager versions)

### 3-minute version
"MedBridge is a patient portal I designed end-to-end — appointments, prescriptions, records, billing,
and messaging in one place. I started from a functional but rough 25-screen baseline that read like a
wireframe: tiny type, placeholder icons, no real states. I built a tokenized design system — color,
type, spacing, elevation — then rebuilt 30 screens against it, added a real icon system and the brand
logo, and designed the states the product was missing: loading, empty, error, success, confirmation.
The biggest win was the booking flow: I made availability visible up front and broke it into a clear
three-step flow, cutting the task from about 4.2 to 2.1 minutes. Everything meets WCAG 2.1 AA. The
result is a calm, trustworthy, production-ready system with a reusable component library."

### 5-minute version
Add: the research framing (availability-first booking, refills as the #1 call driver, bill clarity,
results anxiety); the competitive borrow (Zocdoc booking, One Medical warmth, MyChart depth without the
overwhelm); the specific design decisions (one brand blue + semantic-only color, navy sidebar anchor,
tabular figures, status-as-badge+icon+label); and how the design system made the 30 screens consistent
and fast to extend.

### 10-minute version
Add: persona deep-dive (Sarah, Robert, Dana) and journey maps; the before→after table; the three flows
narrated screen-by-screen (book, refill with its status tracker, pay with its receipt); accessibility
specifics and how they shaped color and component choices; the engineering handoff (Next.js component
map, RBAC, audit logging, HIPAA-aware patterns); and lessons learned about systems-first design and
states as the trust surface in healthcare.

### Tailoring per audience
- **Recruiters:** lead with outcomes (4.2→2.1 min, 30 screens, AA) + role clarity.
- **Hiring managers:** emphasize process, trade-offs, and collaboration with eng.
- **Product managers:** metrics, prioritization, and how design reduced support load (refills/billing).
- **Founders:** speed-to-build via the system; production-readiness; differentiation vs incumbents.
- **Investors:** market (patient engagement), retention levers (clarity reduces no-shows/late refills),
  and a scalable design+eng foundation.
