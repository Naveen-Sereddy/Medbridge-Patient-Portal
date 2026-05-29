# 02 · Figma Export & Organization Plan

> Mirrors the built design system (`colors_and_type.css`, `components.css`) and the 30-screen prototype.

## Figma file structure
```
📁 MedBridge (Team) 
├── 📄 MedBridge — Foundations   ← published LIBRARY
│   ├── 00 · Cover
│   ├── 01 · Color (Variables: brand / neutral / semantic / surface)
│   ├── 02 · Typography (Hanken Grotesk scale + text styles)
│   ├── 03 · Spacing & Layout (4px grid, sidebar/topnav metrics)
│   ├── 04 · Radius & Elevation (shadow styles xs–xl)
│   └── 05 · Iconography (Lucide 24px set) + Logo
├── 📄 MedBridge — Components     ← published LIBRARY
│   ├── 10 · Buttons   11 · Badges   12 · Inputs & Controls
│   ├── 13 · Cards & Stats   14 · Alerts   15 · Tabs & Nav
│   ├── 16 · Avatars   17 · Table   18 · Sidebar / TopNav / Shell
├── 📄 MedBridge — Patient Portal (Screens)
│   ├── 20 · Auth (Login / Forgot / Reset)
│   ├── 21 · Dashboard (Default / Health Alerts / Loading / Error)
│   ├── 22 · Appointments (List / Calendar / Details / Cancel / Empty)
│   ├── 23 · Booking (Step 1–3 / Confirmed)
│   ├── 24 · Providers (Directory / Profile)
│   ├── 25 · Records (Overview / History / Tests / Test detail / Files)
│   ├── 26 · Prescriptions (List / Detail / Refill success)
│   ├── 27 · Billing (Billing / Invoice / Payment success)
│   ├── 28 · Messages (Inbox / Thread)
│   └── 29 · Account (Notifications / Profile / Security / Notif prefs / Help)
└── 📄 MedBridge — Flows & Prototype (wired links, user-flow diagrams)
```

**Page naming convention:** `NN · Name` (zero-padded numeric prefix → stable ordering).
**Frame naming convention:** `Screen / NN · Name / State` e.g. `Booking / 23 · Step 2 / Default`.

## What stays a Component vs becomes a Variant vs a Token vs an Asset

### → Components (master, reused everywhere)
Button, Badge, Input/Field, Toggle, Checkbox, Search, Card, StatCard, Alert, Tabs, PillTabs, Avatar,
ProviderAvatar, TableRow/TableHeader, Stepper, SectionHead, Sidebar, TopNav, Breadcrumb, EmptyState,
Skeleton, Modal/Confirm.

### → Variants (properties on a single component, not separate components)
| Component | Variant properties |
|---|---|
| Button | `variant` (primary/secondary/outline/outline-gray/ghost/danger), `size` (sm/md/lg), `icon` (none/left/right/only), `state` (default/hover/focus/disabled) |
| Badge | `status` (confirmed/pending/cancelled/active/refill-due/info/neutral) |
| Input | `state` (default/focus/error/disabled), `hasIcon` (true/false), `hasLabel` (true/false) |
| Card | `accent` (none/brand/teal/green/amber/red/purple), `accentEdge` (left/top), `hover` |
| Tabs | `type` (underline/pill), `active` index |
| Avatar | `size` (sm/md/lg/xl), `type` (initials/photo/icon) |
| Alert | `kind` (info/warn/success/danger) |
| Nav item | `state` (default/hover/active), `hasBadge` |

### → Design Tokens (Figma Variables — never raw values)
- **Color:** `brand/50…800`, `neutral/50…900`, `semantic/{teal,green,amber,red,purple}-{fg,bg}`,
  `surface/{page,surface,subtle}`, `sidebar/{bg,bg2,div,text}`, `focus/ring`.
- **Type:** sizes `display,h1,h2,h3,title,body-lg,body,sm,xs,2xs`; weights 400/500/600/700/800;
  line-heights; tracking. Bind to **Text Styles**.
- **Spacing:** `space/1…20` (4-px base). **Radius:** `sm,md,lg,xl,pill`.
- **Elevation:** shadow effect styles `xs,sm,md,lg,xl`.
- **Mode:** set up a Light mode now; reserve a Dark mode collection for later.

### → Assets (exported)
Logo (mark, stacked, horizontal, white variants), Lucide icon set, any illustration spots,
avatar placeholder. Everything else is component instances, not flattened assets.

## Export plan

| Page | Frame | Component/Asset | Format | Resolution | Naming |
|---|---|---|---|---|---|
| 05 · Iconography | Icon set | Each Lucide icon | SVG | vector | `icon/[name].svg` |
| 05 · Iconography | Logo | Mark / Stacked / Horizontal / White | SVG | vector | `logo/medbridge-[mark\|stacked\|full\|full-white].svg` |
| 21 · Dashboard | Default | Full screen | PNG | @2x | `screen/dashboard@2x.png` |
| 23 · Booking | Step 1–3 | Full screens | PNG | @2x | `screen/booking-step-[n]@2x.png` |
| 10 · Buttons | All variants | Component board | PNG | @2x | `component/buttons@2x.png` |
| Hero set | 4–6 marquee screens | Full screens | PNG | @1x,@2x,@3x | `marketing/[screen]@[n]x.png` |
| Any photo/illustration | spot | image | WebP + PNG fallback | @2x | `img/[name]@2x.webp` |

**Global export rules**
- Icons & logo: **SVG** (and a 24/48px PNG fallback for the logo).
- UI screenshots for docs/portfolio: **PNG @2x** (retina), `@3x` only for marketing hero.
- Photographic/illustrative content: **WebP** with PNG fallback.
- Naming: `kebab-case`, type-prefixed (`screen/`, `component/`, `icon/`, `logo/`, `img/`), `@Nx` suffix.

## Asset folder structure (export target)
```
exports/
├── logo/        (svg + png fallbacks)
├── icon/        (svg, 24px grid)
├── screen/      (png @2x — all 30 screens)
├── component/   (png @2x — component boards)
├── marketing/   (png @1x/@2x/@3x — hero shots)
└── img/         (webp + png — photos/illustrations)
```
