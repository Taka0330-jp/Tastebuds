import { ReactNode } from "react";

type CtaSecondaryProps = {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
};

export function CtaSecondary({
    children,
    className = "",
    asChild = false,
}: CtaSecondaryProps) {
    const Comp = asChild ? "span" : "a";

    return (
        <Comp
            className={`
        font-sans font-semibold
        leading-[1.2]
        ${className}
      `}
            style={{ fontSize: "var(--fs-cta-secondary)" }}
        >
            {children}
        </Comp>
    );
}
