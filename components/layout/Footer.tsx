import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TikTok";
import SearchBar from "../ui/SearchBar";


export default function Footer() {
    return (
        <footer className="relative z-999 w-full bg-header" >
            <nav className="mx-auto flex justify-between items-center max-w-container p-4">

                {/* Logo */}
                <div>
                    <Image
                        src="/images/branding/logo-01.svg"
                        alt="logo"
                        width={200}
                        height={180}
                    />
                </div>

                {/* Right navigation */}
                <div className="flex flex-col">

                    {/* Social Icon */}
                    <div className="flex gap-4 border-b pb-4">
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
                            className="
                                text-white text-2xl
    transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                            <TikTokIcon />
                        </a>
                    </div>
                    <div className="flex items-center gap-8 text-text-inverse pt-4">
                        <Link href="/blog" className="transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60">
                            Blog
                        </Link>
                        <Link href="/contact" className="transition-opacity
    hover:opacity-70
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-white/60">
                            Contact
                        </Link>
                        <div className="w-full">
                            <SearchBar />
                        </div>
                    </div>
                    <p className="text-sm text-white/70">
                        &copy; 2025 TasteBuds
                    </p>
                </div>


            </nav>
        </footer>
    )

}