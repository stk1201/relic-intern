import { CAREER_PATHS } from '@/data/careerPaths'
import { AXIS_KEYWORDS, SCRIPT_QUESTIONS, type ScriptQuestion } from '@/data/questions'
import { VALUE_AXES, VALUE_AXIS_MAP } from '@/data/values'
import { sleep } from '@/lib/storage'
import type {
  DiagnosisAnswer,
  DiagnosisResult,
  DiagnosisSession,
  PathMatch,
  ValueAxis,
  ValueScores,
} from '@/types'

/**
 * AI 対話サービス（ブラウザ内で完結するルールベース実装）
 *
 * 台本の質問・回答への相づち・スコア計算・キャリアの相性判定をすべてブラウザ内で行う。
 * 外部APIには通信しない。
 */

export interface AiTurn {
  reply: string
  nextQuestion: ScriptQuestion | null
}

const REACTIONS: Record<ValueAxis, string[]> = {
  contribution: ['誰かの役に立てることが、あなたの原動力なんですね。', '相手の喜ぶ顔が見えることを大切にしているんですね。'],
  mastery: ['とことん深めることに喜びを感じるタイプなんですね。', '「できなかったことができるようになる」感覚を大切にしているんですね。'],
  leadership: ['人を巻き込んで大きなことを動かすのが好きなんですね。', 'チームの成果に責任を持てることに燃えるんですね。'],
  creation: ['まだないものを形にすることにワクワクするんですね。', '新しいことを始めるエネルギーを持っているんですね。'],
  stability: ['長く自分らしく働けることを大事にしているんですね。', '仕事と人生のバランスを大切にする視点、とても大事です。'],
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

/** 自由入力から価値観を推定（モック：キーワード一致） */
export function inferAxisFromText(text: string): ValueAxis | undefined {
  let best: ValueAxis | undefined
  let bestCount = 0
  for (const axis of Object.keys(AXIS_KEYWORDS) as ValueAxis[]) {
    const count = AXIS_KEYWORDS[axis].filter((k) => text.includes(k)).length
    if (count > bestCount) {
      best = axis
      bestCount = count
    }
  }
  return best
}

export function getFirstQuestion(): ScriptQuestion {
  return SCRIPT_QUESTIONS[0]
}

export const TOTAL_QUESTIONS = SCRIPT_QUESTIONS.length

/** ユーザーの回答を受けて、AI の相づち＋次の質問を返す */
export async function respond(session: DiagnosisSession, answer: DiagnosisAnswer): Promise<AiTurn> {
  await sleep(900 + Math.random() * 600)
  const index = SCRIPT_QUESTIONS.findIndex((q) => q.id === answer.questionId)
  const nextQuestion = SCRIPT_QUESTIONS[index + 1] ?? null

  let reply: string
  if (answer.questionId === 'engineer_field') {
    reply =
      answer.value === 'undecided'
        ? 'まだ決めていなくても大丈夫です！むしろ「なりたい姿」から分野や会社を考えるのは、とても良い順番です。'
        : `${answer.text}ですね。エンジニアとして入社したその先に、どんな道が広がっているか一緒に見ていきましょう。`
  } else if (answer.axis) {
    const quote = answer.text.length > 30 ? `${answer.text.slice(0, 30)}…` : answer.text
    reply = `「${quote}」\n${pick(REACTIONS[answer.axis])}`
  } else {
    reply = '教えてくれてありがとうございます。あなたらしさが少しずつ見えてきました。'
  }

  if (!nextQuestion) {
    const answered = session.answers.length + 1
    reply += `\n\n${answered}つの質問に答えてくれてありがとうございました！\nあなたの価値観から、キャリアの選択肢と会社選びの軸を整理しますね。`
  }
  return { reply, nextQuestion }
}

/* ---------------- 分析 ---------------- */

function calcValueScores(answers: DiagnosisAnswer[]): ValueScores {
  const raw: ValueScores = { contribution: 2, mastery: 2, leadership: 2, creation: 2, stability: 2 }
  answers.forEach((a) => {
    if (!a.axis) return
    // 「避けたいこと」は裏返しの価値観として少し弱めに加点
    raw[a.axis] += a.questionId === 'avoid' ? 1.5 : 2
  })
  const max = Math.max(...Object.values(raw))
  return Object.fromEntries(
    (Object.keys(raw) as ValueAxis[]).map((k) => [k, Math.round((raw[k] / max) * 100)]),
  ) as ValueScores
}

function matchPaths(scores: ValueScores): PathMatch[] {
  const axes = Object.keys(scores) as ValueAxis[]
  const norm = Math.sqrt(axes.reduce((s, a) => s + scores[a] ** 2, 0))
  return CAREER_PATHS.map((p) => {
      const wNorm = Math.sqrt(axes.reduce((s, a) => s + p.valueWeights[a] ** 2, 0))
      const dot = axes.reduce((s, a) => s + scores[a] * p.valueWeights[a], 0)
      const cos = dot / (norm * wNorm)
      const topAxis = axes.reduce((a, b) => (p.valueWeights[a] * scores[a] > p.valueWeights[b] * scores[b] ? a : b))
      return {
        pathId: p.id,
        score: Math.round(Math.min(98, Math.max(40, cos * 105))),
        reason: `「${VALUE_AXIS_MAP[topAxis].label}」というあなたの価値観と、${p.shortName}の仕事の中心が重なっています。`,
      }
    })
    .sort((a, b) => b.score - a.score)
}

/** 回答全体を分析して診断結果を生成する */
export async function analyze(
  session: DiagnosisSession,
): Promise<Omit<DiagnosisResult, 'id' | 'userId' | 'createdAt'>> {
  await sleep(2200)
  const engineerField = session.engineerField ?? 'undecided'
  const valueScores = calcValueScores(session.answers)
  const ranked = [...VALUE_AXES].sort((a, b) => valueScores[b.id] - valueScores[a.id])
  const [first, second] = ranked
  const pathMatches = matchPaths(valueScores)
  const topPath = CAREER_PATHS.find((p) => p.id === pathMatches[0].pathId)!

  // 「避けたいこと」の裏返し。最上位の価値観と同じなら2番目の価値観を使い、軸が重複しないようにする
  const avoid = session.answers.find((a) => a.questionId === 'avoid')
  const thirdAxis = avoid?.axis && avoid.axis !== first.id ? avoid.axis : second.id

  const axisStatements = Array.from(
    new Set([
      first.axisStatement,
      topPath.axisStatement,
      VALUE_AXIS_MAP[thirdAxis].axisStatement,
      second.axisStatement,
      ranked[2].axisStatement,
    ]),
  ).slice(0, 3)

  // 上位パスの会社特徴を出現回数で集計
  const traitCount = new Map<string, number>()
  pathMatches.slice(0, 3).forEach((m, i) => {
    CAREER_PATHS.find((p) => p.id === m.pathId)!.traitIds.forEach((t) =>
      traitCount.set(t, (traitCount.get(t) ?? 0) + (3 - i)),
    )
  })
  const traitIds = [...traitCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id]) => id)

  return {
    sessionId: session.id,
    engineerField,
    typeName: `${second.adjective}${first.noun}`,
    typeDescription: `${first.description}。さらに「${second.label}」という想いも強く、${first.short}と${second.short}を両立できる環境で力を発揮するタイプです。`,
    valueScores,
    axisStatements,
    keywords: [first.short, second.short, topPath.shortName],
    pathMatches,
    traitIds,
  }
}
