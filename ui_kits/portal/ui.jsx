/* MedBridge Portal — UI primitives (built on components.css) */

function Button({ variant = "primary", size, icon, iconRight, block, children, onClick, type, disabled, style }) {
  const cls = ["btn", "btn-" + variant];
  if (size) cls.push("btn-" + size);
  if (block) cls.push("btn-block");
  return (
    <button type={type || "button"} className={cls.join(" ")} onClick={onClick} disabled={disabled} style={style}>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </button>
  );
}

function Badge({ status, children, noDot }) {
  const map = {
    Confirmed: "success", Completed: "success", Paid: "success", Reviewed: "success", Managed: "success", Approved: "success", Active: "active",
    Pending: "pending", "Refill Due": "pending", Soon: "pending",
    Cancelled: "cancelled", Unpaid: "cancelled", Urgent: "cancelled", "Expiring Soon": "cancelled",
    New: "info", Telehealth: "info",
    "In-Person": "neutral",
  };
  const kind = map[children] || map[status] || status || "neutral";
  return <span className={"badge badge-" + kind + (noDot ? " no-dot" : "")}>{children}</span>;
}

function Avatar({ size = "md", color, initials, name, icon }) {
  const sz = "avatar-" + size;
  return (
    <span className={"avatar " + sz} style={{ background: color || "var(--brand-600)" }} aria-label={name}>
      {icon ? <Icon name={icon} size={size === "lg" ? 26 : 18} /> : (initials || (name ? name.split(" ").map(w => w[0]).slice(0, 2).join("") : ""))}
    </span>
  );
}

function ProviderAvatar({ prov, size = "md" }) {
  const p = provById(prov);
  if (!p) return <Avatar size={size} />;
  return <Avatar size={size} color={p.color} initials={p.initials} name={p.full} />;
}

// Icon in a tinted rounded square. Reliable across all sizes — uses absolutely-positioned
// background instead of fragile negative-margin overlay.
function TintIcon({ icon, color, size = 42, iconSize, radius = 10 }) {
  const isz = iconSize || Math.round(size * 0.47);
  return (
    <span style={{ position: "relative", width: size, height: size, borderRadius: radius, flex: "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "absolute", inset: 0, background: color, opacity: 0.14, borderRadius: "inherit" }} />
      <Icon name={icon} size={isz} style={{ color, position: "relative" }} />
    </span>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <div className={"field" + (error ? " field-error" : "")}>
      {label && <label className="field-label">{label}</label>}
      {children}
      {(hint || error) && <span className="field-hint">{error || hint}</span>}
    </div>
  );
}

function Input({ value, placeholder, icon, type, readOnly, onChange }) {
  const input = <input className="input" value={value} placeholder={placeholder} type={type || "text"} readOnly={readOnly}
    onChange={e => onChange && onChange(e.target.value)} />;
  if (icon) return (<div className="input-group"><Icon name={icon} size={18} cls="input-icon" />{input}</div>);
  return input;
}

function Toggle({ checked, onChange }) {
  return <button type="button" role="switch" aria-checked={checked ? "true" : "false"} className="toggle"
    onClick={() => onChange && onChange(!checked)} />;
}

function Card({ accent, accentTop, hover, pad, children, style, onClick, className }) {
  const cls = ["card"];
  if (accent || accentTop) cls.push(accentTop ? "card-accent card-accent-top" : "card-accent");
  if (hover) cls.push("card-hover");
  if (pad) cls.push("card-pad");
  if (className) cls.push(className);
  const st = { ...(style || {}) };
  if (accent || accentTop) st["--accent-strip"] = accent || accentTop;
  return <div className={cls.join(" ")} style={st} onClick={onClick}>{children}</div>;
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(t => {
        const id = typeof t === "string" ? t : t.id;
        const label = typeof t === "string" ? t : t.label;
        return <button key={id} role="tab" aria-selected={active === id ? "true" : "false"} className="tab"
          onClick={() => onChange(id)}>{label}</button>;
      })}
    </div>
  );
}

function PillTabs({ tabs, active, onChange }) {
  return (
    <div className="pill-tabs" role="tablist">
      {tabs.map(t => {
        const id = typeof t === "string" ? t : t.id;
        const label = typeof t === "string" ? t : t.label;
        return <button key={id} role="tab" aria-selected={active === id ? "true" : "false"} className="pill-tab"
          onClick={() => onChange(id)}>{label}</button>;
      })}
    </div>
  );
}

function Alert({ kind = "info", icon, title, children, action }) {
  const icons = { info: "info", warn: "triangle-alert", success: "circle-check", danger: "octagon-alert" };
  return (
    <div className={"alert alert-" + kind}>
      <Icon name={icon || icons[kind]} size={20} />
      <div style={{ flex: 1 }}>
        {title && <div className="alert-title" style={{ marginBottom: children ? 3 : 0 }}>{title}</div>}
        {children && <div style={{ color: "var(--fg-2)", lineHeight: 1.5 }}>{children}</div>}
      </div>
      {action}
    </div>
  );
}

function Stat({ label, value, sub, subColor, subIcon, accent }) {
  return (
    <Card accent={accent} pad={false}>
      <div className="stat">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {sub && <div className="stat-sub" style={{ color: subColor || "var(--fg-3)" }}>
          {subIcon && <Icon name={subIcon} size={14} />}{sub}</div>}
      </div>
    </Card>
  );
}

function EmptyState({ icon, title, body, action }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "64px 24px", gap: 8 }}>
      <div style={{ width: 72, height: 72, borderRadius: 18, background: "var(--n-100)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-400)", marginBottom: 8 }}>
        <Icon name={icon} size={32} />
      </div>
      <div style={{ fontSize: "var(--text-h3)", fontWeight: 600, color: "var(--fg-1)" }}>{title}</div>
      <div style={{ fontSize: "var(--text-body)", color: "var(--fg-3)", maxWidth: 360, lineHeight: 1.5 }}>{body}</div>
      {action && <div style={{ marginTop: 12 }}>{action}</div>}
    </div>
  );
}

function Stepper({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {steps.map((s, i) => {
        const done = i < current, on = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999,
              background: done ? "var(--green-bg)" : on ? "var(--brand-600)" : "var(--n-100)",
              color: done ? "var(--green-600)" : on ? "#fff" : "var(--n-400)", fontWeight: 600, fontSize: 13 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: done ? "var(--green-600)" : on ? "rgba(255,255,255,.22)" : "var(--n-200)", color: done ? "#fff" : on ? "#fff" : "var(--n-500)", fontSize: 12 }}>
                {done ? <Icon name="check" size={13} /> : i + 1}</span>
              {s}
            </div>
            {i < steps.length - 1 && <div style={{ width: 28, height: 2, background: done ? "var(--green-600)" : "var(--n-200)", borderRadius: 2 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SectionHead({ title, sub, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "var(--text-title)", fontWeight: 600, color: "var(--fg-1)", whiteSpace: "nowrap" }}>{title}</h2>
        {sub && <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-3)", marginTop: 3 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

// Skeleton block
function Skel({ w, h, r, style }) {
  return <div className="skeleton" style={{ width: w || "100%", height: h || 14, borderRadius: r || 6, ...(style || {}) }} />;
}

Object.assign(window, {
  Button, Badge, Avatar, ProviderAvatar, TintIcon, Field, Input, Toggle, Card, Tabs, PillTabs,
  Alert, Stat, EmptyState, Stepper, SectionHead, Skel,
});
