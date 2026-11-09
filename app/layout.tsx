import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/open-sans/standard-italic.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/600-italic.css";
import "./globals.css";
import { SHOW_PLACEHOLDERS, site } from "@/lib/content";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: `${site.shortName} | ${site.tagline}`,
  description: site.description,
  openGraph: { title: `${site.shortName} | ${site.tagline}`, description: site.description, type: "website", locale: "en_NG" },
};

export const viewport: Viewport = { themeColor: "#1B4332", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={SHOW_PLACEHOLDERS ? "show-ph" : undefined}>
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
