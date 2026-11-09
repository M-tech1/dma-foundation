"use client";

import { motion } from "framer-motion";
import { EASE } from "./ui";

/**
 * The brand's gold "rising sun" arcs (Brand Guidelines 9.2).
 * - rising:  concentric half-circles rising from the bottom edge (hero, panels)
 * - corner:  concentric quarter arcs for a panel corner ("Rising corner")
 * - divider: small arc ornament with a dot, used above quotes ("Arc divider")
 * Arcs draw themselves in when they enter the viewport.
 */
export function RisingArcs({ className, rings = 9, opacity = 0.55, sun = true }: { className?: string; rings?: number; opacity?: number; sun?: boolean }) {
  const cx = 500, cy = 500;
  return (
    <svg className={className} viewBox="0 0 1000 500" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      {Array.from({ length: rings }, (_, i) => {
        const r = 90 + i * 48;
        return (
          <motion.path
            key={i}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            stroke="#D4A017"
            strokeWidth={1.4}
            strokeOpacity={opacity * (1 - i / (rings + 2))}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.2 + i * 0.09 }}
          />
        );
      })}
      {sun && (
        <motion.path
          d={`M ${cx - 62} ${cy} A 62 62 0 0 1 ${cx + 62} ${cy} Z`}
          fill="#D4A017"
          initial={{ y: 70, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: EASE, delay: 0.4 }}
        />
      )}
    </svg>
  );
}

export function CornerArcs({ className, rings = 6 }: { className?: string; rings?: number }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" aria-hidden="true">
      {Array.from({ length: rings }, (_, i) => {
        const r = 60 + i * 40;
        return (
          <motion.path
            key={i}
            d={`M ${300 - r} 300 A ${r} ${r} 0 0 1 300 ${300 - r}`}
            stroke="#D4A017"
            strokeWidth={2}
            strokeOpacity={0.9 - i * 0.12}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.1 + i * 0.1 }}
          />
        );
      })}
      <path d="M 260 300 A 40 40 0 0 1 300 260 L 300 300 Z" fill="#D4A017" />
    </svg>
  );
}

export function ArcDivider({ className = "arc-divider", width = 88 }: { className?: string; width?: number }) {
  return (
    <svg className={className} width={width} height={width / 2.2} viewBox="0 0 88 40" fill="none" aria-hidden="true">
      <motion.path d="M4 38 A 40 40 0 0 1 84 38" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }} />
      <motion.path d="M24 38 A 20 20 0 0 1 64 38" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />
      <circle cx="44" cy="35" r="4" fill="#D4A017" />
    </svg>
  );
}

/** Tiny arc used as an eyebrow marker. */
export function ArcMark() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <path d="M1 11 A10 10 0 0 1 21 11" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="9.5" r="2.3" fill="#D4A017" />
    </svg>
  );
}
