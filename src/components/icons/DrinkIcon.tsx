interface IconProps {
  size?: number
}

export function DrinkIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        d="M6 3h12l-1 12a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3L6 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="9"
        x2="17"
        y2="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
