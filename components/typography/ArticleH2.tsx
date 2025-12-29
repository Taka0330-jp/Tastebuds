export function ArticleH2({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="
        font-sans font-medium
        leading-[1.2]   
      "
            style={{ fontSize: "var(--fs-article-h2)" }}
        >
            {children}
        </p>
    );
}
