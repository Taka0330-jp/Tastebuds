"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cleanupGSAP() {
    try {
        ScrollTrigger.getAll().forEach((st) => {
            try {
                st.kill(true);
            } catch {
                try { st.kill(false); } catch { }
            }
        });

        ScrollTrigger.clearScrollMemory?.();
        ScrollTrigger.refresh(true);


    } catch { }
}

export default function GsapRouteCleanup() {
    const pathname = usePathname();

    useEffect(() => {
        // ルートが変わった時
        cleanupGSAP();
    }, [pathname]);

    useEffect(() => {
        // ✅ ブラウザ戻る/進む（ここが重要）
        const onPop = () => cleanupGSAP();

        // Safari含め「ページ離脱系」でも掃除
        const onPageHide = () => cleanupGSAP();

        window.addEventListener("popstate", onPop);
        window.addEventListener("pagehide", onPageHide);

        return () => {
            window.removeEventListener("popstate", onPop);
            window.removeEventListener("pagehide", onPageHide);
        };
    }, []);

    return null;
}
