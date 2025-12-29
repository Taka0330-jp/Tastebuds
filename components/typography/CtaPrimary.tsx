import { ReactNode } from "react";

type CtaPrimaryProps = {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
};

export default function CtaPrimary({
    children,
    className = "",
    asChild = false,
}: CtaPrimaryProps) {
    const Comp = asChild ? "span" : "a";

    return (
        <Comp
            className={`
        font-sans font-semibold
        leading-[1.2]
        ${className}
      `}
            style={{ fontSize: "var(--fs-cta-primary)" }}
        >
            {children}
        </Comp>
    );
}