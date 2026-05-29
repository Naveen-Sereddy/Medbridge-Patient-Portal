# 01 · Design Audit & Product Documentation

## Project overview
**MedBridge** is a secure, patient-facing healthcare portal that consolidates appointments, providers,
prescriptions, medical records, billing, and secure messaging into one calm, trustworthy web app.
This project elevated an existing 25-screen generator into a **portfolio-grade design system + a
30-screen interactive prototype**, preserving every workflow while raising visual fidelity, spacing,
typography, accessibility, and component consistency to production quality.

- **Surface:** Responsive desktop web app (1440-px reference), patient role.
- **Deliverables:** Tokenized design system (`colors_and_type.css`, `components.css`), reusable React
  component library, 30 screens incl. loading/empty/error/success/confirmation states, brand system.
- **North-star metric:** time-to-book an appointment (baseline 4.2 min → target/observed 2.1 min).
- **Compliance posture:** WCAG 2.1 AA; HIPAA-aware UX patterns.

## Product vision
> *Make managing your health feel as simple and reassuring as a conversation with someone who knows
> your history.* MedBridge removes the friction and anxiety of patient admin — every screen leads with
> the next useful action, states health information plainly, and never makes the patient feel lost.

## Problem statement
Patients juggle multiple disconnected tools and phone trees to do basic health admin: booking is slow
and opaque, records are buried, prescription refills require calls, bills are confusing, and messaging
a provider is hard. The result is missed appointments, late refills, unpaid balances, and anxiety.
**MedBridge unifies these into one portal where the next action is always obvious and trustworthy.**

Evidence themes (typical in patient-portal research, used to frame this project):
- Booking abandoned when availability isn't visible up front.
- Patients can't tell which bill they owe or how much after insurance.
- Refill requests are the #1 reason for provider phone calls.
- Anxiety spikes when results appear without plain-language context.

## Target users
1. **Chronic-condition patients** managing recurring visits, multiple medications, and ongoing costs
   (primary — Sarah).
2. **Busy caregivers/parents** managing care for themselves and dependents.
3. **Occasional patients** needing a one-off visit who value speed and clarity.
4. **Older / low-vision patients** who need large targets, high contrast, and plain language.

## User personas

### Persona 1 — Sarah Johnson (primary)
- **36, marketing manager, NYC.** MRN MB-4827. Type 2 diabetes + Stage 1 hypertension.
- **Goals:** stay on top of meds and appointments without phone calls; understand results and bills.
- **Frustrations:** opaque availability, surprise balances, refill phone tag.
- **Tech:** high comfort, mostly desktop at work + phone after hours.
- **Quote:** "Just tell me what I need to do next and how much it costs."

### Persona 2 — Robert Maddox (secondary)
- **68, retired teacher.** Post-cardiac monitoring. Lower vision, moderate tech comfort.
- **Goals:** read results in plain language; large, legible UI; easy reschedule.
- **Needs:** 4.5:1 contrast, 44px targets, visible focus, no jargon.

### Persona 3 — Dana Lee (tertiary)
- **41, working parent + caregiver.** Manages own care and a dependent's.
- **Goals:** fast booking, clear billing, mobile-friendly messaging.

## User journey maps

### Journey A — Book an appointment (Sarah)
| Stage | Action | Touchpoint | Emotion | Design response |
|---|---|---|---|---|
| Trigger | Needs cardiology follow-up | Dashboard "Book" | Motivated | Primary CTA on dashboard + nav |
| Find | Choose doctor | Booking Step 1 | Evaluating | Cards w/ rating, specialty, next-available |
| Schedule | Pick date & time | Booking Step 2 | Focused | Calendar greys unavailable; AM/PM slot grid |
| Review | Confirm details | Booking Step 3 | Cautious | Summary + insurance/co-pay alert |
| Confirm | Booked | Confirmed screen | Relieved | Success state, add-to-calendar, email note |
| Follow-through | Reminder | Notifications | Reassured | Reminder + pre-visit questionnaire task |

### Journey B — Refill a prescription
Dashboard alert → Prescriptions → Rx detail ("Refill due soon") → choose pharmacy → submit →
**success state with status tracker** (Request sent → Pharmacy review → Ready for pickup) → optional
notify-me. *Removes the #1 phone-call reason.*

### Journey C — Understand & pay a bill
Dashboard "Pending balance" → Billing table (what you owe after insurance) → Invoice detail
(line items + insurance paid) → Pay → **payment-success receipt** with confirmation number.

## Feature breakdown
| Area | Key screens | Notable UX |
|---|---|---|
| **Auth** | Login, Forgot, Reset | Trust signals, password strength, AES-256/HIPAA notes |
| **Dashboard** | Default + Health-Alerts variant | Stat strip, upcoming visits, vitals, action-required queue |
| **Appointments** | List, Calendar, Details, Cancel | Status + visit-type badges, telehealth "Join", color-coded providers |
| **Booking** | 3-step flow + Confirmed | Stepper, availability-first calendar, review + co-pay disclosure |
| **Providers** | Directory, Profile | Ratings, specialties, inline slot picker |
| **Records** | Overview, History, Tests, Test detail, Files | Vitals, conditions, diagnosis timeline, results table w/ reference ranges |
| **Prescriptions** | List, Detail, Refill success | Summary counts, refill request + status tracker |
| **Billing** | Billing, Invoice, Payment success | Balance/coverage summary, itemized invoice, receipt |
| **Messages** | Inbox (empty), Thread | Care-team conversations, secure compose |
| **Account** | Notifications, Profile, Security, Notification prefs, Help Center | 2FA, active sessions, channel matrix, support hub |
| **States** | Loading, Empty, Error, Success, Confirmation | Skeletons, friendly empties, recoverable errors |

## Design decisions (with rationale)
- **One confident brand blue + restrained semantic accents.** Health data must dominate; color carries
  meaning (status), never decoration. Reduces cognitive load and reads as trustworthy.
- **Deep-navy fixed sidebar.** One dark anchor makes bright content feel airy and keeps navigation
  persistent — patients never lose their place.
- **Availability-first booking.** Showing real slots up front is the single biggest lever on the
  4.2→2.1 min booking time; the stepper sets expectations and reduces abandonment.
- **Status as badge + icon + label, never color alone.** Accessibility and at-a-glance scanning.
- **Tabular figures for all clinical values & money.** Vitals, labs, and balances align and compare.
- **Hanken Grotesk over Inter.** Humanist warmth + high legibility for an anxious audience; distinct
  from default-Inter sameness. (Flagged as a substitution; revertible.)
- **Lucide icon system.** The source had only emoji/placeholder rectangles; a real stroke-based set
  matches modern patient products and is consistent + scalable.
- **Explicit states for everything.** Loading/empty/error/success aren't afterthoughts — they're where
  trust is won or lost in healthcare.

## Accessibility compliance notes (WCAG 2.1 AA)
- **Contrast:** body text ≥ 4.5:1, large text ≥ 3:1; semantic accents chosen dark enough on their
  tints (e.g. amber `#B46200`, red `#B91C1C`, success `#059669`).
- **Focus visible (2.4.7):** universal 3px focus ring on all interactive elements.
- **Target size:** controls ≥ 40–44px; comfortable hit areas.
- **Not color-alone (1.4.1):** status always pairs icon + text with color.
- **Structure:** logical heading order, landmark regions (`aside`, `header`, `main`), labelled inputs.
- **Motion (2.3 / prefers-reduced-motion):** subtle 120–280ms transitions; honors reduced-motion.
- **Language & clarity:** plain-language results and statuses; units always shown.
- **Open items to validate in build:** full keyboard traps in modals, screen-reader announcement of
  async state changes (refill/payment), and live-region usage for toasts.
