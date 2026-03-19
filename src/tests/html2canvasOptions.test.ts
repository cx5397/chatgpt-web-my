import { describe, expect, it } from 'vitest'
import messages from '@/locales/zh-CN.ts'

describe('i18n keys', () => {
  it('chat.exportImage should exist', () => {
    expect(messages.chat).toHaveProperty('exportImage')
  })
})
