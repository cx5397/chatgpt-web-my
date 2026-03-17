import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import ChatIndex from '@/views/chat/index.vue'

const addChat = vi.fn()
const updateChat = vi.fn()
const updateChatSome = vi.fn()
const getChatByUuidAndIndex = vi.fn()

const isMobile = ref(true)

vi.mock('@/hooks/useBasicLayout', () => ({
  useBasicLayout: () => ({
    isMobile,
  }),
}))

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

  it('mobileSubmitsOnCtrlEnter', async () => {
    isMobile.value = true

    const wrapper = mount(ChatIndex, {
      global: {
        stubs: {
          Message: true,
          HoverButton: true,
          SvgIcon: true,
        },
      },
    })

    ;(wrapper.vm as any).prompt = 'hello mobile'

    const eventSubmit = {
      key: 'Enter',
      ctrlKey: true,
      preventDefault: vi.fn(),
    }

    const eventNoSubmit = {
      key: 'Enter',
      ctrlKey: false,
      preventDefault: vi.fn(),
    }

    const condition = (e: any) => e.key === 'Enter' && e.ctrlKey

    // 验证条件返回布尔值
    expect(typeof condition(eventSubmit)).toBe('boolean')
    expect(condition(eventSubmit)).toBe(true)

    // 触发提交事件
    ;(wrapper.vm as any).handleEnter(eventSubmit as any)
    await flushPromises()
    expect(eventSubmit.preventDefault).toHaveBeenCalled()

    // 触发非提交事件
    ;(wrapper.vm as any).handleEnter(eventNoSubmit as any)
    await flushPromises()
    expect(eventNoSubmit.preventDefault).not.toHaveBeenCalled()
  })
})
