"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { donation, contact, type DonationIcon } from "@/lib/content";
import { T, plain, Reveal, BtnArrow, EASE } from "./ui";
import Eyebrow from "./Eyebrow";
import { Handshake, Gift, Users, Heart, Megaphone, Chat, WhatsApp, Lock } from "./Icons";

const causeIcons: Record<DonationIcon, typeof Heart> = { heart: Heart, megaphone: Megaphone, chat: Chat, users: Users };

const ways = [
  { icon: Handshake, title: "Partner or refer", text: "Hospitals, clinics, schools, faith and community leaders can refer people to us with confidence." },
  { icon: Users, title: "Sponsor a programme", text: "Fund awareness talks, family support sessions or treatment places for people in need." },
  { icon: Gift, title: "Give in kind", text: "Supplies, equipment and professional time all help our care go further." },
];

/** Small copy-to-clipboard button that briefly confirms. */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState("Copy");
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setState("Copied"); }
    catch { setState("Copy failed"); }
    setTimeout(() => setState("Copy"), 1800);
  };
  return <button type="button" className="copy" onClick={copy} aria-label={`Copy ${label}`}>{state}</button>;
}

export default function Support() {
  const [pick, setPick] = useState(0);
  const cause = donation.causes[pick];
  const { bank } = donation;
  const thanks = `https://wa.me/${contact.phoneIntl.replace("+", "")}?text=${encodeURIComponent(
    `Hello DMA Foundation, I have just made a donation towards "${cause.label}". Here is my transfer receipt.`,
  )}`;

  return (
    <section id="support" className="section mist" aria-labelledby="support-title">
      <div className="wrap give-grid">
        <div className="give-copy">
          <Reveal><Eyebrow>Support our work</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h2" id="support-title">Your support rebuilds lives, and we can show you how</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Donations help people who cannot afford care to begin recovery, and fund prevention work that protects young people in our communities.</p></Reveal>
          <ul className="partner-list">
            {ways.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.07} y={14}>
                <li><span className="ic"><p.icon size={22} /></span><div><h4>{p.title}</h4><p>{p.text}</p></div></li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal y={50}>
          <div className="give-card">
            <div className="give-head">
              <h3>Make a donation</h3>
              <p>Any amount makes a difference. Choose what your gift supports.</p>
            </div>

            <div className="give-step">
              <span className="step-no" aria-hidden="true">1</span>
              <div className="causes" role="radiogroup" aria-label="What your gift supports">
                {donation.causes.map((c, i) => {
                  const Icon = causeIcons[c.icon];
                  const on = pick === i;
                  return (
                    <button key={c.label} type="button" role="radio" aria-checked={on} className={`cause${on ? " on" : ""}`} onClick={() => setPick(i)}>
                      {on && <motion.span layoutId="cause-bg" className="bg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <Icon size={20} />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="cause-impact" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={pick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}>
                  <T>{cause.impact}</T>
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="give-step">
              <span className="step-no" aria-hidden="true">2</span>
              <div className="bank">
                <div className="bank-row"><span>Bank</span><b><T>{bank.bank}</T></b></div>
                <div className="bank-row"><span>Account name</span><b><T>{bank.accountName}</T></b></div>
                <div className="bank-row"><span>Account number</span><b><T>{bank.accountNumber}</T><CopyButton value={plain(bank.accountNumber)} label="account number" /></b></div>
                <div className="bank-row note-row"><span>Transfer note</span><b>{cause.note}<CopyButton value={cause.note} label="transfer note" /></b></div>
              </div>
            </div>

            <div className="give-step">
              <span className="step-no" aria-hidden="true">3</span>
              <div className="give-thanks">
                <a className="btn btn-gold" href={thanks} target="_blank" rel="noopener noreferrer">
                  <WhatsApp size={19} /> Send us your receipt <BtnArrow />
                </a>
                <p className="pay-note"><Lock size={14} />We&rsquo;ll say thank you and let you know how your gift was used.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
