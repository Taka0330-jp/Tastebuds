type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5";

type ArticleH1Props = {
    as?: HeadingTag;
    children: React.ReactNode;
    className?: string;
};

export function ArticleH1({
    as = "h2",
    children,
    className = "",
}: ArticleH1Props) {
    const Tag = as;
    return (
        <Tag
            className={`
        font-sans font-semibold
        leading-[1.1]   
      ${className}
      `}
            style={{ fontSize: "var(--fs-article-h1)" }}
        >
            {children}
        </Tag>
    );
}
