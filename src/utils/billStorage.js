const HISTORY_KEY = 'billHistory'
const DRAFT_KEY = 'billDraft'
const MAX_HISTORY = 30

export const AVATAR_COLORS = [
  'var(--avatar-1)',
  'var(--avatar-2)',
  'var(--avatar-3)',
  'var(--avatar-4)',
  'var(--avatar-5)',
  'var(--avatar-6)',
  'var(--avatar-7)',
]

export function getAvatarColor(name, index = 0) {
  const i = typeof index === 'number' && index >= 0
    ? index % AVATAR_COLORS.length
    : (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length
  return AVATAR_COLORS[i]
}

export function calcSessionTotal(session) {
  if (session.totalWithTips != null) return session.totalWithTips
  const sum = (session.positions || []).reduce((s, p) => s + (p.price || 0), 0)
  return sum * (1 + (session.defaultTip || 0) / 100)
}

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveHistoryEntry(entry) {
  const history = loadHistory()
  history.unshift(entry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDraft(data) {
  if (!data?.people?.length && !data?.positions?.length) {
    localStorage.removeItem(DRAFT_KEY)
    return
  }
  localStorage.setItem(DRAFT_KEY, JSON.stringify({
    ...data,
    updatedAt: new Date().toISOString(),
  }))
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY)
}

export function formatHistoryDate(iso) {
  const d = new Date(iso)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  if (isToday) {
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
