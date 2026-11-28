import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/services/authService'
import type { AppUser } from '@/types'

interface AuthContextValue {
  user: AppUser | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, nickname: string, universityCode?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (patch: Partial<AppUser>) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** ログイン状態はローカルストレージから復元する */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => authService.getCurrentUser())

  const signIn = useCallback(async (email: string, password: string) => {
    setUser(await authService.signIn(email, password))
  }, [])
  const signUp = useCallback(async (email: string, password: string, nickname: string, universityCode?: string) => {
    setUser(await authService.signUp(email, password, nickname, universityCode))
  }, [])
  const signInWithGoogle = useCallback(async () => {
    setUser(await authService.signInWithGoogle())
  }, [])
  const signOut = useCallback(async () => {
    await authService.signOut()
    setUser(null)
  }, [])
  const updateProfile = useCallback(async (patch: Partial<AppUser>) => {
    setUser(await authService.updateProfile(patch))
  }, [])

  const value = useMemo(
    () => ({ user, signIn, signUp, signInWithGoogle, signOut, updateProfile }),
    [user, signIn, signUp, signInWithGoogle, signOut, updateProfile],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
