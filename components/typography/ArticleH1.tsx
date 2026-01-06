export function ArticleH1({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={`
        font-sans font-semibold
        leading-[1.1]   
      ${className}
      `}
            style={{ fontSize: "var(--fs-article-h1)" }}
        >
            {children}
        </p>
    );
}
