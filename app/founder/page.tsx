import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "../../components/Reveal";
import AtomAnimation from "../../components/AtomAnimation";

export const metadata: Metadata = {
  title: "Founder & CEO — Hewan Kachru | VYRO Digital",
  description:
    "Meet Hewan Kachru, Founder and Chief Executive Officer of VYRO Digital. Uniting luxury-grade brand aesthetics with high-velocity commercial performance.",
  alternates: {
    canonical: "/founder",
  },
};

export default function Founder() {
  return (
    <>
      {/* 1. Cinematic Hero Section with Animated Portrait Reveal */}
      <section className="founder-cinematic">
        <div className="founder-cinematic-image">
          <Image
            src="/hewan-kachru.webp"
            alt="Hewan Kachru, Founder and Chief Executive Officer of VYRO Digital"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="founder-cinematic-shade" />
        <div className="founder-cinematic-copy">
          <p className="eyebrow">THE PERSON BEHIND THE DIRECTION / VYRO DIGITAL</p>
          <h1>
            Hewan<br />
            <em>Kachru.</em>
          </h1>
          <p className="hero-copy">Founder &amp; Chief Executive Officer</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/contact">
              Work with VYRO ↗
            </Link>
            <span className="cinematic-note">STRATEGY · BRAND · GROWTH</span>
          </div>
        </div>
        <span className="cinematic-index">01 — THE FOUNDER</span>
      </section>

      {/* 2. Editorial "OUR FOUNDER" Story Section (placed right after the hero) */}
      <section className="founder-letterist-hero">
        <div className="letterist-grid">
          {/* Left: Cinematic Vignette Portrait */}
          <div className="letterist-portrait-col">
            <div className="letterist-portrait-frame">
              <Image
                src="/hewan-kachru.webp"
                alt="Hewan Kachru, Founder and Chief Executive Officer of VYRO Digital"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                className="letterist-portrait-img"
              />
              <div className="letterist-portrait-vignette" />
            </div>
          </div>

          {/* Right: Editorial Typography */}
          <div className="letterist-content-col">
            <h2 className="letterist-title">OUR FOUNDER</h2>
            <div className="letterist-divider" />

            <div className="letterist-bio">
              <p>
                Digital strategist, performance architect, brand builder, growth advisor...{" "}
                <strong>Hewan Kachru</strong> is the driving force and Chief Executive Officer behind VYRO Digital,
                uniting elevated aesthetic taste with rigorous commercial precision.
              </p>
              <p>
                From steering high-velocity acquisition channels to architecting full-scale brand evolutions across
                diverse digital markets, his career is defined by consistency, craft, and measurable business outcomes.
                He bridges the critical divide between refined artistic distinction and high-performance scalability —
                proving that memorable brand prestige and relentless conversion velocity are most potent when fused together.
              </p>
              <p>
                In VYRO Digital, we realize exactly this integration: combining distinct positioning, high-converting digital
                craft, and algorithmic paid media to help ambitious companies transcend the ordinary and establish lasting
                commercial authority.
              </p>
            </div>

            <div className="letterist-actions">
              <Link className="button button-gold" href="/contact">
                Connect with VYRO ↗
              </Link>
              <span className="letterist-role-tag">
                HEWAN KACHRU · FOUNDER &amp; CEO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Kinetic Atom Orbital Philosophy Section */}
      <section className="founder-kinetic-section">
        <Reveal>
          <div className="founder-kinetic-grid">
            <div className="kinetic-visual-col">
              <AtomAnimation />
            </div>
            <div className="kinetic-copy-col">
              <p className="eyebrow">
                <i />THE KINETIC ENGINE / STRATEGIC ORBIT
              </p>
              <h2>
                Engineered for <em>velocity</em><br />and market authority.
              </h2>
              <p className="lead">
                Modern brands cannot rely on visual elegance or performance marketing in isolation. Real enterprise value is
                unlocked when narrative positioning, digital infrastructure, and scalable distribution rotate in seamless harmonic synchrony.
              </p>

              <div className="orbital-pillars">
                <div className="orbital-pillar">
                  <div className="orbital-pillar-header">
                    <span>01 / NUCLEUS</span>
                    <b>STRATEGIC ALIGNMENT</b>
                  </div>
                  <p>
                    Every design choice and growth initiative is anchored to quantifiable business economics and defensible market positioning.
                  </p>
                </div>

                <div className="orbital-pillar">
                  <div className="orbital-pillar-header">
                    <span>02 / INNER ORBIT</span>
                    <b>AESTHETIC DISTINCTION</b>
                  </div>
                  <p>
                    Commanding high status in saturated markets through tailored visual identities, editorial typography, and bespoke experiences.
                  </p>
                </div>

                <div className="orbital-pillar">
                  <div className="orbital-pillar-header">
                    <span>03 / OUTER VELOCITY</span>
                    <b>PERFORMANCE SCALE</b>
                  </div>
                  <p>
                    Algorithmic acquisition across Google and Meta, rapid campaign iteration, and continuous funnels engineered for high customer lifetime value.
                  </p>
                </div>
              </div>

              <div className="hero-actions">
                <Link className="button button-outline" href="/services">
                  Explore Studio Services ↗
                </Link>
                <Link className="text-link" href="/contact">
                  Initiate Private Dialogue <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4. Strategic Pillars Section */}
      <section className="section-pad dark-panel">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <i />CORE PILLARS
              </p>
              <h2>
                The strategic <em>foundation.</em>
              </h2>
            </div>
            <Link className="button button-outline" href="/pricing">
              View Growth Packages ↗
            </Link>
          </div>

          <div className="pillar-grid">
            <article>
              <b>01 / DIRECTION</b>
              <h3>Brand Strategy &amp; Market Positioning</h3>
              <p>
                Defining unique value propositions, audience segmentation, and category leadership so your brand communicates with unmistakable conviction.
              </p>
            </article>
            <article>
              <b>02 / EXPERIENCE</b>
              <h3>High-Conversion Digital Experiences</h3>
              <p>
                Creating blazing fast, bespoke web systems designed to immerse visitors, communicate quality, and convert high-intent traffic into qualified clients.
              </p>
            </article>
            <article>
              <b>03 / MOMENTUM</b>
              <h3>Algorithmic Paid Acquisition &amp; CRO</h3>
              <p>
                Building sustainable paid traffic loops across Meta, Google, and LinkedIn with continuous creative testing and data-driven conversion rate optimization.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      {/* 5. Quote Panel */}
      <section className="quote-panel">
        <Reveal>
          <p>
            &ldquo;The goal isn&apos;t simply to be seen.<br />
            <em>It&apos;s to make every impression count.</em>&rdquo;
          </p>
          <small>HEWAN KACHRU / FOUNDER &amp; CEO — VYRO DIGITAL</small>
        </Reveal>
      </section>
    </>
  );
}
