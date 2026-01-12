type Props = {
    placeholder?: string;
    buttonText?: string;
    className?: string;
};

export default function EmailSignupBar({
    placeholder = "example@email.com",
    buttonText = "Feed My inbox!",
    className = "",
}: Props) {
    return (
        <div className={`w-full ${className}`}>
            <div className="mx-auto flex w-full">
                {/* Input (visual only) */}
                <input
                    type="email"
                    placeholder={placeholder}
                    aria-label="Email"
                    className="
            h-16 w-full
            bg-white
            px-10
            text-lg
            text-black/70
            placeholder:text-black/25
            outline-none
          "
                />

                {/* Button (visual only) */}
                <button
                    type="button"
                    aria-label="Sign up"
                    className="
            h-16
            shrink-0
            bg-black
            px-4
            text-lg
            font-medium
            text-white
          "
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}