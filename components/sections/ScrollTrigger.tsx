"use client";

import { useEffect, useRef } from "react";
import { DisplayH2 } from "../typography/DisplayH2";
import { BodyXlg } from "../typography/BodyXlg";
import { BodyBase } from "../typography/BodyBase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouthStroke from "../animation/mouthStroke";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TikTok";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedAnimationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const strokeTlRef = useRef<gsap.core.Timeline | null>(null);


    useEffect(() => {
        if (!sectionRef.current) return;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: true,
                scrub: false,
            },
        });


        tl.add(() => {
            strokeTlRef.current?.pause(0).play(0);
        }, ">")
            .from(".title", {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power3.out",
            })
            .from(".body", {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power3.out",
            })




        return () => {
            tl.kill();
            ScrollTrigger.killAll();
        };
    }, []);
    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-home-section text-white flex flex-col items-center justify-center"
        >
            <MouthStroke className="mouth pointer-events-none w-[400px] md:w-3xl opacity-30 absolute z-20"
                playOnMount={false}
                onReady={(strokeTl) => {
                    strokeTlRef.current = strokeTl;
                }} />
            <DisplayH2 as="h5" className="title z-30 p-8 text-center">Join the Table</DisplayH2>
            <BodyXlg className="body z-30 text-center">Follow us on TikTok + Instagram for daily food adventures. </BodyXlg>
            <BodyBase className="body z-30 p-8 text-center">Got a favorite spot we should try? Slide into our DMs, we might just feature it!</BodyBase>
            <div className="body flex gap-32 mt-16">
                <a
                    href="https://www.instagram.com/tastebudsvan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="z-30
                    inline-flex h-28 w-28 items-center justify-center rounded-full
                    transition 
                    bg-black-3 text-brand-primary
                    hover:bg-brand-primary hover:text-black-3
                    focus-visible:outline-none
    focus-visible:ring-2
    
                  "
                >
                    <InstagramIcon className="text-6xl " />
                </a>
                <a href="https://www.tiktok.com/@tastebudsvan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="z-30
                    inline-flex h-28 w-28 items-center justify-center rounded-full
                                        transition 
                    bg-black-3 text-brand-primary
                    hover:bg-brand-primary hover:text-black-3
                    focus-visible:outline-none
    focus-visible:ring-2
    
                  ">
                    <TikTokIcon className="text-6xl" />
                </a>
            </div>
        </section>
    );

}