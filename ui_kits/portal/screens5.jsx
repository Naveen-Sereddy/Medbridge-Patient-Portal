/* MedBridge Portal — Notifications, Settings (Profile/Security/Notif prefs), Help, Profile */

const NOTIF_ACTION_ROUTE = {
  "View Appointment": "appt-details", "View Details": "appt-details",
  "View Results": "tests", "Request Refill": "rx-detail",
  "Pay Now": "invoice", "View Invoice": "invoice",
  "Read Message": "thread", "View Document": "files",
};

function NotificationsScreen({ go }) {
  return (
    <PageShell route="notifications" go={go} title="Notifications" sub="4 unread">
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <Button variant="outline-gray" icon="check-check">Mark All Read</Button>
        </div>
        {NOTIFICATIONS.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{g.group}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {g.items.map((it, i) => (
                <Card key={i} accent={it.unread ? it.color : undefined}>
                  <div style={{ display: "flex", gap: 16, padding: "16px 20px" }}>
                    <TintIcon icon={it.icon} color={it.color} size={42} iconSize={20} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, flex: 1, minWidth: 0 }}>{it.title}</span>
                        <span style={{ fontSize: 12, color: "var(--n-400)", flex: "none", whiteSpace: "nowrap", lineHeight: 1.35 }}>{it.time}</span></div>
                      <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 6, lineHeight: 1.5 }}>{it.body}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        {it.actions.map((a, ai) => <Button key={ai} variant={ai === 0 ? "outline" : "ghost"} size="sm"
                          onClick={NOTIF_ACTION_ROUTE[a] ? () => go(NOTIF_ACTION_ROUTE[a]) : undefined}>{a}</Button>)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

const SETTINGS_NAV = ["Profile","Security","Notifications","Billing Preferences","Connected Providers","Accessibility"];

function SettingsLayout({ go, active, children }) {
  const route = { Profile: "settings", Security: "security", Notifications: "notif-settings" };
  return (
    <PageShell route="settings" go={go} title="Settings" sub="Account preferences">
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, alignItems: "start" }}>
        <Card pad>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Account</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {SETTINGS_NAV.map(s => {
              const on = s === active;
              return (
                <button key={s} onClick={() => route[s] && go(route[s])} style={{ position: "relative", textAlign: "left", padding: "10px 12px", borderRadius: 8,
                  border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, fontWeight: on ? 600 : 500,
                  background: on ? "var(--brand-50)" : "transparent", color: on ? "var(--brand-600)" : "var(--fg-2)" }}>
                  {on && <span style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, background: "var(--brand-600)", borderRadius: "0 3px 3px 0" }} />}
                  {s}</button>
              );
            })}
          </div>
        </Card>
        <div>{children}</div>
      </div>
    </PageShell>
  );
}

function SettingsProfileScreen({ go }) {
  return (
    <SettingsLayout go={go} active="Profile">
      <Card pad>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Profile Information</h2>
        <div className="divider" style={{ margin: "16px -24px 20px" }} />
        <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 24 }}>
          <Avatar size="xl" initials="BM" name="Beth Mooney" />
          <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600 }}>Beth Mooney</div>
            <div style={{ fontSize: 13, color: "var(--fg-3)" }}>Patient since 2022 · MRN: MB-4827</div></div>
          <Button variant="outline-gray" icon="camera">Change Photo</Button>
          <Button variant="ghost">Remove</Button>
        </div>
        <div className="divider" style={{ margin: "0 -24px 20px" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 16px" }}>Personal Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="First Name"><Input value="Beth" /></Field>
          <Field label="Last Name"><Input value="Mooney" /></Field>
          <Field label="Date of Birth"><Input value="March 14, 1990" icon="calendar" /></Field>
          <Field label="Gender"><Input value="Female" /></Field>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Address"><Input value={PATIENT.address} icon="map-pin" /></Field></div>
        </div>
        <div className="divider" style={{ margin: "22px -24px 20px" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 16px" }}>Contact Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Email Address"><Input value="beth.mooney@email.com" icon="mail" /></Field>
          <Field label="Phone Number"><Input value="(212) 555-0147" icon="phone" /></Field>
        </div>
        <div className="divider" style={{ margin: "22px -24px 20px" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="ghost">Cancel</Button>
          <Button icon="check">Save Changes</Button>
        </div>
      </Card>
    </SettingsLayout>
  );
}

function SecurityScreen({ go }) {
  const [tfa, setTfa] = React.useState(true);
  const sessions = [
    { d: "MacBook Pro — Chrome", l: "New York, NY", t: "Active now", cur: true },
    { d: "iPhone 15 — Safari", l: "New York, NY", t: "2 hours ago", cur: false },
    { d: "iPad Air — Safari", l: "New York, NY", t: "Yesterday 8:30 PM", cur: false },
  ];
  return (
    <SettingsLayout go={go} active="Security">
      <Card pad>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Security Settings</h2>
        <div className="divider" style={{ margin: "16px -24px 20px" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 16px" }}>Change Password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          <Field label="Current Password"><Input value="••••••••••" type="password" icon="lock" /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="New Password"><Input value="••••••••••" type="password" /></Field>
            <Field label="Confirm New Password"><Input value="••••••••••" type="password" /></Field>
          </div>
          <div><Button icon="check">Update Password</Button></div>
        </div>
        <div className="divider" style={{ margin: "22px -24px 20px" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>Two-Factor Authentication</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--green-bg)", border: "1px solid #A7F3D0", borderRadius: 10, padding: "16px 18px" }}>
          <Icon name="shield-check" size={24} style={{ color: "var(--green-600)" }} />
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>2FA enabled via Authenticator App</div>
            <div style={{ fontSize: 12.5, color: "var(--fg-2)" }}>Your account is protected with two-factor authentication.</div></div>
          <Toggle checked={tfa} onChange={setTfa} />
        </div>
        <div className="divider" style={{ margin: "22px -24px 20px" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px" }}>Active Sessions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {sessions.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, background: s.cur ? "var(--green-bg)" : "var(--n-100)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <Icon name={s.d.includes("iPhone") ? "smartphone" : s.d.includes("iPad") ? "tablet" : "monitor"} size={17} style={{ color: s.cur ? "var(--green-600)" : "var(--n-500)" }} /></span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.d}</div>
                <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{s.l} · {s.t}</div></div>
              {s.cur ? <Badge>This device</Badge> : <button style={{ ...btnLink, color: "var(--red-700)" }}>Sign out</button>}
            </div>
          ))}
        </div>
      </Card>
    </SettingsLayout>
  );
}

function NotifSettingsScreen({ go }) {
  const cats = [
    { title: "Appointments", items: [
      { l: "Appointment reminders", e: true, s: true, p: true },
      { l: "Appointment confirmation", e: true, s: true, p: false },
      { l: "Cancellation & rescheduling", e: true, s: false, p: true } ]},
    { title: "Health & Records", items: [
      { l: "New test results available", e: true, s: false, p: true },
      { l: "Prescription refill reminders", e: true, s: true, p: true },
      { l: "New document uploaded", e: true, s: false, p: false } ]},
    { title: "Billing", items: [
      { l: "Invoice ready", e: true, s: false, p: true },
      { l: "Payment confirmation", e: true, s: true, p: false },
      { l: "Payment due reminder", e: true, s: true, p: true } ]},
  ];
  const [state, setState] = React.useState(cats);
  const toggle = (ci, ii, key) => setState(prev => prev.map((c, x) => x !== ci ? c : { ...c, items: c.items.map((it, y) => y !== ii ? it : { ...it, [key]: !it[key] }) }));
  return (
    <SettingsLayout go={go} active="Notifications">
      <Card pad>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Notification Preferences</h2>
        <div className="divider" style={{ margin: "16px -24px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 72px 72px 72px", alignItems: "center", padding: "14px 0 10px" }}>
          <span />
          {["Email","SMS","Push"].map(h => <span key={h} style={{ textAlign: "center", fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--fg-3)" }}>{h}</span>)}
        </div>
        {state.map((cat, ci) => (
          <div key={ci}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n-700)", padding: "14px 0 4px" }}>{cat.title}</div>
            {cat.items.map((it, ii) => (
              <div key={ii} style={{ display: "grid", gridTemplateColumns: "1fr 72px 72px 72px", alignItems: "center", padding: "12px 0", borderTop: "1px solid var(--n-100)" }}>
                <span style={{ fontSize: 14 }}>{it.l}</span>
                {["e","s","p"].map(k => <div key={k} style={{ display: "flex", justifyContent: "center" }}><Toggle checked={it[k]} onChange={() => toggle(ci, ii, k)} /></div>)}
              </div>
            ))}
          </div>
        ))}
        <div className="divider" style={{ margin: "16px -24px 20px" }} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}><Button icon="check">Save Preferences</Button></div>
      </Card>
    </SettingsLayout>
  );
}

// ---- HELP CENTER ----
function HelpScreen({ go }) {
  const topics = [
    { icon: "calendar-days", title: "Appointments", body: "Booking, rescheduling, and telehealth visits", color: "var(--brand-600)" },
    { icon: "pill", title: "Prescriptions", body: "Refills, pharmacies, and dosage questions", color: "var(--teal-600)" },
    { icon: "credit-card", title: "Billing & Insurance", body: "Invoices, payments, and coverage", color: "var(--amber-700)" },
    { icon: "folder-heart", title: "Medical Records", body: "Test results, history, and documents", color: "var(--purple-700)" },
    { icon: "shield-check", title: "Privacy & Security", body: "Account safety and data privacy", color: "var(--green-600)" },
    { icon: "user", title: "Account & Profile", body: "Settings, contact info, and access", color: "var(--brand-700)" },
  ];
  const faqs = [
    "How do I reschedule or cancel an appointment?",
    "How long do prescription refills take to process?",
    "Why is my insurance coverage showing 80%?",
    "How do I download my complete medical records?",
    "Is my health data secure on MedBridge?",
  ];
  return (
    <PageShell route="help" go={go} title="Help Center" sub="Find answers or contact support">
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ borderRadius: 16, background: "var(--brand-600)", color: "#fff", padding: "36px 40px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -120, right: -40 }} />
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, position: "relative" }}>How can we help, Beth?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: "8px 0 20px", position: "relative" }}>Search our help articles or reach your care team directly.</p>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 10, padding: "0 16px", height: 50, maxWidth: 560 }}>
            <Icon name="search" size={20} style={{ color: "var(--n-400)" }} />
            <input placeholder="Search help articles…" style={{ flex: 1, border: "none", outline: "none", fontFamily: "inherit", fontSize: 15, color: "var(--fg-1)" }} />
            <Button>Search</Button>
          </div>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Browse Topics</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
          {topics.map((t, i) => (
            <Card key={i} hover>
              <div style={{ padding: 20 }}>
                <TintIcon icon={t.icon} color={t.color} size={42} iconSize={21} />
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 14 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 4, lineHeight: 1.5 }}>{t.body}</div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }}>
          <Card pad>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>Frequently Asked Questions</h3>
            <div>
              {faqs.map((q, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: i ? "1px solid var(--n-100)" : "none", cursor: "pointer" }}>
                  <Icon name="help-circle" size={18} style={{ color: "var(--brand-600)" }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{q}</span>
                  <Icon name="chevron-right" size={17} style={{ color: "var(--n-400)" }} />
                </div>
              ))}
            </div>
          </Card>
          <Card pad>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 14px" }}>Contact Support</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, background: "var(--brand-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name="message-square" size={18} style={{ color: "var(--brand-600)" }} /></span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>Secure Message</div><div style={{ fontSize: 12, color: "var(--fg-3)" }}>Replies within 1 business day</div></div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, background: "var(--teal-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name="phone" size={18} style={{ color: "var(--teal-600)" }} /></span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>1-800-MED-BRDG</div><div style={{ fontSize: 12, color: "var(--fg-3)" }}>Mon–Fri, 8 AM – 8 PM ET</div></div>
              </div>
              <Button block icon="message-square" style={{ marginTop: 6 }} onClick={() => go("thread")}>Message Support</Button>
              <div style={{ fontSize: 11.5, color: "var(--n-400)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 }}>
                <Icon name="alert-triangle" size={13} /> For emergencies, call 911</div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

Object.assign(window, { NotificationsScreen, SettingsProfileScreen, SecurityScreen, NotifSettingsScreen, HelpScreen });
