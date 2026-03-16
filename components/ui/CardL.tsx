"use client";

// Next Image for Thumbnail and Arrow Icon
import Image from "next/image";

// Import Typography
import { ArticleH1 } from "../typography/ArticleH1";
import { BodyLg } from "../typography/BodyLg";
import { CtaPrimary } from "../typography/CtaPrimary";

// Only Import Types form data of post card
import type { PostCard } from "@/lib/posts";

import Link from "next/link";

type Props = {
    posts: PostCard;
};

export default function CardL({ posts }: Props) {

    const tags = Array.isArray(posts.tags)
        ? posts.tags
        : posts.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];

    return (
        <Link
            href={`/blog/${posts.slug}`}

            className="group border h-auto md:h-110 border-white md:flex flex-row-reverse p-1 gap-4 cursor-pointer"
        >
            {/* Thumbnail */}
            <div className="relative w-full ">
                {posts.cover_url ? (
                    <Image
                        src={posts.cover_url}
                        alt={posts.cover_image_alt ?? posts.title}
                        width={1200}
                        height={800}
                        className="h-80 md:h-full w-full object-cover"
                    />
                ) : null}

                {/* Hover Overlay */}
                <div
                    className="absolute inset-0
          bg-[linear-gradient(to_bottom,var(--yellow-500-050),var(--black-050))]
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100 flex flex-col justify-between p-2"
                >
                    {/* Arrow */}
                    <div className="flex flex-row-reverse">
                        <Image
                            src="/images/icons/ArrowIcon.svg"
                            alt="Arrow icon"
                            width={48}
                            height={48}
                        />
                    </div>

                    {/* Tags & Excerpt */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <CtaPrimary
                                asChild
                                key={tag}
                                className="border border-white text-text-inverse px-2 rounded-2xl"
                            >
                                {tag}
                            </CtaPrimary>
                        ))}
                        <BodyLg className="text-text-inverse">{posts.excerpt}</BodyLg>
                    </div>
                </div>
            </div>

            {/* TextBox */}
            <div className="flex flex-col gap-8 p-2 justify-between">
                <ArticleH1 as="h3" className="text-heading-primary group-hover:underline underline-offset-2">
                    {posts.title}
                </ArticleH1>

                <div className="flex justify-end text-text-inverse">
                    <div className="text-right">
                        <BodyLg>{posts.published_at}</BodyLg>
                        <BodyLg>{posts.location}</BodyLg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
