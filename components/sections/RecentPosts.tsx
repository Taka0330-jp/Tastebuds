"use client";

import CardM from "../ui/CardM";
import CardL from "../ui/CardL";


import Image from "next/image";
import { DisplayH2 } from "../typography/DisplayH2";
import type { PostCard } from "@/lib/posts";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
    posts: PostCard[];
};

gsap.registerPlugin(ScrollTrigger);

export default function RecentPosts({ posts }: Props) {

    const cardLRef = useRef<HTMLDivElement>(null);
    const cardMRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardLRef.current || !cardMRef.current) return;

        gsap.fromTo(
            cardLRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: cardLRef.current,
                    start: "top center",
                    once: true,
                },
            }
        );

        gsap.fromTo(
            cardMRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.15,
                scrollTrigger: {
                    trigger: cardMRef.current,
                    start: "top center",
                    once: true,
                },
            }
        );
    }, { scope: cardLRef });

    return (
        <section
            className="bg-home-section py-12 relative z-10 mt-[90vh]"
        >
            {/* SKYLINE IMAGE */}
            <Image
                className="recent-skyline absolute -translate-y-30 md:-translate-y-70 w-full h-auto z-10 pointer-events-none object-contain md:object-cover object-top"
                src="/images/svg/skyline.svg"
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
                <div ref={cardLRef} className="col-span-12">
                    {posts[0] && <CardL posts={posts[0]} />}
                </div>
                <div ref={cardMRef} className="gap-6 md:col-span-12 grid md:grid-cols-3">
                    {posts[1] && <CardM posts={posts[1]} />}
                    {posts[2] && <CardM posts={posts[2]} />}
                    {posts[3] && <CardM posts={posts[3]} />}
                </div>
            </div>

        </section>
    );
}
