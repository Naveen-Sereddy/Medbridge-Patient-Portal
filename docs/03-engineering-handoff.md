# 03 · Engineering Handoff Notes

> Design-to-dev notes for the MedBridge Patient Portal prototype. The component names in this doc
> map directly to the JSX files in `ui_kits/portal/` and the classes in `components.css`.

---

## Recommended stack

The prototype is built on vanilla HTML/CSS/JS and React components. For a real production build
I'd carry the same token system forward into:

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** the existing `colors_and_type.css` tokens promoted to CSS custom properties;
  `components.css` component styles map directly to the React component library
- **Icons:** Lucide-react (same icon set used throughout the prototype)
- **Accessibility primitives:** Radix UI for menus, dialogs, and tabs — guarantees keyboard and
  ARIA behavior without rebuilding it from scratch

---

## Component inventory

Every component used in the 30 screens is in `ui_kits/portal/`. The core set that covers the
entire product:

**Layout:** `AppShell`, `Sidebar`, `TopNav`, `PageShell`

**Primitives:** `Button` (primary / secondary / ghost / destructive), `Badge`, `Card`, `Field`,
`Toggle`, `Tabs`, `Alert`, `Avatar`, `Stat`

**Navigation:** `Stepper` (used in booking and refill flows), `BreadcrumbBar`

**Data display:** `DataTable`, `VitalsGrid`, `TimelineRow`, `InvoiceLineItem`

**States:** `Skeleton`, `EmptyState`, `ErrorState`, `SuccessState` — every screen has all four
defined; don't ship without them in healthcare.

---

## Token usage

All colors, spacing, radii, shadows, and motion values are defined as CSS custom properties in
`colors_and_type.css`. Components reference tokens, not raw values. This means:

- A theme swap is a single attribute change on `<html>`
- Brand color updates cascade everywhere automatically
- Contrast ratios are pre-verified — don't swap tokens for hardcoded values without re-checking AA

Key tokens worth noting:

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#1D6FDB` | Primary actions, links, focus rings |
| `--color-sidebar-bg` | `#0F1B2D` | Fixed sidebar background |
| `--color-surface` | `#F8FAFC` | Main page background |
| `--font-tabular` | `"tnum"` feature setting | All clinical values and money |

---

## Accessibility requirements (non-negotiable)

These were designed in, not bolted on — make sure they survive the build:

- **Focus rings:** 3px solid `--color-brand` with 2px offset on every interactive element
- **Touch targets:** 44px minimum height on all controls
- **Status states:** always icon + label + color — never color alone
- **Tabular figures:** all vitals, lab values, and currency must use `font-variant-numeric: tabular-nums`
- **Reduced motion:** transitions are 120–280ms; honor `prefers-reduced-motion`
- **Contrast:** all text/background pairs are AA-verified; see `colors_and_type.css` for the
  approved semantic pairings

---

## Prototype reference

`ui_kits/portal/index.html` — open in any modern browser, no build step. All 30 screens
are clickable. The prototype is the source of truth for interaction patterns and states.
