"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../../components/Reveal";

const projects = [
  {
    name: "Muscle Nutrition",
    type: "Gym & Nutrition · Swarn Vihar, Jammu",
    cat: "Web",
    desc: "A performance-focused website for a fitness and nutrition brand — built to drive membership enquiries, showcase facilities and build a strong local presence.",
    image: "/work/muscle-nutrition.jpg",
    imageAlt: "Muscle Nutrition — Gym & Nutrition, Swarn Vihar Jammu",
    link: "https://musclenutritiongym1.netlify.app",
    linkLabel: "Visit website ↗",
  },
  {
    name: "Kaul & Associates",
    type: "Chartered Accountants · Brand & Digital",
    cat: "Branding",
    desc: "A complete brand identity and digital presence for a professional CA firm — communicating trust, authority and expertise across audit, taxation, advisory and compliance.",
    image: "/work/kaul-associates.jpg",
    imageAlt: "Kaul & Associates — Chartered Accountants branding and website",
    link: null,
    linkLabel: null,
  },
];

const CATS = ["All", "Branding", "Web"] as const;

export default function Work() {
  const [filter, setFilter] = useState<string>("All");
  const shown = projects.filter((p) => filter === "All" || p.cat === filter);

  return (
    <>
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">SELECTED DIRECTIONS</p>
          <h1>
            Ideas made
            <br />
            <em>tangible.</em>
          </h1>
          <p className="hero-copy">
            A look at the kind of brand and digital experiences VYRO is built to create.
          </p>
        </Reveal>
      </section>

      <section className="section-pad">
        <Reveal>
          <div className="filters">
            {CATS.map((x) => (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={filter === x ? "filter-active" : ""}
              >
                {x}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-grid">
          {shown.map((p) => (
            <Reveal key={p.name}>
              <article className="work-card">
                <div className="work-art work-art-img">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                  <div className="work-art-overlay">
                    <span>VYRO / CLIENT</span>
                    <b>{p.name}</b>
                    <small>{p.type}</small>
                  </div>
                </div>
                <div className="work-info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="work-info-footer">
                    <span>{p.cat} · Client project</span>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="work-visit-link"
                      >
                        {p.linkLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link className="button button-gold" href="/contact">
            Create your project ↗
          </Link>
        </Reveal>
      </section>
    </>
  );
}
