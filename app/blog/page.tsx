import type { Metadata } from "next";
import { site } from "@/lib/content";
import { getCategories, getPosts } from "@/lib/blog";
import ScrollProgress from "@/components/ScrollProgress";
import UrgentBar from "@/components/UrgentBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import BlogList from "@/components/BlogList";
import { RisingArcs } from "@/components/Arcs";

export const metadata: Metadata = {
  title: `Activities & news | ${site.shortName}`,
  description: "Outreach, awareness talks, family workshops and community events from the DMA Foundation in New Karu, Nasarawa State.",
};

export default async function Blog() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <>
      <ScrollProgress />
      <UrgentBar />
      <Nav />
      <main id="top">
        <section className="page-hero dark">
          <RisingArcs className="page-hero-arcs" rings={7} sun={false} opacity={0.4} />
          <div className="wrap">
            <Eyebrow>Activities &amp; news</Eyebrow>
            <h1>Stories from our work in the community</h1>
            <p className="lede">Outreach days, awareness talks, family workshops and events, as we work to restore hope and rebuild lives across Nasarawa State.</p>
          </div>
        </section>
        <section className="section blog-section">
          <div className="wrap"><BlogList posts={posts} categories={categories} /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
