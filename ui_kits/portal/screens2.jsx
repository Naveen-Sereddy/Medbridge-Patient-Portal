/* MedBridge Portal — Appointments, Calendar, Providers, Booking flow, Details */

function ApptListScreen({ go }) {
  const [tab, setTab] = React.useState("Upcoming");
  return (
    <PageShell route="appointments" go={go} title="Appointments" sub="Manage and schedule your visits">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Tabs tabs={["All", "Upcoming", "Past", "Cancelled"]} active={tab} onChange={setTab} />
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="outline-gray" icon="sliders-horizontal">Filter</Button>
            <Button variant="outline-gray" icon="calendar" onClick={() => go("calendar")}>Calendar View</Button>
            <Button icon="plus" onClick={() => go("book")}>Book Appointment</Button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {APPOINTMENTS.map(a => {
            const p = provById(a.prov);
            return (
              <Card key={a.id} hover accent={p.color} onClick={() => go("appt-details")}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 24px" }}>
                  <ProviderAvatar prov={a.prov} size="lg" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>{p.full}</span>
                      <Badge>{a.status}</Badge>
                      <Badge noDot>{a.type}</Badge>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{p.spec}</div>
                    <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 13, color: "var(--fg-3)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="calendar" size={15} />{a.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={15} />{a.time} · {a.dur}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={a.type === "Telehealth" ? "video" : "map-pin"} size={15} />{a.loc}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); go("appt-details"); }}>Details</Button>
                    {a.type === "Telehealth" && <Button variant="secondary" size="sm" icon="video">Join</Button>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

function CalendarScreen({ go }) {
  const dates = [[null,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,null,null,null,null]];
  const hasAppt = { 3:"patel", 12:"chen", 17:"okafor", 25:"sharma" };
  const [sel, setSel] = React.useState(3);
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const selAppt = APPOINTMENTS.find(a => parseInt(a.date.match(/\d+/)[0]) === sel);
  return (
    <PageShell route="appointments" go={go} title="Appointments" sub="Manage and schedule your visits">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Tabs tabs={[{id:"list",label:"List View"},{id:"cal",label:"Calendar View"}]} active="cal" onChange={(id) => id==="list" && go("appointments")} />
          <Button icon="plus" onClick={() => go("book")}>Book Appointment</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }}>
          <Card pad>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <button className="btn-icon"><Icon name="chevron-left" size={18} /></button>
              <div style={{ fontSize: 18, fontWeight: 600 }}>June 2026</div>
              <button className="btn-icon"><Icon name="chevron-right" size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 8 }}>
              {days.map(d => <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--fg-3)", padding: "4px 0" }}>{d}</div>)}
            </div>
            <div className="divider" style={{ marginBottom: 8 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
              {dates.flat().map((d, i) => {
                if (!d) return <div key={i} />;
                const on = d === sel, appt = hasAppt[d];
                return (
                  <button key={i} onClick={() => appt && setSel(d)} style={{ aspectRatio: "1", border: "none", cursor: appt ? "pointer" : "default",
                    borderRadius: 10, background: on ? "var(--brand-600)" : appt ? "var(--brand-50)" : "transparent",
                    color: on ? "#fff" : appt ? "var(--brand-700)" : "var(--n-600)", fontFamily: "inherit",
                    fontWeight: appt ? 600 : 400, fontSize: 14, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {d}
                    {appt && !on && <span style={{ position: "absolute", bottom: 7, width: 5, height: 5, borderRadius: 999, background: provById(appt).color }} />}
                  </button>
                );
              })}
            </div>
          </Card>
          <Card pad>
            <div style={{ fontSize: 17, fontWeight: 600 }}>{selAppt ? selAppt.day.replace(", 2026","") : "No date"}</div>
            <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 3 }}>{selAppt ? "1 appointment" : "No appointments"}</div>
            <div className="divider" style={{ margin: "16px 0" }} />
            {selAppt ? (() => { const p = provById(selAppt.prov); return (
              <Card accent={p.color}>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <ProviderAvatar prov={selAppt.prov} size="md" />
                    <div><div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{p.spec} · {selAppt.time}</div></div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Badge>{selAppt.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => go("appt-details")}>Details</Button>
                  </div>
                </div>
              </Card>
            ); })() : <EmptyState icon="calendar" title="Free day" body="No appointments scheduled." />}
            <Button block style={{ marginTop: 16 }} icon="calendar-plus" onClick={() => go("book")}>Book This Day</Button>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

// ---- PROVIDERS directory ----
function ProvidersScreen({ go }) {
  return (
    <PageShell route="providers" go={go} title="Find a Doctor" sub="Browse providers and book a visit">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1 }}><Input icon="search" placeholder="Search by name or specialty…" /></div>
          <div style={{ width: 200 }}><Input icon="stethoscope" placeholder="Specialty: All" /></div>
          <div style={{ width: 200 }}><Input icon="shield" placeholder="Insurance: All" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {PROVIDERS.map(p => (
            <Card key={p.id} hover onClick={() => go("provider-profile")}>
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Avatar size="lg" color={p.color} initials={p.initials} name={p.full} />
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "var(--fg-3)" }}>{p.spec}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, fontSize: 12.5, color: "var(--amber-700)", fontWeight: 600 }}>
                      <Icon name="star" size={14} style={{ fill: "var(--amber-700)" }} />{p.rating}
                      <span style={{ color: "var(--n-400)", fontWeight: 400 }}>· {p.years} yrs</span></div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.5, margin: "16px 0" }}>{p.bio}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--n-100)" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="calendar-check" size={15} style={{ color: "var(--green-600)" }} />Next: {p.next}</span>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); go("book"); }}>Book</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ProviderProfileScreen({ go }) {
  const p = provById("patel");
  return (
    <PageShell route="providers" go={go} title="Provider Profile" sub="Find a Doctor → Dr. Patel">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Breadcrumb go={go} items={[{ label: "Find a Doctor", to: "providers" }, { label: p.full }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <Avatar size="xl" color={p.color} initials={p.initials} name={p.full} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{p.full}</h2>
                  <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 3 }}>{p.spec} · Board Certified</div>
                  <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 13, color: "var(--fg-3)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--amber-700)", fontWeight: 600 }}><Icon name="star" size={15} style={{ fill: "var(--amber-700)" }} />{p.rating}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="map-pin" size={15} />{p.clinic}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="languages" size={15} />{p.lang}</span>
                  </div>
                </div>
              </div>
              <div className="divider" style={{ margin: "20px 0" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px" }}>About</h3>
              <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>{p.bio} With {p.years} years of clinical experience, {p.name} partners with patients on long-term, preventive care plans and is accepting new appointments.</p>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Specialties & Services</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Hypertension","Preventive Cardiology","ECG & Stress Testing","Cholesterol Management","Heart Failure","Arrhythmia"].map(s =>
                  <span key={s} style={{ padding: "7px 14px", borderRadius: 999, background: "var(--n-100)", fontSize: 13, fontWeight: 500, color: "var(--fg-2)" }}>{s}</span>)}
              </div>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Book a Visit</h3>
              <p style={{ fontSize: 13, color: "var(--fg-3)", margin: "0 0 16px" }}>Next available: {p.next}, 2026</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {["9:00 AM","10:30 AM","2:00 PM","2:30 PM","3:30 PM","4:00 PM"].map((t, i) =>
                  <button key={t} style={{ padding: "10px 0", borderRadius: 8, border: "1px solid " + (i===1?"var(--brand-600)":"var(--border)"),
                    background: i===1?"var(--brand-600)":"#fff", color: i===1?"#fff":"var(--n-700)", fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{t}</button>)}
              </div>
              <Button block onClick={() => go("book")}>Continue to Booking</Button>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Location</h3>
              <div style={{ height: 120, borderRadius: 10, background: "var(--n-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-400)", marginBottom: 12 }}>
                <Icon name="map" size={28} /></div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.clinic}</div>
              <div style={{ fontSize: 13, color: "var(--fg-3)" }}>420 Park Ave, Suite 300, New York, NY</div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ---- BOOKING flow ----
function BookStep1({ go }) {
  const [sel, setSel] = React.useState("patel");
  return (
    <PageShell route="appointments" go={go} title="Book Appointment" sub="Appointments → Book New">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}><Stepper steps={["Choose Doctor","Date & Time","Confirm"]} current={0} /></div>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1 }}><Input icon="search" placeholder="Search doctor or specialty…" /></div>
          <div style={{ width: 200 }}><Input icon="stethoscope" placeholder="Specialty: All" /></div>
          <div style={{ width: 200 }}><Input icon="shield" placeholder="Insurance: All" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {PROVIDERS.slice(0,4).map(p => {
            const on = sel === p.id;
            return (
              <Card key={p.id} onClick={() => setSel(p.id)} style={{ cursor: "pointer",
                border: on ? "2px solid var(--brand-600)" : "1px solid var(--border)", background: on ? "var(--brand-50)" : "#fff" }}>
                <div style={{ padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                  <Avatar size="lg" color={p.color} initials={p.initials} name={p.full} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "var(--fg-3)" }}>{p.spec}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, fontSize: 12.5, color: "var(--fg-3)" }}>
                      <Icon name="star" size={14} style={{ fill: "var(--amber-700)", color: "var(--amber-700)" }} /><span style={{ color: "var(--amber-700)", fontWeight: 600 }}>{p.rating}</span> · Next: {p.next}</div>
                  </div>
                  <Button variant={on ? "primary" : "outline"} size="sm" icon={on ? "check" : null}>{on ? "Selected" : "Select"}</Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <Button size="lg" iconRight="arrow-right" onClick={() => go("book2")}>Continue to Date & Time</Button>
        </div>
      </div>
    </PageShell>
  );
}

function BookStep2({ go }) {
  const dates = [[null,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,null,null,null,null]];
  const unavail = [4,5,6,11,12,13,18,19];
  const [day, setDay] = React.useState(3);
  const [slot, setSlot] = React.useState("10:30 AM");
  const morning = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"];
  const afternoon = ["1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM"];
  const dys = ["S","M","T","W","T","F","S"];
  return (
    <PageShell route="appointments" go={go} title="Book Appointment" sub="Appointments → Book New">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}><Stepper steps={["Choose Doctor","Date & Time","Confirm"]} current={1} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(360px,1fr) 1.3fr", gap: 24, alignItems: "start" }}>
          <Card pad>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <button className="btn-icon"><Icon name="chevron-left" size={18} /></button>
              <div style={{ fontSize: 17, fontWeight: 600 }}>June 2026</div>
              <button className="btn-icon"><Icon name="chevron-right" size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 6 }}>
              {dys.map((d,i) => <div key={i} style={{ textAlign: "center", fontSize: 11.5, fontWeight: 600, color: "var(--n-400)" }}>{d}</div>)}
            </div>
            <div className="divider" style={{ marginBottom: 6 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
              {dates.flat().map((d, i) => {
                if (!d) return <div key={i} />;
                const un = unavail.includes(d), on = d === day;
                return <button key={i} disabled={un} onClick={() => setDay(d)} style={{ aspectRatio: "1", border: "none",
                  borderRadius: 9, cursor: un ? "default" : "pointer", background: on ? "var(--brand-600)" : "transparent",
                  color: on ? "#fff" : un ? "var(--n-300)" : "var(--n-700)", fontFamily: "inherit", fontSize: 13.5, fontWeight: on ? 600 : 400 }}>{d}</button>;
              })}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 14, fontSize: 12, color: "var(--fg-3)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--brand-600)" }} />Selected</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--n-200)" }} />Unavailable</span>
            </div>
          </Card>
          <Card pad>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Available Times — Tue, Jun {day}</div>
            <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 3 }}>Dr. Arun Patel · Cardiology</div>
            <div className="divider" style={{ margin: "16px 0" }} />
            <div className="eyebrow" style={{ marginBottom: 10 }}>Morning</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
              {morning.map(t => { const on = slot === t; return (
                <button key={t} onClick={() => setSlot(t)} style={{ padding: "11px 0", borderRadius: 8, fontFamily: "inherit", fontSize: 13, fontWeight: on?600:500, cursor: "pointer",
                  border: "1px solid " + (on ? "var(--brand-600)" : "var(--border)"), background: on ? "var(--brand-600)" : "#fff", color: on ? "#fff" : "var(--n-700)" }}>{t}</button>); })}
            </div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Afternoon</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {afternoon.map(t => { const on = slot === t; return (
                <button key={t} onClick={() => setSlot(t)} style={{ padding: "11px 0", borderRadius: 8, fontFamily: "inherit", fontSize: 13, fontWeight: on?600:500, cursor: "pointer",
                  border: "1px solid " + (on ? "var(--brand-600)" : "var(--border)"), background: on ? "var(--brand-600)" : "#fff", color: on ? "#fff" : "var(--n-700)" }}>{t}</button>); })}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <Button variant="outline-gray" icon="arrow-left" onClick={() => go("book")}>Back</Button>
          <Button size="lg" iconRight="arrow-right" onClick={() => go("book3")}>Review Appointment</Button>
        </div>
      </div>
    </PageShell>
  );
}

function BookStep3({ go }) {
  const p = provById("patel");
  const rows = [["Doctor", p.full],["Specialty", p.spec],["Date","Tuesday, June 3, 2026"],["Time","10:30 AM (45 minutes)"],["Location","Heart Care Center, 420 Park Ave"],["Visit Type","In-Person"]];
  return (
    <PageShell route="appointments" go={go} title="Book Appointment" sub="Appointments → Book New">
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}><Stepper steps={["Choose Doctor","Date & Time","Confirm"]} current={2} /></div>
        <Card pad>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Review your appointment</h2>
          <p style={{ fontSize: 14, color: "var(--fg-3)", margin: "6px 0 0" }}>Please confirm the details below before booking.</p>
          <div className="divider" style={{ margin: "20px 0" }} />
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
            <Avatar size="lg" color={p.color} initials={p.initials} name={p.full} />
            <div><div style={{ fontWeight: 600, fontSize: 16 }}>{p.full}</div><div style={{ fontSize: 13, color: "var(--fg-3)" }}>{p.spec} · ⭐ {p.rating}</div></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "18px 24px", padding: "20px", background: "var(--n-50)", borderRadius: 10 }}>
            {rows.map(([k,v]) => <div key={k}><div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 500 }}>{k}</div><div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 3 }}>{v}</div></div>)}
          </div>
          <div style={{ margin: "20px 0" }}><Field label="Reason for visit (optional)"><textarea className="textarea" placeholder="Briefly describe your symptoms or reason for the visit…">Routine cardiology follow-up. Discuss recent lab results.</textarea></Field></div>
          <Alert kind="info" icon="shield-check" title="Insurance & co-pay">BlueCross BlueShield accepted. Estimated co-pay: $30.00, billed after the visit.</Alert>
        </Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <Button variant="outline-gray" icon="arrow-left" onClick={() => go("book2")}>Back</Button>
          <Button size="lg" icon="check" onClick={() => go("appt-confirmed")}>Confirm Booking</Button>
        </div>
      </div>
    </PageShell>
  );
}

function ApptConfirmedScreen({ go }) {
  const p = provById("patel");
  const dets = [["Doctor", p.full],["Specialty","Cardiology"],["Date","Tuesday, June 3, 2026"],["Time","10:30 AM (45 minutes)"],["Location","Heart Care Center, 420 Park Ave"],["Visit Type","In-Person"]];
  return (
    <PageShell route="appointments" go={go} title="Booking Confirmed">
      <div style={{ maxWidth: 720, margin: "20px auto 0" }}>
        <Card pad>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--green-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "8px auto 0" }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: "var(--green-600)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={30} style={{ color: "#fff" }} /></span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, margin: "20px 0 6px" }}>Appointment Confirmed!</h2>
            <p style={{ fontSize: 15, color: "var(--fg-3)", margin: 0 }}>A confirmation was sent to sarah.johnson@email.com</p>
          </div>
          <div className="divider" style={{ margin: "24px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "18px 24px" }}>
            {dets.map(([k,v]) => <div key={k}><div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 500 }}>{k}</div><div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 3 }}>{v}</div></div>)}
          </div>
          <div className="divider" style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="outline" icon="calendar-plus">Add to Calendar</Button>
            <Button variant="ghost" icon="list" onClick={() => go("appointments")}>View All Appointments</Button>
            <Button icon="home" onClick={() => go("dashboard")}>Back to Dashboard</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function ApptDetailsScreen({ go }) {
  const a = APPOINTMENTS[0], p = provById(a.prov);
  const dets = [["Date & Time", a.day + " · " + a.time],["Duration","45 minutes"],["Visit Type", a.type],["Location", a.loc],["Reason", a.reason],["Insurance","BlueCross BlueShield — Accepted"],["Co-pay", a.copay]];
  return (
    <PageShell route="appointments" go={go} title="Appointment Details" sub="Appointments → Dr. Patel → Jun 3">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Breadcrumb go={go} items={[{ label: "Appointments", to: "appointments" }, { label: "Dr. Patel — Jun 3" }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
          <Card pad>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <ProviderAvatar prov={a.prov} size="lg" />
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{p.full}</h2>
                <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 2 }}>{p.spec} · Board Certified</div>
                <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 4, display: "flex", gap: 5, alignItems: "center" }}>
                  <Icon name="star" size={14} style={{ fill: "var(--amber-700)", color: "var(--amber-700)" }} />{p.rating} · {p.clinic}</div>
              </div>
              <Badge>{a.status}</Badge>
            </div>
            <div className="divider" style={{ margin: "20px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 16, columnGap: 16 }}>
              {dets.map(([k,v]) => <React.Fragment key={k}>
                <div style={{ fontSize: 13, color: "var(--fg-3)", fontWeight: 500 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-1)" }}>{v}</div></React.Fragment>)}
            </div>
            <div className="divider" style={{ margin: "20px 0" }} />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>Pre-visit Notes</h3>
            <div style={{ background: "var(--n-50)", borderRadius: 10, padding: 16, fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.5 }}>
              Bring your medication list and last ECG results if available. Arrive 15 minutes early to complete check-in.</div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Button variant="outline" block icon="calendar-clock" onClick={() => go("book2")}>Reschedule Appointment</Button>
                <Button variant="ghost" block icon="calendar-plus">Add to Calendar</Button>
                <Button variant="ghost" block icon="map-pin">Get Directions</Button>
                <Button variant="danger" block icon="x" onClick={() => go("appt-cancel")}>Cancel Appointment</Button>
              </div>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 12px" }}>Related Documents</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Last Visit Summary (Feb 2026)","ECG Report (Nov 2025)","Lab Results (Jan 2026)"].map(d => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("tests")}>
                    <span style={{ width: 32, height: 38, borderRadius: 6, background: "var(--red-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                      <Icon name="file-text" size={17} style={{ color: "var(--red-700)" }} /></span>
                    <div><div style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-600)" }}>{d}</div>
                      <div style={{ fontSize: 11.5, color: "var(--n-400)" }}>PDF · View / Download</div></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ---- Cancel confirmation (modal-style) ----
function ApptCancelScreen({ go }) {
  return (
    <PageShell route="appointments" go={go} title="Cancel Appointment" sub="Appointments → Dr. Patel → Cancel">
      <div style={{ maxWidth: 560, margin: "20px auto 0" }}>
        <Card pad>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ width: 48, height: 48, borderRadius: 12, background: "var(--red-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <Icon name="triangle-alert" size={24} style={{ color: "var(--red-700)" }} /></span>
            <div><h2 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>Cancel this appointment?</h2>
              <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.5, margin: "6px 0 0" }}>You're about to cancel your <strong>Cardiology</strong> visit with Dr. Arun Patel on <strong>Tuesday, June 3 at 10:30 AM</strong>. This can't be undone, but you can rebook anytime.</p></div>
          </div>
          <div style={{ margin: "20px 0" }}>
            <Field label="Reason for cancellation"><Input placeholder="Let your provider know why (optional)" /></Field>
          </div>
          <Alert kind="warn" icon="info">Cancellations within 24 hours of the visit may incur a $25 fee per clinic policy.</Alert>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <Button variant="outline-gray" block onClick={() => go("appt-details")}>Keep Appointment</Button>
            <Button variant="danger" block icon="x" onClick={() => go("appointments")}>Cancel Appointment</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

Object.assign(window, { ApptListScreen, CalendarScreen, ProvidersScreen, ProviderProfileScreen, BookStep1, BookStep2, BookStep3, ApptConfirmedScreen, ApptDetailsScreen, ApptCancelScreen });
