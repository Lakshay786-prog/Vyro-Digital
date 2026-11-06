import type { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";
import { Reveal } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us — Start a Project Conversation",
  description:
    "Get in touch with VYRO Digital to discuss your website development, branding, or growth marketing project. We respond within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">LET&apos;S MAKE SOMETHING HAPPEN</p>
          <h1>
            Tell us what
            <br />
            you&apos;re <em>building.</em>
          </h1>
          <p className="hero-copy">
            Share a little about your business and what you want to achieve. We&apos;ll take it
            from there.
          </p>
        </Reveal>
      </section>

      <section className="section-pad contact-layout">
        <Reveal>
          <div>
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>
              Good work
              <br />
              starts with a
              <br />
              <em>good brief.</em>
            </h2>
            <div className="contact-method">
              <span>EMAIL</span>
              <a href="mailto:vyrodigital04@gmail.com">vyrodigital04@gmail.com</a>
            </div>
            <div className="contact-method">
              <span>CALL / WHATSAPP</span>
              <a href="https://wa.me/918082703677" target="_blank" rel="noreferrer">
                +91 80827 03677 ↗
              </a>
            </div>
            <div className="contact-method">
              <span>INSTAGRAM</span>
              <a
                href="https://www.instagram.com/vyro__digital?psln=MWJsbDJzMnkzZ2dmNg=="
                target="_blank"
                rel="noreferrer"
              >
                @vyro__digital ↗
              </a>
            </div>
            <div className="contact-method">
              <span>BASED IN</span>
              <b>Jammu, India · Working everywhere</b>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
