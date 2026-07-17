/* MedBridge UX Case Study — shared frame + helpers
   Each artifact renders inside <ArtifactFrame> at 1760×1100. Reuses the
   MedBridge design tokens (colors_and_type.css) and portal data/primitives. */

const FRAME_W = 1760;
const FRAME_H = 1100;
const ACCENT = "var(--brand-600)";   // accent used by artifact content (real product brand)
const CHROME_ACCENT = "var(--cs-accent)"; // accent used by the frame chrome (site identity)

// ---------------------------------------------------------------- ArtifactFrame
// Frame chrome (background, header band, typography) matches the portfolio
// site's own identity (charcoal/off-white/gold, Fraunces/Inter). Artifact
// content below the divider keeps MedBridge's real product tokens — those
// panels render the actual research/wireframe/UI deliverable and shouldn't
// be recolored to the portfolio's palette.
function ArtifactFrame({ n, kicker, title, desc, children, padded = true }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "var(--cs-bg)", display: "flex",
      flexDirection: "column", fontFamily: "var(--cs-f-sans)", color: "var(--cs-ink)", overflow: "hidden" }}>
      {/* Header band */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "44px 56px 22px", flex: "none" }}>
        <div style={{ display: "flex", gap: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "transparent", color: CHROME_ACCENT,
            border: "1px solid var(--cs-line)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none",
            fontFamily: "var(--cs-f-serif)", fontStyle: "italic", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>{n}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "var(--cs-ink-3)" }}>{kicker}</div>
            <h1 style={{ margin: "5px 0 0", fontFamily: "var(--cs-f-serif)", fontStyle: "italic", fontSize: 33, fontWeight: 500, letterSpacing: "-0.01em",
              lineHeight: 1.05, color: "var(--cs-ink)" }}>{title}</h1>
            {desc && <p style={{ margin: "9px 0 0", fontSize: 15.5, color: "var(--cs-ink-3)", lineHeight: 1.45,
              maxWidth: 920 }}>{desc}</p>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 11, flex: "none", paddingTop: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: CHROME_ACCENT, display: "inline-block" }} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.01em", color: "var(--cs-ink)" }}>MedBridge</div>
            <div style={{ fontSize: 11, color: "var(--cs-ink-3)", fontWeight: 500 }}>Patient Portal · UX Case Study</div>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: "var(--cs-line)", margin: "0 56px", flex: "none" }} />
      {/* Body — real product tokens from here down */}
      <div style={{ flex: 1, minHeight: 0, padding: padded ? "30px 56px 46px" : 0, display: "flex", flexDirection: "column",
        fontFamily: "var(--font-sans)", color: "var(--fg-1)" }}>
        {children}
      </div>
    </div>
  );
}

// Eyebrow label used inside artifact bodies
function Kick({ children, color, style }) {
  return <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
    color: color || "var(--fg-3)", ...(style || {}) }}>{children}</div>;
}

// A soft titled panel
function Panel({ title, icon, iconColor, children, style, bodyStyle, accent }) {
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14,
      boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", overflow: "hidden", ...(style || {}) }}>
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 18px",
          borderBottom: "1px solid var(--n-100)", flex: "none" }}>
          {icon && <span style={{ color: iconColor || ACCENT, display: "inline-flex" }}><Icon name={icon} size={17} /></span>}
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--fg-1)" }}>{title}</span>
          {accent && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--fg-3)" }}>{accent}</span>}
        </div>
      )}
      <div style={{ padding: 18, flex: 1, minHeight: 0, ...(bodyStyle || {}) }}>{children}</div>
    </div>
  );
}

// Small dot-led list item
function DotItem({ color, children, icon }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, lineHeight: 1.45, color: "var(--fg-2)" }}>
      {icon
        ? <span style={{ color: color || ACCENT, display: "inline-flex", marginTop: 1, flex: "none" }}><Icon name={icon} size={16} /></span>
        : <span style={{ width: 7, height: 7, borderRadius: 999, background: color || ACCENT, marginTop: 6, flex: "none" }} />}
      <span>{children}</span>
    </div>
  );
}

/* =====================================================================
   WIREFRAME PRIMITIVES  (lo-fi = grayscale only; mid-fi adds one accent)
   ===================================================================== */
const WIRE = {
  ink: "#475569", line: "#94A3B8", faint: "#CBD5E1", fill: "#E2E8F0",
  fillSoft: "#EEF2F6", paper: "#F8FAFC", edge: "#CBD5E1",
};

// Grey "text" bar
function WBar({ w = "100%", h = 9, c, r = 4, style }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c || WIRE.line, ...(style || {}) }} />;
}
// Grey block / image placeholder
function WBlock({ w = "100%", h = 40, r = 8, c, dashed, children, style }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r, background: c || WIRE.fillSoft,
      border: dashed ? `1.5px dashed ${WIRE.faint}` : "none", display: "flex", alignItems: "center",
      justifyContent: "center", color: WIRE.line, flex: "none", ...(style || {}) }}>{children}</div>
  );
}
// Wire button (accent only when `accent` set — used by mid-fi for primary actions)
function WBtn({ children, accent, w, ghost, h = 30, style }) {
  return (
    <div style={{ height: h, width: w, padding: "0 14px", borderRadius: 7, display: "inline-flex",
      alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, fontWeight: 600, flex: "none",
      background: accent ? ACCENT : ghost ? "transparent" : WIRE.fill,
      color: accent ? "#fff" : WIRE.ink, border: ghost ? `1.5px solid ${WIRE.faint}` : "none",
      ...(style || {}) }}>{children || <WBar w={Math.max(28, (typeof w === "number" ? w - 28 : 44))} h={8} c={accent ? "rgba(255,255,255,.7)" : WIRE.line} />}</div>
  );
}
// Browser/device chrome wrapper for a wireframe screen
function WScreen({ title, children, style }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: `1.5px solid ${WIRE.edge}`,
      background: "#fff", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", ...(style || {}) }}>
      <div style={{ height: 30, background: "#fff", borderBottom: `1px solid ${WIRE.fill}`, display: "flex",
        alignItems: "center", gap: 6, padding: "0 12px", flex: "none" }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: WIRE.faint }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: WIRE.faint }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: WIRE.faint }} />
        {title && <span style={{ marginLeft: 10, fontSize: 10.5, fontWeight: 600, color: WIRE.line,
          letterSpacing: "0.04em" }}>{title}</span>}
      </div>
      <div style={{ flex: 1, minHeight: 0, background: WIRE.paper, padding: 14, display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

Object.assign(window, { FRAME_W, FRAME_H, ACCENT, ArtifactFrame, Kick, Panel, DotItem, WIRE, WBar, WBlock, WBtn, WScreen });
