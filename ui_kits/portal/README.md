# MedBridge — Patient Portal UI Kit

A high-fidelity, interactive recreation of the **MedBridge patient portal** — the elevated,
portfolio-grade redesign of the original `code.js` generator. Built with React + the shared design
tokens (`/colors_and_type.css`, `/components.css`) and Lucide icons.

## Run it
Open `index.html`. It boots at the **Login** screen. Navigate using the app's own sidebar and
in-screen actions, or use the floating **▦ screen-directory launcher** (bottom-right) to jump to any
of the 30 screens — including the states that aren't on a normal navigation path (loading, empty,
error, success).

## Screens (30)
**Auth** — Login · Forgot Password · Reset Password
**Dashboard** — Dashboard · Health-Alerts variant · Loading (skeleton) · Error state
**Appointments** — List · Calendar · Details · Cancel confirmation · Empty state
**Booking** — Step 1 Doctor · Step 2 Date & Time · Step 3 Review · Confirmed (success)
**Providers** — Find a Doctor (directory) · Provider Profile
**Records** — Overview · Medical History · Test Results · Test Detail · Uploaded Files
**Prescriptions** — List · Detail · Refill requested (success)
**Billing** — Billing · Invoice Detail · Payment success
**Messages** — Inbox (empty thread) · Conversation thread
**Account** — Notifications · Settings (Profile · Security · Notifications) · Help Center

## Architecture
| File | Contents |
|---|---|
| `lib.jsx` | `Icon` (Lucide wrapper) + all realistic data (providers, appointments, vitals, prescriptions, invoices, messages, notifications, nav) |
| `ui.jsx` | Primitives: `Button` `Badge` `Avatar` `ProviderAvatar` `Field` `Input` `Toggle` `Card` `Tabs` `PillTabs` `Alert` `Stat` `EmptyState` `Stepper` `SectionHead` `Skel` |
| `shell.jsx` | `Sidebar` `TopNav` `PageShell` `Breadcrumb` |
| `screens1.jsx` | Auth, Dashboard (+ variant), loading / empty / error states |
| `screens2.jsx` | Appointments, Calendar, Providers, Booking flow, Details, Cancel |
| `screens3.jsx` | Records, History, Test Results/Detail, Files, Prescriptions, Rx Detail/Refill |
| `screens4.jsx` | Billing, Invoice, Payment, Messages inbox + thread |
| `screens5.jsx` | Notifications, Settings (Profile/Security/Notifications), Help Center |
| `app.jsx` | Router (`#hash` routing), screen registry, screen-directory launcher |

Components export to `window` so each Babel `<script>` shares scope. To reuse a component in a new
design, copy the relevant `.jsx` + the two root CSS files, or lift the class names straight from
`components.css`.

## Fidelity notes
- **Source of truth:** the original `MedBridge-Figma-Plugin/code.js`. Workflows, IA, copy, persona
  (Beth Mooney, MRN MB-4827) and the realistic content are preserved; visuals are elevated.
- **Icons:** Lucide (CDN) replaces the source's emoji/rectangle placeholders.
- **Font:** Hanken Grotesk (Google Fonts) — elevated substitute for Inter.
- These are cosmetic recreations for prototyping — not production-wired (no real auth/network).
