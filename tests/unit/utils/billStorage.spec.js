import { describe, it, expect, beforeEach } from 'vitest'
import {
  AVATAR_COLORS,
  getAvatarColor,
  calcSessionTotal,
  loadHistory,
  saveHistoryEntry,
  loadDraft,
  saveDraft,
  clearDraft,
  formatHistoryDate,
} from '@/utils/billStorage'

describe('billStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('getAvatarColor возвращает цвет из палитры', () => {
    expect(AVATAR_COLORS).toContain(getAvatarColor('Аня'))
    expect(AVATAR_COLORS).toContain(getAvatarColor('Борис', 2))
  })

  it('calcSessionTotal учитывает totalWithTips', () => {
    expect(calcSessionTotal({ totalWithTips: 500 })).toBe(500)
  })

  it('calcSessionTotal считает сумму позиций с чаевыми', () => {
    const session = {
      positions: [{ price: 100 }, { price: 200 }],
      defaultTip: 10,
    }
    expect(calcSessionTotal(session)).toBeCloseTo(330)
  })

  it('сохраняет и загружает историю', () => {
    saveHistoryEntry({ id: '1', title: 'Ужин' })
    saveHistoryEntry({ id: '2', title: 'Обед' })

    const history = loadHistory()
    expect(history).toHaveLength(2)
    expect(history[0].id).toBe('2')
  })

  it('ограничивает историю 30 записями', () => {
    for (let i = 0; i < 35; i += 1) {
      saveHistoryEntry({ id: String(i) })
    }
    expect(loadHistory()).toHaveLength(30)
  })

  it('сохраняет и очищает черновик', () => {
    saveDraft({ people: [{ name: 'Аня' }], positions: [] })
    expect(loadDraft().people[0].name).toBe('Аня')

    clearDraft()
    expect(loadDraft()).toBeNull()
  })

  it('удаляет черновик при пустых данных', () => {
    saveDraft({ people: [], positions: [] })
    expect(loadDraft()).toBeNull()
  })

  it('formatHistoryDate возвращает время для сегодняшней даты', () => {
    const now = new Date().toISOString()
    const formatted = formatHistoryDate(now)
    expect(formatted).toMatch(/\d{1,2}:\d{2}/)
  })
})
