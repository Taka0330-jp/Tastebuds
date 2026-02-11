import { DisplayH2 } from "../typography/DisplayH2";
import Image from "next/image";
import CardM from "../ui/CardM";

import { PostCard } from "@/lib/posts";

type Props = {
    posts: PostCard[];
}

export default function Popular({posts}: Props) {

    console.log(posts);
    
    return (
        <>
            <section className="bg-home-section relative z-10">
                <div className="flex gap-4 max-w-container mx-auto p-5 relative z-10">
                    <DisplayH2 className="text-text-inverse">
                        Popular
                    </DisplayH2>
                    <Image
                        src="/images/icons/popularIcon.svg"
                        alt="Popular"
                        width={48}
                        height={48}
                    />
                </div>
                <div className="md:grid md:grid-cols-12 gap-6 max-w-container mx-auto p-5  relative z-10">
                    <div className="md:col-span-12 grid gap-6 md:grid-cols-3">
                    {posts[4] ? <CardM posts={posts[4]} /> : null}
                    {posts[5] ? <CardM posts={posts[5]} /> : null}
                    {posts[6] ? <CardM posts={posts[6]} /> : null}
                    </div>
                </div>
            </section>
        </>

    )
}
