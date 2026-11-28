import { sleep, storage, STORAGE_KEYS, uid } from '@/lib/storage'
import type { AppUser } from '@/types'

/**
 * 認証サービス（ローカルストレージによる簡易版）
 *
 * サーバーがないため、パスワードの照合は行わない。
 * 入力したメールアドレス・ニックネームを「この端末のプロフィール」として保存するだけで、
 * 本当の意味での認証・本人確認にはならない点に注意。
 */
const KEY = STORAGE_KEYS.user

export const authService = {
  getCurrentUser(): AppUser | null {
    return storage.get<AppUser | null>(KEY, null)
  },

  async signUp(email: string, _password: string, nickname: string, universityCode = ''): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = {
      id: uid(),
      email,
      nickname: nickname || email.split('@')[0],
      graduationYear: null,
      // デモ：コードが入力されたらサンプル大学に所属させる
      universityName: universityCode.trim() ? 'サンプル大学（デモ）' : null,
      shareWithCareerCenter: false,
    }
    storage.set(KEY, user)
    return user
  },

  async signIn(email: string, _password: string): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = { id: uid(), email, nickname: email.split('@')[0], graduationYear: null, universityName: null, shareWithCareerCenter: false }
    storage.set(KEY, user)
    return user
  },

  async signInWithGoogle(): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = { id: uid(), email: 'demo@example.com', nickname: 'ゲスト', graduationYear: null, universityName: null, shareWithCareerCenter: false }
    storage.set(KEY, user)
    return user
  },

  async updateProfile(patch: Partial<AppUser>): Promise<AppUser | null> {
    const current = this.getCurrentUser()
    if (!current) return null
    const next = { ...current, ...patch }
    storage.set(KEY, next)
    return next
  },

  async signOut() {
    storage.remove(KEY)
  },
}
