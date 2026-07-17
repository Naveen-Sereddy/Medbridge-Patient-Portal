/* MedBridge UX Case Study — Artifact 8 (Final UI)
   High-fidelity Patient Dashboard shown responsively: desktop, tablet, and
   mobile side by side. Full color, real data (lib.jsx), polished. */

const FU_STATS = [
  { label: "Upcoming", value: "3", sub: "Next: Jun 3", icon: "calendar", color: "var(--brand-600)" },
  { label: "Prescriptions", value: "5", sub: "2 refills due", icon: "pill", color: "var(--teal-600)" },
  { label: "Balance", value: "$248", sub: "Due Jun 15", icon: "credit-card", color: "var(--amber-700)" },
  { label: "Messages", value: "2", sub: "Dr. Nair", icon: "message-square", color: "var(--green-600)" },
];

function FUStat({ s, compact }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-xs)",
      borderTop: `3px solid ${s.color}`, padding: compact ? "11px 13px" : "14px 16px", display: "flex", flexDirection: "column", gap: compact ? 5 : 7, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: compact ? 9.5 : 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--fg-3)" }}>{s.label}</span>
        <Icon name={s.icon} size={compact ? 14 : 16} style={{ color: s.color }} />
      </div>
      <div style={{ fontSize: compact ? 21 : 27, fontWeight: 800, color: "var(--fg-1)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.value}</div>
      <div style={{ fontSize: compact ? 10.5 : 11.5, color: "var(--fg-3)", fontWeight: 500 }}>{s.sub}</div>
    </div>
  );
}

function FUAppt({ a, compact }) {
  const p = provById(a.prov);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 10 : 13, padding: compact ? "10px 12px" : "13px 16px",
      background: "#fff", border: "1px solid var(--border)", borderRadius: 11, borderLeft: `3px solid ${p.color}`, boxShadow: "var(--shadow-xs)" }}>
      <div style={{ width: compact ? 34 : 42, height: compact ? 34 : 42, borderRadius: 999, background: p.color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: compact ? 12 : 15, fontWeight: 700, flex: "none" }}>{p.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: compact ? 12.5 : 14, fontWeight: 600, color: "var(--fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.full}</div>
        <div style={{ fontSize: compact ? 11 : 12, color: "var(--fg-3)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="calendar" size={12} />{a.date} · {a.time}</div>
      </div>
      {!compact && <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <Badge>{a.status}</Badge><Badge noDot>{a.type}</Badge></div>}
      {compact && <Badge>{a.status}</Badge>}
    </div>
  );
}

function FUVital({ v }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "#fff", border: "1px solid var(--border)", borderRadius: 11, borderLeft: `3px solid ${v.color}` }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: v.color, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        <Icon name={v.icon} size={17} style={{ color: "#fff" }} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "var(--fg-3)", fontWeight: 500 }}>{v.label}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>{v.value} <span style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-3)" }}>{v.unit}</span></div>
      </div>
      <Badge>Confirmed</Badge>
    </div>
  );
}

function FUSectionHead({ title, link }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 11 }}>
      <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--fg-1)" }}>{title}</span>
      {link && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-600)" }}>{link}</span>}
    </div>
  );
}

const FU_NAV = [["layout-dashboard", "Dashboard", true], ["calendar-days", "Appointments", false], ["stethoscope", "Find a Doctor", false],
  ["folder-heart", "Records", false], ["pill", "Prescriptions", false], ["credit-card", "Billing", false], ["message-square", "Messages", false], ["settings", "Settings", false]];

/* ---------------- DESKTOP ---------------- */
function FUDesktop() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "var(--n-50)" }}>
      {/* sidebar */}
      <div style={{ width: 196, background: "var(--sidebar-bg)", flex: "none", display: "flex", flexDirection: "column", padding: "16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 14px" }}>
          <BrandMark size={20} white /><span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>MedBridge</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {FU_NAV.map(([ic, l, on], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 10px", borderRadius: 8, position: "relative",
              background: on ? "rgba(29,111,219,.20)" : "transparent" }}>
              {on && <span style={{ position: "absolute", left: -12, top: 8, bottom: 8, width: 3, background: "var(--brand-600)", borderRadius: "0 3px 3px 0" }} />}
              <Icon name={ic} size={17} style={{ color: on ? "#fff" : "#7E8DA4" }} />
              <span style={{ fontSize: 12.5, fontWeight: on ? 600 : 500, color: on ? "#fff" : "var(--sidebar-text)" }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 8px 0", borderTop: "1px solid var(--sidebar-div)" }}>
          <span style={{ width: 32, height: 32, borderRadius: 999, background: "var(--brand-600)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>SJ</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Beth Mooney</div>
            <div style={{ fontSize: 10, color: "var(--sidebar-text)" }}>Patient · #MB-4827</div>
          </div>
        </div>
      </div>
      {/* main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ height: 56, background: "#fff", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, padding: "0 22px", flex: "none" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Dashboard</div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, height: 36, width: 300, padding: "0 13px", borderRadius: 8, background: "var(--n-50)", border: "1px solid var(--border)" }}>
            <Icon name="search" size={16} style={{ color: "var(--n-400)" }} /><span style={{ fontSize: 12.5, color: "var(--n-400)" }}>Search…</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--n-100)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={17} style={{ color: "var(--n-600)" }} />
            <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: 999, background: "var(--brand-600)", border: "1.5px solid #fff" }} /></div>
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: 22, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 21, fontWeight: 700, color: "var(--fg-1)", letterSpacing: "-0.01em" }}>Good morning, Beth</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 3 }}>Your next appointment is in 3 days · Last login today, 8:42 AM</div>
            </div>
            <Button icon="calendar-plus">Book appointment</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
            {FU_STATS.map((s, i) => <FUStat key={i} s={s} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 22, alignItems: "start" }}>
            <div>
              <FUSectionHead title="Upcoming Appointments" link="View all →" />
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {APPOINTMENTS.slice(0, 3).map(a => <FUAppt key={a.id} a={a} />)}
              </div>
            </div>
            <div>
              <FUSectionHead title="Health Summary" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {VITALS.map((v, i) => <FUVital key={i} v={v} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- TABLET ---------------- */
function FUTablet() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "var(--n-50)" }}>
      <div style={{ width: 58, background: "var(--sidebar-bg)", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 0" }}>
        <BrandMark size={20} white />
        <div style={{ height: 8 }} />
        {FU_NAV.slice(0, 6).map(([ic, , on], i) => (
          <div key={i} style={{ width: 38, height: 38, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: on ? "rgba(29,111,219,.22)" : "transparent" }}>
            <Icon name={ic} size={18} style={{ color: on ? "#fff" : "#7E8DA4" }} /></div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ height: 50, background: "#fff", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", flex: "none" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Dashboard</div>
          <div style={{ marginLeft: "auto", width: 34, height: 34, borderRadius: 8, background: "var(--n-100)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="search" size={16} style={{ color: "var(--n-500)" }} /></div>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--n-100)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={16} style={{ color: "var(--n-500)" }} />
            <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: 999, background: "var(--brand-600)", border: "1.5px solid #fff" }} /></div>
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: 16, overflow: "hidden" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-1)" }}>Good morning, Beth</div>
          <div style={{ fontSize: 11.5, color: "var(--fg-3)", marginTop: 3, marginBottom: 16 }}>Next appointment in 3 days</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 18 }}>
            {FU_STATS.map((s, i) => <FUStat key={i} s={s} compact />)}
          </div>
          <FUSectionHead title="Upcoming Appointments" link="View all" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {APPOINTMENTS.slice(0, 2).map(a => <FUAppt key={a.id} a={a} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MOBILE ---------------- */
function FUMobile() {
  const tabs = [["home", "Home", true], ["calendar-days", "Appts", false], ["folder-heart", "Records", false], ["pill", "Meds", false], ["user", "Account", false]];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "var(--n-50)" }}>
      {/* status + app bar */}
      <div style={{ background: "var(--sidebar-bg)", padding: "8px 16px 12px", flex: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.7)", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: "#fff" }}>9:41</span>
          <span style={{ display: "flex", gap: 4 }}><Icon name="signal" size={12} /><Icon name="wifi" size={12} /><Icon name="battery-full" size={13} /></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="menu" size={20} style={{ color: "#fff" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}><BrandMark size={17} white /><span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>MedBridge</span></div>
          <div style={{ marginLeft: "auto", position: "relative" }}><Icon name="bell" size={19} style={{ color: "#fff" }} />
            <span style={{ position: "absolute", top: -1, right: -2, width: 6, height: 6, borderRadius: 999, background: "var(--brand-400)", border: "1.5px solid var(--sidebar-bg)" }} /></div>
        </div>
      </div>
      {/* content */}
      <div style={{ flex: 1, minHeight: 0, padding: "14px 14px 0", overflow: "hidden" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--fg-1)" }}>Good morning, Beth</div>
        <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2, marginBottom: 13 }}>Next appointment in 3 days</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 15 }}>
          {FU_STATS.slice(0, 2).map((s, i) => <FUStat key={i} s={s} compact />)}
        </div>
        <FUSectionHead title="Upcoming" link="All" />
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {APPOINTMENTS.slice(0, 2).map(a => <FUAppt key={a.id} a={a} compact />)}
        </div>
        <div style={{ marginTop: 13 }}>
          <Button block icon="calendar-plus" size="sm">Book appointment</Button>
        </div>
      </div>
      {/* bottom nav */}
      <div style={{ display: "flex", background: "#fff", borderTop: "1px solid var(--border)", padding: "8px 6px 10px", flex: "none" }}>
        {tabs.map(([ic, l, on], i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <Icon name={ic} size={19} style={{ color: on ? "var(--brand-600)" : "var(--n-400)" }} />
            <span style={{ fontSize: 9, fontWeight: on ? 700 : 500, color: on ? "var(--brand-600)" : "var(--n-400)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- device shells ---------------- */
function DeviceLabel({ icon, name, dim }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <Icon name={icon} size={16} style={{ color: ACCENT }} />
      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-1)" }}>{name}</span>
      <span style={{ fontSize: 11.5, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{dim}</span>
    </div>
  );
}

function FinalUIArtifact() {
  return (
    <ArtifactFrame n="09" kicker="Delivery · Hi-fi" title="Final UI — Patient Dashboard"
      desc="The unified dashboard, fully designed and responsive: one information architecture that adapts from a focused desktop workspace to a thumb-friendly mobile app.">
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 30 }}>
        {/* desktop */}
        <div style={{ width: 902, flex: "none", display: "flex", flexDirection: "column" }}>
          <DeviceLabel icon="monitor" name="Desktop" dim="1440 × 900" />
          <div style={{ height: 712, borderRadius: 14, overflow: "hidden", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 30, background: "#fff", borderBottom: "1px solid var(--n-100)", display: "flex", alignItems: "center", gap: 7, padding: "0 13px", flex: "none" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28C840" }} />
              <span style={{ marginLeft: 12, fontSize: 11, color: "var(--n-400)", fontFamily: "var(--font-mono)" }}>medbridge.health/dashboard</span>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}><FUDesktop /></div>
          </div>
        </div>
        {/* tablet */}
        <div style={{ width: 404, flex: "none", display: "flex", flexDirection: "column" }}>
          <DeviceLabel icon="tablet" name="Tablet" dim="834 × 1112" />
          <div style={{ height: 600, borderRadius: 18, overflow: "hidden", border: "8px solid #1E293B", boxShadow: "var(--shadow-lg)", background: "#1E293B" }}>
            <div style={{ height: "100%", borderRadius: 10, overflow: "hidden" }}><FUTablet /></div>
          </div>
        </div>
        {/* mobile */}
        <div style={{ width: 240, flex: "none", display: "flex", flexDirection: "column" }}>
          <DeviceLabel icon="smartphone" name="Mobile" dim="390 × 844" />
          <div style={{ height: 520, borderRadius: 30, overflow: "hidden", border: "9px solid #1E293B", boxShadow: "var(--shadow-lg)", background: "#1E293B", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 90, height: 20, background: "#1E293B", borderRadius: "0 0 12px 12px", zIndex: 3 }} />
            <div style={{ height: "100%", borderRadius: 22, overflow: "hidden" }}><FUMobile /></div>
          </div>
        </div>
      </div>
    </ArtifactFrame>
  );
}

Object.assign(window, { FinalUIArtifact });
