import { ArticleH1 } from "./typography/ArticleH1";
import { BodyLg } from "./typography/BodyLg";

import { PostCard } from "@/lib/posts";
import Image from "next/image";

type Props = {
    posts: PostCard;
};

export default function cardL({ posts }: Props) {
    return (
        <>
            <div className="border border-white flex p-1">

                <div className="flex flex-col gap-4">
                    <ArticleH1 className="text-heading-primary">
                        {posts.title}
                    </ArticleH1>
                    <div className="text-text-inverse">
                        <BodyLg>
                            {posts.published_at}
                        </BodyLg>
                        <BodyLg>
                            {posts.location}
                        </BodyLg>
                    </div>
                </div>
                <div className="w-full h-[300px]">
                    {posts.cover_url && (
                        <Image
                            src={posts.cover_url}
                            alt={posts.cover_image_alt ?? posts.title}
                            width={1200}
                            height={800}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>


            </div>
        </>
    )
}
