/* MedBridge UX Case Study — Artifact 7 (Accessibility Audit)
   One key screen (Patient Dashboard) audited against WCAG 2.1 AA:
   contrast ratios, keyboard focus order overlay, screen-reader labels,
   and touch-target sizing. */

// numbered focus-order marker (top-left of a position:relative host)
function FocusDot({ n, pos = {} }) {
  return (
    <span style={{ position: "absolute", zIndex: 6, width: 21, height: 21, borderRadius: 999, background: "var(--brand-600)",
      color: "#fff", fontSize: 11.5, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 0 0 2px #fff, 0 2px 5px rgba(15,27,45,.3)", ...pos }}>{n}</span>
  );
}
// focus ring drawn around an element
const ring = { outline: "2.5px solid var(--brand-600)", outlineOffset: 3, borderRadius: 10 };

// screen-reader callout tag
function SR({ children, style }) {
  return (
    <div style={{ position: "absolute", zIndex: 7, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px",
      borderRadius: 7, background: "var(--purple-700)", color: "#fff", fontSize: 10.5, fontWeight: 600, fontFamily: "var(--font-mono)",
      whiteSpace: "nowrap", boxShadow: "var(--shadow-md)", ...style }}>
      <Icon name="ear" size={12} />{children}</div>
  );
}

function A11yArtifact() {
  const ACCENT = "var(--brand-600)";
  const contrast = [
    ["#1E293B", "#FFFFFF", "Heading on surface", "15.8", "AAA", "ok"],
    ["#475569", "#FFFFFF", "Body text on surface", "7.46", "AAA", "ok"],
    ["#64748B", "#FFFFFF", "Muted label on surface", "4.76", "AA", "ok"],
    ["#FFFFFF", "#1D6FDB", "Button label on primary", "4.83", "AA", "ok"],
    ["#B46200", "#FFFBEB", "Warning text on tint", "5.21", "AA", "ok"],
    ["#B91C1C", "#FEF2F2", "Error text on tint", "6.18", "AA", "ok"],
    ["#059669", "#FFFFFF", "Success icon / UI", "3.62", "AA·UI", "ui"],
  ];
  const lvl = { AAA: ["var(--green-bg)", "var(--green-600)"], AA: ["var(--brand-50)", "var(--brand-600)"], "AA·UI": ["var(--amber-bg)", "var(--amber-700)"] };

  const panel = { background: "#fff", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", overflow: "hidden" };
  const pHead = (icon, title, note) => (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 15px", borderBottom: "1px solid var(--n-100)", flex: "none" }}>
      <Icon name={icon} size={16} style={{ color: ACCENT }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-1)" }}>{title}</span>
      {note && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--fg-3)" }}>{note}</span>}
    </div>
  );

  return (
    <ArtifactFrame n="08" kicker="Quality · WCAG 2.1 AA" title="Accessibility Audit"
      desc="The Patient Dashboard evaluated for the widest-literacy users: color contrast, a logical keyboard path, descriptive screen-reader labels, and touch targets that clear the 44px minimum.">
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.28fr 1fr", gap: 22 }}>

        {/* ---------- LEFT: annotated screen ---------- */}
        <div style={{ ...panel }}>
          {pHead("scan-eye", "Audited Screen — Patient Dashboard", "Tab + VoiceOver pass")}
          <div style={{ flex: 1, minHeight: 0, position: "relative", background: "var(--n-50)", display: "flex", overflow: "hidden" }}>
            {/* skip link */}
            <div style={{ position: "absolute", top: 12, left: 12, zIndex: 8, display: "inline-flex", alignItems: "center", gap: 7,
              padding: "6px 11px", borderRadius: 7, background: "var(--brand-600)", color: "#fff", fontSize: 11.5, fontWeight: 700, boxShadow: "var(--shadow-md)" }}>
              <FocusDot n={1} pos={{ top: -9, left: -9 }} />Skip to main content</div>

            {/* sidebar */}
            <div style={{ width: 150, background: "var(--sidebar-bg)", padding: "44px 12px 12px", flex: "none", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 12px" }}>
                <BrandMark size={18} white /><span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>MedBridge</span>
              </div>
              <div style={{ position: "relative", ...ring, marginTop: 4 }}>
                <FocusDot n={4} pos={{ top: -10, left: -10 }} />
                {[["layout-dashboard", "Dashboard", true], ["calendar-days", "Appointments", false], ["folder-heart", "Records", false], ["pill", "Prescriptions", false]].map(([ic, l, on], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 9px", borderRadius: 7, marginBottom: 2,
                    background: on ? "rgba(29,111,219,.20)" : "transparent" }}>
                    <Icon name={ic} size={15} style={{ color: on ? "#fff" : "#7E8DA4" }} />
                    <span style={{ fontSize: 11.5, fontWeight: on ? 600 : 500, color: on ? "#fff" : "var(--sidebar-text)" }}>{l}</span>
                  </div>
                ))}
              </div>
              <SR style={{ bottom: 14, left: 12 }}>role="navigation"</SR>
            </div>

            {/* main */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              {/* topbar */}
              <div style={{ height: 52, background: "#fff", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", flex: "none" }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 280, ...ring }}>
                  <FocusDot n={2} pos={{ top: -10, left: -10 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 12px", borderRadius: 8, background: "var(--n-50)", border: "1px solid var(--border)" }}>
                    <Icon name="search" size={15} style={{ color: "var(--n-400)" }} />
                    <span style={{ fontSize: 12, color: "var(--n-400)" }}>Search appointments, records…</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", position: "relative", ...ring }}>
                  <FocusDot n={3} pos={{ top: -10, right: -10 }} />
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--n-100)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <Icon name="bell" size={17} style={{ color: "var(--n-600)" }} />
                    <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: 999, background: ACCENT, border: "1.5px solid #fff" }} />
                  </div>
                </div>
              </div>

              {/* content */}
              <div style={{ flex: 1, minHeight: 0, padding: 16, position: "relative" }}>
                <SR style={{ top: 50, right: 14 }}>aria-label="Notifications, 4 unread"</SR>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "var(--fg-1)" }}>Good morning, Beth</div>
                    <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 3 }}>Your next appointment is in 3 days</div>
                  </div>
                  <div style={{ position: "relative", ...ring }}>
                    <FocusDot n={5} pos={{ top: -10, right: -10 }} />
                    <Button size="sm" icon="calendar-plus">Book appointment</Button>
                  </div>
                </div>
                {/* appointment cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[[6, "Dr. Rahul Nair", "Cardiology", "Jun 3 · 10:30 AM", "var(--brand-600)"], [7, "Dr. Freya Kemp", "Primary Care", "Jun 12 · 2:00 PM", "var(--teal-600)"]].map(([n, name, spec, when, c], i) => (
                    <div key={i} style={{ position: "relative", ...ring }}>
                      <FocusDot n={n} pos={{ top: -10, left: -10 }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fff", border: "1px solid var(--border)", borderRadius: 10, borderLeft: `3px solid ${c}` }}>
                        <div style={{ width: 38, height: 38, borderRadius: 999, background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flex: "none" }}>
                          {name.split(" ").map(w => w[0]).slice(1, 3).join("")}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>{name}</div>
                          <div style={{ fontSize: 11.5, color: "var(--fg-3)", marginTop: 2 }}>{spec} · {when}</div>
                        </div>
                        <Badge>Confirmed</Badge>
                      </div>
                      {i === 0 && <SR style={{ bottom: -12, left: 60 }}>aria-label="Confirmed: Dr. Nair, Cardiology, Jun 3, 10:30 AM"</SR>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: audit panels ---------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
          {/* contrast */}
          <div style={{ ...panel, flex: 1, minHeight: 0 }}>
            {pHead("contrast", "Color Contrast", "7 of 7 pass")}
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              {contrast.map(([fg, bg, label, ratio, level, kind], i) => {
                const [lbg, lfg] = lvl[level];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 15px", height: 46, borderBottom: i < contrast.length - 1 ? "1px solid var(--n-100)" : "none" }}>
                    <div style={{ width: 34, height: 30, borderRadius: 7, background: bg, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: fg }}>Aa</span>
                    </div>
                    <span style={{ flex: 1, fontSize: 12.5, color: "var(--fg-2)" }}>{label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--fg-1)", fontFamily: "var(--font-mono)" }}>{ratio}:1</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, minWidth: 64, justifyContent: "center", padding: "4px 9px", borderRadius: 999, background: lbg, color: lfg, fontSize: 10.5, fontWeight: 700 }}>
                      <Icon name="check" size={12} />{level}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* keyboard + SR legend */}
          <div style={{ ...panel }}>
            {pHead("keyboard", "Keyboard & Screen Reader")}
            <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
                  <React.Fragment key={n}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, background: ACCENT, color: "#fff", fontSize: 11.5, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{n}</span>
                    {i < 6 && <Icon name="chevron-right" size={13} style={{ color: "var(--n-300)" }} />}
                  </React.Fragment>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.45 }}>
                Tab order follows the visual reading order — skip-link first, then header, primary nav, and main content. Every focusable element shows a 3px <b style={{ color: "var(--fg-1)" }}>:focus-visible</b> ring.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 7, background: "var(--purple-700)", color: "#fff", fontSize: 10.5, fontWeight: 600 }}>
                  <Icon name="ear" size={12} />SR label</span>
                <span style={{ fontSize: 12, color: "var(--fg-3)" }}>Icon-only controls carry descriptive <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>aria-label</span>s.</span>
              </div>
            </div>
          </div>

          {/* touch targets */}
          <div style={{ ...panel }}>
            {pHead("pointer", "Touch Targets")}
            <div style={{ padding: 15, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", width: 44, height: 44, borderRadius: 10, border: "1.5px dashed var(--brand-400)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--brand-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="bell" size={18} style={{ color: "#fff" }} /></div>
                <span style={{ position: "absolute", bottom: -7, right: -10, fontSize: 9.5, fontWeight: 700, color: "var(--brand-600)", background: "#fff", padding: "0 3px", fontFamily: "var(--font-mono)" }}>44px</span>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.45 }}>
                All interactive controls span a minimum <b style={{ color: "var(--fg-1)" }}>44 × 44px</b> hit area with ≥ 8px spacing — comfortable for older caregivers and motor-impaired users.</p>
            </div>
          </div>
        </div>
      </div>
    </ArtifactFrame>
  );
}

Object.assign(window, { A11yArtifact });
