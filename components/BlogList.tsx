"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PostSummary } from "@/lib/blog";
import { Reveal, EASE } from "./ui";
import PostCard from "./PostCard";

/** Featured latest post, category filter, and the post grid. */
export default function BlogList({ posts, categories }: { posts: PostSummary[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("All");
  const [featured, ...rest] = posts;
  const shown = cat === "All" ? rest : posts.filter((p) => p.category === cat);

  if (!featured) return <p className="lede blog-empty">No posts yet. Check back soon for news from our work.</p>;

  return (
    <>
      {cat === "All" && (
        <Reveal y={40}><PostCard post={featured} featured /></Reveal>
      )}

      {categories.length > 0 ? (
        <div className="blog-filter" role="radiogroup" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button key={c} type="button" role="radio" aria-checked={cat === c} className="seg-btn" onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="blog-cat" className="bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              {c}
            </button>
          ))}
        </div>
      ) : rest.length > 0 && <div className="blog-filter-gap" />}

      <motion.div layout className="post-grid" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div key={p.slug} layout
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.06 }}>
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="lede blog-empty">No {cat.toLowerCase()} posts yet.</p>}
    </>
  );
}
