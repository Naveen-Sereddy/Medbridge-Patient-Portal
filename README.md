# MedBridge — Design System

**MedBridge** is a patient-facing healthcare portal: a secure web app where patients manage
appointments, providers, prescriptions, medical records, billing, secure messaging, and account
settings in one place. The product persona is **Sarah Johnson** (patient #MB-4827), and the design
goal is a calm, trustworthy, high-clarity experience modeled on the best patient products —
**MyChart, Zocdoc, One Medical, and Teladoc**.

<img width="1440" height="777" alt="Screenshot 2026-05-29 at 6 10 34 PM" src="https://github.com/user-attachments/assets/38c3bed3-3816-462b-b019-9440f9134658" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 10 49 PM" src="https://github.com/user-attachments/assets/eb88b199-9fc8-4a01-89b9-5a7f35b6497f" />

<img width="1440" height="777" alt="Screenshot 2026-05-29 at 6 11 08 PM" src="https://github.com/user-attachments/assets/9037f4cc-af31-4d09-a150-87daa0e8f149" />

<img width="1293" height="698" alt="Screenshot 2026-05-29 at 6 11 28 PM" src="https://github.com/user-attachments/assets/06194219-86a4-4719-9d1d-d72dad0a0089" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 11 49 PM" src="https://github.com/user-attachments/assets/9b695eac-392d-4f0e-aaec-62c5ea44762d" />

<img width="1440" height="776" alt="Screenshot 2026-05-29 at 6 12 03 PM" src="https://github.com/user-attachments/assets/50a1457e-af07-4187-8818-150a4036c2a3" />

This repository is the *elevated, portfolio-grade* redesign of the original MedBridge generator. It
preserves every workflow and the full information architecture of the source, then raises the visual
fidelity, spacing, typography, accessibility, and component consistency to production quality.

---

## Sources (provenance)

| Source | What it is | Access |
|---|---|---|
| **MedBridge Figma Plugin** (`code.js`) | The **primary source of truth**. A Figma plugin that programmatically generates all 25 MedBridge screens. Contains exact colors, fonts, spacing, component specs, copy, and screen layouts. | Mounted codebase: `MedBridge-Figma-Plugin/code.js` |
| **MedBridge.fig** | A Figma reconstruction of the plugin's output (15 frames under page `MedBridge-All-Screens`). Pseudocode JSX. Mirrors `code.js`. | Mounted `.fig` virtual filesystem |
| **Medlink — Hospital Clinic Management Admin Dashboard** | A purchased UI-kit PDF, intended as a **visual-quality reference only** (not source of truth). | ⚠️ *Was referenced at `uploads/…(Preview).pdf` but the file is missing from the project.* See Caveats. |

The original brand uses **Inter** (Regular/Medium/Semi&nbsp;Bold/Bold) and a Tailwind-Slate neutral
ramp with a single brand blue `#1D6FDB` plus five semantic accents.

---

## What's in this folder (index)

```
README.md              ← you are here
colors_and_type.css    ← design tokens: color, type, spacing, radius, elevation, motion
components.css         ← reusable component classes built on the tokens
assets/                ← logo mark + wordmark (light & dark SVG); fonts load from Google Fonts
preview/               ← Design-System tab cards (colors, type, spacing, components)
ui_kits/
  portal/              ← THE product: patient portal UI kit
    README.md          ← kit overview + component list
    index.html         ← interactive click-through of all 25+ screens
    *.jsx              ← reusable React components (Sidebar, TopNav, Button, Card, …)
```

> **Start here:** open `ui_kits/portal/index.html` for the full interactive portal.
> The Design-System tab shows every foundation and component card.

---

## CONTENT FUNDAMENTALS

How MedBridge writes. Voice = a calm, competent care coordinator: warm but never cute, precise but
never clinical-cold.

- **Person & address.** Second person to the patient ("Your next appointment is in 3 days"). The
  product speaks *to* Sarah, about *her* health. First-person plural only for the institution
  ("We'll send a reset link"). Provider voice in messages is first-person ("See you in 6 months").
- **Tone.** Reassuring and factual. Greets by name ("Good morning, Sarah"). States status plainly
  ("BP controlled. Continue Lisinopril."). Never alarmist — even urgent items use measured language
  ("2 items need your attention", not "WARNING").
- **Casing.** Sentence case for body and buttons that read as sentences? No — **Title Case for
  buttons and primary actions** ("Book Appointment", "Request Refill", "Pay $69.00 Now"). Sentence
  case for descriptions and helper text. **UPPERCASE eyebrows** for section/nav group labels
  ("MAIN MENU", "ACCOUNT") and tiny stat labels — letter-spaced, 11px, muted.
- **Numbers & units.** Always show units with clinical values: `118/76 mmHg`, `72 bpm`,
  `98 mg/dL`, `22.4 kg/m²`, `6.8%`. Money is explicit and rounded to cents (`$248.50`, `$69.00`).
  Dates spelled with weekday for appointments ("Tuesday, June 3, 2026"), abbreviated in dense lists
  ("Tue, Jun 3"). Relative time for activity ("2h ago", "1d ago", "1w ago").
- **Microcopy patterns.** Trust signals are stated, not shouted: "HIPAA Compliant",
  "Encrypted with AES-256", "WCAG 2.1 AA · All contrasts ≥ 4.5:1 verified", "All values normal".
  Helpful nudges in info boxes ("Check your spam folder — reset emails sometimes land there").
- **Status vocabulary (fixed set).** `Confirmed` · `Pending` · `Cancelled` (appointments);
  `Active` · `Refill Due` · `Expiring Soon` (prescriptions); `Paid` · `Unpaid` (billing);
  `Reviewed` (results); `Managed` (conditions); `Urgent` · `Soon` · `New` (alerts).
- **Emoji.** The *original* generator used a few emoji as inline accents (👋 in the greeting,
  📍 location, ⭐ rating, 🔒 trust, ⚠ warning, ✓ success). In this elevated system **emoji are
  replaced by Lucide icons** everywhere except the single optional greeting wave, which is allowed
  as a warm human touch. Prefer icons. See ICONOGRAPHY.
- **Examples.** "Your next appointment is in 3 days · Last login: today 8:42 AM" ·
  "18 days remaining — order now to avoid running out." · "Your ECG and lab results look great." ·
  "Insurance Paid −$276.00".

---

## VISUAL FOUNDATIONS

The aesthetic: **clinical-clean, calm, and trustworthy** — lots of white space, a confident single
blue, soft neutral slate, restrained semantic color used only to carry meaning. Nothing decorative
competes with health information.

- **Color.** One brand blue (`#1D6FDB`) does the heavy lifting (primary buttons, links, active nav,
  selected states). Neutrals are the Tailwind Slate ramp — cool, professional. Five semantic accents
  (`teal`, `green/success`, `amber/warning`, `red/danger`, `purple/info`) appear *only* as meaning:
  each pairs a saturated foreground with a 50-level tinted background (e.g. green `#059669` on
  `#ECFDF5`). The page is never pure white — it sits on `#F8FAFC`; cards are white and float above it.
- **Sidebar.** A deep navy (`#0F1B2D`) rail, 264px, fixed. This is the one dark surface — it anchors
  the app and makes the bright content feel airy. Active item = translucent brand fill + a 3px brand
  bar on the left edge + white label; inactive = muted slate label with a low-opacity icon.
- **Typography.** Humanist sans (**Hanken Grotesk**, elevated from the source's Inter). Tight,
  bold display for auth heroes and page titles; semibold for section and card titles; regular for
  body. Tabular figures for all clinical numbers, money, and tables. Eyebrow labels are 11px,
  uppercase, letter-spaced, muted slate. Generous line-height (1.5) on body for readability.
- **Spacing & layout.** 4px base grid; sections breathe on 24–32px gutters. Fixed shell: 264px
  sidebar + 68px top nav, content on `#F8FAFC` with 32px padding. Multi-column dashboards use a
  ~60/40 split; stat strips are equal 4-up grids. Generous, never cramped.
- **Cards.** White, `12px` radius, `1px` `#E2E8F0` border **and** a soft layered shadow
  (`--shadow-md`) — border for definition on light bg, shadow for lift. Many cards carry a 4px
  semantic accent strip on the left or top to color-code their domain. Inner padding 20–32px.
- **Backgrounds.** No photography in the app chrome. Auth screens use a full-bleed brand-blue (or
  teal) panel on the left with large faint white circles (5% opacity) as a calm abstract motif, plus
  translucent trust pills along the bottom. No gradients in the product UI — flat, confident fills.
  (A single optional subtle radial is acceptable on the auth hero.)
- **Borders & dividers.** Hairline `1px` `#E2E8F0` for borders, `#F1F5F9` for in-card row dividers.
  Strong border `#CBD5E1` for emphasis. Inputs: `1px #E2E8F0`, `8px` radius, focus → brand ring.
- **Shadows.** Layered and soft (two-stop), tinted with the navy (`rgba(15,27,45,…)`) not pure
  black, so elevation reads warm and physical. Five-step scale from `xs` (hairline) to `xl` (modals).
- **Radii.** 6px chips/inputs-sm, 8px buttons & fields, 12px cards, 16px modals/hero, pill for
  badges & toggles. Avatars are circular.
- **Buttons.** Primary = solid brand, white text, 8px radius, 40–44px tall. Secondary = solid teal.
  Outline = white w/ brand border + brand text. Ghost = subtle `#F1F5F9` fill. Danger = solid red.
  Outline-gray = white w/ slate border. Medium weight labels.
- **Badges.** Pill, 22px tall, tinted bg + matching foreground + a 6px leading dot. One per status.
- **Hover / press / focus.** Hover → one step darker (brand 600→700) or subtle slate fill; cards lift
  shadow `md → lg` and translate up 1px. Press → return to base / 0.99 scale. Focus → 3px brand ring
  (`--shadow-focus`) on every interactive element, always visible (WCAG 2.4.7).
- **Motion.** Quick and unobtrusive: 120–280ms, `cubic-bezier(0.16,1,0.3,1)` ease-out for entrances,
  ease-in-out for toggles. Fades and small translates only — no bounce, no spin. Respect
  `prefers-reduced-motion`.
- **Transparency & blur.** Sparing. Translucent brand fill on active nav (16%), white pills at
  15% on auth panels, sticky top nav may use a subtle backdrop. No frosted-glass everywhere.
- **Imagery vibe.** Provider/patient avatars are flat solid-color circles with initials (or photos
  when available) — color-coded per provider. Cool, calm palette throughout; no warm grain.
- **Accessibility (WCAG 2.1 AA).** All text ≥ 4.5:1 (large ≥ 3:1). Semantic colors chosen dark
  enough on their tints. Never color-only: status always pairs an icon/label with color. Visible
  focus rings, 44px min touch targets, logical heading order, labelled controls.

---

## ICONOGRAPHY

**The original MedBridge generator contained no real icon assets.** `code.js` draws "icons" as small
colored rounded rectangles (placeholders) and uses a handful of **emoji** inline (👋 ⭐ 📍 🔒 ⚠ ✓).
There is no icon font, no SVG sprite, and no PNG icon set anywhere in the source.

**Decision for the elevated system → [Lucide](https://lucide.dev) via CDN.** Lucide is the closest
high-quality match for modern patient-portal products (MyChart/Zocdoc/One&nbsp;Medical/Teladoc all use
thin, rounded, stroke-based icon systems). It is:

- **Stroke-based**, `1.75px` weight, `24×24` grid, rounded caps/joins — friendly + clinical.
- Rendered at **20px** in nav/controls, **16px** inline, **40–48px** in feature spots.
- Colored with `currentColor` so icons inherit semantic text color.

> **⚠ Substitution flagged:** Lucide replaces the original emoji/rectangle placeholders. If MedBridge
> has a licensed brand icon set, send it and it will be swapped in 1:1.

**Usage in code:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="heart-pulse"></i>
<script>lucide.createIcons();</script>
```
**Key icons by domain:** `layout-dashboard` (Dashboard) · `calendar-days` (Appointments) ·
`folder-heart` (Records) · `pill` (Prescriptions) · `credit-card` (Billing) ·
`message-square` (Messages) · `bell` (Notifications) · `settings` (Settings) ·
`heart-pulse` `activity` `stethoscope` `shield-check` `droplet` `thermometer` (vitals/clinical) ·
`check` `circle-check` `triangle-alert` `clock` `map-pin` `star` `search` (status/UI).

**Logo / brand mark.** The MedBridge logo is a **teal medical cross sitting atop a navy arch bridge**
(with two piers) — a literal "Med + Bridge" mark — above a bold geometric **MEDBRIDGE** wordmark
(Montserrat 800, navy `#16324F`, teal cross `#178A9A`). It is recreated as clean vector art in
`assets/`: `logo-stacked.svg` (primary lockup), `logo-full.svg` / `logo-full-white.svg` (horizontal,
light/dark), and `logo-mark.svg` / `logo-mark-white.svg` (mark only). In the app the mark renders from
the reusable `BrandMark` component (`ui_kits/portal/lib.jsx`; `white` prop for dark surfaces).

---

## CAVEATS

- **Medlink reference PDF.** Now attached at `uploads/…(Preview).pdf` (copied to
  `uploads/medlink-reference.pdf`). It is a 2-page export where page 2 is a single ~24,700 × 30,300px
  raster board — too large to rasterize within the in-tool render budget, so it couldn't be pixel-
  inspected here. The system was built from the primary source of truth (`code.js`) and modern
  patient-portal conventions (MyChart/Zocdoc/One Medical/Teladoc). If you want the Medlink polish
  cross-checked, share a normal-resolution screenshot of the specific screens you like.
- **Font substitution.** Original = Inter; elevated system = **Hanken Grotesk** (a distinctive,
  highly-legible humanist sans). Loaded from Google Fonts. Tell me if you'd rather keep Inter or
  supply a licensed brand face.
- **Icon substitution.** Lucide stands in for the (nonexistent) source icon set — see ICONOGRAPHY.
