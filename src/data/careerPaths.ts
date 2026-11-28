import type { CareerCategory, CareerPath } from '@/types'

/**
 * キャリアパスのマスターデータ
 * Supabase 接続後は career_paths テーブルに移し、管理画面から更新できるようにする想定。
 */
export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'specialist',
    name: '技術スペシャリスト',
    shortName: 'スペシャリスト',
    category: 'specialist',
    startingRoles: ['engineer'],
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
    startingRoles: ['engineer'],
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
    startingRoles: ['engineer', 'business'],
    catchcopy: '「何をつくるか」を決め、ユーザーと事業の成功に責任を持つ',
    description:
      'ユーザーの課題を見極め、プロダクトの方向性や優先順位を決めます。エンジニア・デザイナー・ビジネス側をつなぎ、価値あるものを届ける“ミニCEO”とも呼ばれる役割です。',
    valueWeights: { contribution: 0.8, mastery: 0.3, leadership: 0.6, creation: 0.7, stability: 0.2 },
    steps: [
      { period: '1〜3年目', title: '現場の専門性を磨く', description: '開発や営業などで、プロダクトとユーザーを深く理解する' },
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
      '新卒でいきなりPMになれる会社は少数です。多くは開発や営業などで数年経験を積んでから転向します。',
    axisStatement: '自社プロダクトを持ち、職種を越えて企画に関われる',
  },
  {
    id: 'em',
    name: 'エンジニアリングマネージャー（EM）',
    shortName: 'EM',
    category: 'management',
    startingRoles: ['engineer'],
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
    startingRoles: ['engineer'],
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
    startingRoles: ['engineer', 'business'],
    catchcopy: '自分の手で、世の中に新しい選択肢をつくる',
    description:
      '自ら課題を見つけ、事業を立ち上げます。プロダクト・資金・仲間集めなど、すべてに責任を持つ挑戦的なキャリアです。会社員として経験を積んでから起業する人も多くいます。',
    valueWeights: { contribution: 0.4, mastery: 0.2, leadership: 0.7, creation: 1, stability: 0 },
    steps: [
      { period: '1〜3年目', title: '武器をつくる', description: '開発・営業など、事業に必要な専門性を一つ身につける' },
      { period: '3〜5年目', title: '事業づくりを経験', description: '新規事業やスタートアップで0→1を経験する' },
      { period: '5年目〜', title: '起業・社内起業', description: '自分の事業を立ち上げ、仲間と育てる' },
    ],
    skills: [
      { name: '課題発見・仮説検証', type: 'business' },
      { name: 'プロダクトを形にする力', type: 'technical' },
      { name: 'ファイナンス・資金調達', type: 'business' },
      { name: '営業・ストーリーテリング', type: 'human' },
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
    id: 'bizdev',
    name: '事業開発・事業責任者',
    shortName: '事業責任者',
    category: 'business',
    startingRoles: ['business'],
    catchcopy: '事業の数字に責任を持ち、組織を動かして成長させる',
    description:
      '新しい市場の開拓やアライアンス、事業計画の立案・実行を担います。最終的には一つの事業部の売上・利益に責任を持つ立場を目指します。',
    valueWeights: { contribution: 0.3, mastery: 0.2, leadership: 0.9, creation: 0.7, stability: 0.1 },
    steps: [
      { period: '1〜3年目', title: '現場で稼ぐ力', description: '営業や企画で、顧客と売上の現場を知る' },
      { period: '3〜6年目', title: '事業企画・事業開発', description: '新規取引やアライアンス、事業計画づくりを担う' },
      { period: '6年目〜', title: '事業責任者', description: '事業のP/Lに責任を持ち、チームを率いる' },
    ],
    skills: [
      { name: '事業計画・P/Lの理解', type: 'business' },
      { name: '市場・競合分析', type: 'business' },
      { name: '交渉・提携推進', type: 'human' },
      { name: 'データに基づく意思決定', type: 'technical' },
      { name: 'チームマネジメント', type: 'human' },
      { name: '仮説検証のスピード', type: 'business' },
    ],
    experiences: [
      '数字目標を持った営業経験',
      '新規事業・新サービスの企画',
      '他社とのアライアンス推進',
      'プロジェクトリーダーの経験',
    ],
    traitIds: ['young-discretion', 'new-business', 'job-change', 'small-team'],
    interviewQuestions: [
      '若手で事業責任者を任された方の事例はありますか？',
      '営業から事業企画への異動はどのように決まりますか？',
      '事業の数字はどこまで社員に共有されていますか？',
    ],
    realityCheck:
      '最初は営業などの現場配属が一般的です。現場経験が事業づくりの説得力になるので、遠回りではありません。',
    axisStatement: '若手でも事業の数字に触れ、責任ある役割を任される',
  },
  {
    id: 'marketer',
    name: 'マーケター',
    shortName: 'マーケター',
    category: 'business',
    startingRoles: ['business'],
    catchcopy: '人の心とデータを読み解き、「売れる仕組み」をつくる',
    description:
      '市場や顧客を分析し、商品・サービスが選ばれるための戦略を立てて実行します。データ分析とクリエイティブの両方を武器にする専門職です。',
    valueWeights: { contribution: 0.5, mastery: 0.7, leadership: 0.3, creation: 0.6, stability: 0.3 },
    steps: [
      { period: '1〜3年目', title: '施策の実行者', description: '広告運用・SNS・CRMなど一つのチャネルで成果を出す' },
      { period: '3〜6年目', title: 'マーケティング担当', description: '複数施策を組み合わせ、戦略を立てる' },
      { period: '6年目〜', title: 'マーケティング責任者', description: 'ブランドや事業全体の成長戦略を描く' },
    ],
    skills: [
      { name: 'データ分析・効果測定', type: 'technical' },
      { name: '顧客インサイトの理解', type: 'business' },
      { name: '企画・コピーライティング', type: 'human' },
      { name: 'デジタル広告・SNSの知識', type: 'technical' },
      { name: '予算管理', type: 'business' },
      { name: '社内外の調整力', type: 'human' },
    ],
    experiences: [
      'SNSやブログの運用で数字を伸ばした経験',
      'アンケート・インタビュー調査',
      'A/Bテストなどの改善サイクル',
      'イベントやキャンペーンの企画',
    ],
    traitIds: ['young-discretion', 'job-change', 'user-close', 'mentoring'],
    interviewQuestions: [
      'マーケティング部門への配属は希望できますか？',
      '若手が任される予算や施策の規模はどのくらいですか？',
      '施策の効果をどのように測定していますか？',
    ],
    realityCheck:
      '新卒でマーケ部門に配属される枠は少なめです。営業で顧客理解を深めてから異動するケースも多くあります。',
    axisStatement: 'データと顧客理解を武器に、施策を任せてもらえる',
  },
  {
    id: 'customer-expert',
    name: '営業・カスタマーサクセスのプロ',
    shortName: '顧客のプロ',
    category: 'business',
    startingRoles: ['business'],
    catchcopy: 'お客様の成功に伴走し、「あなたに頼みたい」と言われる',
    description:
      '顧客の課題を深く理解し、解決策を提案・導入・定着まで支援します。顧客から指名されるプロとして、また営業組織のリーダーとして活躍できます。',
    valueWeights: { contribution: 1, mastery: 0.4, leadership: 0.4, creation: 0.2, stability: 0.4 },
    steps: [
      { period: '1〜3年目', title: '顧客の声を聞く', description: '提案や導入支援を通じて、顧客の課題を知る' },
      { period: '3〜6年目', title: '大型顧客の担当', description: '重要顧客を任され、成果事例をつくる' },
      { period: '6年目〜', title: 'エキスパート / マネージャー', description: '営業・CSの型をつくり、組織に広げる' },
    ],
    skills: [
      { name: 'ヒアリング・課題整理', type: 'human' },
      { name: '提案・プレゼンテーション', type: 'human' },
      { name: '業界・商品知識', type: 'business' },
      { name: '顧客データの活用（CRM）', type: 'technical' },
      { name: '関係構築力', type: 'human' },
      { name: '目標達成への粘り強さ', type: 'human' },
    ],
    experiences: [
      '接客・販売・塾講師などのアルバイト',
      '相手の課題を聞いて解決した経験',
      '目標を追いかけて達成した経験',
      'チームでのナレッジ共有',
    ],
    traitIds: ['mentoring', 'user-close', 'dual-ladder', 'stable-base'],
    interviewQuestions: [
      '営業として専門性を高め続けるキャリアはありますか？',
      '新人はどのように商談スキルを身につけていますか？',
      '顧客の成功事例はどのように社内で共有されていますか？',
    ],
    realityCheck:
      '数字目標へのプレッシャーはあります。「誰に・何を売るか」に共感できる会社を選ぶとやりがいが大きく変わります。',
    axisStatement: '心から勧められる商材で、顧客の成功に長く伴走できる',
  },
  {
    id: 'hr',
    name: '人事・組織開発',
    shortName: '人事',
    category: 'business',
    startingRoles: ['business'],
    catchcopy: '人が輝く仕組みをつくり、会社の成長を支える',
    description:
      '採用・育成・評価制度・組織文化づくりを通じて、社員が力を発揮できる環境を整えます。経営と現場の両方に向き合う仕事です。',
    valueWeights: { contribution: 0.9, mastery: 0.3, leadership: 0.5, creation: 0.2, stability: 0.6 },
    steps: [
      { period: '1〜3年目', title: '現場を知る / 採用担当', description: '事業部や採用業務を通じて、会社と人を理解する' },
      { period: '3〜6年目', title: '人事企画', description: '研修や評価制度の企画・運用を担う' },
      { period: '6年目〜', title: '人事責任者 / HRBP', description: '経営と連携し、組織戦略を描く' },
    ],
    skills: [
      { name: '傾聴・面談スキル', type: 'human' },
      { name: '労務・制度の知識', type: 'business' },
      { name: '組織課題の分析', type: 'business' },
      { name: '人事データの活用', type: 'technical' },
      { name: '研修・場づくり', type: 'human' },
      { name: '経営視点', type: 'business' },
    ],
    experiences: [
      'サークル・団体での新歓や育成',
      'イベントの企画運営',
      '人の相談に乗り、支えた経験',
      '組織のルールづくり',
    ],
    traitIds: ['job-change', 'mentoring', 'manager-training', 'stable-base'],
    interviewQuestions: [
      '新卒で人事に配属される可能性はありますか？',
      '人事制度の見直しに若手が関わった例はありますか？',
      '社員のキャリア支援で力を入れていることは？',
    ],
    realityCheck:
      '新卒から人事配属は限られ、まず営業などの現場を経験する会社も多いです。現場経験が人事の説得力になります。',
    axisStatement: '人の成長を支える仕事に、将来的に挑戦できる',
  },
]

export const CAREER_PATH_MAP = Object.fromEntries(CAREER_PATHS.map((p) => [p.id, p])) as Record<string, CareerPath>

export const CATEGORY_LABEL: Record<CareerCategory, string> = {
  specialist: '技術を極める',
  management: 'チームを育てる',
  product: 'プロダクトを率いる',
  executive: '経営・起業',
  business: 'ビジネスを動かす',
}
