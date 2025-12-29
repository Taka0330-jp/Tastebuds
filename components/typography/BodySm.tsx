export function BodySm({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="
        font-mono font-medium
        leading-[1.4]   
      "
            style={{ fontSize: "var(--fs-body-sm)" }}
        >
            {children}
        </p>
    );
}
