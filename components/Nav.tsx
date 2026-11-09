"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, contact, site } from "@/lib/content";
import { Menu, Close, WhatsApp } from "./Icons";
import { BtnArrow, EASE } from "./ui";
import { RisingArcs } from "./Arcs";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = (href: string) => (!href.includes("#") && pathname.startsWith(href) ? "page" : undefined);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
        <div className="wrap">
          <a href="/#top" aria-label={`${site.shortName}, back to top`} onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/brand/dma-logo.png" alt="Dr. Mohammed Audu Foundation" width={903} height={275} />
          </a>
          <ul className="nav-links" onMouseLeave={() => setHover(null)}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={current(n.href)} onMouseEnter={() => setHover(n.href)}>
                  {hover === n.href && <motion.span layoutId="nav-pill" className="pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a className="btn btn-gold" href="/#book">Book an assessment <BtnArrow /></a>
            <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 80px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 80px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 80px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <RisingArcs className="arcs" rings={6} sun={false} />
            {nav.map((n, i) => (
              <motion.a key={n.href} className="m-link" href={n.href} aria-current={current(n.href)} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: EASE }}>
                {n.label}
              </motion.a>
            ))}
            <motion.div className="m-actions" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}>
              <a className="btn btn-gold" href="/#book" onClick={() => setOpen(false)}>Book an assessment <BtnArrow /></a>
              <a className="btn btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp size={20} /> Chat on WhatsApp</a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
