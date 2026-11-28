import { storage, STORAGE_KEYS, uid } from '@/lib/storage'
import type { DiagnosisResult } from '@/types'

/**
 * 診断結果リポジトリ（ローカルストレージ）
 * 結果はこの端末のブラウザにだけ保存される。新しい順に配列で保持する。
 */
const KEY = STORAGE_KEYS.results

const all = () => storage.get<DiagnosisResult[]>(KEY, [])

export const diagnosisService = {
  async saveResult(
    input: Omit<DiagnosisResult, 'id' | 'createdAt'>,
  ): Promise<DiagnosisResult> {
    const result: DiagnosisResult = { ...input, id: uid(), createdAt: new Date().toISOString() }
    storage.set(KEY, [result, ...all()])
    return result
  },

  async getResult(id: string): Promise<DiagnosisResult | null> {
    return all().find((r) => r.id === id) ?? null
  },

  /** この端末に保存された結果（ログイン中のユーザーのもの＋未ログインで作ったもの） */
  async listResults(userId: string | null): Promise<DiagnosisResult[]> {
    return all().filter((r) => r.userId === userId || r.userId === null)
  },

  async getLatestResult(): Promise<DiagnosisResult | null> {
    return all()[0] ?? null
  },


  async deleteResult(id: string) {
    storage.set(
      KEY,
      all().filter((r) => r.id !== id),
    )
  },
}
