import Link from "next/link";
import { Reveal } from "../../components/Reveal";

export const metadata = { title: "Insights — VYRO Digital" };

const posts: [string, string, string, string][] = [
  [
    "01",
    "The digital first impression: why it matters",
    "Your website and brand are often the first experience a customer has with your business. Make that moment clear, useful and trustworthy.",
    "Brand strategy",
  ],
  [
    "02",
    "SEO is a long game — build the right foundations",
    "Search visibility comes from useful content, technical health, relevance and consistency. Start with the fundamentals.",
    "SEO",
  ],
  [
    "03",
    "Clicks are not the same as customers",
    "A campaign should be measured by meaningful outcomes, not just reach. Connect your targeting, offer, landing page and follow-up.",
    "Performance marketing",
  ],
];

export default function Insights() {
  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">THE VYRO JOURNAL</p>
          <h1>
            Ideas for your
            <br />
            <em>next move.</em>
          </h1>
          <p className="hero-copy">
            Practical thinking on branding, websites, search and digital growth.
          </p>
        </Reveal>
      </section>

      <section className="section-pad">
        <div className="insight-list">
          {posts.map(([n, t, d, c]) => (
            <Reveal key={n}>
              <article>
                <span>
                  {n} / {c}
                </span>
                <h2>{t}</h2>
                <p>{d}</p>
                <small>Editorial preview · Full article coming soon</small>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="fine-print">
            Insights are currently editorial previews. Publish full original articles before
            treating this section as an active blog.
          </p>
          <Link className="button button-outline" href="/contact">
            Discuss your growth ↗
          </Link>
        </Reveal>
      </section>
    </>
  );
}
