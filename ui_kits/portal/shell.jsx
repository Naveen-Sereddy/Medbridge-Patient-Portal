/* MedBridge Portal — App shell: Sidebar, TopNav, PageShell */

function Sidebar({ route, go }) {
  const activeTop = {
    appointments: "appointments", providers: "providers", records: "records",
    prescriptions: "prescriptions", billing: "billing", messages: "messages",
    notifications: "notifications", help: "help", settings: "settings", dashboard: "dashboard",
  }[route] || route;
  return (
    <aside style={{ width: "var(--sidebar-w)", background: "var(--sidebar-bg)", color: "var(--sidebar-text)",
      display: "flex", flexDirection: "column", flex: "none", height: "100%" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "18px 22px 16px" }}>
        <BrandMark size={26} white />
        <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>MedBridge</span>
      </div>
      <div style={{ height: 1, background: "var(--sidebar-div)", margin: "0 0 14px" }} />
      <div style={{ padding: "0 22px 8px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: "#5C6B82" }}>MAIN MENU</div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0 12px" }}>
        {NAV.map(item => {
          const on = activeTop === item.id;
          return (
            <button key={item.id} onClick={() => go(item.id)}
              style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 12px", marginBottom: 2, border: "none", cursor: "pointer", textAlign: "left",
                borderRadius: 9, fontFamily: "inherit", fontSize: 13.5,
                fontWeight: on ? 600 : 500, color: on ? "#fff" : "var(--sidebar-text)",
                background: on ? "rgba(29,111,219,0.18)" : "transparent", transition: "background .15s, color .15s" }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--sidebar-bg-2)"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              {on && <span style={{ position: "absolute", left: -12, top: 8, bottom: 8, width: 3, background: "var(--brand-600)", borderRadius: "0 3px 3px 0" }} />}
              <Icon name={item.icon} size={19} style={{ color: on ? "#fff" : "#7E8DA4", flex: "none" }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span style={{ minWidth: 19, height: 19, padding: "0 5px", borderRadius: 999,
                background: on ? "#fff" : "var(--brand-600)", color: on ? "var(--brand-600)" : "#fff",
                fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ height: 1, background: "var(--sidebar-div)", margin: "10px 0 0" }} />
      <button onClick={() => go("settings")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
        background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}>
        <Avatar size="sm" initials="BM" name="Beth Mooney" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Beth Mooney</div>
          <div style={{ fontSize: 11, color: "var(--sidebar-text)" }}>Patient · #MB-4827</div>
        </div>
        <Icon name="chevron-right" size={16} style={{ color: "#5C6B82" }} />
      </button>
    </aside>
  );
}

function TopNav({ title, sub, go, onSearch }) {
  return (
    <header style={{ height: "var(--topnav-h)", background: "#fff", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", gap: 20, padding: "0 var(--content-pad)", flex: "none", zIndex: 5 }}>
      <div style={{ flex: "none", minWidth: 180 }}>
        <div style={{ fontSize: 19, fontWeight: 600, color: "var(--fg-1)", lineHeight: 1.15 }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div className="search" style={{ flex: 1, maxWidth: 420, marginLeft: "auto" }}>
        <Icon name="search" size={17} style={{ color: "var(--n-400)" }} />
        <input placeholder="Search appointments, records, messages…" aria-label="Search" />
      </div>
      <button className="btn-icon" aria-label="Help" onClick={() => go("help")}><Icon name="life-buoy" size={19} /></button>
      <button className="btn-icon" aria-label="Notifications" onClick={() => go("notifications")}>
        <Icon name="bell" size={19} />
        <span style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, borderRadius: 999, background: "var(--brand-600)", border: "2px solid #fff" }} />
      </button>
      <button onClick={() => go("settings")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }} aria-label="Account">
        <Avatar size="sm" initials="BM" name="Beth Mooney" />
      </button>
    </header>
  );
}

// Full app shell wrapper used by all in-app screens
function PageShell({ route, go, title, sub, children, scroll = true }) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--bg-page)" }}>
      <Sidebar route={route} go={go} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopNav title={title} sub={sub} go={go} />
        <main style={{ flex: 1, overflowY: scroll ? "auto" : "hidden", padding: scroll ? "var(--content-pad)" : 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function Breadcrumb({ items, go }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--fg-3)", marginBottom: 16 }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevron-right" size={14} style={{ color: "var(--n-300)" }} />}
          {it.to ? <button onClick={() => go(it.to)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
            color: "var(--brand-600)", fontWeight: 500, fontFamily: "inherit", fontSize: 13 }}>{it.label}</button>
            : <span style={{ color: "var(--fg-2)", fontWeight: 500 }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { Sidebar, TopNav, PageShell, Breadcrumb });
