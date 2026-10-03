import { useId } from "react"
import type { CSSProperties } from "react"

export function LifelineSketchRail({ vertical = false, className, style }: {
  vertical?: boolean
  className?: string
  style?: CSSProperties
}) {
  const id = useId().replace(/:/g, "")
  return (
    <svg aria-hidden="true" className={className} style={style}>
      <defs>
        <linearGradient id={`${id}-silver`} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          <stop offset="0" stopColor="#929ca7" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#e5e9ed" stopOpacity="0.65" />
          <stop offset="1" stopColor="#929ca7" stopOpacity="0.45" />
        </linearGradient>
        <pattern id={`${id}-curve`} width={vertical ? 20 : 420} height={vertical ? 420 : 20} patternUnits="userSpaceOnUse">
          <path d={vertical ? "M10 0 C3 65 17 115 11 190 S5 320 10 420" : "M0 10 C65 3 115 17 190 11 S320 5 420 10"} fill="none" stroke={`url(#${id}-silver)`} strokeWidth="1" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-curve)`} />
    </svg>
  )
}
