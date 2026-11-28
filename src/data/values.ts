import type { ValueAxis } from '@/types'

export interface ValueAxisMeta {
  id: ValueAxis
  label: string
  short: string
  /** タイプ名の前半（形容） */
  adjective: string
  /** タイプ名の後半（名詞） */
  noun: string
  description: string
  axisStatement: string
  color: string
}

export const VALUE_AXES: ValueAxisMeta[] = [
  {
    id: 'contribution',
    label: '人の役に立ちたい',
    short: '貢献',
    adjective: '寄り添う',
    noun: '伴走者',
    description: '誰かの課題を解決し、感謝される瞬間にやりがいを感じる',
    axisStatement: '使う人・お客様の顔が見え、自分の仕事の価値を実感できる',
    color: '#e8590c',
  },
  {
    id: 'mastery',
    label: '技術・専門を極めたい',
    short: '探究',
    adjective: '極める',
    noun: '探究者',
    description: '一つの分野を深く掘り下げ、プロとして認められたい',
    axisStatement: '専門性を磨き続けられ、その道のプロとして評価される',
    color: '#1971c2',
  },
  {
    id: 'leadership',
    label: '組織や事業を動かしたい',
    short: '推進',
    adjective: '巻き込む',
    noun: '推進者',
    description: '人を巻き込み、チームや事業を大きく動かすことに燃える',
    axisStatement: '若手のうちから意思決定やチームづくりに関われる',
    color: '#2f9e44',
  },
  {
    id: 'creation',
    label: 'ゼロから生み出したい',
    short: '創造',
    adjective: '切り拓く',
    noun: '開拓者',
    description: 'まだ世の中にないものを企画し、形にすることにワクワクする',
    axisStatement: '新しい事業やプロダクトに、手を挙げて挑戦できる',
    color: '#9c36b5',
  },
  {
    id: 'stability',
    label: '安定と自分らしさを大切にしたい',
    short: '持続',
    adjective: '着実な',
    noun: 'バランサー',
    description: '長く健やかに働き、仕事と人生の両方を充実させたい',
    axisStatement: '長く安心して働ける環境で、自分のペースで成長できる',
    color: '#0c8599',
  },
]

export const VALUE_AXIS_MAP = Object.fromEntries(VALUE_AXES.map((a) => [a.id, a])) as Record<
  ValueAxis,
  ValueAxisMeta
>

export const STARTING_ROLE_LABEL = {
  engineer: 'エンジニア',
  business: 'ビジネス職（営業・企画・マーケ）',
  undecided: 'まだ決めていない',
} as const
