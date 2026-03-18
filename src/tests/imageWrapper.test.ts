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

vi.mock('naive-ui', async (importOriginal) => {
  const actual = await importOriginal() as Record<string, any>
  return {
    ...actual,
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
    useMessage: () => ({ warning: vi.fn(), success: vi.fn(), error: vi.fn() }),
  }
})

describe('chatIndexPage - image-wrapper', () => {
  it('should have #image-wrapper element', async () => {
    const wrapper = mount(ChatIndex, {
      global: {
        stubs: {
          Message: true,
          HoverButton: true,
          SvgIcon: true,
        },
      },
    })

    const imageWrapper = wrapper.element.querySelector('#image-wrapper')
    expect(imageWrapper).not.toBeNull()
  })
})
