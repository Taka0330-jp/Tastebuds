"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type MouthStrokeProps = {
    className?: string;
    duration?: number;
    delay?: number;
    playOnMount?: boolean;
    onReady?: (tl: gsap.core.Timeline) => void;
};

export default function MouthStroke({
    className = "",
    duration = 1.1,
    delay = 0.1,
    playOnMount = false,
    onReady,
}: MouthStrokeProps) {
    const pathRef = useRef<SVGPathElement | null>(null);

    useLayoutEffect(() => {
        const path = pathRef.current;
        if (!path) return;

        const length = path.getTotalLength();


        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
        });

        //animation
        const tl = gsap.timeline({ paused: !playOnMount });
        tl.to(path, {
            strokeDashoffset: 0,
            duration,
            delay,
            ease: "power2.out",
        });

        onReady?.(tl);

        return () => {
            tl.kill();
        };
    }, [duration, delay, playOnMount, onReady]);

    return (
        <svg
            className={className}
            width="100%"
            height="auto"
            viewBox="0 0 480 220"
            aria-hidden="true"
            focusable="false"
        >
            <path
                ref={pathRef}
                d="M22.2012,123.0273c26.146,21.4033,69.3614,50.2474,128.3936,63.8679,42.1816,9.7325,74.8455,7.6328,122.2205,4.5874,14.2533-.9163,36.5006-2.9081,62.9124-12.1238,17.0133-5.9363,29.4214-10.4098,42.2693-21.9538,22.0026-19.7696,28.3957-45.0915,30.1456-52.427,1.506-6.3132,2.8953-12.1373,2.6213-20.1188-.139-4.051-1.6753-34.2916-27.1965-51.313-19.0847-12.7286-46.4273-14.6276-66.2644-.8599-3.0317,2.1041-21.2003,15.1056-22.2062,36.2482-.8217,17.2711,10.285,29.8808,18.895,39.6559,3.9088,4.4377,13.4858,14.762,29.2897,22.5698,20.284,10.0211,39.2683,10.2954,49.1932,9.6817"
                fill="none"
                stroke="#e6e93a"
                strokeWidth="30.0476px"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    overflow: "visible",
                    strokeDashoffset: 9999,
                }}
            />
        </svg>
    );
}
