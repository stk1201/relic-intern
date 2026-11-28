import type { CareerCategory, CareerPath } from '@/types'

/**
 * キャリアパスのマスターデータ
 */
export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'specialist',
    name: '技術スペシャリスト',
    shortName: 'スペシャリスト',
    category: 'specialist',
    catchcopy: 'ひとつの技術を極め、「この領域ならあの人」と呼ばれる',
    description:
      'インフラ、セキュリティ、機械学習、フロントエンドなど特定領域を深く追求し、難易度の高い課題を技術で解決します。社外でも通用する専門性が武器になります。',
    valueWeights: { contribution: 0.3, mastery: 1, leadership: 0.1, creation: 0.3, stability: 0.5 },
    steps: [
      { period: '1〜3年目', title: '基礎固め', description: '幅広く開発を経験しながら、得意領域の当たりをつける' },
      { period: '4〜7年目', title: '領域の第一人者へ', description: '特定技術でチーム内の相談役に。社外発信も始める' },
      { period: '8年目〜', title: 'エキスパート / プリンシパル', description: '全社の技術課題を解決し、業界でも名前が知られる存在に' },
    ],
    skills: [
      { name: '特定領域の深い技術知識', type: 'technical' },
      { name: 'コンピュータサイエンスの基礎', type: 'technical' },
      { name: '技術調査・検証力', type: 'technical' },
      { name: '技術を言語化して伝える力', type: 'human' },
      { name: '継続的な学習習慣', type: 'human' },
      { name: '技術の事業インパクト理解', type: 'business' },
    ],
    experiences: [
      '大規模・高負荷なシステムの運用経験',
      '技術ブログやカンファレンスでの発信',
      'OSSへのコントリビュート',
      '難易度の高い障害対応・性能改善',
    ],
    traitIds: ['dual-ladder', 'tech-culture', 'mentoring', 'side-project'],
    interviewQuestions: [
      'マネジメントをしない上位職はありますか？どんな方が就いていますか？',
      '技術選定はどのように決まりますか？若手の意見は反映されますか？',
      '勉強会や書籍・カンファレンス参加の支援はありますか？',
    ],
    realityCheck:
      '会社によっては「昇進＝管理職」しか道がない場合も。専門職として評価される等級制度があるかは必ず確認しましょう。',
    axisStatement: '専門職として評価・昇格できる「複線型」の制度がある',
  },
  {
    id: 'techlead',
    name: 'テックリード',
    shortName: 'テックリード',
    category: 'specialist',
    catchcopy: '技術でチームを導く、開発現場の羅針盤',
    description:
      'チームの技術的な意思決定をリードし、設計方針やコード品質に責任を持ちます。自ら手を動かしつつ、メンバーの技術力を引き上げる役割です。',
    valueWeights: { contribution: 0.4, mastery: 0.8, leadership: 0.6, creation: 0.3, stability: 0.3 },
    steps: [
      { period: '1〜3年目', title: '一人前の開発者へ', description: '機能開発を一通り自走できるようになる' },
      { period: '3〜5年目', title: 'サブリーダー', description: '設計レビューや新人のコードレビューを担当' },
      { period: '5年目〜', title: 'テックリード', description: 'アーキテクチャを決め、チームの技術方針を牽引する' },
    ],
    skills: [
      { name: 'システム設計・アーキテクチャ', type: 'technical' },
      { name: 'コードレビュー力', type: 'technical' },
      { name: '技術的負債の判断', type: 'technical' },
      { name: '合意形成・ファシリテーション', type: 'human' },
      { name: 'メンバーの育成', type: 'human' },
      { name: 'ビジネス要件の理解', type: 'business' },
    ],
    experiences: [
      '0→1でのシステム設計',
      'リプレイスや大規模リファクタリング',
      '後輩のメンター経験',
      '他職種（PM・デザイナー）との協働',
    ],
    traitIds: ['young-discretion', 'tech-culture', 'mentoring', 'dual-ladder'],
    interviewQuestions: [
      '若手が設計やレビューを任されるのは何年目くらいからですか？',
      'テックリードとEMの役割分担はどうなっていますか？',
      '技術的負債の解消に時間を割けていますか？',
    ],
    realityCheck:
      '技術力だけでなく「人に説明し、納得してもらう力」が求められます。手を動かす時間は減る傾向にあります。',
    axisStatement: '若手のうちから設計やコードレビューを任せてもらえる',
  },
  {
    id: 'pm',
    name: 'プロダクトマネージャー（PM）',
    shortName: 'PM',
    category: 'product',
    catchcopy: '「何をつくるか」を決め、ユーザーと事業の成功に責任を持つ',
    description:
      'ユーザーの課題を見極め、プロダクトの方向性や優先順位を決めます。エンジニア・デザイナー・ビジネス側をつなぎ、価値あるものを届ける“ミニCEO”とも呼ばれる役割です。',
    valueWeights: { contribution: 0.8, mastery: 0.3, leadership: 0.6, creation: 0.7, stability: 0.2 },
    steps: [
      { period: '1〜3年目', title: '現場の専門性を磨く', description: 'エンジニアとして開発しながら、プロダクトとユーザーを深く理解する' },
      { period: '3〜5年目', title: 'アソシエイトPM', description: '機能単位で企画〜リリースまでを担当する' },
      { period: '5年目〜', title: 'PM / プロダクト責任者', description: 'プロダクト全体の戦略とロードマップを描く' },
    ],
    skills: [
      { name: 'ユーザーリサーチ・課題発見', type: 'business' },
      { name: 'データ分析（SQL・指標設計）', type: 'technical' },
      { name: '開発プロセスの理解', type: 'technical' },
      { name: '優先順位づけ・意思決定', type: 'business' },
      { name: '関係者を巻き込む力', type: 'human' },
      { name: 'ドキュメント・言語化力', type: 'human' },
    ],
    experiences: [
      'ユーザーインタビューの実施',
      '機能の企画からリリースまでの一貫担当',
      '数値目標（KPI）を追った経験',
      '複数職種とのプロジェクト推進',
    ],
    traitIds: ['pdm-role', 'job-change', 'user-close', 'young-discretion'],
    interviewQuestions: [
      'PMの方はどんな職種から転向されていますか？',
      '自社プロダクトの意思決定はどのように行われていますか？',
      'エンジニアがユーザーインタビューに同席する機会はありますか？',
    ],
    realityCheck:
      '新卒でいきなりPMになれる会社は少数です。多くはエンジニアとして数年開発を経験してから転向します。開発経験はPMの大きな武器になります。',
    axisStatement: '自社プロダクトを持ち、職種を越えて企画に関われる',
  },
  {
    id: 'em',
    name: 'エンジニアリングマネージャー（EM）',
    shortName: 'EM',
    category: 'management',
    catchcopy: '人とチームを育て、強い開発組織をつくる',
    description:
      'エンジニアの採用・評価・育成・1on1などを通じて、チームが最大の成果を出せる環境をつくります。技術を理解したうえで「人」に向き合う仕事です。',
    valueWeights: { contribution: 0.7, mastery: 0.3, leadership: 0.9, creation: 0.2, stability: 0.3 },
    steps: [
      { period: '1〜3年目', title: '開発者として成果を出す', description: '技術の土台をつくり、チームで信頼を得る' },
      { period: '4〜6年目', title: 'チームリーダー', description: '数名のメンバーのタスク管理やフォローを担う' },
      { period: '6年目〜', title: 'EM / 開発部長', description: '組織設計・採用・評価に責任を持つ' },
    ],
    skills: [
      { name: '1on1・コーチング', type: 'human' },
      { name: '採用・評価の設計', type: 'business' },
      { name: 'プロジェクトマネジメント', type: 'business' },
      { name: '開発全般の技術理解', type: 'technical' },
      { name: '心理的安全性のあるチームづくり', type: 'human' },
      { name: '組織課題の言語化', type: 'human' },
    ],
    experiences: [
      '後輩・新人の育成担当',
      'チームの目標設定と振り返りの主導',
      '採用面接への参加',
      '部活・サークルなどでの組織運営',
    ],
    traitIds: ['manager-training', 'mentoring', 'young-discretion', 'small-team'],
    interviewQuestions: [
      '初めてマネージャーになる方への研修やサポートはありますか？',
      '1on1はどのくらいの頻度で行われていますか？',
      'EMとテックリードのキャリアは選べますか？',
    ],
    realityCheck:
      'コードを書く時間は大きく減ります。「チームの成果＝自分の成果」と思えるかが向き不向きの分かれ目です。',
    axisStatement: '1on1や育成の文化があり、マネジメントを学べる',
  },
  {
    id: 'cto',
    name: 'CTO・技術責任者',
    shortName: 'CTO',
    category: 'executive',
    catchcopy: '技術で経営をリードし、会社の未来を描く',
    description:
      '経営陣の一員として、技術戦略・開発組織・技術投資の意思決定を担います。事業と技術の両方を理解し、会社の成長を技術面から牽引します。',
    valueWeights: { contribution: 0.3, mastery: 0.6, leadership: 0.9, creation: 0.6, stability: 0 },
    steps: [
      { period: '1〜4年目', title: '技術と事業を学ぶ', description: '開発の第一線で幅広い技術とプロダクトを経験' },
      { period: '5〜8年目', title: 'テックリード / EM', description: '技術方針と組織の両方をリードする' },
      { period: '8年目〜', title: 'VPoE / CTO', description: '経営視点で技術戦略・組織戦略を描く' },
    ],
    skills: [
      { name: '技術戦略の立案', type: 'technical' },
      { name: '幅広い技術の目利き', type: 'technical' },
      { name: '経営・財務の基礎', type: 'business' },
      { name: '組織づくり・採用', type: 'business' },
      { name: 'ビジョンを語る力', type: 'human' },
      { name: '不確実な状況での意思決定', type: 'human' },
    ],
    experiences: [
      'サービスの立ち上げ（0→1）',
      '技術組織の拡大期の経験',
      '経営会議・事業計画への参加',
      '技術選定の最終判断',
    ],
    traitIds: ['young-discretion', 'small-team', 'new-business', 'tech-culture'],
    interviewQuestions: [
      '経営陣と現場エンジニアの距離はどのくらい近いですか？',
      '技術投資の意思決定は誰がどのように行っていますか？',
      '新規サービス立ち上げに若手が参加した例はありますか？',
    ],
    realityCheck:
      '大企業でCTOを目指すのは長い道のりです。スタートアップや新規事業で「最初の技術担当」になるルートも現実的です。',
    axisStatement: '事業の立ち上げや経営に近い場所で技術を使える',
  },
  {
    id: 'founder',
    name: '起業家・事業オーナー',
    shortName: '起業',
    category: 'executive',
    catchcopy: '自分の手で、世の中に新しい選択肢をつくる',
    description:
      '自ら課題を見つけ、事業を立ち上げます。プロダクト・資金・仲間集めなど、すべてに責任を持つ挑戦的なキャリアです。会社員として経験を積んでから起業する人も多くいます。',
    valueWeights: { contribution: 0.4, mastery: 0.2, leadership: 0.7, creation: 1, stability: 0 },
    steps: [
      { period: '1〜3年目', title: '武器をつくる', description: 'エンジニアとして、プロダクトを一人で形にできる力を身につける' },
      { period: '3〜5年目', title: '事業づくりを経験', description: '新規事業やスタートアップで0→1を経験する' },
      { period: '5年目〜', title: '起業・社内起業', description: '自分の事業を立ち上げ、仲間と育てる' },
    ],
    skills: [
      { name: '課題発見・仮説検証', type: 'business' },
      { name: 'プロダクトを形にする力', type: 'technical' },
      { name: 'ファイナンス・資金調達', type: 'business' },
      { name: 'ストーリーテリング・営業力', type: 'human' },
      { name: '仲間を集める力', type: 'human' },
      { name: '失敗から立ち直る力', type: 'human' },
    ],
    experiences: [
      '新規事業・新サービスの立ち上げ',
      '自分で企画したものを売った経験',
      '個人開発・学生団体の立ち上げ',
      '少人数で何でもやる環境',
    ],
    traitIds: ['new-business', 'young-discretion', 'small-team', 'side-project'],
    interviewQuestions: [
      '社内起業・新規事業提案の制度はありますか？採択例は？',
      '卒業後に起業された社員の方はいますか？',
      '若手が事業の数字（売上・利益）に触れる機会はありますか？',
    ],
    realityCheck:
      'いきなり起業する以外に、「スタートアップで経験を積む」「社内起業制度を使う」など段階的なルートもあります。',
    axisStatement: '少人数で事業全体に触れ、0→1の経験を早く積める',
  },
  {
    id: 'solution-engineer',
    name: 'セールスエンジニア・ソリューションアーキテクト',
    shortName: 'セールスエンジニア',
    category: 'support',
    catchcopy: '技術の力で、お客様の課題を一緒に解決する',
    description:
      '技術を深く理解したうえで、顧客の課題をヒアリングし、最適なシステム構成や導入方法を提案します。エンジニアと顧客の「通訳」として、技術とビジネスの両方を武器にする職種です。',
    valueWeights: { contribution: 1, mastery: 0.6, leadership: 0.3, creation: 0.3, stability: 0.3 },
    steps: [
      { period: '1〜3年目', title: '開発・運用の土台づくり', description: '自社サービスやクラウドの開発・運用で技術の基礎を固める' },
      { period: '3〜5年目', title: '顧客と向き合う', description: '導入支援や技術サポートで、顧客の課題を技術で解決する' },
      { period: '5年目〜', title: 'ソリューションアーキテクト', description: '大型案件の技術責任者として、構成設計から提案までを担う' },
    ],
    skills: [
      { name: 'クラウド・ネットワークの幅広い知識', type: 'technical' },
      { name: 'システム構成の設計', type: 'technical' },
      { name: '課題ヒアリング力', type: 'human' },
      { name: '技術をわかりやすく説明する力', type: 'human' },
      { name: '顧客の業界・業務理解', type: 'business' },
      { name: '提案書・プレゼン作成', type: 'business' },
    ],
    experiences: [
      '技術を知らない人に説明して伝わった経験',
      'クラウド資格（AWS・GCPなど）の取得',
      '接客・塾講師など相手の課題を聞く経験',
      'ハッカソン等での発表・デモ',
    ],
    traitIds: ['user-close', 'job-change', 'mentoring', 'tech-culture'],
    interviewQuestions: [
      '開発職からセールスエンジニアへ転向した方はいますか？',
      'エンジニアが顧客先に同行したり、直接話したりする機会はありますか？',
      '資格取得の支援制度はありますか？',
    ],
    realityCheck:
      '新卒から配属される枠は少なめです。まず開発やサポートで技術を身につけ、数年後に転向するルートが一般的です。',
    axisStatement: 'エンジニアでも顧客と直接話し、技術で課題を解決できる',
  },
  {
    id: 'corporate-se',
    name: '社内SE・コーポレートエンジニア',
    shortName: '社内SE',
    category: 'support',
    catchcopy: '会社の「働く」をITで支え、長く頼られる存在に',
    description:
      '事業会社の中で、社内システムの企画・開発・運用や、業務のIT化・効率化を担います。同じ会社の人たちを技術で支えるため、成果が身近に感じられ、長く腰を据えて働きやすい職種です。',
    valueWeights: { contribution: 0.8, mastery: 0.4, leadership: 0.3, creation: 0.2, stability: 1 },
    steps: [
      { period: '1〜3年目', title: '社内の業務を知る', description: 'ヘルプデスクや社内ツールの開発・運用で、会社と業務を理解する' },
      { period: '3〜6年目', title: '業務改善をリード', description: 'システム導入やSaaS選定、業務の自動化を企画・推進する' },
      { period: '6年目〜', title: '情報システム責任者', description: '全社のIT戦略やセキュリティ方針を担う' },
    ],
    skills: [
      { name: '業務システム・SaaSの知識', type: 'technical' },
      { name: 'セキュリティ・ネットワークの基礎', type: 'technical' },
      { name: '業務フローの理解と改善提案', type: 'business' },
      { name: 'ベンダーとの調整・交渉', type: 'human' },
      { name: '社内の困りごとを聞く力', type: 'human' },
      { name: '予算・コスト管理', type: 'business' },
    ],
    experiences: [
      'アルバイト先やサークルの作業を自動化した経験',
      'ITに詳しくない人のサポート経験',
      '情報処理技術者試験などの資格取得',
      '長く一つのことを続けた経験',
    ],
    traitIds: ['stable-base', 'mentoring', 'user-close', 'dual-ladder'],
    interviewQuestions: [
      '社内SEの方の残業時間や働き方を教えてください',
      'システムは内製していますか？外部委託が中心ですか？',
      '社内SEのキャリアパス（専門職・管理職）はどうなっていますか？',
    ],
    realityCheck:
      '外部ベンダーとの調整が中心で、自分でコードを書く機会が少ない会社もあります。内製比率は必ず確認しましょう。',
    axisStatement: '安定した事業基盤のもと、社内の人を技術で長く支えられる',
  },
]

export const CAREER_PATH_MAP = Object.fromEntries(CAREER_PATHS.map((p) => [p.id, p])) as Record<string, CareerPath>

export const CATEGORY_LABEL: Record<CareerCategory, string> = {
  specialist: '技術を極める',
  management: 'チームを育てる',
  product: 'プロダクトを率いる',
  executive: '経営・起業',
  support: '顧客・社内を支える',
}
