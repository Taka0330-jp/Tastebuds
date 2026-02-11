"use client";
import { DisplayH1 } from "../typography/DisplayH1";
import { BodyXlg } from "../typography/BodyXlg";
import MouthStroke from "../animation/mouthStroke";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export default function HomeHero() {
    
    const headingRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      ).fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    });


    return (
        <section className="home-hero fixed inset-x-0 top-0 h-[80vh] overflow-hidden z-0 mt-10">
            <div className="flex flex-col gap-1.5 md:grid md:grid-cols-12 max-w-container mx-auto p-5 relative z-10 mt-10  md:mt-20 lg:mt-30">
                <div className="flex flex-col gap-1 md:col-start-1 md:col-span-7">
                    <div ref={headingRef}>
                        <DisplayH1   className="text-heading-primary">
                            Your guide to Vancouver’s tastiest bites
                        </DisplayH1>
                    </div>
                    <div  ref={bodyRef}>
                        <BodyXlg className="text-gray-50">
                            Hey foodie friends! From hole-in-the-wall dumpling shops to trendy brunch spots, we’re all about sharing the flavors that make this city so delicious.
                        </BodyXlg>
                    </div>
                </div>

                <MouthStroke className="mouth-stroke md:col-start-8 md:col-span-5 z-0" playOnMount={true} />
            </div>
        </section>
    );
}
