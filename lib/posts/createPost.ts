import { supabaseBrowser } from "@/lib/supabase/client";

type CreatePostInput = {
    title: string;
    slug: string;
    excerpt: string;
    postDate?: string;
    location?: string;
    author?: string;
    tags: string[];
    coverImageUrl?: string;
    coverImageAlt?: string;
    coverImageCaption?: string;
    blocks: {
        type: "text" | "image";
        text?: string;
        url?: string;
        alt?: string;
        caption?: string;
    }[];
};

export async function createPost(input: CreatePostInput) {
    const { data: post, error: postError } = await supabaseBrowser
        .from("posts")
        .insert({
            title: input.title,
            slug: input.slug,
            excerpt: input.excerpt,
            cover_image_path: input.coverImageUrl ?? null,
            cover_image_alt: input.coverImageAlt ?? null,
            tags: input.tags.length > 0 ? input.tags : null,
            author: input.author ?? null,
            location: input.location ?? null,
            published_at: input.postDate || null,
        })
        .select("id")
        .single();

    if (postError) {
        throw new Error(`Failed to create post: ${postError.message}`);
    }

    const postId = post.id;

    const blocksPayload = input.blocks.map((block, index) => ({
        post_id: postId,
        sort_order: index + 1,
        type: block.type,
        text: block.type === "text" ? block.text ?? "" : null,
        image_path: block.type === "image" ? block.url ?? null : null,
        alt: block.type === "image" ? block.alt ?? null : null,
        caption: block.type === "image" ? block.caption ?? null : null,
    }));
    const { error: blocksError } = await supabaseBrowser
        .from("post_blocks")
        .insert(blocksPayload);

    if (blocksError) {
        throw new Error(`Failed to create blocks: ${blocksError.message}`);
    }

    return postId;
}
