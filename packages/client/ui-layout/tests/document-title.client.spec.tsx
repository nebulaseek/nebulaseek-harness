// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { DocumentTitle } from '../src/client/DocumentTitle.tsx'

afterEach(() => {
  cleanup()
  document.title = ''
  vi.unstubAllEnvs()
})

describe('DocumentTitle', () => {
  it('projects a durable title and restores the product title', () => {
    vi.stubEnv('DSH_CLIENT_TITLE', 'Xingyunxunzhi')
    document.title = 'stale title'
    const mounted = render(<DocumentTitle productTitle="Xingyunxunzhi" />)
    expect(document.title).toBe('Xingyunxunzhi')
    mounted.rerender(<DocumentTitle title="First title" productTitle="Xingyunxunzhi" />)
    expect(document.title).toBe('First title — Xingyunxunzhi')
    mounted.rerender(<DocumentTitle title="Revised title" productTitle="Xingyunxunzhi" />)
    expect(document.title).toBe('Revised title — Xingyunxunzhi')
    mounted.rerender(<DocumentTitle productTitle="Xingyunxunzhi" />)
    expect(document.title).toBe('Xingyunxunzhi')
    mounted.unmount()
    expect(document.title).toBe('Xingyunxunzhi')
  })

  it('uses the generic title when the build provides no title', () => {
    vi.stubEnv('DSH_CLIENT_TITLE', '')
    delete process.env.DSH_CLIENT_TITLE
    const mounted = render(<DocumentTitle title="First title" productTitle="DSH Local Build" />)
    expect(document.title).toBe('First title — DSH Local Build')
    mounted.unmount()
    expect(document.title).toBe('DSH Local Build')
  })
})
