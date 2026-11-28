/** localStorage の薄いラッパー（モック用の永続化） */
const PREFIX = 'career-navi:'

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(PREFIX + key)
  },
}

export const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
