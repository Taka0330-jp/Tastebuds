export function ArticleH3({ children, className = "", }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={`
        font-sans font-medium
        leading-[1.3]   
      ${className}`}
            style={{ fontSize: "var(--fs-article-h3)" }}
        >
            {children}
        </p>
    );
}
