export function DisplayH2({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h2
            className={`
        font-sans font-medium
        leading-[1.2]   
        ${className}
      `}
            style={{ fontSize: "var(--fs-display-h2)" }}
        >
            {children}
        </h2>
    );
}
