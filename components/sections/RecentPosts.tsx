"use client";

import BlogCardM from "../CardM";
import BlogCardL from "../CardL";
import { useRef } from "react";

import Image from "next/image";
import { DisplayH2 } from "../typography/DisplayH2";
import type { PostCard } from "@/lib/posts";

type Props = {
    posts: PostCard[];
};

export default function RecentPosts({ posts }: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);

    return (
        <section
            ref={sectionRef}
            className="bg-home-section py-12 relative z-10 mt-[80vh]"
        >
            {/* SKYLINE IMAGE */}
            <Image
                className="recent-skyline absolute -translate-y-70 w-full h-auto z-10 pointer-events-none object-contain md:object-cover object-top"
                src="/images/ui/skyline.svg"
                alt=""
                fill
                sizes="100vw"
            />

            {/* TITLE H2 */}
            <div className="flex gap-4 max-w-container mx-auto p-5 relative z-10">
                <DisplayH2 className="text-text-inverse">
                    Recent
                </DisplayH2>
                <Image
                    src="/images/icons/recentIcon.svg"
                    alt="Recent"
                    width={48}
                    height={48}
                />
            </div>

            {/* BLOG CARDS */}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-12 max-w-container mx-auto p-5 relative z-10">
                <div className="col-span-12">
                    {posts[0] ? <BlogCardL posts={posts[0]} /> : null}
                </div>
                <div className="gap-6 md:col-span-12 grid md:grid-cols-3">
                    {posts[1] ? <BlogCardM posts={posts[1]} /> : null}
                    {posts[2] ? <BlogCardM posts={posts[2]} /> : null}
                    {posts[3] ? <BlogCardM posts={posts[3]} /> : null}
                </div>
            </div>

        </section>
    );
}
