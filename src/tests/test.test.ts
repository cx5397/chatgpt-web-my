import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import { useBasicLayout } from '@/hooks/useBasicLayout'

const addChat = vi.fn()
const updateChat = vi.fn()
const updateChatSome = vi.fn()
const getChatByUuidAndIndex = vi.fn()
const { isMobile } = useBasicLayout()

vi.mock('@/hooks/useChat', () => ({
  useChat: () => ({
    addChat,
    updateChat,
    updateChatSome,
    getChatByUuidAndIndex,
  }),
}))

vi.mock('@/store', () => ({
  useChatStore: () => ({
    getChatByUuid: () => [],
    getChatByUuidAndIndex: () => undefined,
    addChatByUuid: vi.fn(),
    updateChatByUuid: vi.fn(),
    updateChatSomeByUuid: vi.fn(),
    deleteChatByUuid: vi.fn(),
    clearChatByUuid: vi.fn(),
  }),
}))

vi.mock('@/hooks/useScroll', () => ({
  useScroll: () => ({
    scrollRef: ref(null),
    scrollToBottom: vi.fn(),
  }),
}))

vi.mock('@/hooks/useCopyCode', () => ({
  useCopyCode: vi.fn(),
}))

vi.mock('@/api', () => ({
  fetchChatAPIProcess: vi.fn().mockResolvedValue({}),
}))

vi.mock('@/locales', () => ({
  t: (key: string) => key,
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { uuid: '1' } }),
}))

vi.mock('naive-ui', () => ({
  NButton: {
    name: 'NButton',
    template: '<button><slot /></button>',
  },
  NInput: {
    name: 'NInput',
    props: ['modelValue', 'type', 'autosize', 'placeholder'],
    emits: ['update:value', 'keypress'],
    template: '<textarea data-test-input :value="modelValue" @input="$emit(\'update:value\', $event.target.value)" @keypress="$emit(\'keypress\', $event)" />',
  },
  useDialog: () => ({ warning: vi.fn() }),
}))

describe('chatIndexPage', () => {
  it('isMobileIsBoolean', async () => {
    // 初始值应为布尔值
    expect(typeof isMobile.value).toBe('boolean')

    // 设置为 true
    isMobile.value = true
    expect(isMobile.value).toBe(true)
    expect(typeof isMobile.value).toBe('boolean')

    // 设置为 false
    isMobile.value = false
    expect(isMobile.value).toBe(false)
    expect(typeof isMobile.value).toBe('boolean')
  })
})
