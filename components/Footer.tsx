import { nav, site, socials, contact } from "@/lib/content";
import { T, BtnArrow } from "./ui";
import { SocialIcon, WhatsApp } from "./Icons";
import { RisingArcs } from "./Arcs";

export default function Footer() {
  return (
    <footer>
      <RisingArcs className="foot-arcs" rings={7} sun={false} opacity={0.45} />
      <div className="wrap">
        <div className="foot-top">
          <p className="foot-tag">Hope restored. <span>Lives rebuilt.</span></p>
          <div className="row">
            <a className="btn btn-gold" href="/#book">Book an assessment <BtnArrow /></a>
            <a className="btn btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} /> Chat on WhatsApp</a>
          </div>
        </div>
        <div className="foot-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="foot-logo" src="/brand/dma-logo-reversed.png" alt="Dr. Mohammed Audu Foundation" width={589} height={180} />
            <p>Evidence-based prevention, treatment and recovery for substance use and mental health, in New Karu, Nasarawa State.</p>
            <div className="socials">
              {socials.filter((s) => s.href && s.href !== "#").map((s) => <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"><SocialIcon label={s.label} /></a>)}
            </div>
            <p className="hashtags">#RecoveryIsPossible #HopeRestored</p>
          </div>
          <div><h4>Explore</h4><ul>{nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul></div>
          <div><h4>Get help</h4><ul><li><a href="/#book">Book an assessment</a></li><li><a href="/#families">For families</a></li><li><a href="/#support">Support our work</a></li><li><a href="/privacy">Privacy policy</a></li></ul></div>
          <div>
            <h4>Reach us</h4>
            <ul>
              <li>{contact.address}</li>
              <li><a href={`tel:${contact.phoneIntl}`}>WhatsApp / Tel: {contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} {site.fullName}. <T>{site.registration}</T></span>
          <span><a href="/privacy">Privacy policy</a> · Client data handled in line with the NDPA 2023</span>
        </div>
      </div>
    </footer>
  );
}
