import { ArticleH1 } from "./typography/ArticleH1";
import { BodyLg } from "./typography/BodyLg";
// import { CtaSecondary } from "./typography/CtaSecondary";
import { CtaPrimary } from "./typography/CtaPrimary";
import { PostCard } from "@/lib/posts";
import Image from "next/image";

type Props = {
    posts: PostCard;
};

export default function cardL({ posts }: Props) {
    const tags = Array.isArray(posts.tags)
        ? posts.tags
        : posts.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
    return (
        <>
            <article className="group border border-white md:flex flex-row-reverse p-1 gap-4">
                {/* Thumbnail */}
                <div className="relative w-full h-80">
                    {posts.cover_url && (
                        <Image
                            src={posts.cover_url}
                            alt={posts.cover_image_alt ?? posts.title}
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
                        {/* Tags&Excerpt */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <CtaPrimary key={tag} className="border border-white text-text-inverse px-2 rounded-2xl">
                                    {tag}
                                </CtaPrimary>
                            ))}
                            <BodyLg className="text-text-inverse">{posts.excerpt}</BodyLg>
                        </div>

                    </div>
                </div>



                {/* TextBox */}
                <div className="flex flex-col gap-8 p-2 justify-between">

                    {/* Title */}
                    <ArticleH1 as="h3" className="text-heading-primary group-hover:underline underline-offset-2">
                        {posts.title}
                    </ArticleH1>

                    {/* Date & Location */}
                    <div className="flex justify-end text-text-inverse">
                        <div className="text-right">
                            <BodyLg>{posts.published_at}</BodyLg>
                            <BodyLg>{posts.location}</BodyLg>
                        </div>
                    </div>
                </div>

            </article>
        </>
    )
}
