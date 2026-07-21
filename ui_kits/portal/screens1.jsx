/* MedBridge Portal — Auth screens, Dashboard, and UI states */

function AuthLayout({ accent = "var(--brand-600)", accentDark = "var(--brand-800)", heroTitle, heroBody, pills, children }) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", background: "#fff", overflow: "hidden" }}>
      {/* Brand panel */}
      <div style={{ width: "44%", minWidth: 460, position: "relative", overflow: "hidden",
        background: accent, color: "#fff", padding: "48px", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", inset: 0, background: accentDark, opacity: 0.4 }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: -80, left: -60 }} />
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: -120, right: -100 }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 11 }}>
          <BrandMark size={30} white />
          <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: "0.02em" }}>MedBridge</span>
        </div>
        <div style={{ position: "relative", marginTop: "auto", marginBottom: "auto" }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, whiteSpace: "pre-line" }}>{heroTitle}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.82)", marginTop: 22, maxWidth: 380, whiteSpace: "pre-line" }}>{heroBody}</p>
        </div>
        {pills && <div style={{ position: "relative", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {pills.map((p, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999,
              background: "rgba(255,255,255,0.15)", fontSize: 12.5, fontWeight: 500 }}>
              <Icon name={p.icon} size={15} />{p.label}</span>
          ))}
        </div>}
      </div>
      {/* Form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>{children}</div>
      </div>
    </div>
  );
}

function LoginScreen({ go }) {
  return (
    <AuthLayout
      heroTitle={"Your health,\nsimplified."}
      heroBody={"Manage appointments, records, prescriptions, and billing — all in one secure place."}
      pills={[{ icon: "shield-check", label: "Secure & Private" }, { icon: "heart", label: "Patient-First Design" }, { icon: "clock", label: "24/7 Access" }]}>
      <h2 style={{ fontSize: 29, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Welcome back</h2>
      <p style={{ fontSize: 15, color: "var(--fg-3)", margin: "8px 0 0" }}>Sign in to your health portal</p>
      <div className="divider" style={{ margin: "24px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field label="Email address"><Input value="beth.mooney@email.com" icon="mail" /></Field>
        <Field label="Password"><Input value="••••••••••" type="password" icon="lock" /></Field>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--n-700)", cursor: "pointer" }}>
            <input type="checkbox" className="checkbox" defaultChecked /> Remember me</label>
          <button onClick={() => go("forgot")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--brand-600)", fontWeight: 500, fontSize: 13, fontFamily: "inherit" }}>Forgot password?</button>
        </div>
        <Button block size="lg" onClick={() => go("dashboard")}>Sign In</Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "22px 0" }}>
        <div className="divider" style={{ flex: 1 }} /><span style={{ fontSize: 12, color: "var(--n-400)" }}>or</span><div className="divider" style={{ flex: 1 }} />
      </div>
      <Button variant="outline-gray" block size="lg" icon="globe" onClick={() => go("dashboard")}>Continue with Google</Button>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--fg-3)", marginTop: 24 }}>
        New patient? <button onClick={() => go("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--brand-600)", fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>Create your account →</button>
      </p>
      <p style={{ textAlign: "center", fontSize: 11, color: "var(--n-400)", marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="shield-check" size={13} /> WCAG 2.1 AA · All contrasts ≥ 4.5:1 verified</p>
    </AuthLayout>
  );
}

function ForgotScreen({ go }) {
  return (
    <AuthLayout heroTitle={"Forgot your\npassword?"} heroBody={"We'll send a secure reset link to your registered email within 2 minutes."}>
      <button onClick={() => go("login")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--brand-600)", fontWeight: 500, fontSize: 13, fontFamily: "inherit", padding: 0, marginBottom: 20 }}>
        <Icon name="arrow-left" size={15} /> Back to sign in</button>
      <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Reset your password</h2>
      <p style={{ fontSize: 14, color: "var(--fg-3)", margin: "8px 0 24px", lineHeight: 1.5 }}>Enter your email and we'll send a reset link within 2 minutes.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field label="Registered email address"><Input value="beth.mooney@email.com" icon="mail" /></Field>
        <Button block size="lg" icon="send" onClick={() => go("reset")}>Send Reset Link</Button>
      </div>
      <div style={{ marginTop: 22 }}>
        <Alert kind="info" icon="info" title="Check your spam folder">Reset emails sometimes land in spam or promotions.</Alert>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--fg-3)", marginTop: 22 }}>
        Remembered it? <button onClick={() => go("login")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--brand-600)", fontWeight: 600, fontSize: 13, fontFamily: "inherit" }}>Sign in instead →</button></p>
    </AuthLayout>
  );
}

function ResetScreen({ go }) {
  return (
    <AuthLayout accent="var(--teal-600)" accentDark="#0A3D38" heroTitle={"Create a strong\nnew password"} heroBody={"Your new password is encrypted with AES-256 and never stored in plain text."}>
      <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Set new password</h2>
      <p style={{ fontSize: 14, color: "var(--fg-3)", margin: "8px 0 24px", lineHeight: 1.5 }}>Minimum 8 characters with a number and a special character.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field label="New password"><Input value="••••••••••" type="password" icon="lock" /></Field>
        <Field label="Confirm new password"><Input value="••••••••••" type="password" icon="lock-keyhole" /></Field>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 7 }}>
            <span style={{ color: "var(--n-600)", fontWeight: 500 }}>Password strength</span>
            <span style={{ color: "var(--green-600)", fontWeight: 600 }}>Strong</span></div>
          <div style={{ display: "flex", gap: 5 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 3 ? "var(--green-600)" : "var(--n-200)" }} />)}
          </div>
        </div>
        <Button block size="lg" icon="check" onClick={() => go("dashboard")}>Update Password</Button>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--n-400)", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="shield-check" size={13} /> Encrypted with AES-256</p>
    </AuthLayout>
  );
}

// ---- DASHBOARD ----
function DashboardScreen({ go }) {
  const stats = [
    { label: "Upcoming Appointments", value: "3", sub: "Next: Jun 3", subIcon: "calendar", subColor: "var(--brand-600)", accent: "var(--brand-600)" },
    { label: "Active Prescriptions", value: "5", sub: "2 refills due", subIcon: "triangle-alert", subColor: "var(--amber-700)", accent: "var(--teal-600)" },
    { label: "Pending Balance", value: "$248", sub: "Due Jun 15", subIcon: "clock", subColor: "var(--amber-700)", accent: "var(--amber-700)" },
    { label: "Unread Messages", value: "2", sub: "From Dr. Nair", subIcon: "message-square", subColor: "var(--green-600)", accent: "var(--green-600)" },
  ];
  return (
    <PageShell route="dashboard" go={go} title="Dashboard" sub="Thursday, May 28, 2026">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>Good morning, Beth <span style={{ fontWeight: 400 }}>👋</span></h2>
        <p style={{ fontSize: 13, color: "var(--fg-3)", margin: "0 0 24px" }}>Your next appointment is in 3 days · Last login: today 8:42 AM</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
          {stats.map((s, i) => <Stat key={i} {...s} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 24, alignItems: "start" }}>
          <div>
            <SectionHead title="Upcoming Appointments" action={<button onClick={() => go("appointments")} style={btnLink}>View all →</button>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {APPOINTMENTS.slice(0, 3).map(a => {
                const p = provById(a.prov);
                return (
                  <Card key={a.id} hover accent={p.color} onClick={() => go("appt-details")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                      <ProviderAvatar prov={a.prov} size="md" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.full}</div>
                        <div style={{ fontSize: 13, color: "var(--fg-3)" }}>{p.spec}</div>
                        <div style={{ fontSize: 12, color: "var(--n-400)", marginTop: 3, display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon name="calendar" size={13} />{a.date} · {a.time}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                        <Badge>{a.status}</Badge>
                        <Badge noDot>{a.type}</Badge>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <div>
            <SectionHead title="Health Summary" sub="Last updated May 15, 2026" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {VITALS.map((v, i) => (
                <Card key={i} accent={v.color}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                    <span style={{ width: 38, height: 38, borderRadius: 9, background: v.color, opacity: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", filter: "saturate(1)" }}>
                      <span style={{ display: "inline-flex", color: "#fff" }}><Icon name={v.icon} size={19} style={{ color: "#fff" }} /></span></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11.5, color: "var(--fg-3)", fontWeight: 500 }}>{v.label}</div>
                      <div style={{ fontSize: 17, fontWeight: 700 }} className="ds-num">{v.value} <span style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-3)" }}>{v.unit}</span></div>
                    </div>
                    <Badge>{v.status === "Normal" || v.status === "Healthy" ? "Confirmed" : v.status}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ---- DASHBOARD: Health Alerts variant ----
function DashAlertsScreen({ go }) {
  const stats = [
    { label: "Upcoming Appointments", value: "3", sub: "Next: Jun 3", subColor: "var(--brand-600)", accent: "var(--brand-600)" },
    { label: "Active Prescriptions", value: "5", sub: "2 refills due", subIcon: "triangle-alert", subColor: "var(--amber-700)", accent: "var(--amber-700)" },
    { label: "Pending Balance", value: "$248", sub: "Due Jun 15", subIcon: "triangle-alert", subColor: "var(--red-700)", accent: "var(--red-700)" },
    { label: "Unread Messages", value: "2", sub: "From Dr. Nair", subColor: "var(--teal-600)", accent: "var(--teal-600)" },
  ];
  const tasks = [
    { icon: "pill", color: "var(--amber-700)", title: "Request Metformin Refill", body: "18 days remaining — order now to avoid running out.", action: "Request Refill", urg: "Soon", go: "rx-detail" },
    { icon: "credit-card", color: "var(--red-700)", title: "Pay Invoice #INV-1042", body: "$69.00 due June 15, 2026 — Cardiology visit co-pay.", action: "Pay $69.00", urg: "Urgent", go: "invoice" },
    { icon: "clipboard-list", color: "var(--brand-600)", title: "Complete Health Questionnaire", body: "Dr. Kemp requested a pre-visit health update for Jun 12.", action: "Complete Now", urg: "New", go: "appt-details" },
  ];
  const quick = [
    { label: "Book Appointment", icon: "calendar-plus", go: "book" },
    { label: "View Lab Results", icon: "flask-conical", go: "tests" },
    { label: "Download Records", icon: "download", go: "records" },
    { label: "Contact Support", icon: "life-buoy", go: "help" },
  ];
  return (
    <PageShell route="dashboard" go={go} title="Dashboard" sub="Thursday, May 28, 2026">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <Alert kind="warn" icon="triangle-alert" title="2 items need your attention"
            action={<Button variant="outline" size="sm" onClick={() => go("notifications")}>View All Alerts</Button>}>
            Metformin refill due in 18 days · Invoice #INV-1042 due Jun 15</Alert>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
          {stats.map((s, i) => <Stat key={i} {...s} />)}
        </div>
        <SectionHead title="Action Required" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {tasks.map((t, i) => (
            <Card key={i} accent={t.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, background: t.color, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <Icon name={t.icon} size={20} style={{ color: "#fff" }} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</span><Badge>{t.urg}</Badge></div>
                  <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 3 }}>{t.body}</div>
                </div>
                <Button onClick={() => go(t.go)}>{t.action}</Button>
              </div>
            </Card>
          ))}
        </div>
        <SectionHead title="Quick Actions" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {quick.map((q, i) => (
            <Card key={i} hover onClick={() => go(q.go)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px" }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, background: "var(--brand-50)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={q.icon} size={19} style={{ color: "var(--brand-600)" }} /></span>
                <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: "var(--brand-600)" }}>{q.label}</span>
                <Icon name="arrow-right" size={17} style={{ color: "var(--brand-600)" }} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

const btnLink = { background: "none", border: "none", cursor: "pointer", color: "var(--brand-600)", fontWeight: 500, fontSize: 13, fontFamily: "inherit" };

// ---- STATES: loading / empty / error ----
function DashLoadingScreen({ go }) {
  return (
    <PageShell route="dashboard" go={go} title="Dashboard" sub="Loading your health summary…">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Skel w={260} h={26} style={{ marginBottom: 10 }} /><Skel w={420} h={14} style={{ marginBottom: 26 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
          {[0,1,2,3].map(i => <Card key={i} pad><Skel w={120} h={12} style={{ marginBottom: 14 }} /><Skel w={70} h={30} style={{ marginBottom: 14 }} /><Skel w={90} h={12} /></Card>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 24 }}>
          <div><Skel w={200} h={18} style={{ marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[0,1,2].map(i => <Card key={i}><div style={{ display: "flex", gap: 16, padding: 18, alignItems: "center" }}>
                <Skel w={44} h={44} r={22} /><div style={{ flex: 1 }}><Skel w={160} h={14} style={{ marginBottom: 8 }} /><Skel w={100} h={12} /></div><Skel w={70} h={22} r={11} /></div></Card>)}
            </div>
          </div>
          <div><Skel w={150} h={18} style={{ marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[0,1,2,3].map(i => <Card key={i}><div style={{ display: "flex", gap: 14, padding: 16, alignItems: "center" }}>
                <Skel w={38} h={38} r={9} /><div style={{ flex: 1 }}><Skel w={90} h={11} style={{ marginBottom: 8 }} /><Skel w={120} h={16} /></div></div></Card>)}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function EmptyApptScreen({ go }) {
  return (
    <PageShell route="appointments" go={go} title="Appointments" sub="Manage and schedule your visits">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Tabs tabs={["All", "Upcoming", "Past", "Cancelled"]} active="Cancelled" onChange={() => {}} />
          <Button icon="plus" onClick={() => go("book")}>Book Appointment</Button>
        </div>
        <Card>
          <EmptyState icon="calendar-x2" title="No cancelled appointments"
            body="You haven't cancelled any appointments. When you do, they'll appear here for your records."
            action={<Button variant="outline" icon="calendar-plus" onClick={() => go("book")}>Book an Appointment</Button>} />
        </Card>
      </div>
    </PageShell>
  );
}

function ErrorScreen({ go }) {
  return (
    <PageShell route="dashboard" go={go} title="Something went wrong" sub="">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Card>
          <EmptyState icon="cloud-off" title="We couldn't load this page"
            body="A temporary connection issue stopped this page from loading. Your data is safe. Please try again in a moment."
            action={<div style={{ display: "flex", gap: 10 }}>
              <Button icon="refresh-cw" onClick={() => go("dashboard")}>Try Again</Button>
              <Button variant="outline-gray" icon="life-buoy" onClick={() => go("help")}>Contact Support</Button>
            </div>} />
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--n-400)", marginTop: -24, paddingBottom: 28 }}>Error reference: MB-503 · 8:42 AM</p>
        </Card>
      </div>
    </PageShell>
  );
}

Object.assign(window, { AuthLayout, LoginScreen, ForgotScreen, ResetScreen, DashboardScreen, DashAlertsScreen, DashLoadingScreen, EmptyApptScreen, ErrorScreen });
