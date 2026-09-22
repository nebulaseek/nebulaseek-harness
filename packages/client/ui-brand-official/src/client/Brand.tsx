import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { NebulaSeekBrandMark, NebulaSeekBrandName } from './NebulaSeekBrand.tsx'

/**
 * Render the official mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the official whale mark.
 */
export function OfficialBrandMark({ size, className }: SidebarBrandMarkOwnerProps & { className?: string | undefined }) {
  return <NebulaSeekBrandMark size={size} className={className} />
}

/**
 * Render the official name artwork without its independently slotted mark.
 * @param props - The framework-provided brand translation seat.
 * @returns the localized name wordmark.
 */
export function OfficialBrandName({ t }: PropsLocale<'nebulaseekBrand'>) {
  return <NebulaSeekBrandName name={t('name')} />
}
