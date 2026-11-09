"use client";

import { services, reasons, type ServiceIcon } from "@/lib/content";
import { Reveal, BtnArrow } from "./ui";
import Eyebrow from "./Eyebrow";
import { CornerArcs } from "./Arcs";
import { Megaphone, Clipboard, Stethoscope, Chat, Users, Sprout, Check } from "./Icons";

const icons: Record<ServiceIcon, typeof Chat> = {
  prevention: Megaphone, assessment: Clipboard, treatment: Stethoscope,
  counselling: Chat, family: Users, aftercare: Sprout,
};

export default function Services() {
  return (
    <>
      <section id="services" className="section mist" aria-labelledby="services-title">
        <div className="wrap">
          <div className="sec-head split">
            <Reveal><div style={{ display: "grid", gap: 18 }}>
              <Eyebrow>Our services</Eyebrow>
              <h2 className="h2" id="services-title">A complete pathway, from prevention to lasting recovery</h2>
            </div></Reveal>
            <Reveal delay={0.1}><p className="lede">Every service is delivered by trained professionals, grounded in proven practice, and built around the dignity of the person in our care.</p></Reveal>
          </div>

          <div className="service-grid">
            {services.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08} style={{ height: "100%" }}>
                  <article className="service">
                    <span className="ic"><Icon size={26} /></span>
                    <h3 className="h3">{s.title}</h3>
                    <p>{s.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="services-foot">
              <p>Not sure which service is right? Start with a confidential conversation.</p>
              <a className="btn btn-forest" href="#book">Book an assessment <BtnArrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }} aria-labelledby="why-title">
        <div className="wrap">
          <Reveal y={50} className="why dark">
            <CornerArcs className="rising" rings={6} />
            <div className="why-head">
              <Eyebrow>Why families choose us</Eyebrow>
              <h2 className="h2" id="why-title">More than treatment. A real path back to a better life.</h2>
              <p className="lede">We combine evidence-based professional care with genuine compassion, so people feel safe from the very first call.</p>
            </div>
            <ul className="why-list">
              {reasons.map((r, i) => (
                <Reveal key={r} delay={i * 0.06} y={16}>
                  <li><span className="tick"><Check size={16} /></span>{r}</li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
