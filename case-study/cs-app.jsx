/* MedBridge UX Case Study — App
   Assembles all 9 artifacts onto the infinite design canvas, plus the
   clickable-prototype launch frame (artifact 9). */

/* ====================================================================== */
/* Artifact 9 — Clickable Prototype (flow preview + launch)                */
/* ====================================================================== */
const PROTO_URL = "../ui_kits/portal/index.html";
const b = (w, h, c, r = 3) => <div style={{ width: w, height: h, borderRadius: r, background: c, flex: "none" }} />;
const PB = "var(--brand-600)", PT = "var(--teal-600)", PG = "var(--green-600)", PA = "var(--amber-700)";

// mini browser chrome wrapper
function MiniFrame({ children }) {
  return (
    <div style={{ flex: 1, minHeight: 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "#fff",
      boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 18, background: "#fff", borderBottom: "1px solid var(--n-100)", display: "flex", alignItems: "center", gap: 4, padding: "0 8px", flex: "none" }}>
        {b(5, 5, "#FF5F57", 999)}{b(5, 5, "#FEBC2E", 999)}{b(5, 5, "#28C840", 999)}
      </div>
      <div style={{ flex: 1, minHeight: 0, background: "var(--n-50)", display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}
function MiniStepper({ active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 11px 4px" }}>
      {[0, 1, 2].map(i => (
        <React.Fragment key={i}>
          <span style={{ width: 14, height: 14, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 8, fontWeight: 800, color: "#fff", background: i <= active ? PB : "var(--n-300)" }}>{i + 1}</span>
          {i < 2 && b(14, 2, i < active ? PB : "var(--n-200)", 2)}
        </React.Fragment>
      ))}
    </div>
  );
}
const miniPad = { padding: "10px 11px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 };
const miniBtn = (txt, color = PB) => (
  <div style={{ height: 24, borderRadius: 6, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700 }}>{txt}</div>
);
const miniRow = (accent) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 8px", background: "#fff", border: "1px solid var(--border)", borderRadius: 7, borderLeft: `2.5px solid ${accent}` }}>
    {b(20, 20, accent, 999)}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>{b(64, 5, "var(--n-300)")}{b(44, 4, "var(--n-200)")}</div>
  </div>
);

const M = {
  signin: () => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 14, background: "var(--brand-50)" }}>
      <div style={{ width: "100%", background: "#fff", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-sm)", padding: 14, display: "flex", flexDirection: "column", gap: 9, alignItems: "center" }}>
        <BrandMark size={20} />
        {b(96, 7, "var(--n-800)")}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
          <div style={{ height: 22, borderRadius: 6, border: "1px solid var(--border)", background: "var(--n-50)" }} />
          <div style={{ height: 22, borderRadius: 6, border: "1px solid var(--border)", background: "var(--n-50)" }} />
          {miniBtn("Sign in")}
        </div>
        {b(70, 4, "var(--n-200)")}
      </div>
    </div>
  ),
  dashboard: () => (
    <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      <div style={{ width: 26, background: "var(--sidebar-bg)", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "8px 0" }}>
        {b(13, 13, "rgba(255,255,255,.5)", 4)}
        {[PB, "transparent", "transparent", "transparent"].map((c, i) => <div key={i} style={{ width: 16, height: 12, borderRadius: 4, background: c === PB ? "rgba(29,111,219,.4)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{b(9, 6, i === 0 ? "#fff" : "#5C6B82", 2)}</div>)}
      </div>
      <div style={{ flex: 1, minWidth: 0, ...miniPad, gap: 8 }}>
        {b(80, 7, "var(--n-700)")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5 }}>
          {[PB, PT, PA, PG].map((c, i) => <div key={i} style={{ height: 26, borderRadius: 6, background: "#fff", border: "1px solid var(--border)", borderTop: `2px solid ${c}` }} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 1 }}>{miniRow(PB)}{miniRow(PT)}</div>
      </div>
    </div>
  ),
  book: () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <MiniStepper active={0} />
      <div style={{ ...miniPad, gap: 6, paddingTop: 4 }}>
        <div style={{ height: 18, borderRadius: 6, background: "#fff", border: "1px solid var(--border)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 8px", background: "var(--brand-50)", border: `1.5px solid ${PB}`, borderRadius: 7 }}>
            {b(20, 20, PB, 999)}<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>{b(60, 5, "var(--n-400)")}{b(40, 4, "var(--n-200)")}</div></div>
          {miniRow(PT)}{miniRow("var(--purple-700)")}
        </div>
        <div style={{ marginTop: "auto" }}>{miniBtn("Continue →")}</div>
      </div>
    </div>
  ),
  datetime: () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <MiniStepper active={1} />
      <div style={{ ...miniPad, gap: 7, paddingTop: 4 }}>
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 7, padding: 7 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: i === 2 ? PB : [4, 5, 6].includes(i) ? "var(--n-100)" : "#fff", border: "1px solid var(--n-100)" }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {[0, 1, 2, 3].map(i => <div key={i} style={{ height: 16, width: 30, borderRadius: 4, border: `1px solid ${i === 1 ? PB : "var(--border)"}`, background: i === 1 ? "var(--brand-50)" : "#fff" }} />)}
        </div>
        <div style={{ marginTop: "auto" }}>{miniBtn("Continue →")}</div>
      </div>
    </div>
  ),
  confirm: () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <MiniStepper active={2} />
      <div style={{ ...miniPad, gap: 7, paddingTop: 4 }}>
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 7, padding: 9, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>{b(22, 22, PB, 999)}<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{b(58, 5, "var(--n-600)")}{b(38, 4, "var(--n-200)")}</div></div>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid var(--n-100)" }}>{b(40, 4, "var(--n-200)")}{b(54, 4, "var(--n-300)")}</div>
          ))}
        </div>
        <div style={{ marginTop: "auto" }}>{miniBtn("✓ Confirm Booking", PB)}</div>
      </div>
    </div>
  ),
  success: () => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, width: "100%" }}>
        <span style={{ width: 38, height: 38, borderRadius: 999, background: PG, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="check" size={20} style={{ color: "#fff" }} /></span>
        {b(110, 7, "var(--n-700)")}{b(80, 4, "var(--n-300)")}
        <div style={{ width: "100%", background: "#fff", border: "1px solid var(--border)", borderRadius: 7, padding: 8, display: "flex", flexDirection: "column", gap: 6, marginTop: 2 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>{b(36, 4, "var(--n-200)")}{b(50, 4, "var(--n-300)")}</div>)}
        </div>
        <div style={{ width: "100%", marginTop: 2 }}>{miniBtn("View Appointment")}</div>
      </div>
    </div>
  ),
};

const FLOW = [
  ["1", "Sign in", M.signin], ["2", "Dashboard", M.dashboard], ["3", "Choose doctor", M.book],
  ["4", "Date & time", M.datetime], ["5", "Confirm", M.confirm], ["6", "Success", M.success],
];

function PrototypeArtifact() {
  return (
    <ArtifactFrame n="10" kicker="Validation · Interactive" title="Clickable Prototype — Booking Flow"
      desc="The primary path, fully clickable across 30 real screens: sign in → dashboard → book → pick date & time → confirm → success. Real screen-to-screen navigation, not a slideshow.">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 22 }}>
        {/* flow row */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "stretch", gap: 6 }}>
          {FLOW.map(([n, label, Screen], i) => (
            <React.Fragment key={n}>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                  <span style={{ width: 19, height: 19, borderRadius: 999, background: ACCENT, color: "#fff", fontSize: 10.5, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{n}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--fg-1)" }}>{label}</span>
                </div>
                <MiniFrame><Screen /></MiniFrame>
              </div>
              {i < FLOW.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", paddingTop: 28, flex: "none" }}>
                  <Icon name="chevron-right" size={20} style={{ color: "var(--n-300)" }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* launch bar */}
        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 22, padding: "20px 26px", borderRadius: 16,
          background: "var(--sidebar-bg)", color: "#fff", boxShadow: "var(--shadow-md)" }}>
          <span style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(29,111,219,.22)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <Icon name="mouse-pointer-click" size={24} style={{ color: "#fff" }} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Try the live prototype</div>
            <div style={{ fontSize: 13.5, color: "var(--sidebar-text-strong)", marginTop: 3 }}>30 interactive screens · keyboard accessible · responsive — opens in a new tab.</div>
          </div>
          <div style={{ display: "flex", gap: 22, flex: "none", marginRight: 8 }}>
            {[["30", "Screens"], ["5", "Core flows"], ["AA", "WCAG 2.1"]].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10.5, color: "var(--sidebar-text)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
          <a href={PROTO_URL} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, height: 48, padding: "0 24px",
            borderRadius: 10, background: ACCENT, color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", flex: "none", boxShadow: "var(--shadow-md)" }}>
            Open prototype <Icon name="arrow-up-right" size={19} />
          </a>
        </div>
      </div>
    </ArtifactFrame>
  );
}

/* ====================================================================== */
/* Canvas assembly                                                         */
/* ====================================================================== */
const ARTIFACTS = [
  ["01", "User Personas", PersonasArtifact],
  ["02", "Competitive Research", ResearchArtifact],
  ["03", "Journey Map", JourneyArtifact],
  ["04", "Information Architecture", IAArtifact],
  ["05", "Lo-fi Wireframes", LoFiArtifact],
  ["06", "Mid-fi Wireframes", MidFiArtifact],
  ["07", "Design System", DesignSystemArtifact],
  ["08", "Accessibility Audit", A11yArtifact],
  ["09", "Final UI", FinalUIArtifact],
  ["10", "Clickable Prototype", PrototypeArtifact],
];

function CaseStudyApp() {
  // Upgrade Lucide <i data-lucide> → <svg> after every render…
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  // …and whenever new icon nodes mount (e.g. the focus overlay).
  React.useEffect(() => {
    if (!window.lucide) return;
    let raf = 0;
    const obs = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { if (document.querySelector("[data-lucide]")) window.lucide.createIcons(); });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <DesignCanvas>
      <DCSection id="medbridge-casestudy" title="MedBridge — UX Case Study"
        subtitle="Healthcare patient portal · 10 artifacts — research → competitive analysis → IA → wireframes → system → final UI → prototype">
        {ARTIFACTS.map(([n, name, Comp]) => (
          <DCArtboard key={n} id={n} label={`${n} · ${name}`} width={FRAME_W} height={FRAME_H}>
            <Comp />
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CaseStudyApp />);
