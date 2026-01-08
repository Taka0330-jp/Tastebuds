type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingH3Props = {
    as?: HeadingTag
    children: React.ReactNode;
    className?: string;
}
export function ArticleH3({ as: Tag = "h3", children, className = "", }: HeadingH3Props) {
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
