import { SHOW_PLACEHOLDERS } from "@/lib/content";
import ScrollProgress from "@/components/ScrollProgress";
import UrgentBar from "@/components/UrgentBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Essence from "@/components/Essence";
import About from "@/components/About";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Families from "@/components/Families";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import LatestPosts from "@/components/LatestPosts";
import Booking from "@/components/Booking";
import Support from "@/components/Support";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <UrgentBar />
      <Nav />
      <main id="top">
        <Hero />
        <Essence />
        <About />
        <Team />
        <Services />
        <Journey />
        <Families />
        <Testimonials />
        <Partners />
        <LatestPosts />
        <Booking />
        <Support />
        <Contact />
      </main>
      <Footer />
      {SHOW_PLACEHOLDERS && <div className="draft" role="note"><i aria-hidden="true" />Draft · placeholders highlighted</div>}
    </>
  );
}
