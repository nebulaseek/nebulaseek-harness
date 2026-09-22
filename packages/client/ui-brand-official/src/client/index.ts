/** Downstream occupants for the generic browser-brand slots. */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { OfficialBrandMark, OfficialBrandName } from './Brand.tsx'
import { en, zh, zhTW } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Dedicated edition's visible wordmark. */
    nebulaseekBrand: keyof typeof en
  }
}

/** Required services: slot registry and localized brand dictionaries. */
export const inject = ['slots', 'locale']

/**
 * Fill each brand slot against its own declaration lifetime. The conversation
 * hero can be declared later than the sidebar, so it must not share the
 * sidebar registration effect.
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  if (process.env.DSH_CLIENT_BUILD_PROFILE !== 'official') return
  ctx.effect(() => ctx.locale.register('nebulaseekBrand', { zh, en }))
  ctx.effect(() => ctx.locale.register('nebulaseekBrand', 'zh-TW', zhTW))
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.register({ name: 'sidebar.brand.mark' }, OfficialBrandMark))
  ctx.slots.inject('sidebar.brand.name', () =>
    ctx.slots.register({ name: 'sidebar.brand.name', locale: 'nebulaseekBrand' }, OfficialBrandName))
  ctx.slots.inject('conversation.hero.brand.mark', () =>
    ctx.slots.register({ name: 'conversation.hero.brand.mark' }, OfficialBrandMark))
}
