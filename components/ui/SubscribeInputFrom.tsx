type Props = {
    placeholder?: string;
    buttonText?: string;
    className?: string;
};

export default function EmailSignupBar({
    placeholder = "example@email.com",
    buttonText = "Subscribe!",
    className = "",
}: Props) {
    return (
        <div className={`w-full flex flex-col items-start ${className}`}>
            <div className="mx-auto flex flex-col justify-center items-center w-full gap-2">
            <label htmlFor="email" className="sr-only">Your Email Address</label>
                <input
                    type="email"
                    placeholder={placeholder}
                    aria-label="Email"
                    className="
            bg-white
            text-sm
            text-black/70
            placeholder:text-black/25
            outline-none
            px-2
border-2 border-black
h-12
w-64
          "
                />

                {/* Button (visual only) */}
                <button
                    type="button"
                    aria-label="Sign up"
                    className="
            bg-black
            text-sm
            w-64
            h-10
            hover:bg-gray-900
            cursor-pointer
            text-brand-primary
          "
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}