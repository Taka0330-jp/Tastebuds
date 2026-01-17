"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DisplayH2 } from "../typography/DisplayH2";
import { BodyXlg } from "../typography/BodyXlg";
import { BodyBase } from "../typography/BodyBase";
import MouthStroke from "../animation/mouthStroke";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TikTok";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedAnimationSection() {
    const pathname = usePathname();

    const sectionRef = useRef<HTMLDivElement>(null);
    const strokeTlRef = useRef<gsap.core.Timeline | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const killedRef = useRef(false);

    useLayoutEffect(() => {
        if (!stRef.current) return;
        if (killedRef.current) return;

        killedRef.current = true;
        try {
            stRef.current.kill(true);
        } catch {
        }
        stRef.current = null;
    }, [pathname]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        killedRef.current = false;

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(sectionRef.current!);

            const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
            tl.add(() => {
                const s = strokeTlRef.current;
                if (!s) return;
                s.pause(0).play(0);
            })
                .from(q(".title"), { opacity: 0, y: 40, duration: 0.6 })
                .from(q(".body"), { opacity: 0, y: 40, duration: 0.6 }, "<0.1");

            stRef.current = ScrollTrigger.create({
                trigger: sectionRef.current!,
                start: "top top",
                end: () => "+=" + window.innerHeight,
                pin: true,
                pinSpacing: true,
                scrub: false,
                invalidateOnRefresh: true,
                pinReparent: true,
                onEnter: () => tl.play(0),

            });
        }, sectionRef);

        return () => {

            try {
                stRef.current?.kill(true);
            } catch { }
            stRef.current = null;

            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-home-section text-white flex flex-col items-center justify-center"
        >
            <MouthStroke
                className="mouth pointer-events-none w-[400px] md:w-3xl opacity-30 absolute z-20"
                playOnMount={false}
                onReady={(strokeTl) => {
                    strokeTlRef.current = strokeTl;
                }}
            />

            <DisplayH2 as="h5" className="title z-30 p-8 text-center">
                Join the Table
            </DisplayH2>
            <BodyXlg className="body z-30 text-center">
                Follow us on TikTok + Instagram for daily food adventures.
            </BodyXlg>
            <BodyBase className="body z-30 p-8 text-center">
                Got a favorite spot we should try? Slide into our DMs, we might just feature it!
            </BodyBase>

            <div className="body flex gap-32 mt-16">
                <a
                    href="https://www.instagram.com/tastebudsvan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="z-30 inline-flex h-28 w-28 items-center justify-center rounded-full transition bg-black text-brand-primary hover:bg-brand-primary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2"
                >
                    <InstagramIcon className="text-6xl " />
                </a>

                <a
                    href="https://www.tiktok.com/@tastebudsvan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on TikTok"
                    className="z-30 inline-flex h-28 w-28 items-center justify-center rounded-full transition bg-black text-brand-primary hover:bg-brand-primary hover:text-brand-secondary focus-visible:ring-2"
                >
                    <TikTokIcon className="text-6xl" />
                </a>
            </div>
        </section>
    );
}
