import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Building2,
  Compass,
  CreditCard,
  HelpCircle,
  Search,
  RotateCcw,
  Route,
} from 'lucide-react'
import { CareerRoadmap } from '@/components/career/CareerRoadmap'
import { CompanyTraitList } from '@/components/career/CompanyTraitList'
import { SkillGapChecker } from '@/components/career/SkillGapChecker'
import { CompanyCard } from '@/components/company/CompanyCard'
import { matchCompanies } from '@/data/companies'
import { ValueBars } from '@/components/common/ValueBars'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { CAREER_PATH_MAP } from '@/data/careerPaths'
import { ENGINEER_FIELD_LABEL } from '@/data/values'
import { cn } from '@/lib/utils'
import { diagnosisService } from '@/services/diagnosisService'
import type { DiagnosisResult } from '@/types'
import NotFoundPage from './NotFoundPage'

function SectionTitle({ icon: Icon, title, sub }: { icon: typeof Compass; title: string; sub?: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
        {sub && <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}

export default function ResultPage() {
  const { id = '' } = useParams()
  const { user } = useAuth()
  const [result, setResult] = useState<DiagnosisResult | null | undefined>(undefined)
  const [selectedPathId, setSelectedPathId] = useState<string>('')

  useEffect(() => {
    diagnosisService.getResult(id).then((r) => {
      setResult(r)
      if (r) setSelectedPathId(r.pathMatches[0]?.pathId ?? '')
    })
  }, [id])

  if (result === undefined) return <div className="container py-20 text-center text-muted-foreground">読み込み中…</div>
  if (result === null) return <NotFoundPage message="診断結果が見つかりませんでした" />

  const topMatches = result.pathMatches.slice(0, 3)
  const selected = CAREER_PATH_MAP[selectedPathId]
  const interviewQuestions = Array.from(
    new Set(topMatches.flatMap((m) => CAREER_PATH_MAP[m.pathId].interviewQuestions.slice(0, 2))),
  )

  return (
    <div className="pb-24 md:pb-0">
      {/* タイプ */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="container relative py-12 sm:py-16">
          <p className="text-sm font-bold text-accent">あなたのキャリアタイプ</p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">{result.typeName}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed opacity-90">{result.typeDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge className="bg-white/10 text-primary-foreground">興味のある分野：{ENGINEER_FIELD_LABEL[result.engineerField] ?? '未定'}</Badge>
            {result.keywords.map((k) => (
              <Badge key={k} className="bg-accent text-accent-foreground">#{k}</Badge>
            ))}
          </div>
          <div className="mt-8 hidden gap-3 md:flex">
            <Button asChild variant="accent" size="lg">
              <Link to={`/card/${result.id}`}>
                <CreditCard /> 就活軸カードをつくる
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link to="/diagnosis">
                <RotateCcw /> もう一度診断する
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container space-y-14 py-12 sm:py-16">
        {/* 就活軸 */}
        <section>
          <SectionTitle icon={Compass} title="あなたの就活軸" sub="会社を比べるときは、この3つを物差しにしましょう" />
          <ol className="grid gap-3 md:grid-cols-3">
            {result.axisStatements.map((a, i) => (
              <li key={a} className="flex gap-3 rounded-2xl border-2 border-primary/10 bg-card p-5">
                <span className="font-display text-3xl font-black leading-none text-accent">{i + 1}</span>
                <p className="font-bold leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 価値観 */}
        <section className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle>価値観のバランス</CardTitle>
              <CardDescription>対話の回答から推定したスコア（最大100）</CardDescription>
            </CardHeader>
            <CardContent>
              <ValueBars scores={result.valueScores} />
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle>この結果の使い方</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>① 下の「キャリアの選択肢」から気になる道を選び、必要なスキル・経験をチェックして今とのギャップを確認。</p>
              <p>② 「会社選びのチェックポイント」を、説明会や企業HP、OB・OG訪問で確かめる。</p>
              <p>③ 「面接で聞きたい質問」を逆質問に使い、志望動機に「なぜこの会社か」を一本の軸で語る。</p>
            </CardContent>
          </Card>
        </section>

        {/* キャリアパス */}
        <section>
          <SectionTitle icon={Route} title="あなたに合うキャリアの選択肢" sub="気になる道を選ぶと、ゴールから逆算したロードマップが表示されます" />
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {topMatches.map((m, i) => {
              const p = CAREER_PATH_MAP[m.pathId]
              const active = m.pathId === selectedPathId
              return (
                <button
                  key={m.pathId}
                  type="button"
                  onClick={() => setSelectedPathId(m.pathId)}
                  aria-pressed={active}
                  className={cn(
                    'w-[80%] shrink-0 snap-start rounded-2xl border-2 p-5 text-left transition-all md:w-auto',
                    active ? 'border-primary bg-primary text-primary-foreground shadow-lg' : 'bg-card hover:border-primary/40',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('text-xs font-bold', active ? 'text-accent' : 'text-amber-700')}>
                      {i === 0 ? 'いちばん合う' : `候補 ${i + 1}`}
                    </span>
                    <span className="text-sm font-black tabular-nums">相性 {m.score}%</span>
                  </div>
                  <p className="mt-2 text-lg font-black">{p.name}</p>
                  <p className={cn('mt-1 text-sm', active ? 'opacity-85' : 'text-muted-foreground')}>{p.catchcopy}</p>
                </button>
              )
            })}
          </div>

          {selected && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <Card>
                <CardHeader>
                  <CardTitle>{selected.name}への道のり</CardTitle>
                  <CardDescription>{result.pathMatches.find((m) => m.pathId === selected.id)?.reason}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <CareerRoadmap path={selected} />
                  <div className="flex gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" />
                    <p>
                      <span className="font-bold">知っておきたい現実：</span>
                      {selected.realityCheck}
                    </p>
                  </div>
                  <Button asChild variant="link" className="h-auto px-0">
                    <Link to={`/careers/${selected.id}`}>
                      このキャリアを詳しく見る <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>今の自分とのギャップ</CardTitle>
                  <CardDescription>できること・経験したことをチェックしてみましょう</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillGapChecker path={selected} />
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* 会社の特徴 */}
        <section>
          <SectionTitle icon={Building2} title="会社選びのチェックポイント" sub="選んだキャリアを実現しやすい会社の特徴です" />
          <CompanyTraitList traitIds={result.traitIds} />
        </section>

        {/* 企業（架空） */}
        <section>
          <SectionTitle icon={Search} title="あなたの軸に合う企業の例" sub="会社の特徴と目指すキャリアが重なる企業です（架空のサンプル）" />
          <div className="grid gap-4 md:grid-cols-3">
            {matchCompanies(result).map(({ company }) => (
              <CompanyCard key={company.id} company={company} highlightTraitIds={result.traitIds} />
            ))}
          </div>
          <Button asChild variant="link" className="mt-2 h-auto px-0">
            <Link to="/companies">
              特徴から企業を探す <ArrowRight />
            </Link>
          </Button>
        </section>

        {/* 逆質問 */}
        <section>
          <SectionTitle icon={HelpCircle} title="説明会・面接で聞きたい質問" sub="軸に合う会社かを見極める逆質問の例" />
          <ul className="space-y-2">
            {interviewQuestions.map((q) => (
              <li key={q} className="rounded-xl border bg-card px-4 py-3 text-sm font-bold">Q. {q}</li>
            ))}
          </ul>
        </section>

        {!user && (
          <Card className="border-accent bg-accent/10">
            <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Bookmark className="h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <p className="font-bold">結果を保存して、あとで見返しませんか？</p>
                  <p className="text-sm text-muted-foreground">ログインすると、診断履歴やスキルチェックを複数の端末で確認できます。</p>
                </div>
              </div>
              <Button asChild>
                <Link to="/login">ログインして保存</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground">
          ※ 診断結果はAIによる参考情報です。実際の制度や働き方は企業ごとに異なるため、必ずご自身で確認してください。
        </p>
      </div>

      {/* モバイル固定CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <Button asChild variant="accent" size="lg" className="w-full">
          <Link to={`/card/${result.id}`}>
            <CreditCard /> 就活軸カードをつくる
          </Link>
        </Button>
      </div>
    </div>
  )
}
