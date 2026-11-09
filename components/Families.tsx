"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { families, contact } from "@/lib/content";
import { T, Reveal, BtnArrow, EASE } from "./ui";
import Eyebrow from "./Eyebrow";
import { Check, PlusIcon, WhatsApp } from "./Icons";

export default function Families() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="families" className="section mist" aria-labelledby="families-title">
      <div className="wrap fam-grid">
        <div>
          <Reveal><Eyebrow>For families</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h2" id="families-title" style={{ marginTop: 18 }}>{families.title}</h2></Reveal>
          <Reveal delay={0.1}><p className="lede" style={{ marginTop: 18 }}>{families.lede}</p></Reveal>
          <ul className="signs">
            {families.signs.map((s, i) => (
              <Reveal key={s} delay={i * 0.05} y={14}>
                <li><Check size={18} />{s}</li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="fam-cta">
              <a className="btn btn-forest" href="#book">Get help for a loved one <BtnArrow /></a>
              <a className="btn btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} /> Chat on WhatsApp</a>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal><h3 className="h3" style={{ marginBottom: 18, color: "var(--forest)" }}>What families often ask</h3></Reveal>
          <div className="faq">
            {families.faqs.map((f, i) => {
              const on = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} y={18}>
                  <div className={`faq-item${on ? " open" : ""}`}>
                    <button className="faq-q" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(on ? null : i)}>
                      {f.q}
                      <span className="pm" aria-hidden="true"><PlusIcon size={18} /></span>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }} style={{ overflow: "hidden" }}
                        >
                          <p className="faq-a"><T>{f.a}</T></p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
