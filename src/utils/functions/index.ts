import { useMessage } from 'naive-ui'
import { t } from '@/locales'

export function getCurrentDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return `${year}-${month}-${day}`
}

export function handleExportChat(successMsg?: string) {
  const ms = useMessage()
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

  ms.success(successMsg ?? t('chat.exportSuccess'))
}
