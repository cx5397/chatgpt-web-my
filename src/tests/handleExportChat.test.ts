import { describe, expect, it, vi } from 'vitest'

vi.mock('naive-ui', () => ({
  useMessage: () => ({
    warning: vi.fn(),
    success: vi.fn(),
  }),
}))

vi.mock('@/locales', () => ({
  t: (key: string) => key,
}))

describe('handleExportChat', () => {
  it('should be exported as a function', async () => {
    const { handleExportChat } = await import('@/utils/functions')
    expect(typeof handleExportChat).toBe('function')
  })

  it('should exist in utils/functions', async () => {
    const module = await import('@/utils/functions')
    expect(module.handleExportChat).toBeDefined()
  })
})
