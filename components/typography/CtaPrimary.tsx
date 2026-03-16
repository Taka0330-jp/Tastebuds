import { ReactNode } from "react";

type CtaPrimaryProps = {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
};

export function CtaPrimary({
    children,
    className = "",
    asChild = false,
}: CtaPrimaryProps) {
    const Tag = asChild ? "span" : "a";

    return (
        <Tag
            className={`
        font-sans font-semibold
        leading-[1.2]
        ${className}
      `}
            style={{ fontSize: "var(--fs-cta-primary)" }}
        >
            {children}
        </Tag>
    );
}
