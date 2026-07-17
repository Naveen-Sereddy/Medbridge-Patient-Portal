/* MedBridge UX Case Study — Artifact 1 (Personas) + Artifact 2 (Journey Map) */

/* ============================ 1 · USER PERSONAS ============================ */
const PERSONAS = [
  {
    initials: "BM", color: "var(--brand-600)", name: "Beth Mooney", age: 36,
    role: "Marketing Manager · Patient", loc: "New York, NY",
    tech: 4, techLabel: "High",
    chips: [["smartphone", "iPhone 15 — mobile-first"], ["shield-check", "Insured · BlueCross BS"], ["repeat", "Opens portal 3×/week"]],
    tag: { text: "Manages 2 chronic conditions", icon: "heart-pulse" },
    bio: "Juggles a demanding job, two chronic conditions, and a young family. Wants to manage her health in the margins of a busy day — almost entirely from her phone.",
    goals: [
      "See every upcoming appointment, refill, and bill at a glance",
      "Understand lab results in plain language — not codes",
      "Book and reschedule care after hours, no phone calls",
    ],
    pains: [
      "Health info scattered across 4–5 disconnected portals",
      "Clinical jargon makes results hard to interpret",
      "Misses refill windows and gets surprise bills",
    ],
    behaviors: [
      "Checks the portal on mobile during her commute",
      "Books care late at night, after the kids are asleep",
    ],
    quote: "I just want one place that tells me what to do next — not five logins and a phone tree.",
  },
  {
    initials: "MO", color: "var(--teal-600)", name: "Mitchell Owen", age: 68,
    role: "Retired Teacher · Caregiver", loc: "Tucson, AZ",
    tech: 2, techLabel: "Low–Moderate",
    chips: [["tablet", "iPad — kitchen table"], ["shield", "Medicare"], ["users", "Caregiver access × 2"]],
    tag: { text: "Needs large text · high contrast", icon: "accessibility" },
    bio: "Manages care for himself and his wife, Nicola, after her recent surgery. Comfortable with the basics but anxious about getting something wrong online.",
    goals: [
      "Keep his and Nicola's appointments in one organized place",
      "Read everything in large, high-contrast text",
      "Reach a real person quickly when he gets stuck",
    ],
    pains: [
      "Dense screens and tiny text are hard to read",
      "Afraid of clicking the wrong button and breaking something",
      "Switching between his and Nicola's accounts is confusing",
    ],
    behaviors: [
      "Uses a tablet at the kitchen table, glasses on",
      "Prints visit summaries and tapes them to the fridge",
    ],
    quote: "If I can't read it or I get lost, I just call the office — which defeats the whole purpose.",
  },
];

function TechMeter({ level, label, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
      <Kick style={{ letterSpacing: "0.08em" }}>Tech literacy</Kick>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} style={{ width: 22, height: 7, borderRadius: 3,
            background: i < level ? color : "var(--n-200)" }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 700, color: "var(--fg-1)" }}>{label}</span>
      </div>
    </div>
  );
}

function PersonaCard({ p }) {
  const Mini = ({ title, icon, items, color }) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
        <span style={{ color: color, display: "inline-flex" }}><Icon name={icon} size={16} /></span>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-1)" }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((t, i) => <DotItem key={i} color={color}>{t}</DotItem>)}
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, minWidth: 0, border: "1px solid var(--border)", borderRadius: 18, background: "#fff",
      boxShadow: "var(--shadow-md)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* identity header */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "24px 26px",
        borderBottom: "1px solid var(--n-100)", background: "var(--n-50)" }}>
        <span className="avatar" style={{ width: 78, height: 78, fontSize: 27, background: p.color, flex: "none" }}>{p.initials}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}>{p.name}</h2>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-3)" }} className="ds-num">{p.age}</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--fg-2)", fontWeight: 500, marginTop: 3 }}>{p.role}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--fg-3)", marginTop: 4 }}>
            <Icon name="map-pin" size={14} />{p.loc}
          </div>
        </div>
        <TechMeter level={p.tech} label={p.techLabel} color={p.color} />
      </div>
      {/* body */}
      <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.chips.map(([ic, t], i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px",
              borderRadius: 999, background: "var(--n-100)", fontSize: 12.5, fontWeight: 600, color: "var(--fg-2)" }}>
              <Icon name={ic} size={14} />{t}</span>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--fg-2)" }}>{p.bio}</p>
        <div style={{ display: "flex", gap: 28 }}>
          <Mini title="Goals" icon="target" items={p.goals} color="var(--brand-600)" />
          <Mini title="Pain Points" icon="frown" items={p.pains} color="var(--red-700)" />
        </div>
        <div style={{ height: 1, background: "var(--n-100)" }} />
        <Mini title="Behaviors" icon="activity" items={p.behaviors} color="var(--teal-600)" />
        <div style={{ marginTop: "auto", display: "flex", gap: 14, alignItems: "stretch" }}>
          <div style={{ flex: 1, display: "flex", gap: 14, padding: "16px 18px", borderRadius: 12,
            background: "var(--brand-50)", borderLeft: `4px solid ${p.color}` }}>
            <Icon name="quote" size={22} style={{ color: p.color, flex: "none" }} />
            <p style={{ margin: 0, fontSize: 15.5, fontStyle: "italic", fontWeight: 500, color: "var(--n-800)", lineHeight: 1.45 }}>“{p.quote}”</p>
          </div>
        </div>
        <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 7, padding: "6px 12px",
          borderRadius: 8, background: "var(--amber-bg)", color: "var(--amber-700)", fontSize: 12.5, fontWeight: 600 }}>
          <Icon name={p.tag.icon} size={15} />{p.tag.text}
        </div>
      </div>
    </div>
  );
}

function PersonasArtifact() {
  return (
    <ArtifactFrame n="01" kicker="Discovery · Research" title="User Personas"
      desc="Two primary archetypes anchor every design decision — spanning the widest gap in tech literacy MedBridge must serve: a mobile-first patient and an older caregiver.">
      <div style={{ flex: 1, display: "flex", gap: 28, minHeight: 0 }}>
        {PERSONAS.map((p, i) => <PersonaCard key={i} p={p} />)}
      </div>
    </ArtifactFrame>
  );
}

/* ============================ NEW · COMPETITIVE RESEARCH =================== */

const RESEARCH_PLATFORMS = [
  {
    name: "MyChart", company: "Epic Systems",
    color: "var(--brand-600)", colorBg: "var(--brand-50)",
    colorBorder: "oklch(0.84 0.06 240)",
    icon: "stethoscope",
    method: "Active patient — 3 months of refill tracking, lab review, and appointment booking on iOS and desktop.",
    frictions: [
      {
        title: "Prescription refills buried 4 taps deep",
        detail: "Refills live under Menu → Health → Medications → Refill, a path that resets every session. A task patients run weekly is hidden behind general navigation designed for one-time setup.",
        fix: "MedBridge surfaces active prescriptions and refill CTAs directly on the dashboard — zero drilling.",
      },
      {
        title: "Lab results shown as raw clinical codes",
        detail: "Results display as 'EGFR 62 mL/min/1.73m²' with no plain-language interpretation or next-step guidance. Patients are left to Google values that should come with built-in context.",
        fix: "Each result pairs with a plain-English label, a reference-range indicator, and a suggested next action.",
      },
      {
        title: "Rescheduling requires a phone call",
        detail: "Cancelling inside the app surfaces a 'please call the office' prompt — no self-serve reschedule. The portal's core promise breaks at its most critical moment of use.",
        fix: "Booking is fully self-serve in both directions: book, reschedule, and cancel without calling.",
      },
    ],
  },
  {
    name: "Zocdoc", company: "Zocdoc Inc.",
    color: "var(--teal-600)", colorBg: "oklch(0.97 0.01 185)",
    colorBorder: "oklch(0.88 0.04 185)",
    icon: "calendar-search",
    method: "Booked 2 specialist appointments; tested filter persistence, insurance flow, and back-navigation on mobile and desktop.",
    frictions: [
      {
        title: "Filters reset every time you view a profile",
        detail: "Navigating back from a doctor's detail page clears specialty, insurance, and location filters to defaults. Every back-navigation restarts the search from scratch on mobile.",
        fix: "Search state persists across the full booking session — back always returns to your last filtered results.",
      },
      {
        title: "In-network status confirmed only at checkout",
        detail: "Insurance compatibility isn't surfaced until after the patient has chosen a doctor and a slot. The late rug-pull is a measurable, high-severity drop-off moment.",
        fix: "Results default to in-network only; co-pay estimates appear before a slot is chosen, never after.",
      },
      {
        title: "No continuity with the patient's own records",
        detail: "There's no connection between a booking and the patient's history, current medications, or prior visits. Every new appointment starts completely from zero on both sides.",
        fix: "MedBridge pre-fills provider intake with existing records and flags relevant conditions automatically.",
      },
    ],
  },
  {
    name: "Teladoc", company: "Teladoc Health",
    color: "oklch(0.45 0.18 290)", colorBg: "oklch(0.97 0.02 290)",
    colorBorder: "oklch(0.87 0.06 290)",
    icon: "video",
    method: "Completed 2 virtual visits; tested billing transparency, visit notes, and care-coordination flows end-to-end.",
    frictions: [
      {
        title: "Visit format unclear until the confirmation email",
        detail: "Whether a visit is video or phone isn't shown during booking — it appears only post-booking. Patients prepare the wrong setup and show up to the wrong kind of appointment.",
        fix: "Visit type (in-person / video / phone) is the first visible filter in Find-a-Doctor, never a footnote.",
      },
      {
        title: "Billing is a single opaque line item",
        detail: "'Service fee — $75' with no itemization of insurance contribution, deductible applied, or explanation for cost changes between identical visits. Surprise billing erodes trust fast.",
        fix: "Billing screen itemizes every charge in plain language: insurance paid, patient owes, deductible applied.",
      },
      {
        title: "Visit notes siloed from primary care",
        detail: "Teladoc summaries have no built-in path to the patient's regular doctor, creating gaps in the longitudinal record that neither party can easily close without a phone call.",
        fix: "Medical Records hub consolidates notes from all providers; share with a primary care doctor in one tap.",
      },
    ],
  },
];

const METHOD_NOTES = [
  {
    icon: "clipboard-list",
    title: "Contextual research → Personas",
    body: "Beth and Mitchell weren't assembled from survey aggregates. Their goals, pains, and behaviors came from patterns observed across real sessions — including the exact moments each portal lost its user. That specificity is why the personas hold up as design filters rather than decor.",
  },
  {
    icon: "map",
    title: "Heuristic walkthroughs → Journey map",
    body: "The journey map's two friction hotspots — Find a Doctor and Date & Time — map directly to the Zocdoc filter-reset and MyChart slot-scarcity findings above. Research structured the journey; it didn't just validate a pre-drawn one.",
  },
  {
    icon: "shield-check",
    title: "WCAG 2.1 AA as a design constraint, not a checklist",
    body: "Contrast ratios, keyboard focus order, and 44 px touch targets were requirements from the first wireframe sketch. Mitchell's persona — aging vision, low tech literacy, high anxiety about mistakes — made accessibility a first-class design requirement from day one.",
  },
];

function ResearchArtifact() {
  return (
    <ArtifactFrame
      n="02" kicker="Discovery · Competitive Research"
      title="Competitive Research — Heuristic Walkthroughs"
      desc="Three platforms used as a real patient/caregiver — not a feature-comparison teardown. Each session surfaced friction a side-by-side matrix would never catch, and seeded the IA decisions that follow.">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Platform columns */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 20 }}>
          {RESEARCH_PLATFORMS.map((pl, pi) => (
            <div key={pi} style={{
              flex: 1, minWidth: 0, border: "1px solid var(--border)", borderRadius: 16,
              overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-sm)"
            }}>
              {/* header */}
              <div style={{
                background: pl.colorBg, borderBottom: `1px solid ${pl.colorBorder}`,
                padding: "18px 22px", display: "flex", flexDirection: "column", gap: 10, flex: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    width: 42, height: 42, borderRadius: 11, background: pl.color,
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"
                  }}><Icon name={pl.icon} size={21} /></span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--fg-1)" }}>{pl.name}</div>
                    <div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 500, marginTop: 1 }}>{pl.company}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.45,
                  padding: "9px 12px", borderRadius: 8,
                  background: "rgba(255,255,255,0.72)", border: `1px solid ${pl.colorBorder}`
                }}>
                  <span style={{ fontWeight: 700, color: pl.color }}>Method: </span>{pl.method}
                </div>
              </div>
              {/* frictions */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 22px", gap: 14 }}>
                {pl.frictions.map((fr, fi) => (
                  <div key={fi} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 999,
                        background: "var(--red-bg, #fef2f2)", border: "1.5px solid var(--red-700)",
                        color: "var(--red-700)", fontSize: 11, fontWeight: 800,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        flex: "none", marginTop: 1
                      }}>{fi + 1}</span>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--fg-1)", lineHeight: 1.25 }}>{fr.title}</div>
                        <div style={{ fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.45, marginTop: 4 }}>{fr.detail}</div>
                      </div>
                    </div>
                    <div style={{
                      display: "flex", gap: 8, alignItems: "flex-start",
                      padding: "8px 11px", borderRadius: 8,
                      background: "var(--green-bg, #f0fdf4)", marginLeft: 32
                    }}>
                      <Icon name="arrow-right" size={14} style={{ color: "var(--green-600)", flex: "none", marginTop: 2 }} />
                      <span style={{ fontSize: 12, color: "var(--n-800)", lineHeight: 1.4, fontWeight: 500 }}>
                        <span style={{ fontWeight: 700, color: "var(--green-600)" }}>MedBridge: </span>{fr.fix}
                      </span>
                    </div>
                    {fi < pl.frictions.length - 1 && (
                      <div style={{ height: 1, background: "var(--n-100)", marginTop: 2 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* methodology strip */}
        <div style={{
          flex: "none", display: "flex", gap: 0,
          border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-sm)"
        }}>
          {METHOD_NOTES.map((m, i) => (
            <div key={i} style={{
              flex: 1, padding: "18px 22px", display: "flex", gap: 14, alignItems: "flex-start",
              background: i === 1 ? "var(--n-50)" : "#fff",
              borderRight: i < METHOD_NOTES.length - 1 ? "1px solid var(--border)" : "none"
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 9, background: ACCENT,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"
              }}><Icon name={m.icon} size={18} /></span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--fg-1)", marginBottom: 5 }}>{m.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.5 }}>{m.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArtifactFrame>
  );
}

/* ============================ 2 · JOURNEY MAP ============================ */
const J_STAGES = [
  { n: 1, name: "Realize & Decide", goal: "“I should see my cardiologist soon.”", friction: false },
  { n: 2, name: "Find the Right Doctor", goal: "“Who's in-network and accepting visits?”", friction: true },
  { n: 3, name: "Choose Date & Time", goal: "“I need a slot that fits my week.”", friction: true },
  { n: 4, name: "Confirm & Prepare", goal: "“Is this covered? What do I bring?”", friction: false },
  { n: 5, name: "Post-Booking", goal: "“Booked — remind me so I don't forget.”", friction: false },
];
const J_EMOTION = [
  { v: 56, mood: "Unsure", color: "var(--amber-700)" },
  { v: 34, mood: "Overwhelmed", color: "var(--red-700)" },
  { v: 26, mood: "Frustrated", color: "var(--red-700)" },
  { v: 62, mood: "Relieved", color: "var(--brand-600)" },
  { v: 82, mood: "Reassured", color: "var(--green-600)" },
];
const J_ROWS = {
  actions: [
    "Notices BP refill nudge; decides to book a follow-up",
    "Searches providers; filters by specialty & insurance",
    "Opens calendar; scans for an evening or telehealth slot",
    "Reviews summary, co-pay estimate & pre-visit notes",
    "Receives confirmation; adds to calendar; sets reminder",
  ],
  touch: [
    ["Dashboard alert", "Email nudge"],
    ["Find a Doctor", "Provider profile"],
    ["Booking calendar", "Time-slot grid"],
    ["Review step", "Insurance banner"],
    ["Confirmation", "Email + push", "Calendar"],
  ],
  pains: [
    "Easy to keep postponing — no clear prompt to act",
    "Too many results; in-network status unclear; choice paralysis",
    "Few slots fit a 9–5 schedule; availability hard to parse",
    "Co-pay & coverage feel uncertain at the last step",
    "Reminders can get lost in a noisy inbox",
  ],
  opps: [
    "Surface a contextual “Book follow-up” CTA on the dashboard",
    "Default to in-network; smart sort by soonest + best match",
    "Highlight evening/telehealth; show real availability up front",
    "Show co-pay estimate & accepted insurance before confirming",
    "Multi-channel reminders + one-tap add-to-calendar",
  ],
};

function EmotionCurve() {
  const W = 1000, H = 150, pad = 60;
  const n = J_EMOTION.length;
  const xs = J_EMOTION.map((_, i) => pad + (i * (W - pad * 2)) / (n - 1));
  const ys = J_EMOTION.map(e => H - 18 - (e.v / 100) * (H - 50));
  const pts = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {[0.25, 0.5, 0.75].map((g, i) => (
          <line key={i} x1={pad} x2={W - pad} y1={H - 18 - g * (H - 50)} y2={H - 18 - g * (H - 50)}
            stroke="var(--n-100)" strokeWidth="1" />
        ))}
        <polyline points={pts} fill="none" stroke="var(--brand-400)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" />
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="7" fill="#fff" stroke={J_EMOTION[i].color} strokeWidth="3.5" />
        ))}
      </svg>
      {J_EMOTION.map((e, i) => (
        <div key={i} style={{ position: "absolute", left: `${(xs[i] / W) * 100}%`, top: `${(ys[i] / H) * 100}%`,
          transform: "translate(-50%, -150%)", fontSize: 12, fontWeight: 700, color: e.color, whiteSpace: "nowrap" }}>
          {e.mood}
        </div>
      ))}
    </div>
  );
}

function JourneyArtifact() {
  const COLS = "172px repeat(5, 1fr)";
  const cell = { padding: "12px 14px", borderRight: "1px solid var(--n-100)" };
  const rowLabel = (icon, text, sub) => (
    <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4,
      background: "var(--n-50)", borderRight: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name={icon} size={16} style={{ color: ACCENT }} />
        <span style={{ fontSize: 13, fontWeight: 700 }}>{text}</span>
      </div>
      {sub && <span style={{ fontSize: 11, color: "var(--fg-3)" }}>{sub}</span>}
    </div>
  );
  return (
    <ArtifactFrame n="03" kicker="Experience · Service Design" title="User Journey Map — “Book an Appointment”"
      desc="Beth's path from realizing she needs care to a confirmed visit. Two friction points — finding an in-network doctor and finding a slot that fits — drive the redesign priorities.">
      <div style={{ flex: 1, minHeight: 0, border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "var(--shadow-sm)" }}>
        {/* stage header */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, borderBottom: "1px solid var(--border)" }}>
          <div style={{ background: "var(--sidebar-bg)", color: "#fff", padding: "14px", display: "flex",
            flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7 }}>Stages →</span>
            <span style={{ fontSize: 12.5, marginTop: 3, color: "var(--sidebar-text)" }}>Patient: Beth</span>
          </div>
          {J_STAGES.map(s => (
            <div key={s.n} style={{ padding: "13px 14px", borderRight: "1px solid var(--n-100)",
              background: s.friction ? "var(--brand-50)" : "#fff",
              borderTop: s.friction ? `3px solid ${ACCENT}` : "3px solid transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: s.friction ? ACCENT : "var(--n-200)",
                  color: s.friction ? "#fff" : "var(--fg-2)", fontSize: 12, fontWeight: 700, display: "inline-flex",
                  alignItems: "center", justifyContent: "center", flex: "none" }}>{s.n}</span>
                <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.1 }}>{s.name}</span>
              </div>
              <div style={{ fontSize: 12, color: s.friction ? "var(--brand-700)" : "var(--fg-3)", marginTop: 7, fontStyle: "italic" }}>{s.goal}</div>
            </div>
          ))}
        </div>
        {/* user actions */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, borderBottom: "1px solid var(--n-100)" }}>
          {rowLabel("mouse-pointer-click", "User Actions")}
          {J_ROWS.actions.map((t, i) => (
            <div key={i} style={{ ...cell, fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.4 }}>{t}</div>
          ))}
        </div>
        {/* touchpoints */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, borderBottom: "1px solid var(--n-100)" }}>
          {rowLabel("layout-grid", "Touchpoints")}
          {J_ROWS.touch.map((arr, i) => (
            <div key={i} style={{ ...cell, display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start" }}>
              {arr.map((t, j) => (
                <span key={j} style={{ fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 6,
                  background: "var(--n-100)", color: "var(--fg-2)" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
        {/* emotion curve */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, borderBottom: "1px solid var(--n-100)", background: "var(--n-50)" }}>
          {rowLabel("activity", "Emotion", "Highs & lows")}
          <div style={{ gridColumn: "2 / 7", padding: "8px 10px 6px", minHeight: 116 }}>
            <EmotionCurve />
          </div>
        </div>
        {/* pain points */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, borderBottom: "1px solid var(--n-100)" }}>
          {rowLabel("triangle-alert", "Pain Points")}
          {J_ROWS.pains.map((t, i) => {
            const fr = J_STAGES[i].friction;
            return (
              <div key={i} style={{ ...cell, fontSize: 12.5, lineHeight: 1.4,
                background: fr ? "var(--red-bg)" : "#fff", color: fr ? "var(--red-700)" : "var(--fg-2)" }}>
                <div style={{ display: "flex", gap: 7 }}>
                  {fr && <Icon name="alert-circle" size={15} style={{ flex: "none", marginTop: 1 }} />}
                  <span style={{ fontWeight: fr ? 600 : 400 }}>{t}</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* opportunities */}
        <div style={{ display: "grid", gridTemplateColumns: COLS }}>
          {rowLabel("lightbulb", "Opportunities")}
          {J_ROWS.opps.map((t, i) => (
            <div key={i} style={{ ...cell, fontSize: 12.5, lineHeight: 1.4, color: "var(--n-800)",
              background: "var(--green-bg)" }}>
              <div style={{ display: "flex", gap: 7 }}>
                <Icon name="arrow-up-right" size={15} style={{ color: "var(--green-600)", flex: "none", marginTop: 1 }} />
                <span style={{ fontWeight: 500 }}>{t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArtifactFrame>
  );
}

Object.assign(window, { PersonasArtifact, ResearchArtifact, JourneyArtifact });
