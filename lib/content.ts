/**
 * All site copy and images, written to the DMA Foundation Brand Guidelines v1.0 (October 2026).
 *
 * Text wrapped in [[double brackets]] is PLACEHOLDER content still to be
 * confirmed by the foundation. It is highlighted on the page while
 * SHOW_PLACEHOLDERS is true. Set it to false before launch.
 *
 * Mission, vision and tagline are the guide's DRAFT wording and need sign-off
 * from Dr. Mohammed Audu before launch (Brand Guidelines, section 14.2).
 *
 * Language rules (section 4): person-first, hopeful, never fear-based, no
 * promises of cures. Images (section 9): warm, natural, never identifiable
 * clients without written consent.
 */
export const SHOW_PLACEHOLDERS = true;
export const PLACEHOLDER_PHOTOS = true;

/** Stand-in nature/landscape photos until the centre's own consented photos arrive. */
const ph = (id: number, w = 1200, h = 900) => `https://picsum.photos/id/${id}/${w}/${h}`;

export const site = {
  shortName: "DMA Foundation",
  fullName: "Dr. Mohammed Audu Foundation & Rehabilitation Centre",
  tagline: "Hope Restored. Lives Rebuilt.",
  description:
    "Evidence-based prevention, treatment and recovery for substance use and mental health in New Karu, Nasarawa State. Confidential help is one call away.",
  registration: "CAC REG. 8852308",
};

export const contact = {
  address: "Adon-Kasa, New Karu, Nasarawa State, Nigeria",
  phoneDisplay: "0913 125 2197",
  phoneIntl: "+2349131252197",
  whatsapp: "https://wa.me/2349131252197?text=" + encodeURIComponent("Hello DMA Foundation, I would like to speak with someone confidentially."),
  email: "dmafoundation01@gmail.com",
  hours: "[[Mon – Sat, 8am – 6pm · WhatsApp replies within 24 hours]]",
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adon-Kasa, New Karu, Nasarawa State, Nigeria"),
};

/** Rooted at "/" so the links also work from /blog and /privacy. */
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Our approach", href: "/#approach" },
  { label: "For families", href: "/#families" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Rehabilitation & mental health care · New Karu",
  titleLead: "Hope restored.",
  titleAccent: "Lives rebuilt.",
  lede:
    "We help people overcome substance use and mental health challenges through evidence-based prevention, treatment and recovery care, and we support their families every step of the way.",
  image: "/images/hero-family.png",
  imageAlt: "A smiling young man with arms open wide, surrounded by his supportive family at sunrise",
  assurances: ["Completely confidential", "Evidence-based care", "Family support"],
};

export const essence = [
  { title: "Hope is restored", text: "We believe in every person's future." },
  { title: "Dignity is protected", text: "Respect comes before everything." },
  { title: "Healing begins", text: "Professional care starts the journey." },
  { title: "Lives are rebuilt", text: "Recovery leads to a fuller life." },
];

export const about = {
  eyebrow: "Who we are",
  promise:
    "More than treatment: hope, professional support, dignity, recovery and a pathway to a better life.",
  intro:
    "The Dr. Mohammed Audu Foundation is a mental health and rehabilitation nonprofit working in underserved areas of Nigeria, with a deep passion for healing and community care.",
  positioning:
    "For individuals and families in Nasarawa State and beyond, we combine evidence-based professional care with genuine compassion and dignity. Unlike facilities that focus on treatment alone, we provide a complete pathway, from prevention and treatment to long-term recovery and reintegration, at a fair, accessible price.",
  mission:
    "To restore lives through mental health care, addiction rehabilitation, and medical outreach, driven by compassion and professionalism. Reaching the under-reached and restoring dignity to the underserved.",
  vision:
    "A society where every person has access to mental wellness, support systems, and a chance to heal and grow, regardless of status or location.",
  image: "/brand/CEO.png",
  imageAlt: "Dr. Mohammed Audu, founder of the DMA Foundation",
  founder: {
    name: "Dr. Mohammed Audu",
    role: "Founder",
    message:
      "[[No one is defined by their condition. Every person who walks through our doors deserves to be met with respect, professional care and the belief that recovery is possible.]]",
    initials: "MA",
    photo: "/brand/CEO.png",
  },
};

export const values = [
  { title: "Hope", text: "We believe recovery is possible for every person." },
  { title: "Dignity", text: "No one is defined by their condition." },
  { title: "Evidence", text: "Our care is grounded in proven practice." },
  { title: "Compassion", text: "We meet people and families with patience." },
  { title: "Confidentiality", text: "Privacy is sacred in our work." },
  { title: "Accessibility", text: "Quality care at a fair, mid-range price." },
];

/**
 * Team members. Without a `photo` a branded placeholder is shown. Add consented
 * staff photos to /public/images/team/ and set `photo: "/images/team/<file>.jpg"`.
 * Names, roles and bios in [[brackets]] are placeholders to confirm with the foundation.
 */
export type TeamMember = { name: string; role: string; bio?: string; photo?: string };

export const team: { title: string; lede: string; members: TeamMember[] } = {
  title: "The people guiding our work",
  lede: "Our founder and board of trustees bring leadership, public service and community experience to one shared belief: every person deserves dignity, professional care and a real chance to recover.",
  members: [
    { name: "Dr. Mohammed Audu", role: "Founder", photo: "/brand/CEO.png" },
    { name: "HRH Esu Pharm. Luka Baba Panya", role: "Chairman", photo: "/images/team/luka-baba-panya.jpg" },
    { name: "H.E. Amb. Francisco Edu Mangue", role: "Vice Chairman", photo: "/images/team/francisco-edu-mangue.jpg" },
    { name: "Engr. Yakubu Audu Akor", role: "Trustee", photo: "/images/team/yakubu-audu-akor.jpg" },
    { name: "Mrs. Ronke Obanaiye-Audu", role: "Trustee", photo: "/images/team/ronke-obanaiye-audu.jpg" },
    { name: "Mr. Ibrahim Isiaka", role: "Trustee", photo: "/images/team/ibrahim-isiaka.jpg" },
    { name: "Dr. Saadatu Adamu", role: "Trustee", photo: "/images/team/saadatu-adamu.jpg" },
    { name: "Dr. Kassim Mohammed", role: "Acting Country Rep", photo: "/images/team/kassim-mohammed.jpg" },
  ],
};

export type ServiceIcon = "prevention" | "assessment" | "treatment" | "counselling" | "family" | "aftercare";

/** Confirm the final service list with the foundation (Brand Guidelines 10.2). */
export const services: { icon: ServiceIcon; title: string; text: string }[] = [
  { icon: "prevention", title: "Prevention & education", text: "Awareness talks for schools, faith groups and communities, so young people and families can spot the signs early." },
  { icon: "assessment", title: "Confidential assessment", text: "A private conversation with a trained professional to understand what is happening and agree the right next step." },
  { icon: "treatment", title: "Treatment & detox support", text: "Medically supervised care for people with substance use disorders, delivered safely and with dignity." },
  { icon: "counselling", title: "Counselling & therapy", text: "One-to-one and group sessions that build coping skills and support lasting mental wellness." },
  { icon: "family", title: "Family support", text: "Guidance and family therapy so loved ones understand recovery and know how to help." },
  { icon: "aftercare", title: "Aftercare & reintegration", text: "Follow-up, relapse-prevention planning and help returning to work, school and community life." },
];

export const reasons = [
  "Recovery is possible, and it starts with one conversation.",
  "Our care is evidence-based and delivered by trained professionals.",
  "Every person is treated with dignity and complete confidentiality.",
  "We support the whole family, not just the individual.",
  "Quality care at a fair, accessible price.",
  "Prevention and education protect our communities and young people.",
];

export const journey = [
  { title: "Reach out", text: "Call, send a WhatsApp message or book online. Everything you share is confidential." },
  { title: "Assessment", text: "A trained professional listens and builds a care plan around the person, not the condition." },
  { title: "Treatment", text: "Evidence-based care, from detox support to counselling, at a pace that is safe and sustainable." },
  { title: "Recovery", text: "Therapy, family sessions and life skills that strengthen recovery day by day." },
  { title: "Reintegration", text: "Aftercare and ongoing support as people return to work, school, family and community." },
];

export const families = {
  title: "You don't have to carry this alone",
  lede: "We'll guide your family through every step. If you are worried about someone you love, these are some signs that it may be time to talk.",
  signs: [
    "Changes in sleep, appetite or energy",
    "Pulling away from family and friends",
    "Falling behind at school or work",
    "Sudden mood swings, anxiety or low mood",
    "Money or valuables going missing",
    "Losing interest in things they used to enjoy",
  ],
  faqs: [
    {
      q: "Is everything I share kept confidential?",
      a: "Yes. Privacy is sacred in our work. We never share information that could identify you or your loved one without written consent, and we handle all records in line with the Nigeria Data Protection Act (NDPA) 2023.",
    },
    {
      q: "What happens at the first assessment?",
      a: "You meet privately with a trained professional who asks about health, history and what support is needed. Together you agree a care plan and the next steps. There is no judgement and no pressure.",
    },
    {
      q: "My loved one doesn't want help. What can I do?",
      a: "You can still talk to us. We guide families on how to start the conversation, how to look after themselves, and what options exist when someone is not yet ready.",
    },
    {
      q: "How much does care cost?",
      a: "[[We offer quality care at a fair, mid-range price and explain all costs clearly before anything begins. Ask us about payment plans and support options.]]",
    },
    {
      q: "Can family members visit and take part?",
      a: "[[Yes. Family involvement is part of how we work, through family therapy, scheduled visits and guidance sessions.]]",
    },
  ],
};

export const testimonials = [
  {
    quote: "[[I came in ashamed and expecting judgement. Instead I was treated like a person. Today I am back at work and my children have their father again.]]",
    name: "[[Ibrahim, 34]]",
    role: "[[In recovery]]",
  },
  {
    quote: "[[They didn't just help my son. They taught our whole family how to support him without losing ourselves.]]",
    name: "[[A mother from Mararaba]]",
    role: "[[Family member]]",
  },
  {
    quote: "[[The counsellors were patient with me on my hardest days. I finally understand what I am living with, and I am managing it.]]",
    name: "[[Grace, 27]]",
    role: "[[Former client]]",
  },
];

/** Background for the booking band. */
export const bookingImage = ph(1016, 1600, 1000);

export const booking = {
  title: "Book a confidential assessment",
  lede: "Tell us how to reach you and when suits you. A member of our team will call or message you privately to confirm.",
  who: ["For myself", "For a loved one"],
  contactBy: ["Phone call", "WhatsApp", "Email"],
  times: ["Morning (8am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 6pm)"],
  privacy:
    "We only ask for what we need to contact you. Your details are kept private, never shared, and handled in line with the NDPA 2023.",
};

/** Donors pick what their gift supports (no fixed amounts). `note` is the suggested
    transfer narration, so the team can match each transfer to a cause. */
export type DonationIcon = "heart" | "megaphone" | "chat" | "users";

export const donation = {
  causes: [
    { icon: "heart" as DonationIcon, label: "Where most needed", note: "DMA - General", impact: "Lets us direct your gift to whatever will help most right now, from treatment places to outreach." },
    { icon: "megaphone" as DonationIcon, label: "Prevention", note: "DMA - Prevention", impact: "Helps run awareness talks in schools, faith groups and communities, so young people and families spot the signs early." },
    { icon: "chat" as DonationIcon, label: "Counselling & treatment", note: "DMA - Treatment", impact: "Helps someone who cannot afford care begin counselling or treatment, with dignity and confidentiality." },
    { icon: "users" as DonationIcon, label: "Family support", note: "DMA - Family", impact: "Funds family sessions and guidance, so a household can understand recovery and heal together." },
  ],
  bank: {
    bank: "Polaris Bank",
    accountName: "Dr. Mohammed Audu Foundation",
    accountNumber: "4029157074",
  },
};

// Leave href empty ("") to hide a network until its account is ready.
export const socials = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61561402993401" },
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dr-mohammed-audu-foundation/" },
];

/* Our Partners slideshow. Put each logo in public/partners/ using the file name below
   (PNG or SVG with a transparent background works best). Until a file exists, the card
   shows the short name as a monogram. */
export const partners = [
  { short: "NDLEA", name: "National Drug Law Enforcement Agency", logo: "/partners/ndlea.png" },
  { short: "EFCC", name: "Economic and Financial Crimes Commission", logo: "/partners/efcc.jpg" },
  { short: "CAN", name: "Christian Association of Nigeria", logo: "/partners/can.jpg" },
  { short: "FMoH", name: "Federal Ministry of Health and Social Welfare", logo: "/partners/ministry-of-health.jpg" },
  { short: "NAPTIP", name: "National Agency for the Prohibition of Trafficking in Persons", logo: "/partners/naptip.jpg" },
  { short: "MitCrux", name: "MitCrux Limited", logo: "/partners/mitcrux.png" },
];
