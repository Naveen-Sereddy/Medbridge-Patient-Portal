**MedBridge — Patient Portal Redesign**

MedBridge is a healthcare patient portal redesign — a place where patients manage appointments, prescriptions, medical records, billing, and secure messaging in one interface. The focus was on making something that actually feels calm and trustworthy rather than clinical and overwhelming, which is where most patient portals fall short.
I used MyChart, Zocdoc, One Medical, and Teladoc as competitive references during research. The goal wasn't to copy any of them but to understand what the best products in this space get right, then apply that to a coherent design system built from scratch.


<img width="1440" height="777" alt="Screenshot 2026-05-29 at 6 10 34 PM" src="https://github.com/user-attachments/assets/38c3bed3-3816-462b-b019-9440f9134658" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 10 49 PM" src="https://github.com/user-attachments/assets/eb88b199-9fc8-4a01-89b9-5a7f35b6497f" />

<img width="1440" height="777" alt="Screenshot 2026-05-29 at 6 11 08 PM" src="https://github.com/user-attachments/assets/9037f4cc-af31-4d09-a150-87daa0e8f149" />

<img width="1293" height="698" alt="Screenshot 2026-05-29 at 6 11 28 PM" src="https://github.com/user-attachments/assets/06194219-86a4-4719-9d1d-d72dad0a0089" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 11 49 PM" src="https://github.com/user-attachments/assets/9b695eac-392d-4f0e-aaec-62c5ea44762d" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 12 03 PM" src="https://github.com/user-attachments/assets/50a1457e-af07-4187-8818-150a4036c2a3" />



**What's in this repo**

MedBridge Patient Portal.html — The full interactive prototype. Open this in a browser and you can click through all 25+ screens: dashboard, appointments, prescriptions, records, billing, messages, and settings.
colors_and_type.css — All design tokens. Colors, typography scale, spacing, elevation, motion timing, and border radii defined as CSS custom properties. This is the single source of truth for the visual system.
components.css — Reusable component classes built on top of the tokens. Buttons, cards, badges, inputs, navigation — everything references the same variables so changes cascade consistently.
ui_kits/portal/ — React components for the portal. Sidebar, top nav, cards, buttons, and the full screen layouts as JSX.
docs/ — Case study and engineering handoff documentation covering research, design decisions, component specs, and accessibility notes.
preview/ — Design system preview cards showing colors, type scale, spacing, and components at a glance.
screenshots/ — High-fidelity screen exports from the prototype.
assets/ — Logo files (light and dark) and brand mark.

Design decisions worth noting
The sidebar is a deep navy (#0F1B2D) against a near-white page background (#F8FAFC). That contrast is intentional — it anchors the layout and keeps the content area feeling open rather than cramped.
Typography is Hanken Grotesk. It reads friendlier than Inter at smaller sizes while still being clean enough for a medical context where clarity matters a lot.
All clinical values — blood pressure, vitals, lab results — use tabular figures so numbers stay optically aligned in lists and tables. Small thing, but it matters in a health context.
Accessibility was treated as a constraint, not an afterthought. All text passes WCAG 2.1 AA contrast ratios, interactive elements have 44px minimum touch targets, and focus states are visible by default — not hidden or styled away.

Run the prototype
Just open MedBridge Patient Portal.html in any modern browser. No build step, no dependencies.

Author
Naveen Madhav — github.com/Naveen-Madhav
