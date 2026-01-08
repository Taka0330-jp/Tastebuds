type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type ArticleH2Props = {
    as?: HeadingTag;
    children: React.ReactNode;
    className?: string;
};

export function ArticleH2({
    as: Tag = "h2",
    children,
    className = "",
}: ArticleH2Props) {
    return (
        <Tag
            className={`
        font-sans font-medium
        leading-[1.2]   
      ${className}
      `}
            style={{ fontSize: "var(--fs-article-h2)" }}
        >
            {children}
        </Tag>
    );
}
