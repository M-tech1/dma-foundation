import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { site, contact } from "@/lib/content";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import ScrollProgress from "@/components/ScrollProgress";
import UrgentBar from "@/components/UrgentBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import ShareButtons from "@/components/ShareButtons";
import { Photo, BtnArrow } from "@/components/ui";
import { ArrowRight, Calendar, WhatsApp } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: `Post not found | ${site.shortName}` };
  return {
    title: `${post.title} | ${site.shortName}`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, images: post.cover ? [post.cover.src] : undefined },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  // Old or hand-typed slugs (e.g. after a title edit) resolve by node id; send them to the current URL.
  if (slug !== post.slug) permanentRedirect(`/blog/${post.slug}`);

  const related = (await getPosts()).filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(!!post.category && b.category === post.category) - Number(!!post.category && a.category === post.category))
    .slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <UrgentBar />
      <Nav />
      <main id="top">
        <article className="article">
          <header className="wrap article-head">
            <a className="text-link back" href="/blog"><ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> All activities</a>
            {post.category && <span className="chip">{post.category}</span>}
            <h1>{post.title}</h1>
            <p className="post-meta"><Calendar size={15} /><time dateTime={post.date}>{formatDate(post.date)}</time><span>· {post.readingMinutes} min read · {post.author}</span></p>
          </header>
          {post.cover && (
            <div className="wrap">
              <Photo src={post.cover.src} alt={post.cover.alt} eager tint={false} className="article-cover" sizes="(max-width: 1240px) 100vw, 1200px" />
            </div>
          )}
          <div className="wrap">
            <div className="article-body">
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              {post.gallery.length > 0 && (
                <section className="gallery" aria-label="Photos from this activity">
                  <h2>Photos</h2>
                  <div className="gallery-grid">
                    {post.gallery.map((img) => (
                      <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" aria-label={`${img.alt} (opens full size)`}>
                        <Photo src={img.src} alt={img.alt} tint={false} sizes="(max-width: 600px) 50vw, 240px" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
              <ShareButtons title={post.title} />
            </div>
          </div>
        </article>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="article-cta dark">
              <div>
                <h2 className="h2">Need to talk to someone?</h2>
                <p className="lede">Confidential help for you or someone you love is one call away.</p>
              </div>
              <div className="row">
                <a className="btn btn-gold" href="/#book">Book an assessment <BtnArrow /></a>
                <a className="btn btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp size={19} /> WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section mist" aria-labelledby="related-title">
            <div className="wrap">
              <h2 className="h2" id="related-title" style={{ marginBottom: 36 }}>More from our work</h2>
              <div className="post-grid">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
