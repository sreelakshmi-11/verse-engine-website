// Pieces shared by the legal pages.

/** The page heading with its "Legal" label and effective date. */
export function LegalHeader({ title, effective = "20 October 2026" }: { title: string; effective?: string }) {
  return (
    <>
      <p className="mono" style={{ marginTop: "28px" }}>
        Legal
      </p>
      <h1>{title}</h1>
      <p className="meta">Effective {effective} · Ctruh Technologies Private Limited</p>
    </>
  );
}

/** The company's address and contact email. */
export function LegalAddress() {
  return (
    <p>
      {"Ctruh Technologies Private Limited · 3rd Floor, Obeya Silk, Siddappa Layout, Madiwala Post, Bommanahalli, Bengaluru, Karnataka 560068, India · "}
      <a href="mailto:hello@ctruh.com">hello@ctruh.com</a>
    </p>
  );
}
