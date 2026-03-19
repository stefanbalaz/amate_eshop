export default function BottleIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-5"
      aria-hidden="true"
    >
      {/* Crown cap */}
      <rect
        x="9.5"
        y="0"
        width="5"
        height="2"
        rx="0.75"
        fill={color}
        opacity="0.9"
      />
      {/* Crown cap serrated edge */}
      <rect
        x="9"
        y="1.5"
        width="6"
        height="1"
        rx="0.5"
        fill={color}
        opacity="0.6"
      />

      {/* Neck — tall and slim */}
      <rect
        x="9"
        y="4"
        width="6"
        height="11"
        rx="1"
        fill={color}
        opacity="0.75"
      />

      {/* Neck ring at shoulder */}
      <rect
        x="8.5"
        y="14.5"
        width="7"
        height="1.5"
        rx="0.5"
        fill={color}
        opacity="0.5"
      />

      {/* Shoulders — smooth curve from narrow neck to wider body */}
      <path
        d="M9 16 C9 16 6 18 6 21 L6 43 C6 44.1 6.9 45 8 45 L16 45 C17.1 45 18 44.1 18 43 L18 21 C18 18 15 16 15 16 Z"
        fill={color}
        opacity="0.85"
      />

      {/* Label band */}
      <rect
        x="6"
        y="26"
        width="12"
        height="9"
        rx="0.5"
        fill="white"
        opacity="0.2"
      />

      {/* Left body highlight */}
      <rect
        x="7.5"
        y="21"
        width="2"
        height="18"
        rx="1"
        fill="white"
        opacity="0.18"
      />

      {/* Bottom rounded base */}
      <path
        d="M6 43 C6 44.1 6.9 45 8 45 L16 45 C17.1 45 18 44.1 18 43 L18 42 L6 42 Z"
        fill={color}
        opacity="0.55"
      />
    </svg>
  );
}
