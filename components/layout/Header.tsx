import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TikTok";
import { CtaPrimary } from "@/components/typography/CtaPrimary";

export default function Header() {
    return (
        <header className="w-full bg-header fixed z-50 top-0 ">
            <nav className="flex justify-between items-center max-w-container mx-auto px-4 py-4 ">
                <Link href="/" aria-label="Home">
                    <Image
                        src="/images/branding/logo-02.svg"
                        alt="Logo"
                        width={120}
                        height={24}
                        className="inline"
                    />
                </Link>
                <div className="flex gap-8">
                    <Link href="/blog">
                        <CtaPrimary asChild className="text-text-inverse transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60">
                            Blog
                        </CtaPrimary>
                    </Link>
                    <Link href="/contact">
                        <CtaPrimary asChild className="text-text-inverse transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60">
                            Contact
                        </CtaPrimary>
                    </Link>
                    <a
                        href="https://www.instagram.com/tastebudsvan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="    text-white text-2xl
    transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                        <InstagramIcon />
                    </a>
                    <a
                        href="https://www.tiktok.com/@tastebudsvan"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="    text-white text-2xl
    transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                        <TikTokIcon />
                    </a>
                </div>
            </nav>
        </header>
    );
}
