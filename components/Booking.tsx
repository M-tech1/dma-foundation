"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { booking, bookingImage, contact } from "@/lib/content";
import { Photo, Reveal, BtnArrow, EASE } from "./ui";
import Eyebrow from "./Eyebrow";
import { Check, Lock, WhatsApp, Phone } from "./Icons";

function Segmented({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="seg-group" role="radiogroup" aria-label={label}>
      <span className="seg-label">{label}</span>
      <div className="seg-row">
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o} className="seg-btn" onClick={() => onChange(o)}>
            {value === o && <motion.span layoutId={`seg-${name}`} className="bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Booking() {
  const [who, setWho] = useState(booking.who[0]);
  const [via, setVia] = useState(booking.contactBy[1]);
  const [note, setNote] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setNote("Please add a name, a way to reach you, a preferred date, and tick the privacy box.");
      return;
    }
    setSending(true);
    setNote(null);
    try {
      const data = { ...Object.fromEntries(new FormData(form)), who, contactBy: via };
      const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "");
      setDone(true);
    } catch (err) {
      setNote((err as Error).message || `We couldn't send your request. Please call or WhatsApp us on ${contact.phoneDisplay}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="book" className="section booking dark" aria-labelledby="book-title">
      <Photo src={bookingImage} alt="" />
      <div className="wrap">
        <div className="book-intro">
          <Reveal><Eyebrow>Book an assessment</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h2" id="book-title">Thank you for reaching out</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Everything you share with us is confidential. {booking.lede}</p></Reveal>
          <ul className="book-points">
            {["A private conversation with a trained professional", "No judgement, and no pressure to commit", "Clear guidance on next steps and costs", "Support for you, or for someone you love"].map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.06} y={14}><li><Check size={18} />{p}</li></Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <div className="book-alt">
              <p>Prefer to talk now?</p>
              <div className="row">
                <a className="btn btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} /> WhatsApp</a>
                <a className="btn btn-ghost" href={`tel:${contact.phoneIntl}`}><Phone size={18} /> {contact.phoneDisplay}</a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal y={50} delay={0.1}>
          <div className="form-card">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" className="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }}>
                  <motion.span className="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}><Check size={34} /></motion.span>
                  <h3>Request received</h3>
                  <p>A member of our team will contact you privately by {via.toLowerCase()} to confirm your assessment. If you need us sooner, call or WhatsApp {contact.phoneDisplay}.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 18 }} exit={{ opacity: 0, y: -10 }}>
                  <h3>{booking.title}</h3>
                  <Segmented label="Who is this for?" name="who" options={booking.who} value={who} onChange={setWho} />
                  <div className="f-row">
                    <div className="field"><input id="b-name" name="name" placeholder=" " autoComplete="given-name" required /><label htmlFor="b-name">First name or initials</label></div>
                    <div className="field"><input id="b-phone" name="phone" type="tel" placeholder=" " autoComplete="tel" required /><label htmlFor="b-phone">Phone / WhatsApp</label></div>
                  </div>
                  <Segmented label="How should we contact you?" name="via" options={booking.contactBy} value={via} onChange={setVia} />
                  {via === "Email" && (
                    <div className="field"><input id="b-email" name="email" type="email" placeholder=" " autoComplete="email" required /><label htmlFor="b-email">Email address</label></div>
                  )}
                  <div className="f-row">
                    <div className="field"><input id="b-date" name="date" type="date" min={today} placeholder=" " required /><label htmlFor="b-date">Preferred date</label></div>
                    <div className="field">
                      <select id="b-time" name="time" defaultValue={booking.times[0]}>
                        {booking.times.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <label htmlFor="b-time">Preferred time</label>
                    </div>
                  </div>
                  <div className="field"><textarea id="b-notes" name="notes" placeholder=" " /><label htmlFor="b-notes">Anything you&apos;d like us to know (optional)</label></div>
                  <p className="privacy-note"><Lock size={15} />{booking.privacy}</p>
                  <label className="consent" htmlFor="b-consent">
                    <input id="b-consent" name="consent" type="checkbox" required />
                    <span>I agree to be contacted about this request, as described in the <a href="/privacy">privacy policy</a>.</span>
                  </label>
                  <div className="form-foot">
                    <button className="btn btn-gold" type="submit" disabled={sending}>{sending ? "Sending…" : "Request my assessment"} <BtnArrow /></button>
                    {note && <p className="form-note err" role="alert">{note}</p>}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
