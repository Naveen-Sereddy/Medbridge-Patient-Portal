/* MedBridge Portal — Billing, Invoice, Payment, Messages */

function BillingScreen({ go }) {
  const sums = [
    { label: "Current Balance Due", value: "$248.50", sub: "2 open invoices", color: "var(--amber-700)", bg: "var(--amber-bg)" },
    { label: "Paid This Year", value: "$1,240", sub: "8 payments", color: "var(--green-600)", bg: "var(--green-bg)" },
    { label: "Insurance Coverage", value: "80%", sub: "BlueCross BlueShield", color: "var(--brand-600)", bg: "var(--brand-50)" },
  ];
  return (
    <PageShell route="billing" go={go} title="Billing" sub="Payments, invoices & insurance">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }}>
          {sums.map((s, i) => (
            <div key={i} style={{ borderRadius: 12, background: s.bg, padding: "20px 22px" }}>
              <div style={{ fontSize: 12.5, color: "var(--fg-2)", fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginTop: 6 }} className="ds-num">{s.value}</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Invoices</h2>
          <Button icon="credit-card" onClick={() => go("invoice")}>Pay All ($248.50)</Button>
        </div>
        <Card style={{ overflow: "hidden" }}>
          <table className="table">
            <thead><tr><th>Invoice</th><th>Date</th><th>Service</th><th>Provider</th><th>Amount</th><th>You Owe</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td><span className="link" onClick={() => go("invoice")}>{inv.id}</span></td>
                  <td className="ds-num">{inv.date}</td>
                  <td className="strong">{inv.service}</td>
                  <td>{inv.prov}</td>
                  <td className="ds-num">{inv.amount}</td>
                  <td className="strong ds-num">{inv.owe}</td>
                  <td><Badge>{inv.status}</Badge></td>
                  <td><button className="link" onClick={() => go("invoice")}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </PageShell>
  );
}

function InvoiceScreen({ go }) {
  const lines = [["Cardiology Consultation (60 min)","99214","$200.00","$40.00"],["EKG Interpretation","93000","$85.00","$17.00"],["Blood Pressure Monitoring","99213","$60.00","$12.00"]];
  return (
    <PageShell route="billing" go={go} title="Invoice #INV-1042" sub="Billing → Invoice Detail">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Breadcrumb go={go} items={[{ label: "Billing", to: "billing" }, { label: "INV-1042" }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 24, alignItems: "start" }}>
          <Card style={{ overflow: "hidden" }}>
            <div style={{ background: "var(--brand-600)", color: "#fff", padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>MedBridge Health</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.78)", marginTop: 3 }}>420 Park Avenue, Suite 300, New York, NY 10022</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em" }}>INVOICE</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)" }}>#INV-1042</div></div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
                <div><div className="eyebrow" style={{ marginBottom: 6 }}>Billed To</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Sarah Johnson</div>
                  <div style={{ fontSize: 13, color: "var(--fg-3)" }}>MRN: MB-4827 · DOB: Mar 14, 1990</div></div>
                <div style={{ textAlign: "right" }}><div className="eyebrow" style={{ marginBottom: 6 }}>Date</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>May 15, 2026</div>
                  <div style={{ fontSize: 13, color: "var(--fg-3)" }}>Due: June 15, 2026</div></div>
              </div>
              <table className="table" style={{ marginBottom: 8 }}>
                <thead><tr><th>Service</th><th>Code</th><th>Charge</th><th>Patient Owes</th></tr></thead>
                <tbody>{lines.map((l,i) => <tr key={i}><td className="strong">{l[0]}</td><td className="ds-num" style={{ color: "var(--fg-3)" }}>{l[1]}</td>
                  <td className="ds-num">{l[2]}</td><td className="strong ds-num">{l[3]}</td></tr>)}</tbody>
              </table>
              <div style={{ marginLeft: "auto", width: 280, marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13.5 }}><span style={{ color: "var(--fg-3)" }}>Subtotal</span><span style={{ fontWeight: 600 }} className="ds-num">$345.00</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13.5 }}><span style={{ color: "var(--fg-3)" }}>Insurance Paid (80%)</span><span style={{ fontWeight: 600, color: "var(--green-600)" }} className="ds-num">−$276.00</span></div>
                <div className="divider-strong divider" style={{ margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Amount Due</span><span style={{ fontSize: 22, fontWeight: 700, color: "var(--amber-700)" }} className="ds-num">$69.00</span></div>
              </div>
            </div>
            <div style={{ background: "var(--n-50)", padding: "14px 28px", fontSize: 12, color: "var(--n-400)", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="shield-check" size={14} /> HIPAA Compliant Billing · billing@medbridge.health · 1-800-MED-BRDG</div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card pad>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Pay This Invoice</h3>
              <div className="eyebrow" style={{ margin: "12px 0 4px" }}>Amount Due</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--amber-700)" }} className="ds-num">$69.00</div>
              <div style={{ margin: "18px 0 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--brand-600)", background: "var(--brand-50)", borderRadius: 8, padding: "12px 14px" }}>
                  <Icon name="credit-card" size={20} style={{ color: "var(--brand-600)" }} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>Visa ···· 4729</div>
                    <div style={{ fontSize: 12, color: "var(--fg-3)" }}>Default · Exp 09/28</div></div>
                  <Icon name="circle-check" size={18} style={{ color: "var(--brand-600)" }} />
                </div>
                <button style={{ ...btnLink, marginTop: 10 }}>+ Use a different card</button>
              </div>
              <Button block size="lg" icon="lock" style={{ marginTop: 18 }} onClick={() => go("payment-success")}>Pay $69.00 Now</Button>
              <Button variant="ghost" block icon="download" style={{ marginTop: 10 }}>Download PDF</Button>
            </Card>
            <Card pad>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 10px" }}>Insurance</h3>
              <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>BlueCross BlueShield<br/>Member ID: XJF-8847291<br/>Plan: PPO Gold · 80% coverage</div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PaymentSuccessScreen({ go }) {
  return (
    <PageShell route="billing" go={go} title="Payment Complete">
      <div style={{ maxWidth: 620, margin: "20px auto 0" }}>
        <Card pad>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--green-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 56, height: 56, borderRadius: 999, background: "var(--green-600)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={30} style={{ color: "#fff" }} /></span></div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: "20px 0 6px" }}>Payment successful</h2>
            <p style={{ fontSize: 15, color: "var(--fg-3)", margin: 0 }}>A receipt was emailed to sarah.johnson@email.com</p>
          </div>
          <div className="divider" style={{ margin: "24px 0" }} />
          <div style={{ background: "var(--n-50)", borderRadius: 10, padding: 20 }}>
            {[["Invoice","#INV-1042"],["Paid with","Visa ···· 4729"],["Amount paid","$69.00"],["Date","May 28, 2026 · 8:43 AM"],["Confirmation","PAY-4827-1042"]].map(([k,v],i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i ? "1px solid var(--n-200)" : "none" }}>
                <span style={{ fontSize: 13, color: "var(--fg-3)" }}>{k}</span><span style={{ fontSize: 13.5, fontWeight: 600 }} className="ds-num">{v}</span></div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Button variant="outline" block icon="download">Download Receipt</Button>
            <Button block icon="arrow-left" onClick={() => go("billing")}>Back to Billing</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

// ---- MESSAGES ----
function ConversationList({ activeId, go }) {
  return (
    <div style={{ width: 360, borderRight: "1px solid var(--border)", background: "#fff", display: "flex", flexDirection: "column", flex: "none" }}>
      <div style={{ padding: 16, borderBottom: "1px solid var(--n-100)" }}>
        <div className="search" style={{ minWidth: 0 }}><Icon name="search" size={17} style={{ color: "var(--n-400)" }} /><input placeholder="Search messages…" /></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {CONVERSATIONS.map(c => {
          const p = c.prov && provById(c.prov);
          const name = c.name || (p && p.full);
          const color = c.color || (p && p.color);
          const initials = c.initials || (p && p.initials);
          const spec = c.spec || (p && p.spec);
          const on = activeId === c.id;
          return (
            <button key={c.id} onClick={() => go("thread")} style={{ display: "flex", gap: 12, padding: "14px 16px", width: "100%", textAlign: "left", cursor: "pointer",
              border: "none", borderBottom: "1px solid var(--n-100)", borderLeft: on ? "3px solid var(--brand-600)" : "3px solid transparent",
              background: on ? "var(--brand-50)" : "#fff", fontFamily: "inherit" }}>
              <Avatar size="md" color={color} initials={initials} name={name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
                  <span style={{ fontSize: 11, color: "var(--n-400)", flex: "none" }}>{c.time}</span></div>
                <div style={{ fontSize: 12.5, color: c.unread ? "var(--fg-1)" : "var(--fg-3)", fontWeight: c.unread ? 500 : 400, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.preview}</div>
              </div>
              {c.unread && <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--brand-600)", alignSelf: "center", flex: "none" }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MessagesInboxScreen({ go }) {
  return (
    <PageShell route="messages" go={go} title="Messages" sub="2 unread" scroll={false}>
      <div style={{ display: "flex", height: "100%" }}>
        <ConversationList activeId={null} go={go} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-page)" }}>
          <EmptyState icon="messages-square" title="Select a conversation"
            body="Choose a conversation from the list to view your secure messages with your care team."
            action={<Button icon="pencil">New Message</Button>} />
        </div>
      </div>
    </PageShell>
  );
}

function MessageThreadScreen({ go }) {
  const p = provById("patel");
  return (
    <PageShell route="messages" go={go} title="Messages" sub="2 unread" scroll={false}>
      <div style={{ display: "flex", height: "100%" }}>
        <ConversationList activeId="c1" go={go} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: "1px solid var(--border)", flex: "none" }}>
            <ProviderAvatar prov="patel" size="md" />
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.full}</div>
              <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{p.spec} · {p.clinic}</div></div>
            <button className="btn-icon" onClick={() => go("provider-profile")}><Icon name="user" size={18} /></button>
            <button className="btn-icon"><Icon name="phone" size={18} /></button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: "var(--bg-page)" }}>
            <div style={{ textAlign: "center", margin: "0 0 20px" }}><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--n-400)", background: "var(--n-100)", padding: "4px 12px", borderRadius: 999 }}>May 15, 2026</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680, margin: "0 auto" }}>
              {THREAD.map((m, i) => {
                const doc = m.from === "doc";
                return (
                  <div key={i} style={{ display: "flex", justifyContent: doc ? "flex-start" : "flex-end" }}>
                    <div style={{ maxWidth: "72%" }}>
                      <div style={{ padding: "12px 16px", borderRadius: 14, whiteSpace: "pre-line", lineHeight: 1.55, fontSize: 14,
                        background: doc ? "#fff" : "var(--brand-600)", color: doc ? "var(--fg-1)" : "#fff",
                        border: doc ? "1px solid var(--border)" : "none", borderBottomLeftRadius: doc ? 4 : 14, borderBottomRightRadius: doc ? 14 : 4 }}>{m.text}</div>
                      <div style={{ fontSize: 11, color: "var(--n-400)", marginTop: 5, textAlign: doc ? "left" : "right" }}>{m.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderTop: "1px solid var(--border)", flex: "none", background: "#fff" }}>
            <button className="btn-icon"><Icon name="paperclip" size={18} /></button>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "var(--n-50)", border: "1px solid var(--border)", borderRadius: 999, padding: "0 18px", height: 44 }}>
              <input placeholder="Type your message…" style={{ flex: 1, border: "none", background: "none", outline: "none", fontFamily: "inherit", fontSize: 14 }} /></div>
            <button style={{ width: 44, height: 44, borderRadius: 10, background: "var(--brand-600)", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <Icon name="send" size={19} style={{ color: "#fff" }} /></button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

Object.assign(window, { BillingScreen, InvoiceScreen, PaymentSuccessScreen, MessagesInboxScreen, MessageThreadScreen });
