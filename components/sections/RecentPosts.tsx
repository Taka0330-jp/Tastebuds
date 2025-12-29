"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { DisplayH2 } from "../typography/DisplayH2";

export default function RecentPosts() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(sectionRef);

            ScrollTrigger.matchMedia({
                "(max-width: 767px)": () => {
                    gsap.fromTo(
                        q(".recent-skyline"),
                        { y: -100 },
                        {
                            y: -300,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top bottom",
                                end: "top top",
                                scrub: true,
                            },
                        }
                    );
                },


                "(min-width: 768px)": () => {
                    gsap.fromTo(
                        q(".recent-skyline"),
                        { y: -180 },
                        {
                            y: -640,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top bottom",
                                end: "top top",
                                scrub: true,
                            },
                        }
                    );
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-home-section py-12 relative">
            <Image
                className="recent-skyline  absolute left-0 top-0 w-full h-auto z-10 pointer-events-none object-contain md:object-cover object-top"
                src="/images/ui/skyline.svg"
                alt=""
                fill
                sizes="100vw"
            />
            <div className="md:grid md:grid-cols-12 max-w-container mx-auto p-5 gap-6 relative z-10">
                <DisplayH2 className="text-text-inverse md:col-span-12">
                    Recent
                </DisplayH2>

                <div className="md:col-span-12 grid gap-6 md:grid-cols-3">
                    <div className="h-48 rounded-lg bg-white" />
                    <div className="h-48 rounded-lg bg-white" />
                    <div className="h-48 rounded-lg bg-white" />
                    <div className="h-48 rounded-lg bg-white" />
                    <div className="h-48 rounded-lg bg-white" />
                    <div className="h-48 rounded-lg bg-white" />
                </div>
            </div>
        </section>
    );
}
