# MedBridge — Patient Portal Redesign

MedBridge is a healthcare patient portal redesign — a place where patients manage appointments, prescriptions, medical records, billing, and secure messaging in one interface. The focus was on making something that actually feels calm and trustworthy rather than clinical and overwhelming, which is where most patient portals fall short.

I used MyChart, Zocdoc, One Medical, and Teladoc as competitive references during research. The goal wasn't to copy any of them but to understand what the best products in this space get right, then apply that to a coherent design system built from scratch.

---

<img width="1440" height="900" alt="Sign in" src="screenshots/hero-signin.png" />

<img width="1440" height="900" alt="Dashboard" src="screenshots/hero-dashboard.png" />

<img width="1440" height="900" alt="Appointments" src="screenshots/hero-appointments.png" />

<img width="1440" height="900" alt="Find a Doctor" src="screenshots/hero-doctors.png" />

<img width="1440" height="900" alt="Billing" src="screenshots/hero-billing.png" />

<img width="1440" height="900" alt="Prescriptions" src="screenshots/hero-prescriptions.png" />

---

## What's in this repo

**`ui_kits/portal/`** — The full interactive prototype as React components (sidebar, top nav, cards, buttons, full screen layouts). Open `ui_kits/portal/index.html` in a browser to click through all 25+ screens: dashboard, appointments, prescriptions, records, billing, messages, and settings.

**`colors_and_type.css`** — All design tokens. Colors, typography scale, spacing, elevation, motion timing, and border radii defined as CSS custom properties. This is the single source of truth for the visual system.

**`components.css`** — Reusable component classes built on top of the tokens. Buttons, cards, badges, inputs, navigation — everything references the same variables so changes cascade consistently.

**`docs/`** — Case study and engineering handoff documentation covering research, design decisions, component specs, and accessibility notes.

**`preview/`** — Design system preview cards showing colors, type scale, spacing, and components at a glance.

**`screenshots/`** — Hero screenshots used in this README, exported from the current prototype.

**`assets/`** — Logo files (light and dark) and brand mark.

---

## Design decisions worth noting

The sidebar is a deep navy (`#0F1B2D`) against a near-white page background (`#F8FAFC`). That contrast is intentional — it anchors the layout and keeps the content area feeling open rather than cramped.

Typography is Hanken Grotesk. It reads friendlier than Inter at smaller sizes while still being clean enough for a medical context where clarity matters a lot.

All clinical values — blood pressure, vitals, lab results — use tabular figures so numbers stay optically aligned in lists and tables. Small thing, but it matters in a health context.

Accessibility was treated as a constraint, not an afterthought. All text passes WCAG 2.1 AA contrast ratios, interactive elements have 44px minimum touch targets, and focus states are visible by default — not hidden or styled away.

---

## Run the prototype

Just open `ui_kits/portal/index.html` in any modern browser. No build step, no dependencies.

---

## Author

Naveen Sereddy — [github.com/Naveen-Sereddy](https://github.com/Naveen-Sereddy)
