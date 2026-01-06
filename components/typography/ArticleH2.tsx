export function ArticleH2({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={`
        font-sans font-medium
        leading-[1.2]   
      ${className}
      `}
            style={{ fontSize: "var(--fs-article-h2)" }}
        >
            {children}
        </p>
    );
}
