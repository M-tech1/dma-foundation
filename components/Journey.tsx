"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { journey } from "@/lib/content";
import { Reveal } from "./ui";
import Eyebrow from "./Eyebrow";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.min(journey.length, Math.floor(v * journey.length + 0.4))));
  const scale = useTransform(p, (v) => v);
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const on = () => setVertical(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal><Eyebrow>Our approach</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h2" id="approach-title">The recovery journey, one step at a time</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Recovery is possible, and it starts with one conversation. Here is what happens after you reach out.</p></Reveal>
        </div>

        <div className="journey" ref={ref}>
          <div className="journey-line" aria-hidden="true">
            <motion.div style={vertical ? { scaleY: scale } : { scaleX: scale }} />
          </div>
          <ol>
            {journey.map((s, i) => (
              <li key={s.title} className={`stage${i < lit ? " lit" : ""}`}>
                <span className="dot" aria-hidden="true">{i + 1}</span>
                <Reveal delay={i * 0.08} y={18}>
                  <h3 className="h3">{s.title}</h3>
                  <p style={{ marginTop: 8 }}>{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
