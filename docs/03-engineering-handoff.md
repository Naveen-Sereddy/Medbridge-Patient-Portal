# 03 · Engineering Handoff (Architecture, GitHub & Deployment)

> Implementation blueprint for taking the validated MedBridge design to production. The component
> names map 1:1 to the prototype in `ui_kits/portal/`.

---

## Frontend architecture
- **Framework:** Next.js (App Router) + React + TypeScript.
- **Styling:** the existing design tokens (`colors_and_type.css`) promoted to CSS variables + a small
  utility layer (or Tailwind configured from the same tokens). `components.css` → component styles.
- **Component library:** ship the prototype primitives (`Button`, `Card`, `Badge`, `Field`, `Toggle`,
  `Tabs`, `Alert`, `Stat`, `Avatar`, `Stepper`, `Sidebar`, `TopNav`, `PageShell`) as a typed package.
- **Data fetching:** TanStack Query (server cache) over a typed API client; Server Components for
  initial loads, client components for interactive flows (booking, messaging).
- **Forms & validation:** React Hook Form + Zod (schemas shared with the API).
- **Icons:** Lucide-react. **Charts (records/vitals):** Recharts or Visx.
- **A11y:** Radix primitives for menus/dialogs/tabs to guarantee keyboard + ARIA behavior.

### React component map
```
<AppShell>
  ├── <Sidebar nav active/>          ├── <TopNav title sub search bell avatar/>
  └── <PageShell>
        ├─ Dashboard:    <StatStrip> <UpcomingList> <VitalsPanel> <ActionQueue>
        ├─ Appointments: <FilterTabs> <AppointmentCard*> <CalendarMonth> <DayDetail>
        ├─ Booking:      <Stepper> <DoctorPicker> <SlotPicker> <ReviewSummary>
        ├─ Providers:    <ProviderCard*> <ProviderProfile> <SlotPicker>
        ├─ Records:      <RecordTabs> <VitalsGrid> <DiagnosisTimeline> <ResultsTable> <FileList>
        ├─ Prescriptions:<RxSummary> <RxCard*> <RxDetail> <RefillTracker>
        ├─ Billing:      <BalanceSummary> <InvoiceTable> <InvoiceDoc> <PayPanel>
        ├─ Messages:     <ConversationList> <MessageThread> <Composer>
        └─ Account:      <NotificationList> <SettingsNav> <ProfileForm> <SecurityPanel> <HelpCenter>
Shared: <Button> <Badge> <Card> <Field/Input> <Toggle> <Tabs> <Alert> <Avatar> <EmptyState> <Skeleton>
```

### State management strategy
- **Server state:** TanStack Query (cache, refetch, optimistic updates for booking/refill/pay).
- **URL state:** route + query params are the source of truth for tabs/filters/selected day.
- **Local UI state:** React `useState`/`useReducer` per component (steppers, toggles, composer).
- **Global app state:** thin context for session/user + feature flags. Avoid a heavy global store —
  most state is server or URL. (Add Zustand only if cross-screen client state grows.)

### Next.js folder structure
```
src/
├── app/
│   ├── (auth)/login | forgot-password | reset-password/page.tsx
│   ├── (portal)/
│   │   ├── layout.tsx            # AppShell (sidebar + topnav)
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/(list|calendar|[id]|book)/page.tsx
│   │   ├── providers/(page|[id])/...
│   │   ├── records/(overview|history|tests|[testId]|files)/...
│   │   ├── prescriptions/(page|[id])/...
│   │   ├── billing/(page|[invoiceId]|pay)/...
│   │   ├── messages/(page|[threadId])/...
│   │   ├── notifications/page.tsx
│   │   ├── settings/(profile|security|notifications)/page.tsx
│   │   └── help/page.tsx
│   ├── api/                      # route handlers (BFF) — see endpoints below
│   └── layout.tsx, error.tsx, loading.tsx, not-found.tsx
├── components/ (ui/, portal/, charts/)
├── lib/ (api-client, auth, query, utils)
├── hooks/ , styles/ (tokens.css, components.css) , types/
```

---

## Backend architecture
- **Pattern:** Next.js API routes as a **BFF**, fronting domain services. For scale, extract a
  NestJS/Node service. PostgreSQL primary DB; Redis for sessions/rate-limit/cache; S3-compatible
  object storage for documents (server-signed URLs, never public).
- **Boundaries:** Auth, Patients, Providers, Scheduling, Records, Pharmacy/Rx, Billing/Payments,
  Messaging, Notifications.
- **Payments:** Stripe (or healthcare-specific processor); never store raw PAN.
- **Integrations (future):** FHIR/HL7 for EHR interop; e-prescribing network; insurance eligibility.

### Authentication flow
1. Email/password (Argon2id hashed) **or** OAuth (Google).
2. Server issues short-lived access token + httpOnly secure refresh cookie (`SameSite=Strict`).
3. **2FA (TOTP)** step-up for sensitive actions (records export, payment, security changes).
4. Silent refresh; idle + absolute session timeouts; device/session registry (see Security screen).
5. All PHI routes require valid session + row-level authorization (patient owns the resource).

### Role permissions (RBAC)
| Role | Capabilities |
|---|---|
| **Patient** | View/manage *own* appointments, records, Rx, bills, messages, profile |
| **Provider** | View assigned patients' relevant records; message; mark results reviewed |
| **Front-desk/Scheduler** | Manage schedules/availability; cannot view clinical notes |
| **Billing** | Invoices/payments; no clinical record access |
| **Admin** | User/role management; audit logs; no default PHI access (break-glass + audited) |

Enforce at three layers: route guard → service authorization → DB row-level security. **Audit-log**
every PHI read/write (who, what, when) for HIPAA.

### API endpoint list (representative)
```
POST   /api/auth/login | /logout | /refresh | /2fa/verify
POST   /api/auth/password/forgot | /password/reset
GET    /api/me                       PATCH /api/me
GET    /api/providers?specialty&q    GET   /api/providers/:id
GET    /api/providers/:id/availability?date
GET    /api/appointments?status      POST  /api/appointments
GET    /api/appointments/:id         PATCH /api/appointments/:id   DELETE /api/appointments/:id
GET    /api/records/vitals | /conditions | /allergies | /history
GET    /api/records/tests            GET   /api/records/tests/:id
GET    /api/documents                POST  /api/documents (signed upload)   DELETE /api/documents/:id
GET    /api/prescriptions            GET   /api/prescriptions/:id
POST   /api/prescriptions/:id/refill
GET    /api/invoices                 GET   /api/invoices/:id     POST /api/invoices/:id/pay
GET    /api/messages/threads         GET   /api/messages/threads/:id   POST /api/messages/threads/:id/messages
GET    /api/notifications            POST  /api/notifications/read-all
GET    /api/settings/notifications   PATCH /api/settings/notifications
```
Conventions: REST + JSON, cursor pagination, Zod-validated, problem+json errors, idempotency keys on
POST payments/refills, rate-limited.

### Database schema (core tables)
```
patients(id, mrn, first_name, last_name, dob, sex, email, phone, address, created_at)
providers(id, name, specialty, rating, clinic, bio, years_experience, languages)
appointments(id, patient_id→, provider_id→, starts_at, duration_min, type, status,
             location, reason, copay_cents, created_at)
conditions(id, patient_id→, name, status, diagnosed_on)
allergies(id, patient_id→, substance, severity, reaction)
vitals(id, patient_id→, recorded_at, bp_systolic, bp_diastolic, hr, glucose, temp_f, weight_lb, height_in)
tests(id, patient_id→, provider_id→, name, collected_on, status, summary)
test_results(id, test_id→, marker, value, unit, reference_low, reference_high, flag)
documents(id, patient_id→, name, kind, size_bytes, storage_key, uploaded_at)
prescriptions(id, patient_id→, provider_id→, drug, dose, frequency, condition, qty,
              refills_left, status, refill_due_on, expires_on)
refill_requests(id, prescription_id→, pharmacy, notes, status, requested_at)
invoices(id, patient_id→, provider_id→, service, amount_cents, insurance_paid_cents,
         patient_owes_cents, status, issued_on, due_on)
invoice_line_items(id, invoice_id→, description, code, charge_cents, patient_owes_cents)
payments(id, invoice_id→, amount_cents, method, processor_ref, paid_at)
message_threads(id, patient_id→, participant_id, subject, last_message_at)
messages(id, thread_id→, sender_type, sender_id, body, sent_at, read_at)
notifications(id, patient_id→, type, title, body, severity, read, created_at)
users(id, patient_id?, role, email, password_hash, totp_secret, created_at)
sessions(id, user_id→, device, ip, created_at, last_seen_at, revoked_at)
audit_log(id, actor_user_id, action, resource_type, resource_id, at, ip)
notification_prefs(user_id→, category, channel, enabled)
```
Money in integer cents; timestamps UTC; PHI columns encrypted at rest; soft-deletes where lawful.

---

## STEP 4 — GitHub setup

**Repository name:** `medbridge-portal` (or `medbridge-web`).

### Folder hierarchy (repo root)
```
medbridge-portal/
├── .github/ (workflows/ci.yml, ISSUE_TEMPLATE/, PULL_REQUEST_TEMPLATE.md)
├── docs/                  # this handoff package + ADRs
├── design-system/         # tokens + component css (source of truth)
├── public/                # logo, icons, static
├── src/                   # Next.js app (structure above)
├── prisma/ or db/         # schema + migrations
├── tests/                 # unit + e2e (Playwright)
├── .env.example  .gitignore  .eslintrc  .prettierrc  tsconfig.json
├── README.md  CONTRIBUTING.md  LICENSE  CHANGELOG.md
```

### README.md (outline)
Project pitch · screenshots/prototype link · tech stack · quick start · scripts · env vars ·
architecture diagram · folder map · testing · deployment · accessibility · license.

### CONTRIBUTING.md
Branching model, Conventional Commits, PR checklist (tests + a11y + screenshots), code style,
how to run locally, definition of done.

### LICENSE recommendation
**MIT** for a portfolio project (permissive, recruiter-friendly). Use a proprietary license if this
becomes a real commercial product.

### .gitignore (key entries)
`node_modules/ .next/ out/ build/ coverage/ .env .env.* !.env.example .DS_Store *.log .vercel`

### Environment variables list (`.env.example`)
```
DATABASE_URL=          NEXTAUTH_URL=            NEXTAUTH_SECRET=
AUTH_GOOGLE_ID=        AUTH_GOOGLE_SECRET=
REDIS_URL=             S3_BUCKET= S3_REGION= S3_ACCESS_KEY= S3_SECRET_KEY=
STRIPE_SECRET_KEY=     STRIPE_WEBHOOK_SECRET=   NEXT_PUBLIC_STRIPE_PK=
SENTRY_DSN=            NEXT_PUBLIC_APP_URL=
```
**Never commit real secrets** — only `.env.example` with empty values.

### Push to GitHub
```bash
git init && git add . && git commit -m "chore: initial MedBridge scaffold"
git branch -M main
git remote add origin git@github.com:<you>/medbridge-portal.git
git push -u origin main
```

### Commit organization — Conventional Commits
`feat:` `fix:` `chore:` `docs:` `refactor:` `test:` `style:` `perf:` — e.g.
`feat(booking): availability-first slot picker`. Small, atomic, present-tense.

### Branching strategy
`main` (protected, always deployable) ← `develop` (integration) ← `feat/*` `fix/*` `chore/*`.
Release tags `vX.Y.Z`. Hotfixes branch from `main`.

### Pull request workflow
Branch → open PR into `develop` → CI (lint, type-check, test, build) must pass → 1 review →
squash-merge with a conventional title → preview deploy auto-attached. Periodically `develop → main`.

### Deployment workflow
- **Host:** Vercel (Next.js). Push to `main` → production; PRs → preview URLs.
- **DB:** managed Postgres (Neon/Supabase/RDS); run migrations in CI before deploy.
- **Secrets:** Vercel/CI env vars per environment.
- **Hardening:** HTTPS+HSTS, secure httpOnly cookies, CSP, rate-limiting, Sentry + uptime + analytics.
- **Gate:** Lighthouse ≥ 90 (Perf/A11y/Best-practices/SEO) before promoting to production.
