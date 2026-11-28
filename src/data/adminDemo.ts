/**
 * キャリアセンター管理画面のデモデータ（架空）
 * Supabase 接続後は、同意した学生の結果を集計する RPC（university_stats）から取得する。
 */
export const DEMO_UNIVERSITY = 'サンプル大学（デモ）'

export const DEMO_KPIS = [
  { label: '利用学生数', value: 412, note: '今年度' },
  { label: '診断完了数', value: 538, note: '再診断を含む' },
  { label: '就活軸カード作成', value: 296, note: '' },
  { label: '面談前に共有', value: 87, note: '学生が同意した件数' },
]

export const DEMO_VALUE_DIST = [
  { label: '技術・専門を極めたい', value: 142 },
  { label: '人の役に立ちたい', value: 118 },
  { label: 'ゼロから生み出したい', value: 71 },
  { label: '安定と自分らしさ', value: 49 },
  { label: '組織や事業を動かしたい', value: 32 },
]

export const DEMO_PATH_DIST = [
  { label: '技術スペシャリスト', value: 109 },
  { label: 'PM', value: 84 },
  { label: 'テックリード', value: 66 },
  { label: '社内SE', value: 52 },
  { label: 'セールスエンジニア', value: 38 },
  { label: 'EM', value: 31 },
  { label: 'CTO', value: 19 },
  { label: '起業', value: 13 },
]

export const DEMO_SHARED = [
  { nickname: 'たなか', grade: '28卒', typeName: '極める探究者', career: '技術スペシャリスト', date: '2026/11/26' },
  { nickname: 'すずき', grade: '28卒', typeName: '寄り添う伴走者', career: 'PM', date: '2026/11/25' },
  { nickname: 'やまだ', grade: '27卒', typeName: '着実なバランサー', career: '社内SE', date: '2026/11/24' },
  { nickname: 'さとう', grade: '28卒', typeName: '巻き込む開拓者', career: '起業', date: '2026/11/22' },
  { nickname: 'いとう', grade: '27卒', typeName: '極める伴走者', career: 'セールスエンジニア', date: '2026/11/20' },
]
