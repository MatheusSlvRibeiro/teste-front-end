interface IconProps {
  size?: number
}

export function FitnessIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <line
        x1="6.5"
        y1="6.5"
        x2="17.5"
        y2="17.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="2" y="9" width="4" height="6" rx="1" fill="currentColor" />
      <rect x="18" y="9" width="4" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}
