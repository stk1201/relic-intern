import { storage, uid } from '@/lib/storage'
import type { DiagnosisResult } from '@/types'

/**
 * 診断結果リポジトリ（モック：localStorage）
 *
 * ▼ Supabase 接続時の差し替えイメージ
 *   saveResult   → supabase.from('diagnosis_results').insert(toRow(result)).select().single()
 *   getResult    → supabase.from('diagnosis_results').select('*').eq('id', id).single()
 *   listResults  → supabase.from('diagnosis_results').select('*').eq('user_id', userId).order('created_at', { ascending: false })
 *   deleteResult → supabase.from('diagnosis_results').delete().eq('id', id)
 */
const KEY = 'results'

const all = () => storage.get<DiagnosisResult[]>(KEY, [])

export const diagnosisService = {
  async saveResult(
    input: Omit<DiagnosisResult, 'id' | 'createdAt' | 'isPublic'>,
  ): Promise<DiagnosisResult> {
    const result: DiagnosisResult = { ...input, id: uid(), createdAt: new Date().toISOString(), isPublic: false }
    storage.set(KEY, [result, ...all()])
    return result
  },

  async getResult(id: string): Promise<DiagnosisResult | null> {
    return all().find((r) => r.id === id) ?? null
  },

  async listResults(userId: string | null): Promise<DiagnosisResult[]> {
    // モックでは未ログインの結果も表示（端末内に保存されたもの）
    return all().filter((r) => r.userId === userId || r.userId === null)
  },

  async getLatestResult(): Promise<DiagnosisResult | null> {
    return all()[0] ?? null
  },

  async updateVisibility(id: string, isPublic: boolean) {
    storage.set(
      KEY,
      all().map((r) => (r.id === id ? { ...r, isPublic } : r)),
    )
  },

  async deleteResult(id: string) {
    storage.set(
      KEY,
      all().filter((r) => r.id !== id),
    )
  },
}
