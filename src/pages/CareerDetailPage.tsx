import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Sparkles } from 'lucide-react'
import { CareerRoadmap } from '@/components/career/CareerRoadmap'
import { CompanyTraitList } from '@/components/career/CompanyTraitList'
import { SkillGapChecker } from '@/components/career/SkillGapChecker'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CAREER_PATH_MAP, CATEGORY_LABEL } from '@/data/careerPaths'
import { STARTING_ROLE_LABEL } from '@/data/values'
import NotFoundPage from './NotFoundPage'

export default function CareerDetailPage() {
  const { id = '' } = useParams()
  const path = CAREER_PATH_MAP[id]
  if (!path) return <NotFoundPage message="キャリアが見つかりませんでした" />

  return (
    <>
      <section className="border-b bg-grid">
        <div className="container py-10 sm:py-14">
          <Link to="/careers" className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> キャリア図鑑
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{CATEGORY_LABEL[path.category]}</Badge>
            {path.startingRoles.map((r) => (
              <Badge key={r} variant="outline">{STARTING_ROLE_LABEL[r]}から</Badge>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{path.name}</h1>
          <p className="mt-2 text-lg font-bold text-primary">{path.catchcopy}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{path.description}</p>
        </div>
      </section>

      <div className="container space-y-10 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Card>
            <CardHeader><CardTitle>ゴールから逆算したロードマップ</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <CareerRoadmap path={path} />
              <div className="flex gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" />
                <p><span className="font-bold">知っておきたい現実：</span>{path.realityCheck}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>必要なスキルと経験</CardTitle></CardHeader>
            <CardContent><SkillGapChecker path={path} /></CardContent>
          </Card>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-black sm:text-2xl">このキャリアを実現しやすい会社</h2>
          <CompanyTraitList traitIds={path.traitIds} />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black sm:text-2xl">面接で聞きたい質問</h2>
          <ul className="space-y-2">
            {path.interviewQuestions.map((q) => (
              <li key={q} className="rounded-xl border bg-card px-4 py-3 text-sm font-bold">Q. {q}</li>
            ))}
          </ul>
        </section>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-black">このキャリア、自分に合っている？</p>
              <p className="text-sm opacity-80">AIとの対話で、あなたの価値観との相性を確かめましょう。</p>
            </div>
            <Button asChild variant="accent"><Link to="/diagnosis"><Sparkles /> 診断してみる</Link></Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
