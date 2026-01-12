type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5";

type DisplayH2Props = {
    as?: HeadingTag;
    children: React.ReactNode;
    className?: string;
};

export function DisplayH2({
    as: Tag = "h2",
    children,
    className = "",
}: DisplayH2Props) {
    return (
        <Tag
            className={`
        font-sans font-medium
        leading-[1.2]   
        ${className}
      `}
            style={{ fontSize: "var(--fs-display-h2)" }}
        >
            {children}
        </Tag>
    );
}
