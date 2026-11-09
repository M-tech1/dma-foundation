import { formatDate, type PostSummary } from "@/lib/blog";
import { Photo } from "./ui";
import { ArrowRight, Calendar } from "./Icons";

/** Blog post teaser. `featured` renders the wide, side-by-side version. */
export default function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  return (
    <article className={`post-card${featured ? " featured" : ""}`}>
      <a href={`/blog/${post.slug}`} className="post-link" aria-label={post.title} />
      <div className="post-media">
        {post.cover
          ? <Photo src={post.cover.src} alt={post.cover.alt} eager={featured} tint={false}
              sizes={featured ? "(max-width: 960px) 100vw, 680px" : "(max-width: 600px) 100vw, (max-width: 960px) 50vw, 400px"} />
          : <div className="photo" aria-hidden="true" />}
        {post.category && <span className="chip">{post.category}</span>}
      </div>
      <div className="post-body">
        <p className="post-meta"><Calendar size={15} /><time dateTime={post.date}>{formatDate(post.date)}</time><span>· {post.readingMinutes} min read</span></p>
        <h3 className={featured ? "h2" : "h3"}>{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <span className="text-link" aria-hidden="true">Read more <ArrowRight size={16} /></span>
      </div>
    </article>
  );
}
