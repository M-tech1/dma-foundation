"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { T, Reveal, EASE } from "./ui";
import { ArcDivider } from "./Arcs";
import { Lock } from "./Icons";

const DURATION = 7000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setI((n) => (n + 1) % testimonials.length),
      DURATION,
    );
    return () => clearTimeout(t);
  }, [i, paused]);

  const t = testimonials[i];
  return (
    <section
      className="section"
      aria-label="Stories of recovery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Reveal className="wrap t-wrap">
        <ArcDivider />
        <div className="t-stage" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              style={{ margin: 0 }}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <blockquote className="t-quote" style={{ margin: 0 }}>
                “<div>{t.quote}</div>”
              </blockquote>
              <figcaption className="t-cite">
                {t.name}
                <span>· {t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="t-dots" role="tablist" aria-label="Choose a story">
          {testimonials.map((_, n) => (
            <button
              key={n}
              role="tab"
              aria-selected={n === i}
              aria-label={`Story ${n + 1}`}
              onClick={() => setI(n)}
            >
              {n === i && (
                <motion.span
                  key={`${i}-${paused}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 1 : 1 }}
                  transition={{
                    duration: paused ? 0.3 : DURATION / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <p className="t-note">
          <Lock size={14} /> Stories are shared with written consent. Names and
          details are changed to protect privacy.
        </p>
      </Reveal>
    </section>
  );
}
