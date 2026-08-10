/* MedBridge Portal — data, icons, helpers (shared) */

// ---- Brand mark: three linked figures. Master shape, inlined so it can be
// recolored via CSS tokens and works regardless of the page's folder depth.
// white=true renders --logo-on-dark (sidebar, colored brand panels); the
// default renders --logo-on-light (white/cream cards, light page bg).
const BRAND_MARK_VIEWBOX = "262.54 24.5 498.91 502.07000000000005";
const BRAND_MARK_RATIO = 0.9937060569243332;
const BRAND_MARK_PATH = "M 472.50 525.38 C471.40,525.12 464.88,523.53 458.00,521.85 C432.99,515.75 406.90,504.60 386.50,491.29 C365.00,477.26 350.12,463.40 328.93,437.68 C328.56,437.22 326.20,439.94 323.69,443.71 C316.02,455.26 305.76,460.74 293.64,459.76 C276.80,458.41 264.32,445.62 263.22,428.59 C262.54,417.86 264.68,411.54 271.51,404.17 C277.96,397.20 283.95,394.27 293.89,393.22 L 300.78 392.50 L 295.94 380.50 C286.21,356.36 282.64,337.49 282.63,310.00 C282.62,293.90 283.02,288.32 284.92,278.00 C289.21,254.71 298.65,228.19 305.46,220.28 C312.28,212.36 323.23,211.96 330.64,219.38 C337.09,225.82 337.19,228.43 331.71,245.39 C325.95,263.17 324.29,270.31 322.87,283.20 C321.63,294.58 322.20,313.54 324.04,321.89 C325.62,329.05 330.01,333.93 335.50,334.63 C340.47,335.26 348.37,331.53 378.51,314.30 C430.48,284.59 428.60,285.43 436.53,288.46 C441.68,290.42 444.56,293.67 446.04,299.13 C448.21,307.20 447.08,308.76 423.53,330.44 C394.86,356.82 395.00,356.66 395.00,363.43 C395.00,369.50 397.66,373.74 403.29,376.65 C409.18,379.69 414.03,378.70 443.00,368.53 C466.79,360.18 471.19,358.93 475.59,359.26 C478.73,359.49 481.86,360.48 483.76,361.83 C487.69,364.63 490.48,371.63 489.58,376.43 C488.29,383.29 488.66,383.04 421.32,422.85 C411.87,428.44 402.82,434.13 401.20,435.49 C391.64,443.53 395.97,452.75 415.51,465.99 C430.43,476.09 448.80,483.71 471.41,489.15 C484.22,492.23 485.69,492.83 489.87,496.60 C494.31,500.61 494.43,500.86 494.80,507.60 C495.12,513.56 494.85,514.97 492.84,517.91 C489.16,523.27 485.72,525.30 479.79,525.60 C476.88,525.75 473.60,525.65 472.50,525.38 ZM 538.50 524.59 C530.36,520.97 526.66,510.53 530.38,501.64 C532.18,497.33 538.54,492.16 542.97,491.40 C548.95,490.38 571.37,484.22 576.57,482.17 C595.52,474.70 618.79,460.14 624.35,452.29 C627.68,447.58 628.17,442.44 625.67,438.61 C623.50,435.30 620.26,433.22 583.50,411.45 C534.15,382.23 536.96,384.24 534.91,376.66 C532.79,368.80 540.76,359.00 549.28,359.00 C551.70,359.00 563.48,362.54 579.38,368.04 C593.75,373.02 607.34,377.50 609.58,378.01 C620.97,380.58 631.86,370.34 628.95,359.79 C627.96,356.19 614.41,342.65 589.16,320.03 C579.57,311.43 578.00,308.94 578.00,302.30 C578.01,293.25 583.94,287.65 593.55,287.60 C597.75,287.58 599.92,288.34 606.55,292.18 C619.11,299.45 664.69,325.25 673.41,330.03 C686.03,336.94 693.97,335.84 698.05,326.63 C702.60,316.33 703.02,288.74 698.93,268.81 C697.77,263.14 694.80,252.43 692.32,245.00 C687.45,230.37 687.29,227.50 690.98,221.53 C693.38,217.65 700.10,214.00 704.85,214.00 C708.85,214.00 714.72,216.39 717.84,219.30 C720.75,222.01 723.78,227.89 728.86,240.67 C746.22,284.37 746.05,336.42 728.40,379.30 C725.86,385.46 723.59,391.00 723.34,391.60 C723.06,392.31 725.46,392.94 730.05,393.37 C740.12,394.30 745.97,397.12 752.49,404.17 C759.37,411.59 761.45,417.80 760.78,428.92 C760.25,437.84 757.95,443.00 751.37,450.03 C745.07,456.78 738.57,459.45 728.50,459.45 C722.28,459.45 719.34,458.93 715.30,457.12 C709.52,454.54 701.05,446.27 698.33,440.57 C697.39,438.58 696.32,437.08 695.96,437.23 C695.60,437.38 691.93,441.55 687.81,446.50 C655.23,485.65 613.35,510.94 561.00,523.08 C547.17,526.28 542.95,526.57 538.50,524.59 ZM 463.94 253.06 C459.52,251.70 457.21,250.11 454.82,246.75 L 452.50 243.50 L 452.50 191.00 C452.50,131.77 452.89,134.78 444.71,131.50 C438.65,129.08 431.94,130.23 420.94,135.58 C402.47,144.57 388.08,155.35 367.89,175.30 C353.19,189.84 350.22,191.62 342.27,190.73 C331.77,189.54 325.24,178.55 329.27,168.88 C332.10,162.13 352.88,140.16 368.45,127.47 C382.37,116.13 405.37,102.27 421.50,95.52 C436.74,89.14 456.14,83.53 472.00,80.93 C476.12,80.25 479.85,79.39 480.27,79.02 C480.70,78.65 479.82,75.68 478.31,72.43 C474.43,64.03 474.35,52.90 478.13,45.00 C482.02,36.84 487.14,31.55 494.77,27.79 C501.06,24.70 502.11,24.50 512.00,24.50 C521.90,24.50 522.95,24.70 529.22,27.79 C536.66,31.45 543.03,37.84 546.38,45.00 C548.04,48.53 548.49,51.43 548.49,58.50 C548.48,66.43 548.15,68.14 545.66,72.87 C544.11,75.83 543.22,78.56 543.67,78.94 C544.13,79.33 547.88,80.19 552.00,80.85 C588.27,86.70 625.00,103.14 654.00,126.48 C669.70,139.12 690.76,160.77 694.63,168.26 C696.69,172.24 696.06,180.68 693.43,184.31 C689.27,190.04 679.61,192.53 672.70,189.65 C670.92,188.91 663.17,182.12 655.48,174.57 C634.49,153.96 622.14,144.80 602.63,135.38 C593.90,131.16 591.97,130.60 585.94,130.55 C579.75,130.50 578.86,130.76 576.09,133.41 C570.71,138.57 570.66,139.10 571.45,191.93 C571.98,227.67 571.86,241.29 571.02,243.50 C569.36,247.81 566.31,250.72 561.50,252.55 C553.08,255.77 543.89,250.44 540.72,240.50 C539.84,237.75 536.07,223.82 532.33,209.55 C525.95,185.17 525.31,183.36 521.92,179.80 C518.49,176.19 518.00,176.00 512.04,176.00 C506.12,176.00 505.55,176.21 502.02,179.75 C499.10,182.67 497.94,184.94 496.75,190.00 C494.70,198.77 487.44,226.73 484.81,236.00 C482.47,244.25 479.33,249.27 475.20,251.38 C471.41,253.32 466.94,253.98 463.94,253.06 Z";

function BrandMark({ size = 30, white = false }) {
  const fill = white ? "var(--logo-on-dark)" : "var(--logo-on-light)";
  return (
    <svg height={size} width={size * BRAND_MARK_RATIO} viewBox={BRAND_MARK_VIEWBOX} style={{ flex: "none" }} aria-hidden="true">
      <path d={BRAND_MARK_PATH} fill={fill} />
    </svg>
  );
}

// ---- Icon: renders a Lucide <i> that gets upgraded to <svg> by lucide.createIcons()
function Icon({ name, size, cls, style }) {
  const s = size || 20;
  return <i data-lucide={name} className={cls || ""} style={{ width: s, height: s, display: "inline-flex", ...(style || {}) }}></i>;
}

// ---- Provider color coding (consistent across all screens)
const PROVIDERS = [
  { id: "nair",  name: "Dr. Rahul Nair",   full: "Dr. Rahul Nair, MD",  spec: "Cardiology",    color: "var(--brand-600)",  initials: "RN", rating: "4.9", clinic: "Heart Care Center",     next: "Jun 3",  bio: "Board-certified cardiologist focused on preventive heart care and hypertension management.", years: 14, lang: "English, Hindi" },
  { id: "kemp",   name: "Dr. Freya Kemp",    full: "Dr. Freya Kemp, MD",   spec: "Primary Care",  color: "var(--teal-600)",   initials: "FK", rating: "4.8", clinic: "MedBridge Virtual",     next: "Jun 5",  bio: "Family medicine physician and Beth's primary care provider since 2022.", years: 11, lang: "English, Mandarin" },
  { id: "miller", name: "Dr. Ryan Miller", full: "Dr. Ryan Miller, MD",spec: "Dermatology",   color: "var(--purple-700)", initials: "RM", rating: "4.7", clinic: "Skin & Wellness Clinic", next: "Jun 10", bio: "Dermatologist specializing in skin cancer screening and chronic skin conditions.", years: 9, lang: "English" },
  { id: "jones", name: "Dr. Amy Jones",   full: "Dr. Amy Jones, MD",  spec: "Neurology",     color: "var(--green-600)",  initials: "AJ", rating: "5.0", clinic: "NeuroHealth Institute",  next: "Jun 8",  bio: "Neurologist with a focus on headache disorders and preventive neurology.", years: 16, lang: "English, Japanese" },
  { id: "stubbs",  name: "Dr. Rob Stubbs", full: "Dr. Rob Stubbs, MD",spec: "Orthopedics",   color: "var(--amber-700)",  initials: "RS", rating: "4.7", clinic: "Ortho & Sports Med",    next: "Jun 12", bio: "Orthopedic surgeon treating sports injuries and joint conditions.", years: 13, lang: "English, Spanish" },
  { id: "sharma", name: "Dr. Priya Sharma", full: "Dr. Priya Sharma, MD",spec: "Ophthalmology", color: "var(--brand-700)",  initials: "PS", rating: "4.9", clinic: "Vision Care Assoc.",    next: "Jun 25", bio: "Ophthalmologist providing comprehensive eye exams and glaucoma care.", years: 18, lang: "English" },
];
const provById = (id) => PROVIDERS.find(p => p.id === id);

const PATIENT = { name: "Beth Mooney", mrn: "MB-4827", dob: "March 14, 1990", age: 36, sex: "Female",
  email: "beth.mooney@email.com", phone: "(212) 555-0147",
  address: "245 West 72nd Street, Apt 4B, New York, NY 10023", since: "2022", primary: "Dr. Freya Kemp", initials: "BM" };

const APPOINTMENTS = [
  { id: "a1", prov: "nair",  date: "Tue, Jun 3, 2026",  day:"Tuesday, June 3, 2026", time: "10:30 AM", dur: "45 min", status: "Confirmed", type: "In-Person", loc: "Heart Care Center, 420 Park Ave, Suite 300", reason: "Routine cardiology follow-up", copay: "$30.00" },
  { id: "a2", prov: "kemp",   date: "Thu, Jun 12, 2026", day:"Thursday, June 12, 2026", time: "2:00 PM",  dur: "30 min", status: "Confirmed", type: "Telehealth", loc: "MedBridge Virtual Visit", reason: "Annual physical", copay: "$0.00" },
  { id: "a3", prov: "miller", date: "Mon, Jun 17, 2026", day:"Monday, June 17, 2026", time: "9:00 AM",  dur: "30 min", status: "Pending",   type: "In-Person", loc: "Skin & Wellness Clinic, 88 Madison Ave", reason: "Mole check follow-up", copay: "$35.00" },
  { id: "a4", prov: "sharma", date: "Wed, Jun 25, 2026", day:"Wednesday, June 25, 2026", time: "11:00 AM", dur: "60 min", status: "Confirmed", type: "In-Person", loc: "Vision Care Assoc., 12 E 60th St", reason: "Comprehensive eye exam", copay: "$40.00" },
];

const PAST_APPOINTMENTS = [
  { id: "p1", prov: "nair", date: "May 15, 2026", time: "10:30 AM", status: "Completed", type: "In-Person" },
  { id: "p2", prov: "kemp",  date: "Mar 22, 2026", time: "9:00 AM",  status: "Completed", type: "In-Person" },
  { id: "p3", prov: "miller",date: "Jan 10, 2026", time: "2:30 PM",  status: "Completed", type: "In-Person" },
];

const VITALS = [
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", color: "var(--green-600)", icon: "heart-pulse", status: "Normal" },
  { label: "Heart Rate",     value: "72",     unit: "bpm",  color: "var(--brand-600)", icon: "activity",    status: "Normal" },
  { label: "Blood Sugar",    value: "98",     unit: "mg/dL",color: "var(--teal-600)",  icon: "droplet",     status: "Normal" },
  { label: "BMI",            value: "22.4",   unit: "kg/m²",color: "var(--purple-700)",icon: "scale",       status: "Healthy" },
];

const VITALS_FULL = [
  { label: "Blood Pressure", value: "118/76 mmHg", color: "var(--green-600)" },
  { label: "Heart Rate", value: "72 bpm", color: "var(--brand-600)" },
  { label: "Temperature", value: "98.4 °F", color: "var(--teal-600)" },
  { label: "Blood Sugar", value: "98 mg/dL", color: "var(--green-600)" },
  { label: "Weight", value: "138 lbs", color: "var(--n-500)" },
  { label: "Height", value: "5′ 6″", color: "var(--n-500)" },
];

const CONDITIONS = [
  { name: "Hypertension, Stage 1", color: "var(--amber-700)", status: "Managed" },
  { name: "Type 2 Diabetes", color: "var(--brand-600)", status: "Managed" },
  { name: "Seasonal Allergies", color: "var(--green-600)", status: "Managed" },
];

const ALLERGIES = [
  { name: "Penicillin", level: "Severe", note: "hives" },
  { name: "NSAIDs", level: "Moderate", note: "GI upset" },
  { name: "Latex", level: "Mild", note: "contact rash" },
];

const TIMELINE = [
  { yr: "2026", mo: "Mar", title: "Cardiology Follow-up", note: "BP controlled. Continue Lisinopril.", color: "var(--brand-600)" },
  { yr: "2023", mo: "Aug", title: "Type 2 Diabetes Diagnosed", note: "HbA1c 7.2%. Started Metformin 500mg.", color: "var(--amber-700)" },
  { yr: "2022", mo: "Jun", title: "Hypertension Diagnosed", note: "BP 148/92. Started Lisinopril 10mg.", color: "var(--amber-700)" },
  { yr: "2021", mo: "Jan", title: "Annual Physical", note: "All values within normal range.", color: "var(--teal-600)" },
  { yr: "2018", mo: "Apr", title: "Allergy Testing", note: "Positive: dust mites, pollen, pet dander.", color: "var(--purple-700)" },
];

const TESTS = [
  { name: "Comprehensive Metabolic Panel", date: "May 15, 2026", by: "Dr. Kemp",  result: "All values normal", status: "Reviewed" },
  { name: "HbA1c Blood Test", date: "May 15, 2026", by: "Dr. Kemp", result: "6.8% — Controlled", status: "Reviewed" },
  { name: "Lipid Panel", date: "May 15, 2026", by: "Dr. Nair", result: "LDL 98 mg/dL", status: "Reviewed" },
  { name: "ECG — 12 Lead", date: "Nov 8, 2025", by: "Dr. Nair", result: "Normal sinus rhythm", status: "Reviewed" },
  { name: "CBC with Differential", date: "Mar 22, 2025", by: "Dr. Kemp", result: "All within range", status: "Reviewed" },
  { name: "Urinalysis", date: "Mar 22, 2025", by: "Dr. Kemp", result: "No abnormalities", status: "Reviewed" },
  { name: "Thyroid Panel", date: "Jan 10, 2025", by: "Dr. Kemp", result: "TSH 2.1 — Normal", status: "Reviewed" },
];

const DOCUMENTS = [
  { name: "Visit Summary — Dr. Nair.pdf", size: "1.2 MB", date: "May 15, 2026", kind: "pdf" },
  { name: "ECG Report Nov 2025.pdf", size: "3.4 MB", date: "Nov 8, 2025", kind: "pdf" },
  { name: "Lab Results Jan 2026.pdf", size: "0.8 MB", date: "Jan 10, 2026", kind: "pdf" },
  { name: "Insurance Card Front.jpg", size: "0.2 MB", date: "Jan 1, 2026", kind: "img" },
  { name: "Referral Letter.pdf", size: "0.4 MB", date: "Sep 3, 2025", kind: "pdf" },
];

const PRESCRIPTIONS = [
  { id: "rx1", name: "Lisinopril", dose: "10mg", freq: "Once daily, morning", refill: "Jun 20", status: "Active", color: "var(--brand-600)", dr: "Dr. Nair", cond: "Hypertension", qty: "30 tablets", left: 2, expiry: "Mar 22, 2027" },
  { id: "rx2", name: "Metformin", dose: "500mg", freq: "Twice daily with meals", refill: "Jun 15", status: "Refill Due", color: "var(--amber-700)", dr: "Dr. Kemp", cond: "Type 2 Diabetes", qty: "60 tablets", left: 3, expiry: "Mar 22, 2027" },
  { id: "rx3", name: "Atorvastatin", dose: "20mg", freq: "Once daily, evening", refill: "Jul 3", status: "Active", color: "var(--teal-600)", dr: "Dr. Nair", cond: "High Cholesterol", qty: "30 tablets", left: 5, expiry: "Jul 1, 2027" },
  { id: "rx4", name: "Cetirizine", dose: "10mg", freq: "As needed for allergies", refill: "Aug 10", status: "Active", color: "var(--purple-700)", dr: "Dr. Kemp", cond: "Seasonal Allergies", qty: "90 tablets", left: 4, expiry: "Aug 1, 2027" },
  { id: "rx5", name: "Omeprazole", dose: "20mg", freq: "Once daily before meals", refill: "Jun 8", status: "Refill Due", color: "var(--red-700)", dr: "Dr. Kemp", cond: "Acid Reflux", qty: "30 capsules", left: 1, expiry: "Jun 30, 2026" },
];

const INVOICES = [
  { id: "INV-1042", date: "May 15, 2026", service: "Cardiology Consult", prov: "Dr. Nair", amount: "$200.00", owe: "$69.00", status: "Unpaid", due: "Jun 15, 2026" },
  { id: "INV-1041", date: "May 15, 2026", service: "Lab Panel", prov: "Lab Corp", amount: "$340.00", owe: "$179.50", status: "Unpaid", due: "Jun 15, 2026" },
  { id: "INV-1039", date: "Mar 22, 2026", service: "Primary Care Visit", prov: "Dr. Kemp", amount: "$150.00", owe: "$30.00", status: "Paid", due: "—" },
  { id: "INV-1038", date: "Mar 22, 2026", service: "Immunization", prov: "Dr. Kemp", amount: "$80.00", owe: "$16.00", status: "Paid", due: "—" },
  { id: "INV-1036", date: "Jan 10, 2026", service: "Dermatology Consult", prov: "Dr. Miller", amount: "$175.00", owe: "$35.00", status: "Paid", due: "—" },
];

const CONVERSATIONS = [
  { id: "c1", prov: "nair",  preview: "Your ECG results look great…", time: "2h ago", unread: true },
  { id: "c2", prov: "kemp",   preview: "Annual physical reminder…", time: "1d ago", unread: true },
  { id: "c3", prov: "billing",name: "Billing Department", preview: "Invoice INV-1042 ready…", time: "3d ago", unread: false, color: "var(--amber-700)", initials: "$", spec: "Patient Accounts" },
  { id: "c4", prov: "miller", preview: "Follow-up notes attached…", time: "1w ago", unread: false },
  { id: "c5", prov: "lab",    name: "Lab Results", preview: "May 15 results available…", time: "1w ago", unread: false, color: "var(--green-600)", initials: "L", spec: "MedBridge Labs" },
];

const THREAD = [
  { from: "doc", text: "Hello Beth,\n\nYour ECG and lab results look great. Blood pressure 118/76 is well-controlled, and your HbA1c improved to 6.8% from 7.2%.\n\nKeep up the good work. See you in 6 months.", time: "10:42 AM" },
  { from: "pat", text: "That's great news! I've been focused on my diet.\n\nShould I continue the same Metformin dosage?", time: "11:15 AM" },
  { from: "doc", text: "Yes — continue Metformin 500mg twice daily. No changes needed. Your current regimen is working well.", time: "11:28 AM" },
];

const NOTIFICATIONS = [
  { group: "Today", items: [
    { icon: "calendar-clock", color: "var(--brand-600)", title: "Appointment Reminder", body: "Dr. Rahul Nair · Cardiology — Jun 3 at 10:30 AM", time: "2h ago", unread: true, actions: ["View Appointment", "Dismiss"] },
    { icon: "flask-conical", color: "var(--green-600)", title: "Lab Results Available", body: "Your May 15 lab panel results are ready to view.", time: "4h ago", unread: true, actions: ["View Results"] },
  ]},
  { group: "This Week", items: [
    { icon: "pill", color: "var(--amber-700)", title: "Refill Due — Metformin", body: "Metformin 500mg: 18 days remaining. Request a refill now.", time: "1d ago", unread: true, actions: ["Request Refill", "Remind Me"] },
    { icon: "credit-card", color: "var(--amber-700)", title: "Payment Due", body: "Invoice #INV-1042 for $69.00 is due June 15, 2026.", time: "2d ago", unread: false, actions: ["Pay Now", "View Invoice"] },
    { icon: "message-square", color: "var(--teal-600)", title: "Message from Dr. Kemp", body: "A message about your upcoming annual physical.", time: "3d ago", unread: false, actions: ["Read Message"] },
  ]},
  { group: "Earlier", items: [
    { icon: "circle-check", color: "var(--green-600)", title: "Appointment Confirmed", body: "Dr. Nair on Jun 3 at 10:30 AM is confirmed.", time: "5d ago", unread: false, actions: ["View Details"] },
    { icon: "file-plus", color: "var(--purple-700)", title: "New Document Added", body: "Visit summary from May 15 was added to your records.", time: "1w ago", unread: false, actions: ["View Document"] },
  ]},
];

const NAV = [
  { id: "dashboard",    label: "Dashboard",    icon: "layout-dashboard" },
  { id: "appointments", label: "Appointments", icon: "calendar-days" },
  { id: "providers",    label: "Find a Doctor",icon: "stethoscope" },
  { id: "records",      label: "Records",      icon: "folder-heart" },
  { id: "prescriptions",label: "Prescriptions",icon: "pill" },
  { id: "billing",      label: "Billing",      icon: "credit-card" },
  { id: "messages",     label: "Messages",     icon: "message-square", badge: 2 },
  { id: "notifications",label: "Notifications",icon: "bell", badge: 4 },
  { id: "help",         label: "Help Center",  icon: "life-buoy" },
  { id: "settings",     label: "Settings",     icon: "settings" },
];

Object.assign(window, {
  BrandMark, Icon, PROVIDERS, provById, PATIENT, APPOINTMENTS, PAST_APPOINTMENTS, VITALS, VITALS_FULL,
  CONDITIONS, ALLERGIES, TIMELINE, TESTS, DOCUMENTS, PRESCRIPTIONS, INVOICES,
  CONVERSATIONS, THREAD, NOTIFICATIONS, NAV,
});
