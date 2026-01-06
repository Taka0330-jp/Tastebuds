import { ArticleH3 } from "./typography/ArticleH3";
import { BodySm } from "./typography/BodySm";
import { PostCard } from "@/lib/posts";
import Image from "next/image";

type Props = {
    posts?: PostCard;
};

export default function BlogCard({ posts }: Props) {
    const title = posts?.title ?? "Card Heading title";
    const cover_url = posts?.cover_url ?? null;
    const cover_image_alt = posts?.cover_image_alt ?? null;

    return (
        <div className="border border-white flex flex-col p-1">
            <div className="w-full h-[300px] bg-amber-200">
                {cover_url && (
                    <Image
                        src={cover_url}
                        alt={cover_image_alt ?? title}
                        width={1200}
                        height={800}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
            <div className="flex flex-col gap-4">
                <ArticleH3 className="text-heading-primary">
                    {title}
                </ArticleH3>
                <div className="text-text-inverse">
                    <BodySm>
                        Oct 14, 2025
                    </BodySm>
                    <BodySm>
                        7-4300 Kingsway, Burnaby, BC
                    </BodySm>
                </div>
            </div>


        </div>
    )
}
