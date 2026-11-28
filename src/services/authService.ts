import { sleep, storage, uid } from '@/lib/storage'
import type { AppUser } from '@/types'

/**
 * 認証サービス（モック）
 *
 * ▼ Supabase 接続時の差し替えイメージ
 *   signUp  → supabase.auth.signUp({ email, password, options: { data: { nickname } } })
 *   signIn  → supabase.auth.signInWithPassword({ email, password })
 *   google  → supabase.auth.signInWithOAuth({ provider: 'google' })
 *   signOut → supabase.auth.signOut()
 *   profile → profiles テーブル（auth.users と 1:1）
 */
const KEY = 'user'

export const authService = {
  getCurrentUser(): AppUser | null {
    return storage.get<AppUser | null>(KEY, null)
  },

  async signUp(email: string, _password: string, nickname: string): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = { id: uid(), email, nickname: nickname || email.split('@')[0], graduationYear: null }
    storage.set(KEY, user)
    return user
  },

  async signIn(email: string, _password: string): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = { id: uid(), email, nickname: email.split('@')[0], graduationYear: null }
    storage.set(KEY, user)
    return user
  },

  async signInWithGoogle(): Promise<AppUser> {
    await sleep(700)
    const user: AppUser = { id: uid(), email: 'demo@example.com', nickname: 'ゲスト', graduationYear: null }
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
