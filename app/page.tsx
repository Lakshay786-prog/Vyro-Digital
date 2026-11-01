import Link from "next/link";
import Image from "next/image";
import { Reveal } from "../components/Reveal";
import AtomAnimation from "../components/AtomAnimation";
import InteractiveCube from "../components/InteractiveCube";

const services = [
  ["01", "Brand identity", "Create a brand people recognise, remember and trust."],
  ["02", "Web development", "Fast, responsive websites built to turn attention into action."],
  ["03", "Performance marketing", "Campaigns designed around measurable business outcomes."],
  ["04", "SEO & visibility", "Help the right customers discover your business."],
  ["05", "Social media", "Consistent content that builds relevance and community."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-noise" />
        <div className="eyebrow">
          <i /> GROWTH STUDIO FOR AMBITIOUS BRANDS
        </div>
        <h1>
          Build a sharper<br />
          digital <em>presence.</em>
        </h1>
        <p className="hero-copy">
          We design bold brands, build conversion-focused websites and turn attention into measurable growth for businesses ready to scale.
        </p>
        <div className="hero-actions">
          <Link className="button button-gold" href="/contact">
            Start a project <span>↗</span>
          </Link>
          <Link className="text-link" href="/work">
            Explore our work <span>↗</span>
          </Link>
        </div>
        <div className="hero-bottom">
          <span>STRATEGY / DESIGN / DEVELOPMENT / GROWTH</span>
          <span>JAMMU · INDIA · EVERYWHERE</span>
        </div>

        {/* 3D Metallic Atom Animation with VYRO in motion */}
        <div className="hero-atom-wrap" aria-hidden="true">
          <AtomAnimation />
        </div>
      </section>

      <section className="intro section-pad">
        <Reveal>
          <p className="eyebrow">01 / WHO WE ARE</p>
          <div className="intro-grid">
            <h2>
              Good businesses<br />
              deserve <em>great</em><br />
              digital experiences.
            </h2>
            <div>
              <p className="lead">
                VYRO Digital is a digital growth studio that helps businesses build their brand, establish their online presence and generate customers.
              </p>
              <p>
                From the first impression to the final conversion, we bring strategy, creative thinking and technology together to move your business forward.
              </p>
              <Link className="text-link" href="/about">
                Get to know VYRO ↗
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="services-preview section-pad">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / WHAT WE DO</p>
              <h2>
                Three pillars.<br />
                <em>One direction.</em>
              </h2>
            </div>
            <Link className="text-link" href="/services">
              All services ↗
            </Link>
          </div>
          <div className="service-list">
            {services.map(([n, t, d]) => (
              <div className="service-row" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <b>↗</b>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="statement">
        <p>BUILD WITH INTENT.</p>
        <h2>
          Brand with purpose.<br />
          <em>Grow with clarity.</em>
        </h2>
        <Link className="button button-outline" href="/contact">
          Let&apos;s build something ↗
        </Link>
      </section>

      <section className="founder-strip section-pad">
        <Reveal>
          <div className="founder-copy">
            <p className="eyebrow">03 / THE PEOPLE BEHIND VYRO</p>
            <h2>
              Strategy starts<br />
              with <em>people.</em>
            </h2>
            <div className="team-intro">
              <h3 className="team-heading">Meet Our Team</h3>

              <div className="team-member">
                <h4>Hewan Kachru — <em>Founder &amp; Chief Executive Officer (CEO)</em></h4>
                <p>
                  Meet Hewan Kachru, who leads VYRO Digital&apos;s vision, business strategy, client relationships and digital marketing initiatives, helping brands build a strong online presence and achieve growth.
                </p>
              </div>

              <div className="team-member">
                <h4>Lakshay Verma — <em>Co-Founder &amp; Chief Technology Officer (CTO)</em></h4>
                <p>
                  Meet Lakshay, who leads website development and technical execution, transforming ideas into modern, responsive and high-performing digital experiences.
                </p>
              </div>

              <p className="team-tagline">
                Together, we turn ideas into digital growth.<br />
                <strong>VYRO Digital — Build. Brand. Grow.</strong>
              </p>
            </div>
            <Link className="text-link" href="/founder">
              Meet the founder ↗
            </Link>
          </div>
          <div className="founder-card founder-cube-card">
            <InteractiveCube />
          </div>
        </Reveal>
      </section>

      <section className="cta-band">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Have a business<br />
          ready to <em>move?</em>
        </h2>
        <Link className="button button-gold" href="/contact">
          Tell us what you&apos;re building ↗
        </Link>
      </section>
    </>
  );
}
