"use client";

// Typography
import { DisplayH2 } from "../typography/DisplayH2";
import { BodyXlg } from "../typography/BodyXlg";
import { BodyBase } from "../typography/BodyBase";

// Custom animation component
import MouthStroke from "../animation/mouthStroke";

// Icons
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TikTok";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React Hook
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);


export default function PinnedAnimationSection() {
    const sectionRef = useRef<HTMLElement | null>(null);

    const masterTl = useRef<gsap.core.Timeline | null>(null);
    const strokeTlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        masterTl.current = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                toggleActions: "play none none none",
                // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
            },
        });

        if (strokeTlRef.current) {
            masterTl.current.add(strokeTlRef.current, 0);
        }

        const items = section.querySelectorAll(".animate-item");
        if (items.length) {
            masterTl.current.from(
                items,
                {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                ">-0.5"
            );
        }
    }, { scope: sectionRef });

    const handleStrokeReady = (strokeTl: gsap.core.Timeline) => {
        strokeTlRef.current = strokeTl;

        if (masterTl.current) {
            masterTl.current.add(strokeTl, 0);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-home-section text-white flex flex-col items-center justify-center overflow-hidden"
        >
            <MouthStroke
                className="mouth pointer-events-none w-[400px] md:w-3xl opacity-30 absolute z-20"
                playOnMount={true}
                onReady={handleStrokeReady}
            />

            <DisplayH2 as="h5" className="animate-item z-30 p-8 text-center">
                Join the Table
            </DisplayH2>

            <BodyXlg className="animate-item z-30 text-center">
                Follow us on TikTok + Instagram for daily food adventures.
            </BodyXlg>

            <BodyBase className="animate-item z-30 p-8 text-center">
                Got a favorite spot we should try? Slide into our DMs, we might just feature it!
            </BodyBase>

            <div className="animate-item text flex gap-10 md:gap-32 mt-16">
                <a
                    href="https://www.instagram.com/tastebudsvan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-30 inline-flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full transition bg-black text-brand-primary hover:bg-brand-primary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2"
                >
                    <InstagramIcon className="text-4xl md:text-6xl " />
                </a>

                <a
                    href="https://www.tiktok.com/@tastebudsvan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-30 inline-flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full transition bg-black text-brand-primary hover:bg-brand-primary hover:text-brand-secondary focus-visible:ring-2"
                >
                    <TikTokIcon className="text-4xl md:text-6xl" />
                </a>
            </div>
        </section>
    );
}