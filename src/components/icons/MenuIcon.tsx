interface IconProps {
    size?: number
}

export function MenuIcon({ size = 20 }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
            <path
                d="M3 6h18M3 12h18M3 18h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}
