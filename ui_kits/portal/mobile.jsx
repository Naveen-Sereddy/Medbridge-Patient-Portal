/* MedBridge Portal — Mobile (patient POV, full-bleed on a real phone) */
/* 8 screens: Sign in · Home · Appointments · Book · Confirmed · Prescriptions · Messages · Thread */
/* Reuses the same data (PATIENT, APPOINTMENTS, PRESCRIPTIONS, CONVERSATIONS, THREAD, PROVIDERS)
   and the same Button/Card/Badge/Avatar/Icon primitives as the desktop screens — this is the
   same product's patient-facing surfaces, scoped to what actually happens on a phone. Provider
   management, billing, records, and settings stay desktop — a patient checking a lab result or
   refilling a prescription from their phone is realistic; reconciling an invoice isn't. */

// ---- Mobile app shell: full-bleed content + bottom tab bar, no sidebar ----
function MobileShell({ active, children, scroll = true, showTabs = true }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", background: "var(--bg-page)" }}>
      <main style={{ flex: 1, overflowY: scroll ? "auto" : "hidden", paddingTop: "env(safe-area-inset-top)" }}>
        {children}
      </main>
      {showTabs && <MobileTabBar active={active} />}
    </div>
  );
}

function MobileTabBar({ active }) {
  const go = React.useContext(MobileNavCtx);
  const tabs = [
    { id: "m-home", icon: "home", label: "Home" },
    { id: "m-appointments", icon: "calendar", label: "Visits" },
    { id: "m-prescriptions", icon: "pill", label: "Rx" },
    { id: "m-messages", icon: "message-square", label: "Messages" },
  ];
  return (
    <nav style={{
      flex: "none", display: "flex", alignItems: "center", justifyContent: "space-around",
      height: 60, paddingBottom: "env(safe-area-inset-bottom)",
      background: "#fff", borderTop: "1px solid var(--border)"
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => go(t.id)} aria-label={t.label} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          background: "none", border: "none", cursor: "pointer", padding: "6px 14px", minWidth: 56,
          color: active === t.id ? "var(--brand-600)" : "var(--fg-3)"
        }}>
          <Icon name={t.icon} size={21} />
          <span style={{ fontSize: 10.5, fontWeight: 600 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

function MobileTopBar({ title, onBack, action }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "14px 16px",
      borderBottom: "1px solid var(--border)", background: "#fff", position: "sticky", top: 0, zIndex: 2
    }}>
      {onBack ? (
        <button onClick={onBack} aria-label="Back" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg-1)" }}>
          <Icon name="chevron-left" size={22} />
        </button>
      ) : <div style={{ width: 22 }} />}
      <div style={{ flex: 1, fontSize: 17, fontWeight: 600, color: "var(--fg-1)" }}>{title}</div>
      {action}
    </div>
  );
}

// Shared nav context so deep child components (tab bar) can call go() without prop drilling
const MobileNavCtx = React.createContext(() => {});

// ---- Sign in ----
function MobileLoginScreen({ go }) {
  return (
    <MobileNavCtx.Provider value={go}>
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", background: "var(--brand-600)", color: "#fff" }}>
        <div style={{ flex: "none", padding: "calc(48px + env(safe-area-inset-top)) 28px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <BrandMark size={30} white />
          <span style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>MedBridge</span>
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: "24px 24px 0 0", padding: "32px 24px calc(28px + env(safe-area-inset-bottom))", color: "var(--fg-1)", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: "var(--fg-3)", margin: "6px 0 0" }}>Sign in to your health portal</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
            <Field label="Email address"><Input value="sarah.johnson@email.com" icon="mail" /></Field>
            <Field label="Password"><Input value="••••••••••" type="password" icon="lock" /></Field>
            <Button block size="lg" onClick={() => go("dashboard")}>Sign In</Button>
            <Button variant="outline-gray" block size="lg" icon="globe" onClick={() => go("dashboard")}>Continue with Google</Button>
          </div>
          <div style={{ flex: 1 }} />
          <p style={{ textAlign: "center", fontSize: 11, color: "var(--n-400)", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="shield-check" size={13} /> HIPAA compliant · WCAG 2.1 AA
          </p>
        </div>
      </div>
    </MobileNavCtx.Provider>
  );
}

// ---- Home ----
function MobileHomeScreen({ go }) {
  const next = APPOINTMENTS[0];
  const nextProv = provById(next.prov);
  const dueRx = PRESCRIPTIONS.filter(r => r.status === "Refill Due");
  const unread = CONVERSATIONS.filter(c => c.unread).length;

  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-home">
        <div style={{ padding: "16px 16px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--fg-3)" }}>Good morning</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-1)", marginTop: 2 }}>Sarah</div>
            </div>
            <Avatar size="md" initials="SJ" name="Sarah Johnson" />
          </div>

          <Card accentTop="var(--brand-600)" style={{ marginTop: 18 }}>
            <div style={{ padding: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Next appointment</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ProviderAvatar prov={next.prov} size="md" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "var(--fg-1)" }}>{nextProv.full}</div>
                  <div style={{ fontSize: 12.5, color: "var(--fg-3)" }}>{nextProv.spec} · {next.type}</div>
                </div>
                <Badge status={next.status}>{next.status}</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13.5, color: "var(--fg-2)" }}>
                <Icon name="calendar" size={15} style={{ color: "var(--fg-3)" }} />{next.day} · {next.time}
              </div>
              <Button block style={{ marginTop: 14 }} onClick={() => go("m-appointments")}>View details</Button>
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
            <button onClick={() => go("m-book")} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <TintIcon icon="calendar-plus" color="var(--brand-600)" size={38} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>Book visit</span>
            </button>
            <button onClick={() => go("m-prescriptions")} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <TintIcon icon="pill" color="var(--teal-600)" size={38} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>Refill Rx</span>
            </button>
          </div>

          {dueRx.length > 0 && (
            <Alert kind="warn" title={`${dueRx.length} prescription${dueRx.length > 1 ? "s" : ""} due for refill`} action={
              <button onClick={() => go("m-prescriptions")} style={{ background: "none", border: "none", color: "var(--amber-700)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Review</button>
            } style={{ marginTop: 16 }}>
              {dueRx.map(r => r.name).join(", ")}
            </Alert>
          )}

          <div style={{ marginTop: 20 }}>
            <SectionHead title="Messages" sub={unread > 0 ? `${unread} unread` : "All caught up"} action={
              <button onClick={() => go("m-messages")} style={{ background: "none", border: "none", color: "var(--brand-600)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>See all</button>
            } />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONVERSATIONS.slice(0, 2).map(c => (
                <MobileConvoRow key={c.id} c={c} onClick={() => go("m-thread")} />
              ))}
            </div>
          </div>
        </div>
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

function MobileConvoRow({ c, onClick }) {
  const p = c.prov && provById(c.prov);
  const name = p ? p.full : c.name;
  return (
    <div onClick={onClick} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", cursor: "pointer" }}>
      {p ? <ProviderAvatar prov={c.prov} size="sm" /> : <Avatar size="sm" color={c.color} initials={c.initials} name={c.name} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: c.unread ? 700 : 500, fontSize: 13.5, color: "var(--fg-1)" }}>{name}</span>
          <span style={{ fontSize: 11, color: "var(--fg-3)", flex: "none" }}>{c.time}</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--fg-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.preview}</div>
      </div>
      {c.unread && <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--brand-600)", flex: "none" }} />}
    </div>
  );
}

// ---- Appointments ----
function MobileAppointmentsScreen({ go }) {
  const [detail, setDetail] = React.useState(null);
  const appt = detail && APPOINTMENTS.find(a => a.id === detail);

  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-appointments" scroll={!detail}>
        {!detail ? (
          <>
            <MobileTopBar title="My visits" />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {APPOINTMENTS.map(a => {
                const p = provById(a.prov);
                return (
                  <div key={a.id} onClick={() => setDetail(a.id)} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 14, cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <ProviderAvatar prov={a.prov} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--fg-1)" }}>{p.full}</div>
                          <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{p.spec}</div>
                        </div>
                      </div>
                      <Badge status={a.status}>{a.status}</Badge>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12.5, color: "var(--fg-2)" }}>
                      <Icon name="calendar" size={14} style={{ color: "var(--fg-3)" }} />{a.date} · {a.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <MobileTopBar title="Appointment" onBack={() => setDetail(null)} />
            <div style={{ padding: 16 }}>
              <Card>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ProviderAvatar prov={appt.prov} size="lg" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--fg-1)" }}>{provById(appt.prov).full}</div>
                      <div style={{ fontSize: 13, color: "var(--fg-3)" }}>{provById(appt.prov).spec}</div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
                  <MobileDetailRow icon="calendar" label={appt.day} />
                  <MobileDetailRow icon="clock" label={`${appt.time} · ${appt.dur}`} />
                  <MobileDetailRow icon={appt.type === "Telehealth" ? "video" : "map-pin"} label={appt.loc} />
                  <MobileDetailRow icon="file-text" label={appt.reason} />
                  <MobileDetailRow icon="credit-card" label={`Copay ${appt.copay}`} />
                </div>
              </Card>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Button variant="outline-gray" block onClick={() => setDetail(null)}>Reschedule</Button>
                <Button variant="danger" block onClick={() => setDetail(null)}>Cancel visit</Button>
              </div>
            </div>
          </>
        )}
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

function MobileDetailRow({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", fontSize: 13.5, color: "var(--fg-2)" }}>
      <Icon name={icon} size={16} style={{ color: "var(--fg-3)", flex: "none", marginTop: 1 }} />
      <span>{label}</span>
    </div>
  );
}

// ---- Book ----
function MobileBookScreen({ go }) {
  const [prov, setProv] = React.useState(null);
  const [slot, setSlot] = React.useState(null);
  const slots = ["Mon, Jun 8 · 9:00 AM", "Mon, Jun 8 · 2:30 PM", "Wed, Jun 10 · 11:00 AM", "Fri, Jun 12 · 10:15 AM"];

  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-home" showTabs={false}>
        <MobileTopBar title="Book a visit" onBack={() => go("m-home")} />
        <div style={{ padding: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>1. Choose a doctor</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PROVIDERS.slice(0, 4).map(p => (
              <div key={p.id} onClick={() => setProv(p.id)} style={{
                display: "flex", gap: 10, alignItems: "center", padding: 12, borderRadius: "var(--radius-lg)", cursor: "pointer",
                border: prov === p.id ? "2px solid var(--brand-600)" : "1px solid var(--border)",
                background: prov === p.id ? "var(--brand-50)" : "#fff"
              }}>
                <ProviderAvatar prov={p.id} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--fg-1)" }}>{p.full}</div>
                  <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{p.spec}</div>
                </div>
                {prov === p.id && <Icon name="circle-check" size={20} style={{ color: "var(--brand-600)" }} />}
              </div>
            ))}
          </div>

          {prov && (
            <>
              <div className="eyebrow" style={{ margin: "20px 0 10px" }}>2. Pick a time</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {slots.map(s => (
                  <div key={s} onClick={() => setSlot(s)} style={{
                    padding: 12, borderRadius: "var(--radius-lg)", cursor: "pointer", fontSize: 13.5, fontWeight: 500,
                    border: slot === s ? "2px solid var(--brand-600)" : "1px solid var(--border)",
                    background: slot === s ? "var(--brand-50)" : "#fff", color: "var(--fg-1)"
                  }}>{s}</div>
                ))}
              </div>
            </>
          )}
        </div>
        {prov && slot && (
          <div style={{ padding: "14px 16px calc(20px + env(safe-area-inset-bottom))", background: "#fff", borderTop: "1px solid var(--border)" }}>
            <Button block size="lg" onClick={() => go("m-appt-confirmed")}>Confirm appointment</Button>
          </div>
        )}
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

function MobileApptConfirmedScreen({ go }) {
  return (
    <MobileNavCtx.Provider value={go}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 28px", gap: 14, background: "var(--bg-page)" }}>
        <div style={{ width: 76, height: 76, borderRadius: 999, background: "var(--green-bg)", color: "var(--green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="check" size={38} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fg-1)" }}>Appointment booked</div>
        <p style={{ color: "var(--fg-3)", fontSize: 14, maxWidth: 280 }}>You'll get a reminder 24 hours before your visit. Add it to your calendar so you don't miss it.</p>
        <div style={{ flex: 1 }} />
        <Button block size="lg" style={{ width: "100%" }} onClick={() => go("m-appointments")}>View my visits</Button>
        <Button variant="outline-gray" block style={{ width: "100%" }} onClick={() => go("m-home")}>Back to home</Button>
      </div>
    </MobileNavCtx.Provider>
  );
}

// ---- Prescriptions ----
function MobilePrescriptionsScreen({ go }) {
  const [refilled, setRefilled] = React.useState([]);
  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-prescriptions">
        <MobileTopBar title="Prescriptions" />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {PRESCRIPTIONS.map(rx => {
            const done = refilled.includes(rx.id);
            return (
              <Card key={rx.id} accent={rx.color}>
                <div style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--fg-1)" }}>{rx.name} {rx.dose}</div>
                      <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 2 }}>{rx.freq}</div>
                    </div>
                    <Badge status={done ? "Active" : rx.status}>{done ? "Refilled" : rx.status}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 10 }}>{rx.dr} · {rx.left} refills left · Next {rx.refill}</div>
                  {!done && (
                    <Button size="sm" variant={rx.status === "Refill Due" ? "primary" : "outline-gray"} style={{ marginTop: 12 }} onClick={() => setRefilled(r => [...r, rx.id])}>
                      Request refill
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

// ---- Messages ----
function MobileMessagesScreen({ go }) {
  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-messages">
        <MobileTopBar title="Messages" />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {CONVERSATIONS.map(c => (
            <MobileConvoRow key={c.id} c={c} onClick={() => go("m-thread")} />
          ))}
        </div>
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

function MobileThreadScreen({ go }) {
  const [msg, setMsg] = React.useState("");
  const [thread, setThread] = React.useState(THREAD);
  const p = provById("chen");
  const send = () => {
    if (!msg.trim()) return;
    setThread(t => [...t, { from: "pat", text: msg.trim(), time: "Just now" }]);
    setMsg("");
  };
  return (
    <MobileNavCtx.Provider value={go}>
      <MobileShell active="m-messages" showTabs={false}>
        <MobileTopBar title={p.full} onBack={() => go("m-messages")} />
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {thread.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "pat" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "82%", padding: "10px 13px", borderRadius: 14,
                background: m.from === "pat" ? "var(--brand-600)" : "#fff",
                color: m.from === "pat" ? "#fff" : "var(--fg-1)",
                border: m.from === "pat" ? "none" : "1px solid var(--border)",
                fontSize: 13.5, lineHeight: 1.5, whiteSpace: "pre-line"
              }}>
                {m.text}
                <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 6 }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px calc(14px + env(safe-area-inset-bottom))", borderTop: "1px solid var(--border)", background: "#fff" }}>
          <Input value={msg} placeholder="Type a message…" onChange={setMsg} />
          <button aria-label="Send" onClick={send} style={{ flex: "none", width: 38, height: 38, borderRadius: 999, background: "var(--brand-600)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="arrow-up" size={17} />
          </button>
        </div>
      </MobileShell>
    </MobileNavCtx.Provider>
  );
}

Object.assign(window, {
  MobileShell, MobileTabBar, MobileTopBar,
  MobileLoginScreen, MobileHomeScreen, MobileAppointmentsScreen,
  MobileBookScreen, MobileApptConfirmedScreen, MobilePrescriptionsScreen,
  MobileMessagesScreen, MobileThreadScreen,
});
