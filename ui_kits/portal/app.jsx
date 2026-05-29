/* MedBridge Portal — App router + screen directory */

const SCREENS = {
  login: LoginScreen, forgot: ForgotScreen, reset: ResetScreen,
  dashboard: DashboardScreen, "dash-alerts": DashAlertsScreen, "dash-loading": DashLoadingScreen, error: ErrorScreen,
  appointments: ApptListScreen, "appointments-empty": EmptyApptScreen, calendar: CalendarScreen,
  providers: ProvidersScreen, "provider-profile": ProviderProfileScreen,
  book: BookStep1, book2: BookStep2, book3: BookStep3, "appt-confirmed": ApptConfirmedScreen,
  "appt-details": ApptDetailsScreen, "appt-cancel": ApptCancelScreen,
  records: RecordsScreen, history: MedHistoryScreen, tests: TestResultsScreen, "test-detail": TestDetailScreen, files: FilesScreen,
  prescriptions: PrescriptionsScreen, "rx-detail": RxDetailScreen, "rx-refill-success": RxRefillSuccessScreen,
  billing: BillingScreen, invoice: InvoiceScreen, "payment-success": PaymentSuccessScreen,
  messages: MessagesInboxScreen, thread: MessageThreadScreen,
  notifications: NotificationsScreen,
  settings: SettingsProfileScreen, security: SecurityScreen, "notif-settings": NotifSettingsScreen,
  help: HelpScreen,
};

const DIRECTORY = [
  { group: "Authentication", items: [["login","Login"],["forgot","Forgot Password"],["reset","Reset Password"]] },
  { group: "Dashboard", items: [["dashboard","Dashboard"],["dash-alerts","Dashboard — Health Alerts"],["dash-loading","Dashboard — Loading"],["error","Error State"]] },
  { group: "Appointments", items: [["appointments","Appointments — List"],["calendar","Appointments — Calendar"],["appt-details","Appointment Details"],["appt-cancel","Cancel — Confirm"],["appointments-empty","Empty State"]] },
  { group: "Booking", items: [["book","Book · 1 Doctor"],["book2","Book · 2 Date & Time"],["book3","Book · 3 Review"],["appt-confirmed","Confirmed — Success"]] },
  { group: "Providers", items: [["providers","Find a Doctor"],["provider-profile","Provider Profile"]] },
  { group: "Records", items: [["records","Records — Overview"],["history","Medical History"],["tests","Test Results"],["test-detail","Test Detail"],["files","Uploaded Files"]] },
  { group: "Prescriptions", items: [["prescriptions","Prescriptions"],["rx-detail","Prescription Detail"],["rx-refill-success","Refill — Success"]] },
  { group: "Billing", items: [["billing","Billing"],["invoice","Invoice Detail"],["payment-success","Payment — Success"]] },
  { group: "Messages", items: [["messages","Inbox — Empty"],["thread","Message Thread"]] },
  { group: "Account", items: [["notifications","Notifications"],["settings","Settings — Profile"],["security","Settings — Security"],["notif-settings","Settings — Notifications"],["help","Help Center"]] },
];

function ScreenLauncher({ route, go }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(o => !o)} aria-label="Screen directory" style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000,
        width: 52, height: 52, borderRadius: 999, background: "var(--sidebar-bg)", color: "#fff", border: "none", cursor: "pointer",
        boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={open ? "x" : "layout-grid"} size={22} style={{ color: "#fff" }} />
      </button>
      {open && (
        <div style={{ position: "fixed", bottom: 84, right: 20, zIndex: 1000, width: 320, maxHeight: "76vh", overflowY: "auto",
          background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)", padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>MedBridge — All Screens</div>
          <div style={{ fontSize: 11.5, color: "var(--fg-3)", marginBottom: 14 }}>30 screens · click to preview</div>
          {DIRECTORY.map(g => (
            <div key={g.group} style={{ marginBottom: 12 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>{g.group}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {g.items.map(([id, label]) => (
                  <button key={id} onClick={() => { go(id); setOpen(false); }} style={{ textAlign: "left", padding: "7px 10px", borderRadius: 7, border: "none",
                    cursor: "pointer", fontFamily: "inherit", fontSize: 13, background: route === id ? "var(--brand-50)" : "transparent",
                    color: route === id ? "var(--brand-600)" : "var(--fg-2)", fontWeight: route === id ? 600 : 400 }}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function App() {
  const initial = (location.hash || "").replace("#", "") || "login";
  const [route, setRoute] = React.useState(SCREENS[initial] ? initial : "login");
  const go = React.useCallback((r) => {
    if (!SCREENS[r]) { console.warn("unknown route", r); return; }
    setRoute(r);
    history.replaceState(null, "", "#" + r);
    const main = document.querySelector("main"); if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const onHash = () => { const r = (location.hash || "").replace("#", ""); if (SCREENS[r]) setRoute(r); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Re-render Lucide icons after every screen render
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const Screen = SCREENS[route] || LoginScreen;
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div key={route} style={{ height: "100%", width: "100%" }}><Screen go={go} /></div>
      <ScreenLauncher route={route} go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
