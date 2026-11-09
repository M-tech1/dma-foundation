import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import UrgentBar from "@/components/UrgentBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: `Privacy policy | ${site.shortName}` };

export default function Privacy() {
  return (
    <>
      <UrgentBar />
      <header className="nav scrolled">
        <div className="wrap">
          <a href="/" aria-label="Back to home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/brand/dma-logo.png" alt="Dr. Mohammed Audu Foundation" width={903} height={275} />
          </a>
          <a className="btn btn-gold" href="/#book">Book an assessment</a>
        </div>
      </header>
      <main className="wrap">
        <article className="legal-page">
          <span className="eyebrow">Draft for legal review</span>
          <h1>Privacy policy</h1>
          <p>Privacy is sacred in our work. This page explains how the {site.fullName} collects, stores and protects your information, in line with the Nigeria Data Protection Act (NDPA) 2023.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Details you give us when you book an assessment or contact us: a name or initials, phone number, optional email, preferred date and time, and anything you choose to tell us.</li>
            <li>Donation details are processed by our payment provider. We do not store card numbers.</li>
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>Only to contact you about your request and to provide care you agree to.</li>
            <li>We never share, publish or discuss information that could identify you without your written consent.</li>
            <li>We never sell your information or use it for advertising.</li>
          </ul>
          <h2>How we protect it</h2>
          <ul>
            <li>Our website uses SSL encryption, and access to records is limited to authorised staff.</li>
            <li>We keep only what we need, for as long as we need it.</li>
          </ul>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete your information, or withdraw consent at any time. Contact us at {contact.email} or {contact.phoneDisplay}.</p>
          <p style={{ color: "var(--slate)", fontSize: 14 }}>This is a starting draft. Please have it reviewed by a qualified data protection professional before launch.</p>
          <p><a href="/">← Back to home</a></p>
        </article>
      </main>
      <Footer />
    </>
  );
}
