// A geometric crown built from crossed loops + a central diamond, echoing
// the ZAVEL logomark, rendered as inline SVG so it scales and recolors
// cleanly anywhere in the app (header, footer, admin, seals, favic33-ish uses).
export default function CrownMark({ className = 'w-8 h-8', stroke = '#D4AF37' }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 34 L26 20 L34 40 L48 12 L60 34 L72 12 L86 40 L94 20 L112 34"
        stroke={stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 58 C40 78 80 78 102 58"
        stroke={stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <rect
        x="60"
        y="10"
        width="14"
        height="14"
        transform="rotate(45 60 10)"
        stroke={stroke}
        strokeWidth="3"
      />
      <rect x="22" y="30" width="9" height="9" transform="rotate(45 22 30)" stroke={stroke} strokeWidth="2.4" />
      <rect x="89" y="30" width="9" height="9" transform="rotate(45 89 30)" stroke={stroke} strokeWidth="2.4" />
    </svg>
  )
}
