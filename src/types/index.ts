/**
 * ドメイン型定義
 * ローカルストレージにはこの型のまま JSON で保存する。
 */

/** 価値観の軸 */
export type ValueAxis = 'contribution' | 'mastery' | 'leadership' | 'creation' | 'stability'

export type ValueScores = Record<ValueAxis, number>

/** 興味のあるエンジニア分野 */
export type EngineerField = 'web' | 'infra' | 'data' | 'undecided'

export type CareerCategory = 'specialist' | 'management' | 'product' | 'executive' | 'support'

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
  engineerField: EngineerField | null
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
  engineerField: EngineerField
  typeName: string
  typeDescription: string
  valueScores: ValueScores
  axisStatements: string[]
  keywords: string[]
  pathMatches: PathMatch[]
  traitIds: string[]
}

/* ---------- 認証 ---------- */

export interface AppUser {
  id: string
  email: string
  nickname: string
  graduationYear: number | null
  /** 大学の招待コードで紐づく（デモ） */
  universityName: string | null
  /** キャリアセンターへの結果共有に同意しているか */
  shareWithCareerCenter: boolean
}

/* ---------- 企業（架空のサンプルデータ） ---------- */

export type CompanySize = 'スタートアップ' | 'メガベンチャー' | '大手企業' | '中堅企業'

export interface Company {
  id: string
  name: string
  industry: string
  size: CompanySize
  employees: string
  tagline: string
  description: string
  engineerFields: Exclude<EngineerField, 'undecided'>[]
  traitIds: string[]
  careerPathIds: string[]
  /** 制度・環境の具体例 */
  highlights: string[]
  /** ロゴ代わりの色 */
  color: string
}
