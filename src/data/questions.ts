import type { ChatChoice, ValueAxis } from '@/types'

export interface ScriptQuestion {
  id: string
  /** AI からの問いかけ（複数行可） */
  prompt: string
  choices: ChatChoice[]
  /** 自由入力を許可するか */
  allowFreeText: boolean
  placeholder?: string
}

/**
 * モック用の対話スクリプト。
 */
export const SCRIPT_QUESTIONS: ScriptQuestion[] = [
  {
    id: 'engineer_field',
    prompt:
      'はじめまして！キャリア逆算ナビです。\nこれから6問ほど、エンジニアとしての「なりたい未来」を一緒に考えていきます。\n\nまず、いま興味のある分野を教えてください。',
    choices: [
      { label: 'Web・アプリ開発', value: 'web' },
      { label: 'インフラ・クラウド', value: 'infra' },
      { label: 'AI・データ', value: 'data' },
      { label: 'まだ決めていない', value: 'undecided' },
    ],
    allowFreeText: false,
  },
  {
    id: 'fulfilling_moment',
    prompt: '10年後のあなたを想像してみてください。\nどんな瞬間に「この仕事をしていてよかった」と感じていたいですか？',
    choices: [
      { label: 'ユーザーやお客様に感謝されたとき', value: 'thanks', axis: 'contribution' },
      { label: '難しい課題を自分の力で解いたとき', value: 'solve', axis: 'mastery' },
      { label: 'チームで大きな成果を出したとき', value: 'team', axis: 'leadership' },
      { label: '自分のアイデアが形になったとき', value: 'idea', axis: 'creation' },
      { label: '仕事も私生活も充実しているとき', value: 'balance', axis: 'stability' },
    ],
    allowFreeText: true,
    placeholder: '自分の言葉で書いてもOKです',
  },
  {
    id: 'absorbed',
    prompt: '学生時代に夢中になったことを思い出してみてください。\nそれの「どんなところ」が楽しかったですか？',
    choices: [
      { label: '誰かに教えたり、支えたりするところ', value: 'support', axis: 'contribution' },
      { label: 'とことん調べて、作り込むところ', value: 'deep', axis: 'mastery' },
      { label: 'みんなをまとめて前に進めるところ', value: 'lead', axis: 'leadership' },
      { label: '企画して、新しく始めるところ', value: 'start', axis: 'creation' },
      { label: 'コツコツ続けて上達していくところ', value: 'steady', axis: 'stability' },
    ],
    allowFreeText: true,
    placeholder: '例：サークルの新歓イベントを企画したのが楽しかった',
  },
  {
    id: 'team_role',
    prompt: 'チームで何かをするとき、あなたが自然と担っている役割はどれに近いですか？',
    choices: [
      { label: 'みんなの困りごとに気づくサポート役', value: 'supporter', axis: 'contribution' },
      { label: '特定の分野を任される専門担当', value: 'expert', axis: 'mastery' },
      { label: '方針を決めて引っぱるまとめ役', value: 'leader', axis: 'leadership' },
      { label: '新しい案を出すアイデアマン', value: 'ideator', axis: 'creation' },
      { label: '全体を見て調整するバランス役', value: 'balancer', axis: 'stability' },
    ],
    allowFreeText: true,
  },
  {
    id: 'avoid',
    prompt: '逆に、働くうえで「これだけは避けたい」と思うことは何ですか？',
    choices: [
      { label: '誰の役に立っているかわからない', value: 'meaningless', axis: 'contribution' },
      { label: '成長している実感がない', value: 'no_growth', axis: 'mastery' },
      { label: '自分に決める権限がない', value: 'no_authority', axis: 'leadership' },
      { label: '前例踏襲で新しいことができない', value: 'no_challenge', axis: 'creation' },
      { label: '長時間労働で余裕がない', value: 'overwork', axis: 'stability' },
    ],
    allowFreeText: true,
  },
  {
    id: 'future_position',
    prompt: '最後の質問です。\n30代のあなたは、どんな立場で働いていたいですか？',
    choices: [
      { label: 'その道のプロとして頼られている', value: 'pro', axis: 'mastery' },
      { label: 'チームを率いて人を育てている', value: 'manager', axis: 'leadership' },
      { label: 'サービスや事業の責任者になっている', value: 'owner', axis: 'creation' },
      { label: '目の前の人を支え、信頼されている', value: 'trusted', axis: 'contribution' },
      { label: '好きな仕事を自分のペースで続けている', value: 'own_pace', axis: 'stability' },
    ],
    allowFreeText: true,
  },
]

/** 自由入力テキストから価値観を推定するためのキーワード（モック） */
export const AXIS_KEYWORDS: Record<ValueAxis, string[]> = {
  contribution: ['役に立', '感謝', '支え', '助け', '喜', 'ありがとう', '教え', '貢献', 'お客', 'ユーザー', '誰か'],
  mastery: ['極め', '技術', '専門', '研究', '深', '調べ', 'プロ', '成長', 'スキル', '作り込', '学'],
  leadership: ['まとめ', 'リーダー', '引っぱ', '率い', 'チーム', '組織', '動か', '決め', '代表', '部長', '主将'],
  creation: ['企画', '新し', '立ち上げ', 'アイデア', 'ゼロ', '作り', '起業', '挑戦', '始め', '発案'],
  stability: ['安定', '家族', 'プライベート', '趣味', 'ペース', '長く', '続け', '健康', 'バランス', '休'],
}
