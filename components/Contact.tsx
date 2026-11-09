"use client";

import { contact } from "@/lib/content";
import { T, Reveal } from "./ui";
import Eyebrow from "./Eyebrow";
import { Pin, Phone, Mail, WhatsApp, ArrowRight, Calendar } from "./Icons";

export default function Contact() {
  const cards = [
    {
      cls: "wa",
      icon: <WhatsApp size={22} />,
      label: "WhatsApp",
      value: contact.phoneDisplay,
      more: "Start a private chat",
      href: contact.whatsapp,
      ext: true,
    },
    {
      cls: "",
      icon: <Phone size={22} />,
      label: "Call us",
      value: contact.phoneDisplay,
      more: "Tap to call",
      href: `tel:${contact.phoneIntl}`,
    },
    {
      cls: "",
      icon: <Mail size={22} />,
      label: "Email",
      value: contact.email,
      more: "Send an email",
      href: `mailto:${contact.email}`,
      sm: true,
    },
    {
      cls: "",
      icon: <Pin size={22} />,
      label: "Visit",
      value: contact.address,
      more: "Open in Maps",
      href: contact.map,
      ext: true,
    },
  ];
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="sec-head split">
          <Reveal>
            <div style={{ display: "grid", gap: 18 }}>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="h2" id="contact-title">
                Talk to us confidentially
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Whether you are reaching out for yourself or for someone you love,
              the first step is a conversation.{" "}
              <span
                style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
              >
                <Calendar size={16} /> <T>{contact.hours}</T>
              </span>
            </p>
          </Reveal>
        </div>
        <div className="contact-grid">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07} style={{ height: "100%" }}>
              <a
                className={`c-card ${c.cls}`}
                href={c.href}
                {...(c.ext
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="ic">{c.icon}</span>
                <small>{c.label}</small>
                <p className={"sm" in c && c.sm ? "sm" : undefined}>
                  {c.value}
                </p>
                <span className="more">
                  {c.more} <ArrowRight size={15} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
