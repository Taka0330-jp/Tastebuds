export function DisplayH1({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1
            className={`
        font-sans font-bold
        leading-[1.1]
        ${className}
      `}
            style={{ fontSize: "var(--fs-display-h1)" }}
        >
            {children}
        </h1>
    );
}