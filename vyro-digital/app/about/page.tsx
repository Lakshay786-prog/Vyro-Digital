import Link from "next/link";
import { Reveal } from "../../components/Reveal";

export const metadata = { title: "About VYRO Digital" };

export default function About() {
  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">THE THINKING BEHIND THE WORK</p>
          <h1>
            We build digital
            <br />
            <em>with purpose.</em>
          </h1>
          <p className="hero-copy">
            VYRO Digital brings strategy, design and technology together to help businesses move
            forward.
          </p>
        </Reveal>
      </section>

      <section className="section-pad">
        <Reveal>
          <p className="eyebrow">OUR STORY</p>
          <div className="two-col">
            <h2>
              Not just another
              <br />
              digital agency.
            </h2>
            <div>
              <p className="lead">
                We believe a business deserves more than disconnected digital services. It deserves a
                clear identity, a strong online foundation and a growth strategy that makes sense.
              </p>
              <p>
                VYRO was shaped around a simple idea: make quality digital thinking more accessible
                to businesses that are ready to take themselves seriously. We work across brand,
                build and growth — connecting the pieces instead of treating them as separate tasks.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="dark-panel section-pad">
        <Reveal>
          <p className="eyebrow">OUR PILLARS</p>
          <div className="pillar-grid">
            <article>
              <b>01 / BRAND</b>
              <h3>Be recognised.</h3>
              <p>Identity, visual systems and communication that make your business distinct.</p>
            </article>
            <article>
              <b>02 / BUILD</b>
              <h3>Be present.</h3>
              <p>
                Websites and digital experiences that make it easy for customers to choose you.
              </p>
            </article>
            <article>
              <b>03 / GROW</b>
              <h3>Move forward.</h3>
              <p>
                Marketing, visibility and performance activity built around business goals.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="section-pad">
        <Reveal>
          <div className="two-col">
            <h2>
              Our standard
              <br />
              is <em>intentional.</em>
            </h2>
            <div>
              <p>
                Clear communication. Thoughtful execution. Honest expectations. We believe good work
                comes from understanding the business first, defining what success means and then
                building the right solution.
              </p>
              <Link className="text-link" href="/contact">
                Work with VYRO ↗
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
