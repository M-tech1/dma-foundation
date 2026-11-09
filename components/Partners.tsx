"use client";

import { useState } from "react";
import { partners } from "@/lib/content";
import { Reveal } from "./ui";
import Eyebrow from "./Eyebrow";

type Partner = (typeof partners)[number];

function Logo({ p }: { p: Partner }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="partner-logo">
      {missing ? (
        <span className="partner-mono" aria-hidden="true">
          {p.short}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.logo}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

function Card({ p, hidden }: { p: Partner; hidden?: boolean }) {
  return (
    <li className="partner" aria-hidden={hidden || undefined}>
      <Logo p={p} />
      <span className="partner-name">{p.name}</span>
    </li>
  );
}

/** Continuous logo slideshow. The list is rendered twice so the loop is seamless;
    the copy is hidden from screen readers. Pauses on hover and keyboard focus. */
export default function Partners() {
  return (
    <section
      id="partners"
      className="section partners"
      aria-labelledby="partners-title"
    >
      <div className="wrap">
        <div className="sec-head center">
          <Reveal>
            <Eyebrow>Our partners</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2" id="partners-title">
              Working together for healthier communities
            </h2>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.1}>
        <div
          className="marquee"
          tabIndex={0}
          aria-label="Partner organisations"
        >
          <ul className="marquee-track">
            {partners.map((p) => (
              <Card key={p.short} p={p} />
            ))}
            {partners.map((p) => (
              <Card key={`${p.short}-copy`} p={p} hidden />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
