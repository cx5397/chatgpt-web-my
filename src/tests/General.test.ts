// __tests__/General.spec.ts
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import General from '@/components/common/Setting/General.vue'

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

vi.mock('naive-ui', () => ({
  NButton: { name: 'NButton', template: '<button><slot /></button>' },
  NInput: { name: 'NInput', template: '<input />' },
  useMessage: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  }),
}))

vi.mock('@/locales', () => ({
  t: (key: string) => key,
}))

vi.mock('@/utils/functions', () => ({
  getCurrentDate: () => '2024-01-01',
}))

describe('Setting/General.vue', () => {
  it('should not have  emit update', () => {
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

    expect((wrapper.vm.$options.emits || []).includes('update')).toBe(false)
  })
})
