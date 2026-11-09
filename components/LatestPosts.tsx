import { getPosts } from "@/lib/blog";
import { Reveal, BtnArrow } from "./ui";
import Eyebrow from "./Eyebrow";
import PostCard from "./PostCard";

/** Home page teaser: the three most recent blog posts. */
export default async function LatestPosts() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="activities" className="section mist" aria-labelledby="activities-title">
      <div className="wrap">
        <div className="sec-head split">
          <Reveal><div style={{ display: "grid", gap: 18 }}>
            <Eyebrow>From our work</Eyebrow>
            <h2 className="h2" id="activities-title">Latest activities and news</h2>
          </div></Reveal>
          <Reveal delay={0.1}><p className="lede">Outreach days, awareness talks and community events: see what we have been doing across Nasarawa State.</p></Reveal>
        </div>
        <div className="post-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} style={{ height: "100%" }}><PostCard post={p} /></Reveal>
          ))}
        </div>
        <Reveal>
          <div className="blog-more"><a className="btn btn-forest" href="/blog">See all activities <BtnArrow /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
