export function BodyXlg({ children, className = "", }: { children: React.ReactNode, className?: string }) {
    return (
        <p
            className={`
        font-mono font-medium
        leading-[1.4]   
        ${className}
      `}
            style={{ fontSize: "var(--fs-body-xlg)" }}
        >
            {children}
        </p>
    );
}
