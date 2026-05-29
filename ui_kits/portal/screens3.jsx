/* MedBridge Portal — Records (overview, history, tests, files) + Prescriptions */

function RecordsTabs({ active, go }) {
  const map = { records: "Overview", history: "Medical History", tests: "Test Results", files: "Uploaded Files" };
  const route = { Overview: "records", "Medical History": "history", "Test Results": "tests", "Uploaded Files": "files" };
  return <Tabs tabs={["Overview","Medical History","Test Results","Uploaded Files"]} active={map[active]} onChange={(t) => go(route[t])} />;
}

function PatientHeaderCard({ go }) {
  return (
    <Card pad style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <Avatar size="lg" initials="SJ" name="Sarah Johnson" />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{PATIENT.name}</h2>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 3 }}>DOB: {PATIENT.dob} · Age {PATIENT.age} · {PATIENT.sex}</div>
          <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 2 }}>MRN: {PATIENT.mrn} · Primary: {PATIENT.primary}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" icon="download">Download Summary</Button>
          <Button variant="ghost" icon="pencil" onClick={() => go("settings")}>Edit</Button>
        </div>
      </div>
    </Card>
  );
}

function RecordsScreen({ go }) {
  return (
    <PageShell route="records" go={go} title="Records" sub="Health history & documents">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <PatientHeaderCard go={go} />
        <div style={{ marginBottom: 22 }}><RecordsTabs active="records" go={go} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <SectionHead title="Latest Vitals" sub="Recorded May 15, 2026" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                {VITALS_FULL.map((v, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11.5, color: "var(--fg-3)", fontWeight: 500 }}>{v.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginTop: 3 }} className="ds-num">{v.value}</div>
                    <div style={{ height: 3, width: 32, borderRadius: 2, background: v.color, marginTop: 8 }} />
                  </div>
                ))}
              </div>
            </Card>
            <Card pad>
              <SectionHead title="Active Conditions" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {CONDITIONS.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: c.color }} />
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                    <Badge>{c.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card pad>
            <SectionHead title="Recent Visits" />
            <div>
              {[["May 15","patel"],["Mar 22","chen"],["Jan 10","okafor"],["Nov 8","patel"],["Sep 3","tanaka"]].map(([d, prov], i) => {
                const p = provById(prov);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                    <ProviderAvatar prov={prov} size="sm" />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{d}, 2026 · {p.spec}</div></div>
                    <button onClick={() => go("appt-details")} style={btnLink}>View →</button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function MedHistoryScreen({ go }) {
  return (
    <PageShell route="records" go={go} title="Medical History" sub="Records → Medical History">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}><RecordsTabs active="history" go={go} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "start" }}>
          <Card pad>
            <SectionHead title="Diagnosis Timeline" />
            <div style={{ position: "relative" }}>
              {TIMELINE.map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                    <span style={{ width: 16, height: 16, borderRadius: 999, background: e.color, border: "3px solid #fff", boxShadow: "0 0 0 1px " + e.color }} />
                    {i < TIMELINE.length - 1 && <span style={{ flex: 1, width: 2, background: "var(--n-200)", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <div style={{ fontSize: 11.5, color: "var(--fg-3)", fontWeight: 600 }}>{e.mo} {e.yr}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 2 }}>{e.title}</div>
                    <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 3, lineHeight: 1.5 }}>{e.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <SectionHead title="Allergies & Alerts" />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ALLERGIES.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon name="triangle-alert" size={17} style={{ color: "var(--red-700)" }} />
                    <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>{a.name}</span>
                    <span style={{ fontSize: 12, color: "var(--fg-3)", whiteSpace: "nowrap", flex: "none" }}>{a.level} · {a.note}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card pad>
              <SectionHead title="Current Medications" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {PRESCRIPTIONS.slice(0,4).map(m => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <TintIcon icon="pill" color={m.color} size={34} iconSize={17} radius={8} />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name} {m.dose}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{m.freq} · {m.cond}</div></div>
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

function TestResultsScreen({ go }) {
  return (
    <PageShell route="records" go={go} title="Test Results" sub="Records → Test Results">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}><RecordsTabs active="tests" go={go} /></div>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <div style={{ flex: 1 }}><Input icon="search" placeholder="Search test results…" /></div>
          <div style={{ width: 180 }}><Input icon="filter" placeholder="Type: All" /></div>
          <div style={{ width: 180 }}><Input icon="calendar" placeholder="Date range" /></div>
        </div>
        <Card style={{ overflow: "hidden" }}>
          <table className="table">
            <thead><tr><th>Test Name</th><th>Date</th><th>Ordered By</th><th>Result</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {TESTS.map((t, i) => (
                <tr key={i}>
                  <td className="strong">{t.name}</td>
                  <td className="ds-num">{t.date}</td>
                  <td>{t.by}</td>
                  <td>{t.result}</td>
                  <td><Badge>{t.status}</Badge></td>
                  <td><button className="link" onClick={() => go("test-detail")}>View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </PageShell>
  );
}

function TestDetailScreen({ go }) {
  const rows = [["Glucose","98 mg/dL","70–99","Normal","var(--green-600)"],["HbA1c","6.8 %","< 7.0","Controlled","var(--green-600)"],["LDL Cholesterol","98 mg/dL","< 100","Normal","var(--green-600)"],["HDL Cholesterol","58 mg/dL","> 40","Normal","var(--green-600)"],["Triglycerides","132 mg/dL","< 150","Normal","var(--green-600)"],["Creatinine","1.4 mg/dL","0.6–1.2","High","var(--amber-700)"]];
  return (
    <PageShell route="records" go={go} title="Comprehensive Metabolic Panel" sub="Records → Test Results → Detail">
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <Breadcrumb go={go} items={[{ label: "Test Results", to: "tests" }, { label: "Metabolic Panel" }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
          <Card style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--n-100)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 16, fontWeight: 600 }}>Comprehensive Metabolic Panel</div>
                <div style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 2 }}>Collected May 15, 2026 · Dr. Lisa Chen</div></div>
              <Badge>Reviewed</Badge>
            </div>
            <table className="table">
              <thead><tr><th>Marker</th><th>Result</th><th>Reference</th><th>Flag</th></tr></thead>
              <tbody>{rows.map((r,i) => <tr key={i}><td className="strong">{r[0]}</td><td className="ds-num">{r[1]}</td>
                <td className="ds-num" style={{ color: "var(--fg-3)" }}>{r[2]}</td>
                <td><span style={{ color: r[4], fontWeight: 600, fontSize: 13 }}>{r[3]}</span></td></tr>)}</tbody>
            </table>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>Provider Note</h3>
              <p style={{ fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>Overall results are excellent. HbA1c improved from 7.2% to 6.8%. Creatinine slightly elevated — recheck at next visit. Continue current medications.</p>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 12px" }}>Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Button variant="outline" block icon="download">Download PDF</Button>
                <Button variant="ghost" block icon="message-square" onClick={() => go("thread")}>Message Dr. Chen</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function FilesScreen({ go }) {
  const [sel, setSel] = React.useState(0);
  return (
    <PageShell route="records" go={go} title="Uploaded Files" sub="Records → Files">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}><RecordsTabs active="files" go={go} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ border: "2px dashed var(--brand-400)", borderRadius: 12, background: "var(--brand-50)", padding: "32px", textAlign: "center" }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: "var(--brand-600)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon name="upload-cloud" size={26} style={{ color: "#fff" }} /></span>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Drag &amp; drop files here</div>
              <div style={{ fontSize: 13, color: "var(--fg-3)", margin: "4px 0 14px" }}>or</div>
              <Button variant="outline" icon="folder-open">Browse Files</Button>
              <div style={{ fontSize: 12, color: "var(--n-400)", marginTop: 12 }}>PDF, JPG, PNG · up to 25 MB</div>
            </div>
            <Card pad>
              <SectionHead title="Your Documents" />
              <div>
                {DOCUMENTS.map((d, i) => (
                  <div key={i} onClick={() => setSel(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i ? "1px solid var(--n-100)" : "none", cursor: "pointer" }}>
                    <span style={{ width: 34, height: 40, borderRadius: 6, background: d.kind === "img" ? "var(--teal-bg)" : "var(--red-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                      <Icon name={d.kind === "img" ? "image" : "file-text"} size={17} style={{ color: d.kind === "img" ? "var(--teal-600)" : "var(--red-700)" }} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 600, color: sel === i ? "var(--brand-600)" : "var(--fg-1)" }}>{d.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--n-400)" }}>{d.size} · Uploaded {d.date}</div></div>
                    <button style={btnLink}>Download</button>
                    <button style={{ ...btnLink, color: "var(--red-700)" }}>Delete</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card pad>
            <SectionHead title="Preview" />
            <div style={{ height: 240, borderRadius: 10, background: "var(--n-100)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--n-400)", gap: 8 }}>
              <Icon name="file-text" size={36} /><span style={{ fontSize: 14, fontWeight: 500 }}>Document Preview</span></div>
            <div className="divider" style={{ margin: "16px 0" }} />
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>File Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", rowGap: 10, fontSize: 13 }}>
              {[["Name", DOCUMENTS[sel].name],["Size", DOCUMENTS[sel].size],["Type", DOCUMENTS[sel].kind === "img" ? "Image" : "PDF"],["Uploaded", DOCUMENTS[sel].date]].map(([k,v]) =>
                <React.Fragment key={k}><span style={{ color: "var(--fg-3)" }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></React.Fragment>)}
            </div>
            <Button block icon="download" style={{ marginTop: 16 }}>Download File</Button>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

// ---- PRESCRIPTIONS ----
function PrescriptionsScreen({ go }) {
  const [tab, setTab] = React.useState("active");
  const sums = [
    { label: "Active Meds", value: "5", color: "var(--brand-600)" },
    { label: "Refill Due", value: "2", color: "var(--amber-700)" },
    { label: "Expiring Soon", value: "1", color: "var(--red-700)" },
    { label: "Controlled", value: "0", color: "var(--n-400)" },
  ];
  return (
    <PageShell route="prescriptions" go={go} title="Prescriptions" sub="Manage your medications">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginBottom: 24, background: "#fff", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
          {sums.map((s, i) => (
            <div key={i} style={{ padding: "18px 22px", borderLeft: i ? "1px solid var(--n-100)" : "none" }}>
              <div style={{ fontSize: 11.5, color: "var(--fg-3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <PillTabs tabs={[{id:"active",label:"Active (5)"},{id:"history",label:"History"}]} active={tab} onChange={setTab} />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 240 }}><Input icon="search" placeholder="Search medications…" /></div>
            <Button icon="refresh-cw" onClick={() => go("rx-detail")}>Request Refill</Button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {PRESCRIPTIONS.map(m => (
            <Card key={m.id} accentTop={m.color} hover onClick={() => go("rx-detail")}>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <TintIcon icon="pill" color={m.color} size={44} iconSize={22} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 2 }}>{m.dose} · {m.freq}</div>
                    <div style={{ fontSize: 12, color: "var(--n-400)", marginTop: 2 }}>By {m.dr} · Refill by {m.refill}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <Badge>{m.status}</Badge>
                  <Button variant={m.status === "Refill Due" ? "primary" : "ghost"} size="sm" icon={m.status === "Refill Due" ? "refresh-cw" : null}
                    onClick={(e) => { e.stopPropagation(); go("rx-detail"); }}>{m.status === "Refill Due" ? "Request Refill" : "Details"}</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function RxDetailScreen({ go }) {
  const m = PRESCRIPTIONS[1];
  const dets = [["Prescribed By","Dr. Lisa Chen, MD"],["Date Prescribed","March 22, 2026"],["Dosage", m.dose],["Frequency", m.freq],["Condition", m.cond],["Quantity", m.qty + " (30-day supply)"],["Refills Left", m.left + " remaining"],["Expiry", m.expiry]];
  return (
    <PageShell route="prescriptions" go={go} title={m.name + " " + m.dose} sub="Prescriptions → Metformin">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Breadcrumb go={go} items={[{ label: "Prescriptions", to: "prescriptions" }, { label: m.name }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
          <Card accentTop={m.color} pad>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <TintIcon icon="pill" color={m.color} size={60} iconSize={28} radius={12} />
              <div style={{ flex: 1 }}><h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{m.name}</h2>
                <div style={{ fontSize: 14, color: "var(--fg-2)" }}>{m.dose} Tablet</div></div>
              <Badge>{m.status}</Badge>
            </div>
            <div className="divider" style={{ margin: "20px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,160px 1fr)", rowGap: 14, columnGap: 12, fontSize: 13.5 }}>
              {dets.map(([k,v]) => <React.Fragment key={k}>
                <div style={{ color: "var(--fg-3)", fontWeight: 500 }}>{k}</div>
                <div style={{ fontWeight: 600 }}>{v}</div></React.Fragment>)}
            </div>
            <div className="divider" style={{ margin: "20px 0" }} />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>Dosage Instructions</h3>
            <div style={{ background: "var(--n-50)", borderRadius: 10, padding: 16, fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.6 }}>
              Take 1 tablet with breakfast and 1 with dinner. Do not crush or chew. Take with a full glass of water. Avoid alcohol. Monitor blood sugar as directed.</div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 12px" }}>Request Refill</h3>
              <Alert kind="warn" icon="clock" title="Refill due soon">18 days of medication remaining.</Alert>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Preferred Pharmacy"><Input value="CVS Pharmacy — Main St (2.1 mi)" icon="map-pin" /></Field>
                <Field label="Notes (optional)"><Input placeholder="Any notes for the pharmacy…" /></Field>
                <Button block icon="check" onClick={() => go("rx-refill-success")}>Submit Refill Request</Button>
              </div>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 12px" }}>Refill History</h3>
              {[["Mar 22, 2026","60 tablets"],["Feb 20, 2026","60 tablets"],["Jan 22, 2026","60 tablets"]].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                  <span style={{ flex: 1, fontSize: 13, color: "var(--fg-3)" }} className="ds-num">{r[0]}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{r[1]}</span>
                  <span style={{ marginLeft: 14 }}><Badge>Approved</Badge></span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function RxRefillSuccessScreen({ go }) {
  return (
    <PageShell route="prescriptions" go={go} title="Refill Requested">
      <div style={{ maxWidth: 620, margin: "20px auto 0" }}>
        <Card pad>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--green-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: "var(--green-600)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={30} style={{ color: "#fff" }} /></span></div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: "20px 0 6px" }}>Refill request submitted</h2>
            <p style={{ fontSize: 15, color: "var(--fg-3)", margin: 0 }}>Metformin 500mg · CVS Pharmacy — Main St</p>
          </div>
          <div className="divider" style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Request sent", "done"],["Pharmacy review","active"],["Ready for pickup","pending"]].map(([label, st], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: st === "done" ? "var(--green-600)" : st === "active" ? "var(--brand-600)" : "var(--n-200)" }}>
                  {st === "done" ? <Icon name="check" size={14} style={{ color: "#fff" }} /> : <span style={{ width: 8, height: 8, borderRadius: 999, background: st === "active" ? "#fff" : "var(--n-400)" }} />}</span>
                <span style={{ fontSize: 14, fontWeight: st === "pending" ? 400 : 600, color: st === "pending" ? "var(--fg-3)" : "var(--fg-1)" }}>{label}</span>
                {st === "active" && <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--brand-600)", fontWeight: 600 }}>Est. ready by 5:00 PM</span>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Button variant="outline-gray" block onClick={() => go("prescriptions")}>Back to Prescriptions</Button>
            <Button block icon="bell" onClick={() => go("notifications")}>Notify Me When Ready</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

Object.assign(window, { RecordsScreen, MedHistoryScreen, TestResultsScreen, TestDetailScreen, FilesScreen, PrescriptionsScreen, RxDetailScreen, RxRefillSuccessScreen });
