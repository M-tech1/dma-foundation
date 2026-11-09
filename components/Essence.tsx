"use client";

import { motion } from "framer-motion";
import { essence } from "@/lib/content";
import { EASE } from "./ui";

export default function Essence() {
  return (
    <section className="essence" aria-label="Our brand essence">
      <div className="wrap essence-grid">
        {essence.map((e, i) => (
          <motion.div
            key={e.title}
            className="essence-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
          >
            <motion.span className="bar" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.12 }} />
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
