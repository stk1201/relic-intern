/**
 * ドメイン型定義
 * Supabase 接続時は supabase/migrations のテーブル定義と 1:1 で対応させる。
 * （DB 側は snake_case、アプリ側は camelCase。変換は services 層で行う）
 */

/** 価値観の軸 */
export type ValueAxis = 'contribution' | 'mastery' | 'leadership' | 'creation' | 'stability'

export type ValueScores = Record<ValueAxis, number>

/** 最初に考えている職種 */
export type StartingRole = 'engineer' | 'business' | 'undecided'

export type CareerCategory = 'specialist' | 'management' | 'product' | 'executive' | 'business'

export interface CareerStep {
  period: string
  title: string
  description: string
}

export interface CareerSkill {
  name: string
  type: 'technical' | 'human' | 'business'
}

export interface CareerPath {
  id: string
  name: string
  shortName: string
  category: CareerCategory
  startingRoles: Exclude<StartingRole, 'undecided'>[]
  catchcopy: string
  description: string
  /** 各価値観との相性（0〜1） */
  valueWeights: ValueScores
  steps: CareerStep[]
  skills: CareerSkill[]
  experiences: string[]
  /** 実現しやすい会社の特徴（companyTraits の id） */
  traitIds: string[]
  /** 説明会・面接で確認したい質問 */
  interviewQuestions: string[]
  /** 知っておきたい現実 */
  realityCheck: string
  /** このキャリアから導かれる就活軸 */
  axisStatement: string
}

export interface CompanyTrait {
  id: string
  name: string
  description: string
  howToCheck: string
}

/* ---------- 診断（AI対話） ---------- */

export type ChatRole = 'ai' | 'user'

export interface ChatChoice {
  label: string
  value: string
  /** 選択時に加点される価値観 */
  axis?: ValueAxis
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

export interface DiagnosisAnswer {
  questionId: string
  value: string
  text: string
  axis?: ValueAxis
}

export interface DiagnosisSession {
  id: string
  startingRole: StartingRole | null
  answers: DiagnosisAnswer[]
  messages: ChatMessage[]
  createdAt: string
}

export interface PathMatch {
  pathId: string
  score: number
  reason: string
}

export interface DiagnosisResult {
  id: string
  sessionId: string
  userId: string | null
  createdAt: string
  startingRole: StartingRole
  typeName: string
  typeDescription: string
  valueScores: ValueScores
  axisStatements: string[]
  keywords: string[]
  pathMatches: PathMatch[]
  traitIds: string[]
  /** カード公開設定（Supabase では share_slug + is_public） */
  isPublic: boolean
}

/* ---------- 認証 ---------- */

export interface AppUser {
  id: string
  email: string
  nickname: string
  graduationYear: number | null
}
