import Link from "next/link";
import Image from "next/image";
import { CtaPrimary } from "@/components/typography/CtaPrimary";

export default function Header() {
    return (
        <header className="w-full bg-header fixed z-50 top-0">
            <nav className="flex justify-between items-center max-w-container mx-auto px-4 py-2 ">
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
                        <CtaPrimary asChild className="text-text-inverse">
                            Blog
                        </CtaPrimary>
                    </Link>
                    <Link href="/contact">
                        <CtaPrimary asChild className="text-text-inverse">
                            Contact
                        </CtaPrimary>
                    </Link>
                    <a
                        href="https://www.instagram.com/tastebudsvan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <Image
                            src="/images/icons/instagram.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </a>
                    <a
                        href="https://www.tiktok.com/@tastebudsvan"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                    >
                        <Image
                            src="/images/icons/tiktok.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </a>
                </div>
            </nav>
        </header>
    );
}
