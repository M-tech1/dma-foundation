# DMA Foundation website

Website for the **Dr. Mohammed Audu Foundation & Rehabilitation Centre** (DMA Foundation),
Adon-Kasa, New Karu, Nasarawa State. Built to the **DMA Foundation Brand Guidelines v1.0 (October 2026)**.

Next.js 15 (App Router) · TypeScript · Framer Motion · self-hosted Montserrat, Open Sans and Playfair Display.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## How it follows the brand guidelines

| Guideline | Where it lives |
| --- | --- |
| 7 · Colour: Forest Green `#1B4332`, Hope Gold `#D4A017`, Healing Teal, Deep Navy, Slate, Mist, White; 60/30/10 balance | tokens at the top of `app/globals.css` |
| 12.1 · Website colour mapping (forest header/hero/footer, gold buttons with navy text, teal links) | `globals.css` |
| 8 · Montserrat headings (sentence case), Open Sans body, Playfair Display Italic only for quotes | `app/layout.tsx`, `globals.css` |
| 6 · Logo: refreshed gold-halo horizontal logo; reversed on dark; badge for favicon | `public/brand/`, `app/icon.png` (extracted from the guide) |
| 9.2 · Graphic elements: arc divider, rising corner, rising-sun arcs | `components/Arcs.tsx` |
| 9.3 · Rounded line icons | `components/Icons.tsx` |
| 4 · Voice: hopeful, person-first, no cures promised | all copy in `lib/content.ts` |
| 5 · Key messages, tagline, calls to action | `lib/content.ts` |
| 12.2 · Services, bookings, payments, floating WhatsApp, privacy notice on forms | `Services`, `Booking`, `Support`, `WhatsAppFloat` |
| 12.3 · Sitemap (Home, About, Services, Approach, For Families, Book, Donate, Contact, Privacy) | sections on `/`, plus `/privacy` |
| 13 · Confidentiality: urgent-help message, anonymised stories, NDPA, minimal data | `UrgentBar`, `Testimonials`, `Booking`, `/privacy` |

## Before launch

1. **Sign-off (guide 14.2):** mission, vision and tagline are the guide's DRAFT wording. Confirm with Dr. Mohammed Audu.
2. **Placeholders:** anything in `lib/content.ts` wrapped in `[[double brackets]]` is highlighted on the page. Replace it, then set `SHOW_PLACEHOLDERS = false`. This covers the founder message, testimonials (real, consented and anonymised), cost FAQ, office hours, and donation impact lines.
3. **Photos:** current images are stand-in landscapes from picsum.photos with a forest/gold tint. Replace them with the centre's own photos, following guide 9.1 (warm, natural light, no identifiable clients without written consent). Put them in `/public/images/`, then set `PLACEHOLDER_PHOTOS = false`.
4. **Services list:** confirm the final list (guide 10.2).
5. **Bookings:** `app/api/booking/route.ts` validates and logs. Connect it to secure delivery for the admissions team, e.g. email via Resend, Postmark or SMTP.
6. **Payments:** wire the "Donate online" button to Paystack or Flutterwave once the account exists.
7. **Privacy policy:** `/privacy` is a starting draft. Have it reviewed for NDPA 2023 compliance.
8. **Domain email:** move from Gmail to info@ and admissions@ on the new domain (guide 10.1), then update `contact.email`.
9. **Social links:** set each `href` in `socials` (`lib/content.ts`). A network with an empty `href` is hidden in the footer.
10. **Blog (headless CMS):** `/blog`, `/blog/[slug]` and the home page "Latest activities" section read **Article** nodes from the Drupal CMS at `https://api.dmaimpact.org` via JSON:API (override with the `BLOG_API_URL` env var). New or edited posts appear within about 5 minutes. Editors: the first image is the cover, extra images become the post's photo gallery, a fully bold paragraph becomes a subheading, the optional summary field becomes the card text, and adding Tags switches on the category filter. To move to a different CMS, rewrite only `lib/blog.ts`.

## Animation

Hero headline rises in, the arch photo unveils and drifts, gold rising-sun arcs draw themselves, the WhatsApp card floats, the brand promise lights up word by word on scroll, the recovery journey line draws as you scroll, service cards lift with a gold underline, the FAQ accordion, rotating testimonials, segmented controls with sliding highlights, a scroll progress bar, and a circular mobile menu reveal. Everything respects "reduce motion".
