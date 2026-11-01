import Link from "next/link";
import { Reveal } from "../../components/Reveal";

export const metadata = { title: "Pricing & Plans — VYRO Digital" };

const plans = [
  {
    name: "Starter",
    price: "₹29,999+",
    desc: "A confident digital starting point.",
    items: [
      "Branding essentials",
      "Business / landing website",
      "Essential digital setup",
      "Launch-ready foundations",
    ],
  },
  {
    name: "Growth",
    price: "₹59,999+",
    desc: "For businesses ready to build momentum.",
    items: [
      "Brand identity",
      "Professional website",
      "Social media setup",
      "SEO foundation",
      "Growth direction",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "₹99,999+",
    desc: "A connected digital presence built to scale.",
    items: [
      "Complete branding",
      "Premium website",
      "Marketing setup",
      "Growth strategy",
      "Priority project coordination",
    ],
  },
];

const prices: [string, string][] = [
  ["Logo design", "₹5,999+"],
  ["Brand identity", "₹19,999+"],
  ["Business card", "₹1,499+"],
  ["Social media creative", "₹799+"],
  ["Poster design", "₹999+"],
  ["Brochure / flyer", "₹2,499+"],
  ["Catalogue", "₹4,999+"],
  ["Reel / video editing", "₹1,499+"],
  ["Landing page", "₹12,999+"],
  ["Business website", "₹29,999+"],
  ["Professional website", "₹44,999+"],
  ["Premium website", "₹69,999+"],
  ["E-commerce website", "₹59,999+"],
  ["Website redesign", "₹19,999+"],
  ["Website maintenance", "₹3,999+/mo"],
  ["Google Business Profile", "₹2,999+"],
  ["Social media management", "₹12,999+/mo"],
  ["Social media + content", "₹17,999+/mo"],
  ["Meta Ads management", "₹7,999+/mo"],
  ["Google Ads management", "₹9,999+/mo"],
  ["SEO", "₹9,999+/mo"],
  ["Digital marketing", "₹19,999+/mo"],
];

const edits: [string, string][] = [
  ["Quick edit — text, images, contact details", "₹1,499+"],
  ["Visual polish — colours, buttons, fonts", "₹2,499+"],
  ["Section update", "₹3,499+"],
  ["Multiple section improvements", "₹5,999+"],
  ["New page addition", "₹4,999+"],
  ["Mobile responsiveness fix", "₹3,999+"],
  ["Bug fixes / troubleshooting", "₹2,499+"],
  ["Speed optimisation", "₹4,999+"],
  ["Advanced features / integrations", "₹7,999+"],
  ["Partial redesign", "₹9,999+"],
  ["Complete redesign", "₹19,999+"],
];

export default function Pricing() {
  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">CLEAR STARTING POINTS / TAILORED SCOPE</p>
          <h1>
            Invest in your
            <br />
            <em>next stage.</em>
          </h1>
          <p className="hero-copy">
            Transparent starting prices. A clear scope. A solution shaped around your business.
          </p>
        </Reveal>
      </section>

      <section className="section-pad">
        <div className="plan-grid">
          {plans.map((p) => (
            <Reveal key={p.name}>
              <article className={`plan-card ${p.featured ? "plan-featured" : ""}`}>
                <span>{p.featured ? "MOST POPULAR" : "VYRO / " + p.name.toUpperCase()}</span>
                <h2>{p.name}</h2>
                <div className="plan-price">{p.price}</div>
                <p>{p.desc}</p>
                <ul>
                  {p.items.map((x) => (
                    <li key={x}>✓ {x}</li>
                  ))}
                </ul>
                <Link
                  className={p.featured ? "button button-gold" : "button button-outline"}
                  href={`/contact?plan=${p.name}`}
                >
                  Choose {p.name} ↗
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="fine-print">
            Packages are starting scopes, not fixed universal bundles. Final deliverables are
            confirmed in a written proposal.
          </p>
        </Reveal>
      </section>

      <section className="section-pad light-section">
        <Reveal>
          <p className="eyebrow">INDIVIDUAL SERVICES</p>
          <h2>
            À la carte <em>pricing.</em>
          </h2>
          <div className="price-table">
            {prices.map(([n, p]) => (
              <div key={n}>
                <span>{n}</span>
                <b>{p}</b>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad">
        <Reveal>
          <p className="eyebrow">WEBSITE EDITS &amp; IMPROVEMENTS</p>
          <h2>
            Keep your website
            <br />
            <em>working harder.</em>
          </h2>
          <div className="price-table">
            {edits.map(([n, p]) => (
              <div key={n}>
                <span>{n}</span>
                <b>{p}</b>
              </div>
            ))}
          </div>
          <div className="support-box">
            <h3>Monthly website support</h3>
            <p>
              Basic — ₹2,999/mo &nbsp; · &nbsp; Standard — ₹5,999/mo &nbsp; · &nbsp; Premium —
              ₹9,999/mo
            </p>
            <p className="fine-print">
              Support limits, response times and included work are agreed before subscription.
            </p>
          </div>
          <p className="fine-print">
            Payment terms: projects under ₹50,000 — 50% advance and 50% before final delivery.
            Projects above ₹50,000 — 40% / 30% / 30% milestones. Monthly services are paid upfront.
            Domain, hosting, paid software, advertising spend and third-party charges are additional
            unless included in the proposal.
          </p>
          <Link className="button button-gold" href="/contact">
            Request a tailored quote ↗
          </Link>
        </Reveal>
      </section>
    </>
  );
}
