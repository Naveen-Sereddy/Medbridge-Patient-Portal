# 05 · FHIR R4 data architecture

MedBridge is a concept project, so the objects in `ui_kits/portal/lib.jsx` are mock data rather than
live clinical records. This mapping shows how the interface could connect to an HL7 FHIR R4 service
without coupling screen components to a vendor-specific API.

## Resource mapping

| MedBridge object | FHIR R4 resource | Interface fields and notes |
|---|---|---|
| `patient` | `Patient` | Name, date of birth, contact details, primary provider reference, and the insurance member identifier. The UI should display only the fields needed for the current task. |
| `appointments` | `Appointment` + `Slot` | Appointment status (`booked`, `arrived`, `fulfilled`, or `cancelled`), specialty, participant references, location, and a telehealth video endpoint. `Slot` represents availability; it is not treated as an appointment until booked. |
| `vitals` and `labs` | `Observation` | Blood pressure, heart rate, cholesterol, and other measurements use a coded `code` (for example, a LOINC code), `valueQuantity`, effective date, reference range, and an interpretation flag such as normal, high, or low. |
| `prescriptions` | `MedicationRequest` + `MedicationDispense` | Active medication, dosage instructions, route, quantity, refills remaining, pharmacy reference, and dispense status. A request is the clinician's order; a dispense records what the pharmacy supplied. |
| `coverage` | `Coverage` | Payer, subscriber/member identifier, coverage status, plan details, copay, and coinsurance. Member IDs are treated as sensitive identifiers and are masked in general navigation. |
| `invoices` | `Invoice` (with `Account`/`Claim` references where needed) | Itemized billing lines, service dates, insurance-paid amount, patient balance, copay/coinsurance status, and payment state. A production integration would reconcile payer adjudication before showing a balance as payable. |

## Integration boundaries

Screens receive a view model assembled from these resources. The view model keeps FHIR transport,
authorization, and terminology handling outside the presentation layer. A real implementation would
validate resource profiles, preserve `meta.versionId` for auditability, and resolve references through
the health system's approved gateway. The prototype intentionally contains no PHI, credentials, or
FHIR endpoint.
