import type { CompanyTrait } from '@/types'

export const COMPANY_TRAITS: CompanyTrait[] = [
  {
    id: 'job-change',
    name: '職種転換・社内公募制度',
    description: 'エンジニア→PM、営業→企画など、社内で職種を変えられる仕組みがある。',
    howToCheck: '「直近3年で職種転換した人は何人いますか？」と実績の数で確認する',
  },
  {
    id: 'mentoring',
    name: '育成体制（メンター・OJT）',
    description: '新人に先輩がつき、体系的に育てる文化と時間がある。',
    howToCheck: '「1年目のメンター制度や研修期間は？」「最初の配属後の1日の流れは？」',
  },
  {
    id: 'young-discretion',
    name: '若手への裁量',
    description: '年次に関係なく、手を挙げればプロジェクトや意思決定を任される。',
    howToCheck: '「入社2〜3年目の方が担当している仕事の具体例は？」',
  },
  {
    id: 'dual-ladder',
    name: '専門職・管理職の複線型キャリア',
    description: 'マネージャーにならなくても、専門性で昇格・昇給できる等級制度がある。',
    howToCheck: '「マネジメントをしない上位職（プリンシパル等）はありますか？」',
  },
  {
    id: 'tech-culture',
    name: '技術発信・学習文化',
    description: '勉強会、技術ブログ、カンファレンス登壇・参加支援などが活発。',
    howToCheck: '技術ブログの更新頻度や登壇実績を事前に調べ、面接で触れる',
  },
  {
    id: 'new-business',
    name: '新規事業・社内起業制度',
    description: '社員が事業アイデアを提案し、実際に立ち上げられる制度がある。',
    howToCheck: '「新規事業制度から生まれたサービスの例と、提案者の年次は？」',
  },
  {
    id: 'pdm-role',
    name: 'PM・プロダクト職の存在',
    description: 'プロダクトマネージャーが職種として確立し、キャリアの選択肢になっている。',
    howToCheck: '「PMはどんな経歴の方が多いですか？エンジニア出身の方は？」',
  },
  {
    id: 'manager-training',
    name: 'マネジメント育成',
    description: 'リーダー研修や1on1文化があり、マネージャーを計画的に育てている。',
    howToCheck: '「初めてマネージャーになる方へのサポートは？」',
  },
  {
    id: 'user-close',
    name: 'ユーザーとの距離が近い',
    description: '自社サービス・顧客と直接話す機会があり、反応がダイレクトに届く。',
    howToCheck: '「エンジニア（職種名）がユーザーと話す機会はありますか？」',
  },
  {
    id: 'small-team',
    name: '少人数・フラットなチーム',
    description: '一人ひとりの担当範囲が広く、事業全体を見渡しやすい。',
    howToCheck: '「1チームの人数と、職種構成を教えてください」',
  },
  {
    id: 'side-project',
    name: '副業・社外活動OK',
    description: '副業や個人開発、社外コミュニティでの活動が認められている。',
    howToCheck: '就業規則や社員インタビューで副業事例を確認する',
  },
  {
    id: 'stable-base',
    name: '安定した事業基盤と働きやすさ',
    description: '収益が安定し、休暇・リモート・残業時間などの制度が実際に使われている。',
    howToCheck: '平均残業時間・有休取得率・育休取得率を数字で確認する',
  },
]

export const COMPANY_TRAIT_MAP = Object.fromEntries(COMPANY_TRAITS.map((t) => [t.id, t])) as Record<
  string,
  CompanyTrait
>
