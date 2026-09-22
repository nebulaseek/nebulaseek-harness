import { useId } from 'react'

const CLOUD_PATH = 'M25.0244 8.00781C31.6045 8.00781 37.1437 12.0486 38.7998 17.5459C43.8345 19.3871 47.3142 23.3266 47.3145 27.8906C47.3145 34.1952 40.6757 39.3085 32.4688 39.3438C30.7708 40.6552 28.0684 41.5039 25.0244 41.5039C21.9801 41.5039 19.2771 40.6555 17.5791 39.3438C9.37264 39.3081 2.73438 34.195 2.73438 27.8906C2.73462 23.3269 6.21381 19.3872 11.248 17.5459C12.904 12.0485 18.4442 8.00781 25.0244 8.00781ZM25.0645 15.1396C21.2739 15.1399 18.133 17.9163 17.5684 21.5439C14.112 22.4938 11.6106 25.266 11.6104 28.5391C11.6104 32.5968 15.4541 35.8867 20.1963 35.8867C21.9778 35.8867 23.6321 35.4217 25.0039 34.627C22.3527 39.7938 17.7207 39.29 17.7207 39.29C24.8826 40.5535 28.4904 37.6739 29.9883 35.8828C34.6678 35.8207 38.4395 32.558 38.4395 28.5391C38.4392 25.2926 35.9772 22.5399 32.5645 21.5684C32.01 17.9287 28.8637 15.1396 25.0645 15.1396Z'
const SPARK_PATH = 'M22.7264 24.0812C23.9515 22.8562 24.7175 21.1729 25.0245 19.0296C25.3314 21.1729 26.0975 22.8562 27.3239 24.0824C28.5503 25.3061 30.2359 26.0711 32.3818 26.3776C30.2359 26.6842 28.5503 27.4492 27.3225 28.6741C26.0975 29.8989 25.3314 31.5824 25.0245 33.7255C24.7175 31.5824 23.9515 29.8989 22.725 28.6728C21.4986 27.4492 19.8131 26.6842 17.6671 26.3776C19.8131 26.0711 21.4986 25.3061 22.7264 24.0812Z'

interface BrandMarkProps {
  size: number
  className?: string | undefined
}

/** Render the NebulaSeek cloud mark without changing upstream primitive APIs. */
export function NebulaSeekBrandMark({ size, className }: BrandMarkProps) {
  const cloudGradientId = useId()
  const sparkGradientId = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 50 50" fill="none" aria-hidden="true">
      <path d={CLOUD_PATH} fill={`url(#${cloudGradientId})`} />
      <path d={SPARK_PATH} fill={`url(#${sparkGradientId})`} />
      <defs>
        <linearGradient id={cloudGradientId} x1="47" y1="40" x2="12" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07A5F9" />
          <stop offset="0.5" stopColor="#3460F8" />
          <stop offset="1" stopColor="#D365FF" />
        </linearGradient>
        <linearGradient id={sparkGradientId} x1="34" y1="34" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07A5F9" />
          <stop offset="0.5" stopColor="#8463FC" />
          <stop offset="1" stopColor="#D365FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/**
 * Render the localized wordmark used by the dedicated edition.
 * @param props - Localized brand text.
 */
export function NebulaSeekBrandName({ name }: { name: string }) {
  return (
    <svg width="96" height="32" viewBox="0 0 96 32" fill="none" aria-hidden="true">
      <text x="0" y="21" fontSize="14" fontWeight="700" letterSpacing="0.4" fill="currentColor">{name}</text>
    </svg>
  )
}
