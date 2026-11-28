/**
 * ローカルストレージによる永続化
 *
 * このアプリのデータはすべてブラウザの localStorage に保存され、外部には送信されない。
 * キーは STORAGE_KEYS に集約し、"career-navi:" プレフィックスを付けて保存する。
 */
const PREFIX = 'career-navi:'

/** データ形式を変えたら上げる（古いデータの移行・破棄の判断に使う） */
export const STORAGE_VERSION = 1

export const STORAGE_KEYS = {
  version: 'version',
  user: 'user',
  results: 'results',
  inquiries: 'inquiries',
  /** スキルチェックはキャリアごと：skill-checks:{pathId} */
  skillChecks: (pathId: string) => `skill-checks:${pathId}`,
} as const

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
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      // 容量超過・プライベートモードなどで保存できない場合は、画面上の状態だけで続行する
    }
  },
  remove(key: string) {
    localStorage.removeItem(PREFIX + key)
  },

  /** このアプリが保存したキー（プレフィックスなし）の一覧 */
  keys(): string[] {
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .map((k) => k.slice(PREFIX.length))
  },

  /** この端末に保存したデータをすべてJSONで書き出す */
  exportAll(): Record<string, unknown> {
    return Object.fromEntries(this.keys().map((k) => [k, this.get<unknown>(k, null)]))
  },

  /** この端末に保存したデータをすべて削除 */
  clearAll() {
    this.keys().forEach((k) => this.remove(k))
  },
}

/** 起動時に一度呼ぶ。保存形式のバージョンを記録する */
export function initStorage() {
  const saved = storage.get<number | null>(STORAGE_KEYS.version, null)
  if (saved === null || saved < STORAGE_VERSION) {
    // 今後形式を変えたときは、ここで古いデータを移行する
    storage.set(STORAGE_KEYS.version, STORAGE_VERSION)
  }
}

export const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
