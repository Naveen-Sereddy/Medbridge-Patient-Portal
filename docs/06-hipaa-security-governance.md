# 06 · HIPAA security and privacy governance

MedBridge is a healthcare systems architecture prototype, not a HIPAA-certified service. These are
the safeguards the production design would require before handling protected health information (PHI).

## Session lifecycle and PHI protection

- Start a 15-minute idle timer after authentication and reset it only on meaningful user activity.
- On timeout, revoke the session, clear any locally cached view models, and return to the sign-in screen.
- Do not persist PHI in browser `localStorage` in production. If a local cache is unavoidable for an
  approved offline flow, encrypt it with a device-bound key and clear it on logout, timeout, and account
  switch. The prototype's hardcoded `lib.jsx` data is demonstration content, not a storage strategy.
- Keep authentication tokens in secure, `HttpOnly`, `SameSite` cookies; never put access tokens in the
  URL or in a client-readable storage bucket.

## Minimum necessary display

Role-scoped views should return only the fields needed for the task. A billing user may see coverage,
claims, invoices, and payment status, but not clinical notes, diagnoses, or detailed observations. A
care team member may see the clinical record needed for care, subject to their assigned relationship and
audit trail. Server-side authorization must enforce this boundary; hiding a field with CSS is not access
control.

## Caregiver and proxy access

Mitchell, the 68-year-old caregiver in the case study, needs to manage his own care and a second
patient's appointments. A shared username and password would erase identity, consent, and auditability.
It also conflicts with HIPAA's access-control requirement in §164.312(a)(2)(i), which calls for a unique
user identification mechanism.

The production model is delegated proxy access:

1. The patient grants a named caregiver access to a defined set of resources and actions.
2. The health system verifies the relationship and records consent, scope, start date, and expiry.
3. The caregiver signs in with their own identity, chooses the patient context explicitly, and sees a
   persistent banner identifying whose record is open.
4. Every read and write is attributed to the caregiver and patient context in the audit log.
5. The patient or an authorized administrator can revoke access; emergency access is a separate,
   time-limited workflow with an explicit reason.

This model supports dual-patient management without blending records or creating an untraceable shared
account. The prototype documents the information-architecture gap; it does not pretend to implement
identity proofing, consent capture, or production authorization.
