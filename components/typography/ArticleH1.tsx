export function ArticleH1({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="
        font-sans font-semibold
        leading-[1.1]   
      "
            style={{ fontSize: "var(--fs-article-h1)" }}
        >
            {children}
        </p>
    );
}
