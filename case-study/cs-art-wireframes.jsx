/* MedBridge UX Case Study — Artifact 4 (Lo-fi) + Artifact 5 (Mid-fi)
   The SAME three screens rendered twice. `lo` → grayscale boxes, no real
   type, no color. `mid` → real labels, defined components, basic hierarchy,
   and ONE accent (brand blue) reserved strictly for primary actions and the
   active nav item. Built on the wireframe primitives in cs-frame.jsx. */

const W = WIRE;

/* ---------- tiny shared atoms ------------------------------------------- */
// Text that degrades to a grey bar in lo-fi.
function Tx({ lo, children, w = 80, h = 9, size = 13, weight = 600, color = W.ink, c, style }) {
  if (lo) return <WBar w={w} h={h} c={c} r={4} />;
  return <span style={{ fontSize: size, fontWeight: weight, color, lineHeight: 1.25, ...(style || {}) }}>{children}</span>;
}
// Primary action — grey in lo-fi, accent in mid-fi.
function PrimaryBtn({ lo, children, w, icon }) {
  return (
    <div style={{ height: 32, width: w, padding: "0 16px", borderRadius: 8, display: "inline-flex",
      alignItems: "center", justifyContent: "center", gap: 7, flex: "none",
      background: lo ? W.fill : ACCENT, color: lo ? W.ink : "#fff", fontSize: 12.5, fontWeight: 700 }}>
      {lo ? <WBar w={typeof w === "number" ? w - 30 : 56} h={8} c={W.line} />
          : (<>{icon && <Icon name={icon} size={15} />}{children}</>)}
    </div>
  );
}
// Status chip — grey in lo-fi, soft-tinted in mid-fi.
function Chip({ lo, children, tone = "neutral" }) {
  const tones = {
    neutral: ["var(--n-100)", "var(--fg-2)"], green: ["var(--green-bg)", "var(--green-600)"],
    blue: ["var(--brand-50)", "var(--brand-600)"], amber: ["var(--amber-bg)", "var(--amber-700)"],
  };
  const [bg, fg] = tones[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 22, padding: "0 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, background: lo ? W.fill : bg, color: lo ? "transparent" : fg }}>
      {lo ? <WBar w={36} h={7} c={W.line} /> : children}</span>
  );
}
// Section heading row with optional trailing link.
function Head({ lo, label, link }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0 10px" }}>
      <Tx lo={lo} w={120} h={10} size={13.5} weight={700} color={W.ink}>{label}</Tx>
      {link && (lo ? <WBar w={52} h={8} c={W.faint} /> : <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--n-400)" }}>{link}</span>)}
    </div>
  );
}
// App nav rail — accent active pill only in mid-fi.
function Rail({ lo, active = 0 }) {
  return (
    <div style={{ width: 50, background: lo ? "#eef1f5" : "var(--sidebar-bg)", borderRight: `1px solid ${W.fill}`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "12px 0", flex: "none", borderRadius: "10px 0 0 10px" }}>
      <div style={{ width: 24, height: 24, borderRadius: 7, background: lo ? W.faint : "rgba(255,255,255,.16)", marginBottom: 6, flex: "none" }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ width: 30, height: 30, borderRadius: 8, flex: "none", display: "flex", alignItems: "center", justifyContent: "center",
          background: !lo && i === active ? "rgba(29,111,219,.22)" : lo && i === active ? W.faint : "transparent" }}>
          <div style={{ width: 16, height: 16, borderRadius: 5, background: lo ? (i === active ? W.line : W.faint) : (i === active ? "#fff" : "#5C6B82") }} />
        </div>
      ))}
    </div>
  );
}
const card = (extra) => ({ background: "#fff", border: `1px solid ${W.fill}`, borderRadius: 9, ...extra });

/* ====================================================================== */
/* SCREEN A — Patient Dashboard                                            */
/* ====================================================================== */
function ScreenDashboard({ lo }) {
  const stats = [["Upcoming", "3"], ["Prescriptions", "5"], ["Balance", "$248"], ["Messages", "2"]];
  const appts = [
    ["Dr. Rahul Nair", "Cardiology", "Jun 3 · 10:30 AM", "Confirmed", "blue"],
    ["Dr. Freya Kemp", "Primary Care", "Jun 12 · 2:00 PM", "Telehealth", "green"],
    ["Dr. Ryan Miller", "Dermatology", "Jun 17 · 9:00 AM", "Pending", "amber"],
  ];
  const vitals = [["Blood Pressure", "118/76"], ["Heart Rate", "72 bpm"], ["Blood Sugar", "98"], ["BMI", "22.4"]];
  return (
    <WScreen title={lo ? null : "medbridge.health/dashboard"} style={{ height: "100%" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", background: "#fff", borderRadius: 8, overflow: "hidden", border: `1px solid ${W.fill}` }}>
        <Rail lo={lo} active={0} />
        <div style={{ flex: 1, minWidth: 0, padding: 16, display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
          {/* greeting */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Tx lo={lo} w={210} h={14} size={17} weight={700} color="var(--fg-1)">Good morning, Beth</Tx>
            <Tx lo={lo} w={150} h={8} size={12} weight={500} color="var(--fg-3)">Your next appointment is in 3 days</Tx>
          </div>
          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {stats.map(([l, v], i) => (
              <div key={i} style={card({ padding: "11px 12px", borderTop: `3px solid ${lo ? W.faint : ACCENT}`, display: "flex", flexDirection: "column", gap: 7 })}>
                <Tx lo={lo} w={56} h={7} size={10} weight={600} color="var(--fg-3)" style={{ textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</Tx>
                <Tx lo={lo} w={34} h={13} size={22} weight={800} color="var(--fg-1)">{v}</Tx>
              </div>
            ))}
          </div>
          {/* upcoming */}
          <div>
            <Head lo={lo} label="Upcoming Appointments" link="View all →" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {appts.map(([n, s, t, st, tone], i) => (
                <div key={i} style={card({ padding: "10px 12px", display: "flex", alignItems: "center", gap: 11,
                  borderLeft: `3px solid ${lo ? W.faint : `var(--${tone === "blue" ? "brand-600" : tone === "green" ? "teal-600" : "purple-700"})`}` })}>
                  <div style={{ width: 34, height: 34, borderRadius: 999, flex: "none",
                    background: lo ? W.fill : `var(--${tone === "blue" ? "brand-600" : tone === "green" ? "teal-600" : "purple-700"})` }} />
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                    <Tx lo={lo} w={130} h={8} size={13} weight={600} color="var(--fg-1)">{n}</Tx>
                    <Tx lo={lo} w={170} h={7} size={11.5} weight={500} color="var(--fg-3)">{s} · {t}</Tx>
                  </div>
                  <Chip lo={lo} tone={tone}>{st}</Chip>
                </div>
              ))}
            </div>
          </div>
          {/* health summary */}
          <div>
            <Head lo={lo} label="Health Summary" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {vitals.map(([l, v], i) => (
                <div key={i} style={card({ padding: "9px 11px", display: "flex", alignItems: "center", gap: 9 })}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, flex: "none", background: lo ? W.fill : "var(--brand-50)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Tx lo={lo} w={64} h={6} size={10.5} weight={500} color="var(--fg-3)">{l}</Tx>
                    <Tx lo={lo} w={40} h={8} size={13} weight={700} color="var(--fg-1)">{v}</Tx>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WScreen>
  );
}

/* ====================================================================== */
/* SCREEN B — Find a Doctor + Booking                                      */
/* ====================================================================== */
function ScreenBooking({ lo }) {
  const docs = [
    ["Dr. Rahul Nair", "Cardiology · In-network", "4.9", true],
    ["Dr. Amy Jones", "Neurology · In-network", "5.0", false],
    ["Dr. Rob Stubbs", "Orthopedics · In-network", "4.7", false],
  ];
  const slots = ["8:30", "9:00", "10:30", "1:15", "2:00", "3:45"];
  return (
    <WScreen title={lo ? null : "medbridge.health/find-a-doctor"} style={{ height: "100%" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", background: "#fff", borderRadius: 8, overflow: "hidden", border: `1px solid ${W.fill}` }}>
        <Rail lo={lo} active={2} />
        <div style={{ flex: 1, minWidth: 0, padding: 16, display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }}>
          <Tx lo={lo} w={150} h={13} size={16} weight={700} color="var(--fg-1)">Find a Doctor</Tx>
          {/* search */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, height: 38, padding: "0 13px", borderRadius: 8, background: lo ? W.paper : "#fff", border: `1px solid ${W.faint}` }}>
            <div style={{ width: 15, height: 15, borderRadius: 999, border: `2px solid ${W.line}`, flex: "none" }} />
            <Tx lo={lo} w={200} h={8} size={12.5} weight={500} color="var(--fg-3)">Search doctor, specialty or condition…</Tx>
          </div>
          {/* filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["In-network", "blue"], ["Specialty", "neutral"], ["Soonest", "neutral"], ["Telehealth", "neutral"]].map(([f, tone], i) => (
              <Chip key={i} lo={lo} tone={tone}>{f}</Chip>
            ))}
          </div>
          {/* split: provider list + date/time */}
          <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 12 }}>
            {/* providers */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <Head lo={lo} label="6 providers" />
              {docs.map(([n, s, r, sel], i) => (
                <div key={i} style={card({ padding: "10px 11px", display: "flex", alignItems: "center", gap: 10,
                  border: !lo && sel ? `1.5px solid ${ACCENT}` : `1px solid ${W.fill}`, background: !lo && sel ? "var(--brand-50)" : "#fff" })}>
                  <div style={{ width: 32, height: 32, borderRadius: 999, flex: "none", background: lo ? W.fill : "var(--brand-600)" }} />
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    <Tx lo={lo} w={110} h={8} size={12.5} weight={600} color="var(--fg-1)">{n}</Tx>
                    <Tx lo={lo} w={140} h={6} size={10.5} weight={500} color="var(--fg-3)">{s}</Tx>
                  </div>
                  {!lo && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--amber-700)", flex: "none" }}>★ {r}</span>}
                </div>
              ))}
            </div>
            {/* date/time */}
            <div style={card({ padding: 12, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 })}>
              <Head lo={lo} label="June 2026" link="‹ ›" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                {Array.from({ length: 28 }).map((_, i) => {
                  const day = i + 1, unavail = [4, 5, 6, 11, 12].includes(day), pick = !lo && day === 3;
                  return (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9.5, fontWeight: 600, background: pick ? ACCENT : unavail ? W.paper : lo ? W.fillSoft : "#fff",
                      color: pick ? "#fff" : unavail ? W.faint : lo ? "transparent" : "var(--fg-2)",
                      border: `1px solid ${pick ? ACCENT : W.fill}` }}>{lo ? "" : day}</div>
                  );
                })}
              </div>
              <Head lo={lo} label="Available · Jun 3" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {slots.map((s, i) => (
                  <div key={i} style={{ height: 26, padding: "0 10px", borderRadius: 6, display: "flex", alignItems: "center",
                    fontSize: 10.5, fontWeight: 600, border: `1px solid ${!lo && i === 2 ? ACCENT : W.faint}`,
                    background: !lo && i === 2 ? "var(--brand-50)" : "#fff", color: !lo && i === 2 ? "var(--brand-600)" : lo ? "transparent" : "var(--fg-2)" }}>
                    {lo ? <WBar w={26} h={7} c={W.line} /> : s}</div>
                ))}
              </div>
              <div style={{ marginTop: "auto" }}><PrimaryBtn lo={lo} w="100%" icon="arrow-right">Continue</PrimaryBtn></div>
            </div>
          </div>
        </div>
      </div>
    </WScreen>
  );
}

/* ====================================================================== */
/* SCREEN C — Medical Records                                              */
/* ====================================================================== */
function ScreenRecords({ lo }) {
  const tabs = ["Overview", "History", "Test Results", "Files"];
  const rows = [
    ["Comprehensive Metabolic Panel", "May 15", "Dr. Kemp", "Normal", "green"],
    ["HbA1c Blood Test", "May 15", "Dr. Kemp", "6.8% · Controlled", "green"],
    ["Lipid Panel", "May 15", "Dr. Nair", "LDL 98 mg/dL", "green"],
    ["ECG — 12 Lead", "Nov 8", "Dr. Nair", "Normal sinus", "green"],
    ["CBC with Differential", "Mar 22", "Dr. Kemp", "Within range", "green"],
  ];
  return (
    <WScreen title={lo ? null : "medbridge.health/records"} style={{ height: "100%" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", background: "#fff", borderRadius: 8, overflow: "hidden", border: `1px solid ${W.fill}` }}>
        <Rail lo={lo} active={3} />
        <div style={{ flex: 1, minWidth: 0, padding: 16, display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }}>
          <Tx lo={lo} w={170} h={13} size={16} weight={700} color="var(--fg-1)">Medical Records</Tx>
          {/* tabs */}
          <div style={{ display: "flex", gap: 18, borderBottom: `1px solid ${W.fill}`, paddingBottom: 2 }}>
            {tabs.map((t, i) => (
              <div key={i} style={{ paddingBottom: 8, position: "relative" }}>
                <Tx lo={lo} w={i === 2 ? 70 : 52} h={8} size={12.5} weight={i === 2 ? 700 : 500}
                  color={!lo && i === 2 ? "var(--brand-600)" : "var(--fg-3)"} c={i === 2 ? W.ink : W.faint}>{t}</Tx>
                {i === 2 && <div style={{ position: "absolute", left: 0, right: 0, bottom: -3, height: 2, borderRadius: 2, background: lo ? W.line : ACCENT }} />}
              </div>
            ))}
          </div>
          {/* summary chips */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
            {[["Conditions", "3"], ["Allergies", "3"], ["Medications", "5"]].map(([l, v], i) => (
              <div key={i} style={card({ padding: "9px 11px", display: "flex", flexDirection: "column", gap: 5 })}>
                <Tx lo={lo} w={52} h={6} size={10} weight={600} color="var(--fg-3)" style={{ textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</Tx>
                <Tx lo={lo} w={20} h={10} size={17} weight={800} color="var(--fg-1)">{v}</Tx>
              </div>
            ))}
          </div>
          {/* results table */}
          <div style={card({ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" })}>
            <div style={{ display: "grid", gridTemplateColumns: "1.7fr 0.7fr 0.9fr 0.7fr", gap: 8, padding: "9px 13px", background: lo ? W.paper : "var(--n-50)", borderBottom: `1px solid ${W.fill}` }}>
              {["Test", "Date", "Result", "Status"].map((h, i) => (
                <Tx key={i} lo={lo} w={i === 0 ? 50 : 36} h={6} size={9.5} weight={700} color="var(--n-500)" style={{ textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</Tx>
              ))}
            </div>
            {rows.map(([n, d, by, res, tone], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.7fr 0.7fr 0.9fr 0.7fr", gap: 8, padding: "11px 13px", alignItems: "center",
                borderBottom: i < rows.length - 1 ? `1px solid ${W.fillSoft}` : "none" }}>
                <Tx lo={lo} w={150} h={8} size={11.5} weight={600} color="var(--fg-1)">{n}</Tx>
                <Tx lo={lo} w={40} h={7} size={11} weight={500} color="var(--fg-3)">{d}</Tx>
                <Tx lo={lo} w={70} h={7} size={11} weight={500} color="var(--fg-2)">{res}</Tx>
                <Chip lo={lo} tone={tone}>Reviewed</Chip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WScreen>
  );
}

/* ---------- column = screen + 1-line rationale -------------------------- */
function WireCol({ lo, badge, title, screen, rationale }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11, flex: "none" }}>
        <span style={{ width: 24, height: 24, borderRadius: 7, background: lo ? "var(--n-200)" : ACCENT, color: lo ? "var(--n-600)" : "#fff",
          fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{badge}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--fg-1)" }}>{title}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{screen}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 12, flex: "none" }}>
        <Icon name="corner-down-right" size={15} style={{ color: lo ? "var(--n-400)" : ACCENT, flex: "none", marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: "var(--fg-2)" }}>{rationale}</p>
      </div>
    </div>
  );
}

function WireframeBody({ lo }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
      <WireCol lo={lo} badge="A" title="Patient Dashboard" screen={<ScreenDashboard lo={lo} />}
        rationale={lo
          ? "At-a-glance hub: the next action across appointments, refills, billing and messages lives above the fold so nothing slips."
          : "Stat cards, accent-led appointment rows and a vitals grid establish hierarchy. Blue is reserved for primary actions only."} />
      <WireCol lo={lo} badge="B" title="Find a Doctor + Booking" screen={<ScreenBooking lo={lo} />}
        rationale={lo
          ? "Search, in-network filtering and a date/time picker collapse the two biggest friction points onto one screen."
          : "‘In-network’ defaults on; the selected provider, date and time slot each carry the single accent to signal the live choice."} />
      <WireCol lo={lo} badge="C" title="Medical Records" screen={<ScreenRecords lo={lo} />}
        rationale={lo
          ? "Dense clinical data split into scannable tabs; results summarized as a table rather than buried in documents."
          : "Tabbed sections with an active-state underline; plain-language results and ‘Reviewed’ status replace raw lab codes."} />
    </div>
  );
}

function LoFiArtifact() {
  return (
    <ArtifactFrame n="05" kicker="Structure · Lo-fi" title="Low-Fidelity Wireframes"
      desc="Layout and information priority only — grayscale blocks, no color or real type. Three core screens establish where everything goes before a single pixel of brand is applied.">
      <WireframeBody lo={true} />
    </ArtifactFrame>
  );
}

function MidFiArtifact() {
  return (
    <ArtifactFrame n="06" kicker="Structure · Mid-fi" title="Mid-Fidelity Wireframes"
      desc="The same three screens with defined components, real labels and basic hierarchy. One accent — MedBridge blue — is introduced strictly for primary actions and active states.">
      <WireframeBody lo={false} />
    </ArtifactFrame>
  );
}

Object.assign(window, { LoFiArtifact, MidFiArtifact });
