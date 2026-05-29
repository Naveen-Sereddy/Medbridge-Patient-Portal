/* MedBridge Portal — data, icons, helpers (shared) */

// ---- Brand mark: teal medical cross atop a navy arch bridge.
// white=true renders a monochrome white mark for dark/colored surfaces.
function BrandMark({ size = 30, white = false }) {
  const cross = white ? "#33B6C6" : "#178A9A";
  const bridge = white ? "#FFFFFF" : "#16324F";
  return (
    <svg height={size} width={size * 300 / 180} viewBox="0 0 300 180" fill="none" style={{ flex: "none" }} aria-hidden="true">
      <rect x="139" y="14" width="22" height="80" rx="2" fill={cross} />
      <rect x="111" y="43" width="78" height="22" rx="2" fill={cross} />
      <path d="M30 149 C108 108 192 108 270 149 C198 121 102 121 30 149 Z" fill={bridge} />
      <rect x="105" y="116" width="13" height="52" fill={bridge} />
      <rect x="182" y="116" width="13" height="52" fill={bridge} />
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
  { id: "patel",  name: "Dr. Arun Patel",   full: "Dr. Arun Patel, MD",  spec: "Cardiology",    color: "var(--brand-600)",  initials: "AP", rating: "4.9", clinic: "Heart Care Center",     next: "Jun 3",  bio: "Board-certified cardiologist focused on preventive heart care and hypertension management.", years: 14, lang: "English, Hindi" },
  { id: "chen",   name: "Dr. Lisa Chen",    full: "Dr. Lisa Chen, MD",   spec: "Primary Care",  color: "var(--teal-600)",   initials: "LC", rating: "4.8", clinic: "MedBridge Virtual",     next: "Jun 5",  bio: "Family medicine physician and Sarah's primary care provider since 2022.", years: 11, lang: "English, Mandarin" },
  { id: "okafor", name: "Dr. James Okafor", full: "Dr. James Okafor, MD",spec: "Dermatology",   color: "var(--purple-700)", initials: "JO", rating: "4.7", clinic: "Skin & Wellness Clinic", next: "Jun 10", bio: "Dermatologist specializing in skin cancer screening and chronic skin conditions.", years: 9, lang: "English" },
  { id: "tanaka", name: "Dr. Mei Tanaka",   full: "Dr. Mei Tanaka, MD",  spec: "Neurology",     color: "var(--green-600)",  initials: "MT", rating: "5.0", clinic: "NeuroHealth Institute",  next: "Jun 8",  bio: "Neurologist with a focus on headache disorders and preventive neurology.", years: 16, lang: "English, Japanese" },
  { id: "reyes",  name: "Dr. Carlos Reyes", full: "Dr. Carlos Reyes, MD",spec: "Orthopedics",   color: "var(--amber-700)",  initials: "CR", rating: "4.7", clinic: "Ortho & Sports Med",    next: "Jun 12", bio: "Orthopedic surgeon treating sports injuries and joint conditions.", years: 13, lang: "English, Spanish" },
  { id: "sharma", name: "Dr. Priya Sharma", full: "Dr. Priya Sharma, MD",spec: "Ophthalmology", color: "var(--brand-700)",  initials: "PS", rating: "4.9", clinic: "Vision Care Assoc.",    next: "Jun 25", bio: "Ophthalmologist providing comprehensive eye exams and glaucoma care.", years: 18, lang: "English" },
];
const provById = (id) => PROVIDERS.find(p => p.id === id);

const PATIENT = { name: "Sarah Johnson", mrn: "MB-4827", dob: "March 14, 1990", age: 36, sex: "Female",
  email: "sarah.johnson@email.com", phone: "(212) 555-0147",
  address: "245 West 72nd Street, Apt 4B, New York, NY 10023", since: "2022", primary: "Dr. Lisa Chen", initials: "SJ" };

const APPOINTMENTS = [
  { id: "a1", prov: "patel",  date: "Tue, Jun 3, 2026",  day:"Tuesday, June 3, 2026", time: "10:30 AM", dur: "45 min", status: "Confirmed", type: "In-Person", loc: "Heart Care Center, 420 Park Ave, Suite 300", reason: "Routine cardiology follow-up", copay: "$30.00" },
  { id: "a2", prov: "chen",   date: "Thu, Jun 12, 2026", day:"Thursday, June 12, 2026", time: "2:00 PM",  dur: "30 min", status: "Confirmed", type: "Telehealth", loc: "MedBridge Virtual Visit", reason: "Annual physical", copay: "$0.00" },
  { id: "a3", prov: "okafor", date: "Mon, Jun 17, 2026", day:"Monday, June 17, 2026", time: "9:00 AM",  dur: "30 min", status: "Pending",   type: "In-Person", loc: "Skin & Wellness Clinic, 88 Madison Ave", reason: "Mole check follow-up", copay: "$35.00" },
  { id: "a4", prov: "sharma", date: "Wed, Jun 25, 2026", day:"Wednesday, June 25, 2026", time: "11:00 AM", dur: "60 min", status: "Confirmed", type: "In-Person", loc: "Vision Care Assoc., 12 E 60th St", reason: "Comprehensive eye exam", copay: "$40.00" },
];

const PAST_APPOINTMENTS = [
  { id: "p1", prov: "patel", date: "May 15, 2026", time: "10:30 AM", status: "Completed", type: "In-Person" },
  { id: "p2", prov: "chen",  date: "Mar 22, 2026", time: "9:00 AM",  status: "Completed", type: "In-Person" },
  { id: "p3", prov: "okafor",date: "Jan 10, 2026", time: "2:30 PM",  status: "Completed", type: "In-Person" },
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
  { name: "Comprehensive Metabolic Panel", date: "May 15, 2026", by: "Dr. Chen",  result: "All values normal", status: "Reviewed" },
  { name: "HbA1c Blood Test", date: "May 15, 2026", by: "Dr. Chen", result: "6.8% — Controlled", status: "Reviewed" },
  { name: "Lipid Panel", date: "May 15, 2026", by: "Dr. Patel", result: "LDL 98 mg/dL", status: "Reviewed" },
  { name: "ECG — 12 Lead", date: "Nov 8, 2025", by: "Dr. Patel", result: "Normal sinus rhythm", status: "Reviewed" },
  { name: "CBC with Differential", date: "Mar 22, 2025", by: "Dr. Chen", result: "All within range", status: "Reviewed" },
  { name: "Urinalysis", date: "Mar 22, 2025", by: "Dr. Chen", result: "No abnormalities", status: "Reviewed" },
  { name: "Thyroid Panel", date: "Jan 10, 2025", by: "Dr. Chen", result: "TSH 2.1 — Normal", status: "Reviewed" },
];

const DOCUMENTS = [
  { name: "Visit Summary — Dr. Patel.pdf", size: "1.2 MB", date: "May 15, 2026", kind: "pdf" },
  { name: "ECG Report Nov 2025.pdf", size: "3.4 MB", date: "Nov 8, 2025", kind: "pdf" },
  { name: "Lab Results Jan 2026.pdf", size: "0.8 MB", date: "Jan 10, 2026", kind: "pdf" },
  { name: "Insurance Card Front.jpg", size: "0.2 MB", date: "Jan 1, 2026", kind: "img" },
  { name: "Referral Letter.pdf", size: "0.4 MB", date: "Sep 3, 2025", kind: "pdf" },
];

const PRESCRIPTIONS = [
  { id: "rx1", name: "Lisinopril", dose: "10mg", freq: "Once daily, morning", refill: "Jun 20", status: "Active", color: "var(--brand-600)", dr: "Dr. Patel", cond: "Hypertension", qty: "30 tablets", left: 2, expiry: "Mar 22, 2027" },
  { id: "rx2", name: "Metformin", dose: "500mg", freq: "Twice daily with meals", refill: "Jun 15", status: "Refill Due", color: "var(--amber-700)", dr: "Dr. Chen", cond: "Type 2 Diabetes", qty: "60 tablets", left: 3, expiry: "Mar 22, 2027" },
  { id: "rx3", name: "Atorvastatin", dose: "20mg", freq: "Once daily, evening", refill: "Jul 3", status: "Active", color: "var(--teal-600)", dr: "Dr. Patel", cond: "High Cholesterol", qty: "30 tablets", left: 5, expiry: "Jul 1, 2027" },
  { id: "rx4", name: "Cetirizine", dose: "10mg", freq: "As needed for allergies", refill: "Aug 10", status: "Active", color: "var(--purple-700)", dr: "Dr. Chen", cond: "Seasonal Allergies", qty: "90 tablets", left: 4, expiry: "Aug 1, 2027" },
  { id: "rx5", name: "Omeprazole", dose: "20mg", freq: "Once daily before meals", refill: "Jun 8", status: "Refill Due", color: "var(--red-700)", dr: "Dr. Chen", cond: "Acid Reflux", qty: "30 capsules", left: 1, expiry: "Jun 30, 2026" },
];

const INVOICES = [
  { id: "INV-1042", date: "May 15, 2026", service: "Cardiology Consult", prov: "Dr. Patel", amount: "$200.00", owe: "$69.00", status: "Unpaid", due: "Jun 15, 2026" },
  { id: "INV-1041", date: "May 15, 2026", service: "Lab Panel", prov: "Lab Corp", amount: "$340.00", owe: "$179.50", status: "Unpaid", due: "Jun 15, 2026" },
  { id: "INV-1039", date: "Mar 22, 2026", service: "Primary Care Visit", prov: "Dr. Chen", amount: "$150.00", owe: "$30.00", status: "Paid", due: "—" },
  { id: "INV-1038", date: "Mar 22, 2026", service: "Immunization", prov: "Dr. Chen", amount: "$80.00", owe: "$16.00", status: "Paid", due: "—" },
  { id: "INV-1036", date: "Jan 10, 2026", service: "Dermatology Consult", prov: "Dr. Okafor", amount: "$175.00", owe: "$35.00", status: "Paid", due: "—" },
];

const CONVERSATIONS = [
  { id: "c1", prov: "patel",  preview: "Your ECG results look great…", time: "2h ago", unread: true },
  { id: "c2", prov: "chen",   preview: "Annual physical reminder…", time: "1d ago", unread: true },
  { id: "c3", prov: "billing",name: "Billing Department", preview: "Invoice INV-1042 ready…", time: "3d ago", unread: false, color: "var(--amber-700)", initials: "$", spec: "Patient Accounts" },
  { id: "c4", prov: "okafor", preview: "Follow-up notes attached…", time: "1w ago", unread: false },
  { id: "c5", prov: "lab",    name: "Lab Results", preview: "May 15 results available…", time: "1w ago", unread: false, color: "var(--green-600)", initials: "L", spec: "MedBridge Labs" },
];

const THREAD = [
  { from: "doc", text: "Hello Sarah,\n\nYour ECG and lab results look great. Blood pressure 118/76 is well-controlled, and your HbA1c improved to 6.8% from 7.2%.\n\nKeep up the good work. See you in 6 months.", time: "10:42 AM" },
  { from: "pat", text: "That's great news! I've been focused on my diet.\n\nShould I continue the same Metformin dosage?", time: "11:15 AM" },
  { from: "doc", text: "Yes — continue Metformin 500mg twice daily. No changes needed. Your current regimen is working well.", time: "11:28 AM" },
];

const NOTIFICATIONS = [
  { group: "Today", items: [
    { icon: "calendar-clock", color: "var(--brand-600)", title: "Appointment Reminder", body: "Dr. Arun Patel · Cardiology — Jun 3 at 10:30 AM", time: "2h ago", unread: true, actions: ["View Appointment", "Dismiss"] },
    { icon: "flask-conical", color: "var(--green-600)", title: "Lab Results Available", body: "Your May 15 lab panel results are ready to view.", time: "4h ago", unread: true, actions: ["View Results"] },
  ]},
  { group: "This Week", items: [
    { icon: "pill", color: "var(--amber-700)", title: "Refill Due — Metformin", body: "Metformin 500mg: 18 days remaining. Request a refill now.", time: "1d ago", unread: true, actions: ["Request Refill", "Remind Me"] },
    { icon: "credit-card", color: "var(--amber-700)", title: "Payment Due", body: "Invoice #INV-1042 for $69.00 is due June 15, 2026.", time: "2d ago", unread: false, actions: ["Pay Now", "View Invoice"] },
    { icon: "message-square", color: "var(--teal-600)", title: "Message from Dr. Chen", body: "A message about your upcoming annual physical.", time: "3d ago", unread: false, actions: ["Read Message"] },
  ]},
  { group: "Earlier", items: [
    { icon: "circle-check", color: "var(--green-600)", title: "Appointment Confirmed", body: "Dr. Patel on Jun 3 at 10:30 AM is confirmed.", time: "5d ago", unread: false, actions: ["View Details"] },
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
