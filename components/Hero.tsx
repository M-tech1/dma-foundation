"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero, contact } from "@/lib/content";
import { Photo, BtnArrow, EASE } from "./ui";
import { RisingArcs } from "./Arcs";
import { Shield, WhatsApp } from "./Icons";

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Start at full frame (no zoom); the gentle scroll parallax stays within the 1.1 overscale.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const arcsY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="glow" aria-hidden="true" />
      <motion.div style={{ y: arcsY }} aria-hidden="true">
        <RisingArcs className="hero-arcs" rings={10} opacity={0.5} />
      </motion.div>

      <div className="wrap hero-grid">
        <div>
          <motion.span className="eyebrow" {...up(0.1)}>
            {hero.eyebrow}
          </motion.span>
          <h1 id="hero-title">
            <span className="line">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              >
                {hero.titleLead}
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                className="accent"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.36 }}
              >
                {hero.titleAccent}
              </motion.span>
            </span>
          </h1>
          <motion.p className="lede" {...up(0.6)}>
            {hero.lede}
          </motion.p>
          <motion.div className="hero-actions" {...up(0.75)}>
            <a className="btn btn-gold" href="#book">
              Book an assessment <BtnArrow />
            </a>
            <a className="btn btn-ghost" href="#families">
              Get help for a loved one
            </a>
          </motion.div>
          <motion.ul className="assurances" {...up(0.9)}>
            {hero.assurances.map((a) => (
              <li key={a}>
                <Shield size={18} />
                {a}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="hero-visual">
          <motion.div
            className="halo"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
          />
          <motion.div
            className="arch-clip"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
          >
            <motion.div
              style={{
                y: imgY,
                scale: imgScale,
                position: "absolute",
                inset: 0,
              }}
            >
              <Photo
                src={hero.image}
                alt={hero.imageAlt}
                eager
                tint={false}
                className="hero-photo"
                quality={90}
                /* The wide photo is cropped to fill a square arch, so it renders ~1.8× the frame's width. */
                sizes="(max-width: 860px) 760px, 1000px"
                style={{ position: "absolute", inset: 0 }}
              />
            </motion.div>
          </motion.div>

          <motion.img
            className="hero-badge"
            src="/brand/dma-badge.png"
            alt=""
            width={104}
            height={104}
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
          />
        </div>
      </div>
    </section>
  );
}
