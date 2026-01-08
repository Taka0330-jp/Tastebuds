import Image from "next/image";

type Props = {
    placeholder?: string;
    className?: string;
};

export default function SearchBar({
    placeholder = "What are you looking for?",
    className = "",
}: Props) {
    return (
        <form
            role="search"
            className={`w-full ${className}`}
        >
            <div className="relative w-full">
                {/* Input Look */}
                <input type="text"
                    placeholder={placeholder}
                    aria-label="Search"
                    className="
                w-full
                h-12
                bg-gray-400
                text-black/80
                placeholder:text-black/35
                px-5
                pr-16
                outline-none"
                />

                {/* Icon button */}
                <button
                    type="submit"
                    aria-label="Search"
                    className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                h-10
                w-10
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                ">
                    <Image
                        src="/images/icons/search.svg"
                        alt=""
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </form>
    )

}