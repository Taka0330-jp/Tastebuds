"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HomeHero from "./HomeHero";
import RecentPosts from "./RecentPosts";
import type { PostCard } from "@/lib/posts";

gsap.registerPlugin(ScrollTrigger);

type HomeHeroParallaxClientProps = {
    posts: PostCard[];
};

export default function HomeHeroParallaxClient({ posts }: HomeHeroParallaxClientProps) {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const recentRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const heroEl = heroRef.current;
        const recentEl = recentRef.current;
        if (!heroEl && !recentEl) return;

        const ctx = gsap.context(() => {
            if (heroEl) {
                gsap.to(heroEl, {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroEl,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            if (recentEl) {
                gsap.to(recentEl, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: recentEl,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={heroRef}>
                <HomeHero />
            </div>
            <div ref={recentRef}>
                <RecentPosts posts={posts} />
            </div>
        </>
    );
}
