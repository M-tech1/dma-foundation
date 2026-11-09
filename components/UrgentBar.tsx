import { contact } from "@/lib/content";

/** Urgent-help message (Brand Guidelines 13, rule 07). */
export default function UrgentBar() {
  return (
    <div className="urgent" role="region" aria-label="Urgent help">
      <div className="wrap">
        <span><b>Need help now?</b> Call or WhatsApp <a href={`tel:${contact.phoneIntl}`}>{contact.phoneDisplay}</a></span>
        <span>If someone is in immediate danger, call <a href="tel:112">112</a> or go to the nearest hospital emergency unit.</span>
      </div>
    </div>
  );
}
