import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
export default function Footer() {
    return (
        <>

            <footer className="w-full bg-header">
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
                        <div className="flex items-center gap-8 text-text-inverse pt-4">
                            <Link href="/blog">

                                Blog

                            </Link>
                            <Link href="/contact">
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
        </>
    )

}