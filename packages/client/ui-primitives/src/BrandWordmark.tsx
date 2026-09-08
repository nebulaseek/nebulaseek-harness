import { useId } from 'react'
import { BRAND_LOGO_CLOUD_PATH, BRAND_LOGO_SPARK_PATH, BRAND_LOGO_VIEWBOX } from './BrandLogo.tsx'
import type { IconProps } from './icons/props.ts'

/** Display options for the official brand wordmark. */
export interface BrandWordmarkProps extends IconProps {
  /** Whether to include the leading brand mark; defaults to true. */
  includeMark?: boolean | undefined
}

/* Lockup geometry in the artwork's own 24-tall space: the mark occupies the
   first 24 units and the name follows after a 6-unit gap. Dropping the mark
   shifts the viewBox origin rather than re-laying out, so both forms share one
   set of coordinates. */
const MARK_SIZE = 24
const NAME_X = 30
const NAME_SIZE = 17
const NAME_TRACKING = 0.5
const FULL_WIDTH = NAME_X + 4 * (NAME_SIZE + NAME_TRACKING)
const NAME_WIDTH = FULL_WIDTH - NAME_X + 2

/* Wordmark lettering, not product copy: the brand name reads the same in every
   locale, the way the vector letterforms it replaces did. It stays a module
   constant so no locale dictionary claims to own it. */
const BRAND_NAME = '星云寻知'

/**
 * Render the full brand wordmark.
 * @param props.size - height in px (default 24; width follows the selected artwork).
 * @param props.className - extra class for layout placement.
 * @param props.includeMark - whether to include the leading brand mark.
 * @returns the wordmark svg (aria-hidden decorative brand art).
 */
export function BrandWordmark({ size = 24, className, includeMark = true }: BrandWordmarkProps) {
  const cloudGradientId = useId()
  const sparkGradientId = useId()
  const width = includeMark ? FULL_WIDTH : NAME_WIDTH
  return (
    <svg
      width={(size * width) / 24}
      height={size}
      className={className}
      viewBox={includeMark ? `0 0 ${FULL_WIDTH} 24` : `${NAME_X - 2} 0 ${NAME_WIDTH} 24`}
      fill="none"
      aria-hidden="true"
    >
      {includeMark && (
        <g transform={`scale(${MARK_SIZE / BRAND_LOGO_VIEWBOX.width})`}>
          <path d={BRAND_LOGO_CLOUD_PATH} fill={`url(#${cloudGradientId})`} />
          <path fillRule="evenodd" clipRule="evenodd" d={BRAND_LOGO_SPARK_PATH} fill={`url(#${sparkGradientId})`} />
        </g>
      )}
      <text
        x={NAME_X}
        y="17.5"
        fontSize={NAME_SIZE}
        fontWeight="600"
        letterSpacing={NAME_TRACKING}
        fill="currentColor"
      >
        {BRAND_NAME}
      </text>
      {includeMark && (
        <defs>
          <linearGradient id={cloudGradientId} x1="66.6125" y1="27.0314" x2="39.8542" y2="-14.134" gradientUnits="userSpaceOnUse">
            <stop stopColor="#07A5F9" />
            <stop offset="0.199761" stopColor="#1E83F9" />
            <stop offset="0.512207" stopColor="#3460F8" />
            <stop offset="0.601489" stopColor="#8463FC" />
            <stop offset="0.706299" stopColor="#D365FF" />
            <stop offset="1" stopColor="#D365FF" />
          </linearGradient>
          <linearGradient id={sparkGradientId} x1="38.7608" y1="25.4355" x2="24.0827" y2="12.6274" gradientUnits="userSpaceOnUse">
            <stop stopColor="#07A5F9" />
            <stop offset="0.391846" stopColor="#3460F8" />
            <stop offset="0.536494" stopColor="#8463FC" />
            <stop offset="0.706299" stopColor="#D365FF" />
            <stop offset="1" stopColor="#D365FF" />
          </linearGradient>
        </defs>
      )}
    </svg>
  )
}
