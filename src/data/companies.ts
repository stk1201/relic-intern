import type { Company, DiagnosisResult } from '@/types'

/**
 * 企業データ（すべて架空のサンプル）
 * 実在の企業・団体とは関係ありません。
 */
export const COMPANIES: Company[] = [
  {
    id: 'miraicraft',
    name: '株式会社ミライクラフト',
    industry: '業務効率化SaaS',
    size: 'スタートアップ',
    employees: '約40名',
    tagline: '1年目から事業づくりの最前線へ',
    description: '中小企業向けの業務効率化SaaSを開発。エンジニアも顧客インタビューや事業計画の議論に参加します。',
    engineerFields: ['web'],
    traitIds: ['young-discretion', 'small-team', 'new-business', 'side-project'],
    careerPathIds: ['founder', 'cto', 'pm'],
    highlights: ['新規事業コンテストに年次問わず応募可', '全社会議で事業の数字を毎月共有', '個人開発・副業OK'],
    color: '#e8590c',
  },
  {
    id: 'nodeworks',
    name: 'ノードワークス株式会社',
    industry: '自社Webサービス',
    size: 'メガベンチャー',
    employees: '約1,200名',
    tagline: '専門性でもマネジメントでも、上を目指せる',
    description: '複数の生活系Webサービスを運営。エンジニア向けに専門職とマネジメント職の2つの等級ラインを用意しています。',
    engineerFields: ['web', 'infra'],
    traitIds: ['dual-ladder', 'tech-culture', 'pdm-role', 'job-change'],
    careerPathIds: ['specialist', 'techlead', 'pm'],
    highlights: ['プリンシパルエンジニア職あり', '技術ブログ・登壇支援', '社内公募でPMへの転向実績あり'],
    color: '#1971c2',
  },
  {
    id: 'hidamari',
    name: '株式会社ひだまりヘルスケア',
    industry: '医療・ヘルスケアアプリ',
    size: '中堅企業',
    employees: '約300名',
    tagline: '使う人の「ありがとう」が届く開発',
    description: '通院・服薬をサポートするアプリを開発。エンジニアも医療現場のヒアリングに同行します。',
    engineerFields: ['web', 'data'],
    traitIds: ['user-close', 'mentoring', 'pdm-role', 'young-discretion'],
    careerPathIds: ['pm', 'em', 'techlead'],
    highlights: ['新人1人に1人のメンター', 'ユーザーインタビューに全職種が参加', 'アソシエイトPM制度'],
    color: '#2f9e44',
  },
  {
    id: 'cloudbase',
    name: 'クラウドベース・テクノロジーズ株式会社',
    industry: 'クラウド基盤・インフラ',
    size: '大手企業',
    employees: '約3,000名',
    tagline: '社会を支える基盤技術を、とことん深く',
    description: '企業向けのクラウド基盤を提供。大規模インフラの設計・運用や、顧客への技術提案を担います。',
    engineerFields: ['infra'],
    traitIds: ['dual-ladder', 'tech-culture', 'mentoring', 'user-close'],
    careerPathIds: ['specialist', 'solution-engineer', 'techlead'],
    highlights: ['半年間の新人技術研修', 'クラウド資格の取得費用を全額補助', 'ソリューションアーキテクト職への転向制度'],
    color: '#0c8599',
  },
  {
    id: 'aoba',
    name: '株式会社あおば物産（デジタル推進部）',
    industry: '総合小売・流通',
    size: '大手企業',
    employees: '約8,000名（デジタル推進部 約80名）',
    tagline: 'ITで、毎日のお買い物と働く人を支える',
    description: '全国に店舗を持つ小売企業の社内IT部門。店舗・物流の業務改善やシステム内製化を進めています。',
    engineerFields: ['web', 'infra'],
    traitIds: ['stable-base', 'mentoring', 'job-change', 'user-close'],
    careerPathIds: ['corporate-se', 'pm', 'em'],
    highlights: ['平均残業 月15時間程度', '店舗研修で現場を体験', 'システム内製化を推進中'],
    color: '#5c940d',
  },
  {
    id: 'dataleaf',
    name: 'データリーフ株式会社',
    industry: 'AI・データ分析',
    size: 'スタートアップ',
    employees: '約90名',
    tagline: 'AIの研究と実装を、同じチームで',
    description: '製造業・物流向けにAIによる需要予測サービスを提供。論文の実装から本番運用までを少人数で担います。',
    engineerFields: ['data'],
    traitIds: ['tech-culture', 'young-discretion', 'small-team', 'dual-ladder'],
    careerPathIds: ['specialist', 'techlead', 'cto'],
    highlights: ['週1回の論文輪読会', '学会参加費を補助', '入社2年目で技術選定を担当した例あり'],
    color: '#7048e8',
  },
  {
    id: 'tsunagu',
    name: '株式会社つなぐソリューションズ',
    industry: '法人向けSaaS',
    size: '中堅企業',
    employees: '約500名',
    tagline: 'お客様の課題に、技術で伴走する',
    description: '営業支援SaaSを展開。開発チームとカスタマーサクセスの距離が近く、エンジニアの職種転換も活発です。',
    engineerFields: ['web'],
    traitIds: ['user-close', 'job-change', 'mentoring', 'manager-training'],
    careerPathIds: ['solution-engineer', 'em', 'pm'],
    highlights: ['開発→セールスエンジニアの転向実績多数', '週1回の1on1', '新任マネージャー研修'],
    color: '#d6336c',
  },
  {
    id: 'learninggate',
    name: '株式会社ラーニングゲート',
    industry: '教育（EdTech）',
    size: 'メガベンチャー',
    employees: '約700名',
    tagline: '学びの未来を、チームでつくる',
    description: '学習アプリと学校向けサービスを運営。チームづくりと人材育成に力を入れ、若手リーダーを積極的に登用しています。',
    engineerFields: ['web', 'data'],
    traitIds: ['manager-training', 'mentoring', 'new-business', 'young-discretion'],
    careerPathIds: ['em', 'pm', 'founder'],
    highlights: ['20代のEM・チームリーダー多数', '社内起業制度から3事業が誕生', 'コーチング研修を全社で実施'],
    color: '#f08c00',
  },
]

export const COMPANY_MAP = Object.fromEntries(COMPANIES.map((c) => [c.id, c])) as Record<string, Company>

/** 診断結果と企業の一致度（会社の特徴の重なり＋目指すキャリアの実現しやすさ） */
export function matchCompanies(result: DiagnosisResult, limit = 3) {
  const topPathIds = result.pathMatches.slice(0, 3).map((m) => m.pathId)
  return COMPANIES.map((c) => {
    const traitHits = result.traitIds.filter((t) => c.traitIds.includes(t))
    const traitScore = result.traitIds.reduce(
      (s, t, i) => s + (c.traitIds.includes(t) ? result.traitIds.length - i : 0),
      0,
    )
    const pathScore = topPathIds.reduce((s, p, i) => s + (c.careerPathIds.includes(p) ? (3 - i) * 2 : 0), 0)
    const fieldBonus = result.engineerField !== 'undecided' && c.engineerFields.includes(result.engineerField) ? 2 : 0
    return { company: c, score: traitScore + pathScore + fieldBonus, traitHits }
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
