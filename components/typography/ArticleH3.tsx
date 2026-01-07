type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export function ArticleH3({ as: Tag = "h3", children, className = "", }: {
    as?: HeadingTag
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Tag
            className={`
        font-sans font-medium
        leading-[1.3]   
      ${className}`}
            style={{ fontSize: "var(--fs-article-h3)" }}
        >
            {children}
        </Tag>
    );
}
