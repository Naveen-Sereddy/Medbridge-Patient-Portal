/* MedBridge UX Case Study — Artifact 3 (Information Architecture / Sitemap) */

const IA_SECTIONS = [
  { name: "Appointments", icon: "calendar-days", subs: ["List view", "Calendar view", "Appointment details", "Book appointment", "Cancel / reschedule"] },
  { name: "Find a Doctor", icon: "stethoscope", subs: ["Provider directory", "Provider profile", "Book from profile"] },
  { name: "Records", icon: "folder-heart", subs: ["Overview", "Medical history", "Test results", "Uploaded files"] },
  { name: "Prescriptions", icon: "pill", subs: ["Active medications", "Prescription detail", "Request refill"] },
  { name: "Billing", icon: "credit-card", subs: ["Invoices", "Invoice detail", "Make a payment"] },
  { name: "Messages", icon: "message-square", subs: ["Inbox", "Message thread", "New message"] },
  { name: "Account", icon: "settings", subs: ["Notifications", "Profile & info", "Security", "Notification settings", "Help center"] },
];
const IA_FAINT = "var(--n-300)";

function TreeConnector({ count }) {
  const c = (i) => `${((i + 0.5) / count) * 100}%`;
  return (
    <div style={{ position: "relative", height: 34, flex: "none" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: 17, background: IA_FAINT, transform: "translateX(-1px)" }} />
      <div style={{ position: "absolute", left: c(0), width: `${((count - 1) / count) * 100}%`, top: 16, height: 2, background: IA_FAINT }} />
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: c(i), top: 16, width: 2, height: 18, background: IA_FAINT, transform: "translateX(-1px)" }} />
      ))}
    </div>
  );
}

function SubList({ subs }) {
  const pitch = 40, firstCenter = 21;
  const spineH = firstCenter + (subs.length - 1) * pitch;
  return (
    <div style={{ position: "relative", paddingTop: 6, marginLeft: 18 }}>
      <div style={{ position: "absolute", left: 0, top: -8, height: spineH + 8, width: 2, background: IA_FAINT }} />
      {subs.map((s, i) => (
        <div key={i} style={{ position: "relative", height: 30, marginBottom: i === subs.length - 1 ? 0 : 10, paddingLeft: 16, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, top: 15, width: 14, height: 2, background: IA_FAINT }} />
          <div style={{ width: "100%", height: 30, display: "flex", alignItems: "center", gap: 8, padding: "0 11px",
            borderRadius: 7, background: "#fff", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--n-400)", flex: "none" }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--fg-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionNode({ s }) {
  return (
    <div style={{ height: 56, display: "flex", alignItems: "center", gap: 11, padding: "0 14px", borderRadius: 11,
      background: "var(--brand-50)", border: `1.5px solid var(--brand-200)`, boxShadow: "var(--shadow-xs)" }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: ACCENT, color: "#fff", display: "inline-flex",
        alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name={s.icon} size={18} /></span>
      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--brand-800)", lineHeight: 1.1 }}>{s.name}</span>
    </div>
  );
}

function IAArtifact() {
  const pageCount = IA_SECTIONS.reduce((a, s) => a + s.subs.length, 0);
  return (
    <ArtifactFrame n="04" kicker="Structure · Navigation" title="Information Architecture"
      desc="One authenticated home branching into seven primary sections, each ≤ 3 levels deep. Flat and shallow on purpose — every screen is reachable in two taps from the dashboard.">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {/* Auth entry → Root */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flex: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 15px", borderRadius: 11,
            background: "var(--n-50)", border: "1.5px dashed var(--border-strong)" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "var(--sidebar-bg)", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name="lock" size={15} /></span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--fg-1)" }}>Authentication</div>
              <div style={{ fontSize: 11, color: "var(--fg-3)" }}>Sign in · Forgot · Reset password</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--n-400)" }}>
            <div style={{ width: 26, height: 2, background: IA_FAINT }} /><Icon name="chevron-right" size={16} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 22px", borderRadius: 14,
            background: ACCENT, color: "#fff", boxShadow: "var(--shadow-md)" }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.18)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name="layout-dashboard" size={22} /></span>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.8 }}>Home · Level 1</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>Dashboard</div>
            </div>
          </div>
        </div>

        <TreeConnector count={IA_SECTIONS.length} />

        {/* Sections + sub-pages */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${IA_SECTIONS.length}, 1fr)`, gap: 14, alignItems: "start", flex: 1, minHeight: 0 }}>
          {IA_SECTIONS.map((s, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              <SectionNode s={s} />
              <SubList subs={s.subs} />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 26, paddingTop: 16, marginTop: 8,
          borderTop: "1px solid var(--border)", flex: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, background: ACCENT, flex: "none" }} />
            <span style={{ fontSize: 12.5, color: "var(--fg-2)" }}><b>Level 1</b> — Authenticated home</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, background: "var(--brand-50)", border: "1.5px solid var(--brand-200)", flex: "none" }} />
            <span style={{ fontSize: 12.5, color: "var(--fg-2)" }}><b>Level 2</b> — Primary section (7)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, background: "#fff", border: "1px solid var(--border)", flex: "none" }} />
            <span style={{ fontSize: 12.5, color: "var(--fg-2)" }}><b>Level 3</b> — Page / flow</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 999,
              background: "var(--n-100)", fontSize: 12.5, fontWeight: 600, color: "var(--fg-2)" }}>
              <Icon name="git-branch" size={14} style={{ color: ACCENT }} />3 levels deep</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 999,
              background: "var(--n-100)", fontSize: 12.5, fontWeight: 600, color: "var(--fg-2)" }}>
              <Icon name="files" size={14} style={{ color: ACCENT }} />{pageCount} pages</span>
          </div>
        </div>
      </div>
    </ArtifactFrame>
  );
}

Object.assign(window, { IAArtifact });
