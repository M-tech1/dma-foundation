"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { about, values } from "@/lib/content";
import { T, Photo, Reveal } from "./ui";
import Eyebrow from "./Eyebrow";
import { CornerArcs } from "./Arcs";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span className="word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

const roman = ["I", "II", "III", "IV", "V", "VI"];

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = about.promise.split(" ");

  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p2 } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(p2, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
        </Reveal>
        <h2
          id="about-title"
          className="promise"
          ref={ref}
          aria-label={about.promise}
        >
          {words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
        </h2>

        <div className="about-grid">
          <Reveal className="about-media">
            <div className="about-clip" ref={mediaRef}>
              <motion.div style={{ y, position: "absolute", inset: "-8% 0" }}>
                <Photo
                  src={about.image}
                  alt={about.imageAlt}
                  tint={false}
                  className="portrait"
                  style={{ position: "absolute", inset: 0 }}
                />
              </motion.div>
            </div>
            <CornerArcs className="corner" rings={4} />
          </Reveal>

          <div className="about-body">
            <Reveal>
              <p>{about.intro}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="lede">{about.positioning}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mv">
                <div className="mv-card">
                  <h4>Our mission</h4>
                  <p>{about.mission}</p>
                </div>
                <div className="mv-card">
                  <h4>Our vision</h4>
                  <p>{about.vision}</p>
                </div>
              </div>
            </Reveal>
            {/* <Reveal delay={0.15}>
              <figure className="founder" style={{ margin: 0 }}>
                <span className="avatar" aria-hidden="true">
                  <img
                    src={about.founder.photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div>
                  <blockquote>
                    “<T>{about.founder.message}</T>”
                  </blockquote>
                  <cite>
                    {about.founder.name} <span>· {about.founder.role}</span>
                  </cite>
                </div>
              </figure>
            </Reveal> */}
          </div>
        </div>

        <div className="values" role="list" aria-label="Our core values">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={(i % 3) * 0.08}
              className="value"
              role="listitem"
            >
              <span className="num" aria-hidden="true">
                {roman[i]}
              </span>
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
