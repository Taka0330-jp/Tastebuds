import { supabase } from "@/lib/supabase/server";

export type PostCard = {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    tags: string[] | string | null;
    location: string | null;
    published_at: string | null;
    cover_image_path: string | null;
    cover_image_alt: string | null;
    cover_url: string | null;
};

function buildCoverUrl(path: string | null) {
    if (!path) return null;

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return null;

    return `${base}/storage/v1/object/public/blog-images/${path}`;
}


export async function getRecentPosts(limit = 4): Promise<PostCard[]> {
    const { data, error } = await supabase
        .from("posts")
        .select(
            `
      id,
      slug,
      title,
      excerpt,
      tags,
      location,
      published_at,
      created_at,
      cover_image_path,
      cover_image_alt
      `
        )
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("getRecentPosts error:", error);
        return [];
    }

    return (
        data?.map((post) => ({
            ...post,
            cover_url: buildCoverUrl(post.cover_image_path),
        })) ?? []
    );
}
