export function ArticleH3({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="
        font-sans font-medium
        leading-[1.3]   
      "
            style={{ fontSize: "var(--fs-article-h3)" }}
        >
            {children}
        </p>
    );
}
