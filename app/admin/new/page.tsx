"use client";

import { createPost } from "@/lib/posts/createPost"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { uploadPostImage } from "@/lib/supabase/uploadPostImage";

// Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { ArrowDown, ArrowUp, Image as ImageIcon, Text, Trash2, X } from "lucide-react";

//Type
type TextBlock = { id: string; type: "text"; text: string };
type ImageBlock = {
    id: string;
    type: "image";
    url: string;
    alt: string;
    caption: string;
};
type Block = TextBlock | ImageBlock;

function moveItem<T>(arr: T[], from: number, to: number) {
    if (to < 0 || to >= arr.length) return arr;
    const copy = [...arr];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
}

const STORAGE_BUCKET = "blog-images";

function buildPublicImageUrl(path: string) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return "";
    return `${base}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}


// Auto save

const DRAFT_STORAGE_KEY = "admin_new_post_draft_v1";

type DraftPlayLoad = {
    title: string;
    slug: string;
    excerpt: string;
    postDate: string;
    location: string;
    author: string;
    tags: string[];
    coverImageUrl: string;
    coverImageAlt: string;
    coverImageCaption: string;
    blocks: Block[];
    updatedAt: number;
};

function safeParseDraft(raw: string | null): DraftPlayLoad | null {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as Partial<DraftPlayLoad>;
        if (!parsed || typeof parsed !== "object") return null;

        const blocks = Array.isArray(parsed.blocks) ? (parsed.blocks as Block[]) : null;
        if (!blocks || blocks.length === 0)
            return null;

        return {
            title: typeof parsed.title === "string" ? parsed.title : "",
            slug: typeof parsed.slug === "string" ? parsed.slug : "",
            excerpt: typeof parsed.excerpt === "string" ? parsed.excerpt : "",
            postDate: typeof parsed.postDate === "string" ? parsed.postDate : "",
            location: typeof parsed.location === "string" ? parsed.location : "",
            author: typeof parsed.author === "string" ? parsed.author : "",
            tags: Array.isArray(parsed.tags) ? (parsed.tags as string[]) : [],
            coverImageUrl: typeof parsed.coverImageUrl === "string" ? parsed.coverImageUrl : "",
            coverImageAlt: typeof parsed.coverImageAlt === "string" ? parsed.coverImageAlt : "",
            coverImageCaption: typeof parsed.coverImageCaption === "string" ? parsed.coverImageCaption : "",
            blocks,
            updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        };
    } catch {
        return null;
    }
}

export default function AdminNewPostPage() {

    const autosaveTimerRef = useRef<number | null>(null);
    const didHydrateDraftRef = useRef(false);


    // Post meta
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");

    // Date, location, tags
    const [postDate, setPostDate] = useState(""); // date string
    const [location, setLocation] = useState("");
    const [author, setAuthor] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);


    // Cover image
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [coverImageAlt, setCoverImageAlt] = useState("");
    const [coverImageCaption, setCoverImageCaption] = useState("");
    const [coverUploading, setCoverUploading] = useState(false);


    // Blocks
    const [blocks, setBlocks] = useState<Block[]>([
        { id: crypto.randomUUID(), type: "text", text: "" },
    ]);

    // UI states
    const [pageError, setPageError] = useState<string | null>(null);
    const [uploadingIds, setUploadingIds] = useState<Record<string, boolean>>({});

    const canMoveUpDown = () => blocks.length > 1;

    // Load draft once on mount
    useEffect(() => {
        const draft = safeParseDraft(localStorage.getItem(DRAFT_STORAGE_KEY));
        if (!draft) {
            didHydrateDraftRef.current = true;
            return;
        }

        setTitle(draft.title);
        setSlug(draft.slug);
        setExcerpt(draft.excerpt);
        setPostDate(draft.postDate);
        setLocation(draft.location);
        setAuthor(draft.author);
        setTags(draft.tags);
        setCoverImageUrl(draft.coverImageUrl);
        setCoverImageAlt(draft.coverImageAlt);
        setCoverImageCaption(draft.coverImageCaption);
        setBlocks(draft.blocks);

        didHydrateDraftRef.current = true;
    }, []);

    // Debounced autosave to localStorage whenever editor state changes

    useEffect(() => {
        // Avoid saving the initial empty state before we attempt hydration.
        if (!didHydrateDraftRef.current) return;
        if (autosaveTimerRef.current) {
            window.clearTimeout(autosaveTimerRef.current);
        }

        autosaveTimerRef.current = window.setTimeout(() => {
            const playLoad: DraftPlayLoad = {
                title,
                slug,
                excerpt,
                postDate,
                location,
                author,
                tags,
                coverImageUrl,
                coverImageAlt,
                coverImageCaption,
                blocks,
                updatedAt: Date.now(),
            };

            try {
                localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(playLoad));
            } catch (e) {
                console.warn("Autosave failed", e);
            }
        }, 500);
        return () => {
            if (autosaveTimerRef.current) {
                window.clearTimeout(autosaveTimerRef.current);
            }
        };
    }, [
        title,
        slug,
        excerpt,
        postDate,
        location,
        author,
        tags,
        coverImageUrl,
        coverImageAlt,
        coverImageCaption,
        blocks,
    ]);

    const addTextBlock = () => {
        setBlocks((prev) => [...prev, { id: crypto.randomUUID(), type: "text", text: "" }]);
    };

    const addImageBlock = () => {
        setBlocks((prev) => [
            ...prev,
            { id: crypto.randomUUID(), type: "image", url: "", alt: "", caption: "" },
        ]);
    };

    const deleteBlock = (id: string) => {
        setBlocks((prev) => prev.filter((b) => b.id !== id));
    };

    const moveBlock = (from: number, to: number) => {
        setBlocks((prev) => moveItem(prev, from, to));
    };

    const updateBlock = (index: number, next: Block) => {
        setBlocks((prev) => {
            const copy = [...prev];
            copy[index] = next;
            return copy;
        });
    };

    const handleImagePick = async (index: number, file: File) => {
        setPageError(null);
        const block = blocks[index];
        if (!block || block.type !== "image") return;

        setUploadingIds((prev) => ({ ...prev, [block.id]: true }));

        try {
            const url = await uploadPostImage(file);
            updateBlock(index, { ...block, url });
        } catch (e: unknown) {
            setPageError(e instanceof Error ? e.message : "Image upload failed.");
        } finally {
            setUploadingIds((prev) => ({ ...prev, [block.id]: false }));
        }
    };

    const handleCoverImagePick = async (file: File) => {
        setPageError(null);
        setCoverUploading(true);
        try {
            const url = await uploadPostImage(file);
            setCoverImageUrl(url);
        } catch (e: unknown) {
            setPageError(e instanceof Error ? e.message : "Cover image upload failed.");
        } finally {
            setCoverUploading(false);
        }
    };

    // Tags helpers
    const normalizeTag = (raw: string) => raw.trim().replace(/\s+/g, " ");

    const addTag = (raw: string) => {
        const t = normalizeTag(raw);
        if (!t) return;

        setTags((prev) => {
            const exists = prev.some((x) => x.toLowerCase() === t.toLowerCase());
            if (exists) return prev;
            return [...prev, t];
        });
    };

    const removeTag = (t: string) => {
        setTags((prev) => prev.filter((x) => x !== t));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (!tagInput.trim()) return;
            addTag(tagInput);
            setTagInput("");
        }
        if (e.key === "Backspace" && !tagInput && tags.length > 0) {
            // quick remove last tag when input empty
            removeTag(tags[tags.length - 1]);
        }
    };

    const handleSave = async () => {
        setPageError(null);

        if (!title.trim()) {
            setPageError("Title is required.");
            return;
        }
        if (!slug.trim()) {
            setPageError("Slug is required.");
            return;
        }

        try {
            const postId = await createPost({
                title,
                slug,
                excerpt,
                postDate,
                location,
                author,
                tags,
                coverImageUrl,
                coverImageAlt,
                coverImageCaption,
                blocks: blocks.map((b) =>
                    b.type === "text"
                        ? { type: "text", text: b.text }
                        : {
                            type: "image",
                            url: b.url,
                            alt: b.alt,
                            caption: b.caption,
                        }
                ),
            });

            console.log("Created post:", postId);
            localStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch (e) {
            setPageError(e instanceof Error ? e.message : "Save failed.");
        }
    };

    return (
        <main className="bg-[#a9a9a9]">
            <section className="mt-8 mx-auto w-full max-w-6xl px-6 py-12">
                {/* Top bar */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-black">New Post</h1>
                        <p className="mt-1 text-sm text-black/70">
                            Add text and image blocks and arrange them in any order.
                        </p>
                    </div>
                </div>

                {pageError && <p className="mt-4 text-sm text-red-500">{pageError}</p>}

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left: Main editor */}
                    <Card className="lg:col-span-2 rounded-2xl bg-white">
                        <CardHeader>
                            <CardTitle>Editor</CardTitle>
                            <CardDescription>Build your post with blocks.</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Best Dumplings in Vancouver"
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="best-dumplings-vancouver"
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Short summary for cards and SEO..."
                                    className="min-h-[90px]"
                                />
                            </div>

                            <Separator />

                            {/* Block actions */}
                            <div className="text-sm font-semibold text-black">Content Blocks</div>

                            {/* Blocks list */}
                            <div className="space-y-4">
                                {blocks.map((block, index) => {
                                    const isUploading = uploadingIds[block.id] === true;

                                    return (
                                        <Card key={block.id} className="rounded-2xl bg-gray-100">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="space-y-1">
                                                        <CardTitle className="text-base">
                                                            {block.type === "text" ? "Text Block" : "Image Block"}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {block.type === "text"
                                                                ? "Write a paragraph or a section."
                                                                : "Upload an image and add caption."}
                                                        </CardDescription>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => moveBlock(index, index - 1)}
                                                            disabled={!canMoveUpDown || index === 0}
                                                            aria-label="Move up"
                                                        >
                                                            <ArrowUp className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => moveBlock(index, index + 1)}
                                                            disabled={!canMoveUpDown || index === blocks.length - 1}
                                                            aria-label="Move down"
                                                        >
                                                            <ArrowDown className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => deleteBlock(block.id)}
                                                            aria-label="Delete block"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                {block.type === "text" ? (
                                                    <div className="space-y-2">
                                                        <Label>Text</Label>
                                                        <Textarea
                                                            value={block.text}
                                                            onChange={(e) =>
                                                                updateBlock(index, { ...block, text: e.target.value })
                                                            }
                                                            placeholder="Write text..."
                                                            className="min-h-[160px]"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="space-y-2">
                                                            <Label>Image</Label>

                                                            {block.url ? (
                                                                <div className="space-y-3">
                                                                    {buildPublicImageUrl(block.url) ? (
                                                                        <img
                                                                            src={buildPublicImageUrl(block.url)}
                                                                            alt={block.alt || block.caption || ""}
                                                                            className="w-full rounded-xl border"
                                                                        />
                                                                    ) : (
                                                                        <div className="rounded-xl border p-4 text-sm text-black/70">
                                                                            Image path saved, preview unavailable.
                                                                        </div>
                                                                    )}
                                                                    <div className="text-xs text-black/60 break-all">{block.url}</div>
                                                                </div>
                                                            ) : (
                                                                <div className="rounded-xl border p-4 text-sm text-black/70">
                                                                    No image yet. Upload one below.
                                                                </div>
                                                            )}

                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                disabled={isUploading}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (!file) return;
                                                                    void handleImagePick(index, file);
                                                                    e.currentTarget.value = "";
                                                                }}
                                                            />
                                                            {isUploading && <p className="text-xs text-black/60">Uploading...</p>}
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <Label>Alt</Label>
                                                                <Input
                                                                    value={block.alt}
                                                                    onChange={(e) =>
                                                                        updateBlock(index, { ...block, alt: e.target.value })
                                                                    }
                                                                    placeholder="Short description for accessibility"
                                                                />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Caption</Label>
                                                                <Input
                                                                    value={block.caption}
                                                                    onChange={(e) =>
                                                                        updateBlock(index, { ...block, caption: e.target.value })
                                                                    }
                                                                    placeholder="Optional caption"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                            <div className="flex flex-wrap flex-row-reverse gap-2">
                                <Button className="cursor-pointer" type="button" variant="outline" onClick={addTextBlock}>
                                    <Text className="mr-2 h-4 w-4" />
                                    Add Text
                                </Button>
                                <Button className="cursor-pointer" type="button" variant="outline" onClick={addImageBlock}>
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Add Image
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Meta / Settings */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <Card className="rounded-2xl bg-white">
                            <CardHeader>
                                <CardTitle>Cover Image</CardTitle>
                                <CardDescription>Thumbnail for post cards and share previews.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {coverImageUrl ? (
                                    <div className="space-y-3">
                                        {buildPublicImageUrl(coverImageUrl) ? (
                                            <img
                                                src={buildPublicImageUrl(coverImageUrl)}
                                                alt={coverImageAlt || coverImageCaption || ""}
                                                className="w-full rounded-xl border"
                                            />
                                        ) : (
                                            <div className="rounded-xl border p-4 text-sm text-black/70">
                                                Image path saved, preview unavailable.
                                            </div>
                                        )}
                                        <div className="text-xs text-black/60 break-all">{coverImageUrl}</div>
                                        <div>
                                            <Button type="button" variant="outline" onClick={() => setCoverImageUrl("")}>
                                                Remove cover
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border p-4 text-sm text-black/70">
                                        No cover image yet. Upload one below.
                                    </div>
                                )}

                                <Input
                                    type="file"
                                    accept="image/*"
                                    disabled={coverUploading}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        void handleCoverImagePick(file);
                                        e.currentTarget.value = "";
                                    }}
                                />
                                {coverUploading && <p className="text-xs text-black/60">Uploading...</p>}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Alt</Label>
                                        <Input
                                            value={coverImageAlt}
                                            onChange={(e) => setCoverImageAlt(e.target.value)}
                                            placeholder="Short description for accessibility"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Caption</Label>
                                        <Input
                                            value={coverImageCaption}
                                            onChange={(e) => setCoverImageCaption(e.target.value)}
                                            placeholder="Optional caption"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/*  Date / Location / Tags */}
                        <Card className="rounded-2xl bg-white">
                            <CardHeader>
                                <CardTitle>Post Meta</CardTitle>
                                <CardDescription>Date, location, tags.</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                {/* Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="postDate">Date</Label>
                                    <Input
                                        id="postDate"
                                        type="date"
                                        value={postDate}
                                        onChange={(e) => setPostDate(e.target.value)}
                                    />
                                    <p className="text-xs text-black/60">Optional (leave empty if not needed)</p>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. Richmond, BC"
                                    />
                                </div>

                                {/* Author */}
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="e.g. John Smith"
                                    />
                                </div>

                                <Separator />

                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder="Type a tag and press Enter (or comma)"
                                    />
                                    <p className="text-xs text-black/60">
                                        Enter / comma to add. Backspace on empty input removes the last tag.
                                    </p>

                                    {tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {tags.map((t) => (
                                                <span key={t} className="inline-flex items-center gap-1">
                                                    <Badge variant="secondary" className="rounded-full">
                                                        {t}
                                                    </Badge>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => removeTag(t)}
                                                        aria-label={`Remove tag ${t}`}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>



                        {/* Actions */}
                        <Card className="rounded-2xl bg-white">
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                                <CardDescription>Quick navigation.</CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-wrap gap-3 sm:flex-row">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/admin">Dashboard</Link>
                                </Button>
                                <Button type="button" className="w-full cursor-pointer" onClick={handleSave}>
                                    Submit
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
