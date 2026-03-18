// __tests__/importData.spec.ts
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import General from '@/components/common/Setting/General.vue'

// Mock store
vi.mock('@/store', () => ({
  useAppStore: () => ({
    theme: 'light',
    language: 'zh-CN',
    setTheme: vi.fn(),
    setLanguage: vi.fn(),
  }),
  useUserStore: () => ({
    userInfo: {
      avatar: '',
      name: '',
      description: '',
    },
    updateUserInfo: vi.fn(),
    resetUserInfo: vi.fn(),
  }),
}))

// Mock naive-ui
vi.mock('naive-ui', () => ({
  NButton: { name: 'NButton', template: '<button><slot /></button>' },
  NInput: { name: 'NInput', template: '<input />' },
  useMessage: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  }),
}))

// Mock locales
vi.mock('@/locales', () => ({
  t: (key: string) => key,
}))

describe('Setting/General.vue', () => {
  it('importData 方法应该存在', () => {
    // 挂载组件
    const wrapper = mount(General, {
      global: {
        stubs: {
          SvgIcon: true,
        },
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

    // 验证 importData 方法存在
    expect((wrapper.vm as any).importData).toBeDefined()
  })
})
