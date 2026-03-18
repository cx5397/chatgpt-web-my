<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NInput, useMessage } from 'naive-ui'
import type { Language, Theme } from '@/store/modules/app/helper'
import { SvgIcon } from '@/components/common'
import { useAppStore, useUserStore } from '@/store'
import { getCurrentDate } from '@/utils/functions'
import type { UserInfo } from '@/store/modules/user/helper'
import { t } from '@/locales'

const appStore = useAppStore()
const userStore = useUserStore()

const ms = useMessage()

const theme = computed(() => appStore.theme)

const userInfo = computed(() => userStore.userInfo)

const avatar = ref(userInfo.value.avatar ?? '')

const name = ref(userInfo.value.name ?? '')

const description = ref(userInfo.value.description ?? '')

const language = computed({
  get() {
    return appStore.language
  },
  set(value: Language) {
    appStore.setLanguage(value)
  },
})

const themeOptions: { label: string; key: Theme; icon: string }[] = [
  {
    label: 'Auto',
    key: 'auto',
    icon: 'ri:contrast-line',
  },
  {
    label: 'Light',
    key: 'light',
    icon: 'ri:sun-foggy-line',
  },
  {
    label: 'Dark',
    key: 'dark',
    icon: 'ri:moon-foggy-line',
  },
]

const languageOptions: { label: string; key: Language; value: Language }[] = [
  { label: '中文', key: 'zh-CN', value: 'zh-CN' },
  { label: 'English', key: 'en-US', value: 'en-US' },
]

function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options)
  ms.success(t('common.success'))
}

function handleReset() {
  userStore.resetUserInfo()
  ms.success(t('common.success'))
  window.location.reload()
}

const fileInput = ref<HTMLInputElement | null>(null)

function importData(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const data = event.target?.result as string
      const parsed = JSON.parse(data)
      localStorage.setItem('chatStorage', JSON.stringify(parsed))
      ms.success(t('chat.importSuccess'))
      window.location.reload()
    }
    catch {
      ms.error(t('chat.importFailed'))
    }
  }
  reader.readAsText(file)
  target.value = ''
}

function handleExportChat() {
  const localData = localStorage.getItem('chatStorage')
  if (!localData) {
    ms.warning(t('chat.noData'))
    return
  }

  const blob = new Blob([localData], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chat-store_${getCurrentDate()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  ms.success(t('chat.exportSuccess'))
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.avatarLink') }}</span>
        <div class="flex-1">
          <NInput v-model:value="avatar" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo({ avatar })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.name') }}</span>
        <div class="w-[200px]">
          <NInput v-model:value="name" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo({ name })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.description') }}</span>
        <div class="flex-1">
          <NInput v-model:value="description" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo({ description })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.resetUserInfo') }}</span>
        <NButton text type="primary" @click="handleReset">
          {{ $t('common.reset') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.theme') }}</span>
        <div class="flex items-center space-x-4">
          <template v-for="item of themeOptions" :key="item.key">
            <a
              class="flex items-center justify-center h-8 px-4 border rounded-md cursor-pointer dark:border-neutral-700"
              :class="item.key === theme && ['bg-[#4ca85e]', 'border-[#4ca85e]', 'text-white']"
              @click="appStore.setTheme(item.key)"
            >
              <span class="text-xl">
                <SvgIcon :icon="item.icon" />
              </span>
            </a>
          </template>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.language') }}</span>
        <div class="flex items-center space-x-4">
          <template v-for="item of languageOptions" :key="item.key">
            <a
              class="flex items-center justify-center h-8 px-4 border rounded-md cursor-pointer dark:border-neutral-700"
              :class="item.key === language && ['bg-[#4ca85e]', 'border-[#4ca85e]', 'text-white']"
              @click="appStore.setLanguage(item.key)"
            >
              <span class="text-sm">
                {{ item.label }}
              </span>
            </a>
          </template>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('chat.exportChat') }}</span>
        <NButton type="primary" @click="handleExportChat">
          <template #icon>
            <SvgIcon icon="ri:download-line" />
          </template>
          {{ $t('chat.exportChat') }}
        </NButton>
        <NButton type="primary" @click="fileInput?.click()">
          <template #icon>
            <SvgIcon icon="ri:upload-line" />
          </template>
          {{ $t('chat.importChat') }}
        </NButton>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept=".json"
          @change="importData"
        >
      </div>
    </div>
  </div>
</template>
