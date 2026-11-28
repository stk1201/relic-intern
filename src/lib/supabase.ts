import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase クライアント
 * .env.local に VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY を設定すると有効になる。
 * 未設定の間は null を返し、services 層はローカル（モック）実装で動作する。
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseEnabled = supabase !== null
