import { useId } from 'react'
import type { IconProps } from './icons/props.ts'

/** Native viewBox of the brand artwork (width and height in user units). */
export const BRAND_LOGO_VIEWBOX = { width: 50, height: 50 }

/** The cloud silhouette, exported for consumers that compose their own svg (entrance effects, masks) around the same geometry. */
export const BRAND_LOGO_CLOUD_PATH = 'M25.0244 8.00781C31.6045 8.00781 37.1437 12.0486 38.7998 17.5459C43.8345 19.3871 47.3142 23.3266 47.3145 27.8906C47.3145 34.1952 40.6757 39.3085 32.4688 39.3438C30.7708 40.6552 28.0684 41.5039 25.0244 41.5039C21.9801 41.5039 19.2771 40.6555 17.5791 39.3438C9.37264 39.3081 2.73438 34.195 2.73438 27.8906C2.73462 23.3269 6.21381 19.3872 11.248 17.5459C12.904 12.0485 18.4442 8.00781 25.0244 8.00781ZM25.0645 15.1396C21.2739 15.1399 18.133 17.9163 17.5684 21.5439C14.112 22.4938 11.6106 25.266 11.6104 28.5391C11.6104 32.5968 15.4541 35.8867 20.1963 35.8867C21.9778 35.8867 23.6321 35.4217 25.0039 34.627C22.3527 39.7938 17.7207 39.29 17.7207 39.29C24.8826 40.5535 28.4904 37.6739 29.9883 35.8828C34.6678 35.8207 38.4395 32.558 38.4395 28.5391C38.4392 25.2926 35.9772 22.5399 32.5645 21.5684C32.01 17.9287 28.8637 15.1396 25.0645 15.1396Z'

/** The inner spark, drawn over {@link BRAND_LOGO_CLOUD_PATH}. */
export const BRAND_LOGO_SPARK_PATH = 'M22.7264 24.0812C23.9515 22.8562 24.7175 21.1729 25.0245 19.0296C25.3314 21.1729 26.0975 22.8562 27.3239 24.0824C28.5503 25.3061 30.2359 26.0711 32.3818 26.3776C30.2359 26.6842 28.5503 27.4492 27.3225 28.6741C26.0975 29.8989 25.3314 31.5824 25.0245 33.7255C24.7175 31.5824 23.9515 29.8989 22.725 28.6728C21.4986 27.4492 19.8131 26.6842 17.6671 26.3776C19.8131 26.0711 21.4986 25.3061 22.7264 24.0812V24.0812Z'

/**
 * Render the brand logo. Unlike the icon set it carries its own gradients
 * rather than riding `currentColor`, so the mark keeps one identity on light
 * and dark surfaces; both gradients take instance-safe ids.
 * @param props.size - width in px (default 24; the artwork is square).
 * @param props.className - extra class for layout placement.
 * @returns the logo svg (aria-hidden; pair with the wordmark for accessibility).
 */
export function BrandLogo({ size = 24, className }: IconProps) {
  const cloudGradientId = useId()
  const sparkGradientId = useId()
  return (
    <svg
      width={size}
      height={(size * BRAND_LOGO_VIEWBOX.height) / BRAND_LOGO_VIEWBOX.width}
      className={className}
      viewBox={`0 0 ${BRAND_LOGO_VIEWBOX.width} ${BRAND_LOGO_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={BRAND_LOGO_CLOUD_PATH} fill={`url(#${cloudGradientId})`} />
      <path fillRule="evenodd" clipRule="evenodd" d={BRAND_LOGO_SPARK_PATH} fill={`url(#${sparkGradientId})`} />
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
    </svg>
  )
}
