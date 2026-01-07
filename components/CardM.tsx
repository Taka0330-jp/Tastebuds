import { ArticleH3 } from "./typography/ArticleH3";
import { BodySm } from "./typography/BodySm";
import { CtaPrimary } from "./typography/CtaPrimary";

import { PostCard } from "@/lib/posts";
import Image from "next/image";

type Props = {
    posts?: PostCard;
};

export default function BlogCard({ posts }: Props) {
    const title = posts?.title ?? "Card Heading title";
    const excerpt = posts?.excerpt ?? "Excerpt texts";
    const tags = Array.isArray(posts?.tags)
        ? posts?.tags
        : posts?.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? ["tag"];
    const cover_url = posts?.cover_url ?? null;
    const cover_image_alt = posts?.cover_image_alt ?? null;
    const date = posts?.published_at ?? "2025-01-01";
    const location = posts?.location ?? "Location";


    return (
        <article className="group border border-white flex flex-col p-1">
            {/* Thumbnail */}
            <div className="relative w-full h-80 overflow-hidden bg-amber-200">
                {cover_url && (
                    <Image
                        src={cover_url}
                        alt={cover_image_alt ?? title}
                        width={1200}
                        height={800}
                        className="h-full w-full object-cover"
                    />
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0
                          bg-[linear-gradient(to_bottom,var(--yellow-500-050),var(--black-050))]
                          opacity-0
                          transition-opacity duration-300
                          group-hover:opacity-100 flex flex-col justify-between p-2">

                    {/* Arrow */}
                    <div className="flex flex-row-reverse">
                        <Image
                            src="/images/icons/ArrowIcon.svg"
                            alt="Arrow icon"
                            width={48}
                            height={48}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <CtaPrimary key={tag} className="border border-white text-text-inverse px-2 rounded-2xl">
                                {tag}
                            </CtaPrimary>
                        ))}

                        <BodySm className="text-text-inverse">{excerpt}</BodySm>
                    </div>

                </div>
            </div>

            {/* TextBox */}
            <div className="flex flex-col h-56 p-2">
                {/* Title */}
                <ArticleH3 as="h4" className="text-heading-primary group-hover:underline underline-offset-2">
                    {title}
                </ArticleH3>

                {/* Date&Location */}
                <div className="flex justify-end text-text-inverse mt-auto">
                    <div className="text-right">
                        <BodySm>
                            {date}
                        </BodySm>
                        <BodySm>
                            {location}
                        </BodySm>
                    </div>
                </div>
            </div>


        </article>
    )
}
