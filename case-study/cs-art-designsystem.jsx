/* MedBridge UX Case Study — Artifact 6 (Design System Sheet)
   Colors · Typography · Spacing · Core components — rendered from the live
   MedBridge tokens (colors_and_type.css) and primitives (ui.jsx), so the
   spec sheet IS the system, not a drawing of it. */

/* ---- swatch ----------------------------------------------------------- */
function Swatch({ name, hex, role, varName, big }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
      <div style={{ height: big ? 58 : 46, borderRadius: 9, background: hex, border: "1px solid rgba(15,27,45,.08)", boxShadow: "var(--shadow-xs)" }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--fg-1)" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", marginTop: 1 }}>{hex}</div>
        {role && <div style={{ fontSize: 10.5, color: "var(--n-400)", marginTop: 2 }}>{role}</div>}
      </div>
    </div>
  );
}

/* ---- mini component cell ---------------------------------------------- */
function Cell({ label, children, style }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "#fff", overflow: "hidden", display: "flex", flexDirection: "column", ...(style || {}) }}>
      <div style={{ padding: "8px 13px", borderBottom: "1px solid var(--n-100)", fontSize: 11, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: ".07em", color: "var(--fg-3)", background: "var(--n-50)", flex: "none" }}>{label}</div>
      <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>{children}</div>
    </div>
  );
}

function DesignSystemArtifact() {
  const ACCENT = "var(--brand-600)";
  const semantic = [
    ["Primary", "#1D6FDB", "Actions · links · active nav"],
    ["Secondary", "#0D9488", "Telehealth · secondary CTAs"],
    ["Success", "#059669", "Confirmed · paid · normal"],
    ["Error", "#B91C1C", "Overdue · destructive · alerts"],
    ["Warning", "#B46200", "Refill due · pending · attention"],
  ];
  const neutrals = [["900", "#1E293B"], ["700", "#334155"], ["600", "#475569"], ["500", "#64748B"], ["400", "#94A3B8"], ["300", "#CBD5E1"], ["200", "#E2E8F0"], ["100", "#F1F5F9"], ["50", "#F8FAFC"]];
  const type = [
    ["Display", "44 / 700", 30, 700, "Your health, all in one place"],
    ["Heading 1", "30 / 700", 23, 700, "Good morning, Beth"],
    ["Heading 2", "22 / 600", 19, 600, "Upcoming Appointments"],
    ["Heading 3", "18 / 600", 16, 600, "Cardiology Follow-up"],
    ["Body", "14 / 400", 14, 400, "Blood pressure 118/76 is well-controlled."],
    ["Label", "13 / 500", 12.5, 600, "PREFERRED PHARMACY"],
  ];
  const spacing = [["1", 4], ["2", 8], ["4", 16], ["6", 24], ["8", 32]];

  const panel = { background: "#fff", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", overflow: "hidden" };
  const panelHead = (icon, title, note) => (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 16px", borderBottom: "1px solid var(--n-100)", flex: "none" }}>
      <Icon name={icon} size={16} style={{ color: ACCENT }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-1)" }}>{title}</span>
      {note && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--fg-3)" }}>{note}</span>}
    </div>
  );

  return (
    <ArtifactFrame n="07" kicker="Foundations · UI Kit" title="Design System"
      desc="A single source of truth: WCAG-checked color roles, a 1.20 type scale, a 4px spacing rhythm, and the core components every MedBridge screen is assembled from.">
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "468px 1fr", gap: 22 }}>

        {/* ---------------- LEFT: foundations ---------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
          {/* colors */}
          <div style={{ ...panel }}>
            {panelHead("palette", "Color Palette", "WCAG 2.1 AA verified")}
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
                {semantic.map(([n, h, r], i) => <Swatch key={i} name={n} hex={h} role={r} big />)}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--fg-3)", marginBottom: 8 }}>Neutrals — Slate</div>
                <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                  {neutrals.map(([n, h], i) => (
                    <div key={i} style={{ flex: 1, height: 38, background: h, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                      <span style={{ fontSize: 8.5, fontWeight: 700, fontFamily: "var(--font-mono)", color: i < 4 ? "rgba(255,255,255,.85)" : "var(--n-500)" }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* spacing */}
          <div style={{ ...panel }}>
            {panelHead("ruler", "Spacing Scale", "4px base")}
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 11 }}>
              {spacing.map(([tok, px], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 30, fontSize: 12, fontWeight: 700, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>{tok}</span>
                  <div style={{ width: px, height: 18, borderRadius: 4, background: ACCENT, flex: "none" }} />
                  <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{px}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* radii + elevation */}
          <div style={{ ...panel, flex: 1 }}>
            {panelHead("box-select", "Radius & Elevation")}
            <div style={{ padding: 16, display: "flex", gap: 22, alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", gap: 12 }}>
                {[["sm", 6], ["md", 8], ["lg", 12], ["xl", 16]].map(([n, r], i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 44, height: 44, borderTopLeftRadius: r, borderTopRightRadius: r, background: "var(--brand-50)", border: `1.5px solid var(--brand-200)`, borderBottom: "none" }} />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--fg-3)" }}>{n} · {r}</span>
                  </div>
                ))}
              </div>
              <div style={{ width: 1, alignSelf: "stretch", background: "var(--n-100)" }} />
              <div style={{ display: "flex", gap: 16, flex: 1 }}>
                {[["sm", "var(--shadow-sm)"], ["md", "var(--shadow-md)"], ["lg", "var(--shadow-lg)"]].map(([n, sh], i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 11, background: "#fff", boxShadow: sh }} />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--fg-3)" }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT: type + components ---------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
          {/* typography */}
          <div style={{ ...panel }}>
            {panelHead("type", "Typography", "Hanken Grotesk · Geist Mono")}
            <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column" }}>
              {type.map(([name, spec, size, weight, sample], i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "9px 0", borderBottom: i < type.length - 1 ? "1px solid var(--n-100)" : "none" }}>
                  <span style={{ width: 92, flex: "none", fontSize: 11.5, fontWeight: 600, color: "var(--fg-3)" }}>{name}</span>
                  <span style={{ width: 58, flex: "none", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--n-400)" }}>{spec}</span>
                  <span style={{ fontSize: size, fontWeight: weight, color: "var(--fg-1)", letterSpacing: name === "Label" ? ".06em" : "-0.01em",
                    textTransform: name === "Label" ? "uppercase" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sample}</span>
                </div>
              ))}
            </div>
          </div>

          {/* components */}
          <div style={{ ...panel, flex: 1, minHeight: 0 }}>
            {panelHead("component", "Core Components")}
            <div style={{ padding: 16, flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 12 }}>
              {/* buttons */}
              <Cell label="Button — states">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <Button size="sm" variant="ghost">Ghost</Button>
                  <Button size="sm" variant="danger">Danger</Button>
                  <Button size="sm" disabled>Disabled</Button>
                </div>
              </Cell>
              {/* input */}
              <Cell label="Input + Toggle">
                <Field label="Email"><Input value="beth.mooney@email.com" icon="mail" /></Field>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Toggle checked={true} /><span style={{ fontSize: 12.5, color: "var(--fg-2)" }}>Email reminders</span>
                </div>
              </Cell>
              {/* dropdown */}
              <Cell label="Dropdown">
                <div style={{ height: 40, padding: "0 12px", borderRadius: 8, border: "1.5px solid var(--brand-500)", boxShadow: "var(--shadow-focus)",
                  display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "var(--fg-1)" }}>
                  Cardiology <Icon name="chevron-down" size={16} style={{ color: "var(--n-400)" }} /></div>
                <div style={{ border: "1px solid var(--border)", borderRadius: 8, boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
                  {["Cardiology", "Primary Care", "Dermatology"].map((o, i) => (
                    <div key={i} style={{ padding: "7px 12px", fontSize: 12.5, color: i === 0 ? "var(--brand-600)" : "var(--fg-2)", fontWeight: i === 0 ? 600 : 500,
                      background: i === 0 ? "var(--brand-50)" : "#fff" }}>{o}</div>
                  ))}
                </div>
              </Cell>
              {/* badges + table */}
              <Cell label="Status badges">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  <Badge>Confirmed</Badge><Badge>Pending</Badge><Badge>Unpaid</Badge>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  <Badge>Active</Badge><Badge>Telehealth</Badge><Badge noDot>In-Person</Badge>
                </div>
              </Cell>
              {/* nav */}
              <Cell label="Navigation">
                <div style={{ background: "var(--sidebar-bg)", borderRadius: 9, padding: 7, display: "flex", flexDirection: "column", gap: 3 }}>
                  {[["layout-dashboard", "Dashboard", true], ["calendar-days", "Appointments", false], ["folder-heart", "Records", false]].map(([ic, l, on], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 9px", borderRadius: 7,
                      background: on ? "rgba(29,111,219,.20)" : "transparent" }}>
                      <Icon name={ic} size={15} style={{ color: on ? "#fff" : "#7E8DA4" }} />
                      <span style={{ fontSize: 12, fontWeight: on ? 600 : 500, color: on ? "#fff" : "var(--sidebar-text)" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </Cell>
              {/* toast + tooltip + modal trio */}
              <Cell label="Toast · Tooltip · Modal">
                <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 9, background: "var(--green-bg)", border: "1px solid #A7F3D0" }}>
                  <Icon name="circle-check" size={16} style={{ color: "var(--green-600)" }} />
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--n-800)" }}>Appointment booked</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ position: "relative", background: "var(--sidebar-bg)", color: "#fff", fontSize: 10.5, fontWeight: 600, padding: "5px 9px", borderRadius: 6 }}>
                    In-network</span>
                  <div style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 8, padding: "7px 9px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--fg-1)" }}>Cancel visit?</div>
                    <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                      <span style={{ fontSize: 9.5, fontWeight: 600, color: "var(--fg-3)", padding: "3px 7px", border: "1px solid var(--border)", borderRadius: 5 }}>Keep</span>
                      <span style={{ fontSize: 9.5, fontWeight: 600, color: "#fff", padding: "3px 7px", background: "var(--red-700)", borderRadius: 5 }}>Cancel</span>
                    </div>
                  </div>
                </div>
              </Cell>
            </div>
          </div>
        </div>
      </div>
    </ArtifactFrame>
  );
}

Object.assign(window, { DesignSystemArtifact });
