import { describe, expect, it } from 'vitest'

describe('html2canvas', () => {
  it('should be function', async () => {
    const html2canvasModule = await import('html2canvas')
    const html2canvas = html2canvasModule.default || html2canvasModule

    expect(typeof html2canvas).toBe('function')
  })
})
