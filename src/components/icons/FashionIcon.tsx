interface IconProps {
    size?: number
}

export function FashionIcon({ size = 24 }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
            <path
                d="M12 3a2 2 0 0 1 2 2c0 .8-.5 1.5-1.2 1.8L20 10.5a1 1 0 0 1-.4 1.9H4.4a1 1 0 0 1-.4-1.9l7.2-3.7A2 2 0 0 1 10 5a2 2 0 0 1 2-2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    )
}
