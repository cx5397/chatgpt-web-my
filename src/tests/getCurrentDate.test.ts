import { describe, expect, it } from 'vitest'
import { getCurrentDate } from '@/utils/functions'

describe('getCurrentDate', () => {
  it('should return date in Y-M-D format', () => {
    const result = getCurrentDate()
    const regex = /^\d{4}-\d{1,2}-\d{1,2}$/
    expect(regex.test(result)).toBe(true)
  })

  it('should return correct year', () => {
    const result = getCurrentDate()
    const year = new Date().getFullYear()
    expect(result.startsWith(String(year))).toBe(true)
  })

  it('should not pad month and day with zeros', () => {
    const result = getCurrentDate()
    const [year, month, day] = result.split('-').map(Number)

    expect(month).toBe(new Date().getMonth() + 1)
    expect(day).toBe(new Date().getDate())

    expect(result).toBe(`${year}-${month}-${day}`)
  })

  it('should return string type', () => {
    const result = getCurrentDate()
    expect(typeof result).toBe('string')
  })
})
