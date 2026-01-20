import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/server";
import { getRecentPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PostRow = {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    tags: string[] | null;
    author: string | null;
    location: string | null;
    published_at: string | null;
    cover_image_path: string | null;
    cover_image_alt: string | null;
};

type BlockRow = {
    id: string;
    post_id: string;
    sort_order: number;
    type: "text" | "image";
    text: string | null;
    image_path: string | null;
    alt: string | null;
    caption: string | null;
};

function buildPublicImageUrl(path: string | null) {
    if (!path) return null;
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return null;

    return `${base}/storage/v1/object/public/blog-images/${path}`;
}

function formatDate(dateStr: string | null) {
    if (!dateStr) return null;
    // Assumes published_at is "YYYY-MM-DD"
    // Adjust here if you want a different display format.
    return dateStr;
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // ① Single post
    const postQuery = supabase
        .from("posts")
        .select(
            `
      id, slug, title, excerpt, tags, author, location,
      published_at, cover_image_path, cover_image_alt
    `
        )
        .eq("slug", slug)
        .maybeSingle<PostRow>();

    // ② Recent posts for the right sidebar
    const recentQuery = getRecentPosts(4);

    const [{ data: post, error: postError }, recentPosts] = await Promise.all([
        postQuery,
        recentQuery,
    ]);

    if (postError) {
        console.error("post fetch error:", postError);
    }
    if (!post) notFound();

    // ③ Blocks ordered by sort_order for the post_id
    const { data: blocks, error: blocksError } = await supabase
        .from("post_blocks")
        .select(
            `
      id, post_id, sort_order, type,
      text, image_path, alt, caption
    `
        )
        .eq("post_id", post.id)
        .order("sort_order", { ascending: true })
        .returns<BlockRow[]>();

    if (blocksError) console.error("blocks fetch error:", blocksError);

    const metaDate = formatDate(post.published_at);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-10">
            {/* Header: title + meta */}
            <header className="mb-6 mt-16">
                <h1 className="text-3xl font-extrabold leading-tight">
                    {post.title}
                </h1>

                <div className="mt-2 flex items-center justify-end text-sm text-black/60">
                    <span>
                        {(post.author ?? "Unknown")}
                        {metaDate ? ` ・ ${metaDate}` : ""}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Left: content */}
                <article className="lg:col-span-8">

                    {/* Block renderer */}
                    <div className="space-y-8">
                        {(blocks ?? []).map((b) => {
                            if (b.type === "text") {
                                return (
                                    <section key={b.id} className="space-y-3">
                                        <p className="whitespace-pre-wrap leading-7 text-black/85">
                                            {b.text ?? ""}
                                        </p>
                                    </section>
                                );
                            }

                            // Image block
                            const url = buildPublicImageUrl(b.image_path);
                            if (!url) return null;

                            return (
                                <figure key={b.id} className="space-y-3">
                                    <Image
                                        src={url}
                                        alt={b.alt ?? b.caption ?? ""}
                                        width={1400}
                                        height={900}
                                        className="h-auto w-full rounded-md object-cover"
                                    />
                                    {b.caption && (
                                        <figcaption className="text-sm text-black/60">
                                            {b.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        })}
                    </div>
                </article>

                {/* Right: Recent Posts (sticky) */}
                <aside className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24">
                        <h2 className="text-sm font-semibold tracking-wide text-black/80">
                            Recent Posts
                        </h2>

                        <ul className="mt-4 space-y-3 text-sm">
                            {recentPosts
                                .filter((p) => p.slug !== post.slug)
                                .slice(0, 4)
                                .map((p) => (
                                    <li key={p.id}>
                                        <Link
                                            href={`/blog/${p.slug}`}
                                            className="block text-black/75 hover:text-black hover:underline underline-offset-4"
                                        >
                                            {p.title}
                                        </Link>
                                        {p.location && (
                                            <div className="mt-1 text-xs text-black/50">
                                                {p.location}
                                            </div>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    );
}
