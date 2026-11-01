import Link from "next/link";
import { Reveal } from "../../components/Reveal";

export const metadata = { title: "Services — VYRO Digital" };

const items: [string, string, string, string][] = [
  [
    "BRAND",
    "Branding & design",
    "Logo design, brand identity, business collateral, social media creatives, posters, brochures, catalogues and video editing.",
    "From ₹1,799+",
  ],
  [
    "BUILD",
    "Website development",
    "Landing pages, business websites, professional websites, premium websites, e-commerce, redesigns and ongoing maintenance.",
    "From ₹12,999+",
  ],
  [
    "GROW",
    "Social media & content",
    "Social media management, content planning and creative production to keep your business visible and consistent.",
    "From ₹12,999/mo",
  ],
  [
    "GROW",
    "Performance marketing",
    "Google Ads and Meta Ads campaign setup, management and optimisation. Advertising spend is separate.",
    "From ₹7,999/mo",
  ],
  [
    "GROW",
    "SEO & digital visibility",
    "On-page foundations, keyword research, technical improvements and ongoing search optimisation.",
    "From ₹9,999/mo",
  ],
  [
    "SUPPORT",
    "Website support",
    "Quick edits, new sections, page additions, troubleshooting, speed improvements and redesigns.",
    "From ₹1,499",
  ],
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">CAPABILITIES</p>
          <h1>
            Everything connected.
            <br />
            <em>Growth in mind.</em>
          </h1>
          <p className="hero-copy">
            Choose the support you need today. Build a stronger digital foundation for tomorrow.
          </p>
        </Reveal>
      </section>

      <section className="section-pad">
        <div className="service-detail-grid">
          {items.map(([tag, name, desc, price], i) => (
            <Reveal key={name}>
              <article className="detail-card">
                <span>
                  {tag} / 0{i + 1}
                </span>
                <h2>{name}</h2>
                <p>{desc}</p>
                <b>{price}</b>
                <Link href="/contact">Discuss this service ↗</Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="fine-print">
            Prices are starting estimates in INR. Final quotations depend on scope, complexity,
            platform, deliverables and timelines. Third-party costs and advertising spend are
            separate unless stated in a written proposal.
          </p>
        </Reveal>
      </section>
    </>
  );
}
