import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Info } from 'lucide-react'
import { CompanyLogo, SampleBadge } from '@/components/company/CompanyCard'
import { CompanyTraitList } from '@/components/career/CompanyTraitList'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CAREER_PATH_MAP } from '@/data/careerPaths'
import { COMPANY_MAP } from '@/data/companies'
import { ENGINEER_FIELD_LABEL } from '@/data/values'
import NotFoundPage from './NotFoundPage'

export default function CompanyDetailPage() {
  const { id = '' } = useParams()
  const company = COMPANY_MAP[id]
  if (!company) return <NotFoundPage message="企業が見つかりませんでした" />

  return (
    <>
      <section className="border-b bg-grid">
        <div className="container py-10 sm:py-14">
          <Link to="/companies" className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> 軸から探す企業
          </Link>
          <div className="mt-5 flex items-start gap-4">
            <CompanyLogo company={company} size={64} />
            <div>
              <SampleBadge />
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">{company.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {company.industry}・{company.size}・{company.employees}
              </p>
            </div>
          </div>
          <p className="mt-5 text-lg font-bold text-primary">{company.tagline}</p>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{company.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {company.engineerFields.map((f) => (
              <Badge key={f} variant="secondary">{ENGINEER_FIELD_LABEL[f]}</Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="container space-y-10 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>制度・環境の例</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {company.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {h}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>実現しやすいキャリア</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {company.careerPathIds.map((pid) => {
                const p = CAREER_PATH_MAP[pid]
                return (
                  <Link key={pid} to={`/careers/${pid}`} className="group flex items-center justify-between rounded-xl border p-3 hover:border-primary/40">
                    <div>
                      <p className="font-bold group-hover:text-primary">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.catchcopy}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-black sm:text-2xl">この企業の特徴と、確かめ方</h2>
          <CompanyTraitList traitIds={company.traitIds} />
        </section>

        <p className="flex items-start gap-2 rounded-xl border border-dashed p-4 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          この企業は説明用の架空のサンプルです。実際の企業研究では、説明会・OB/OG訪問・面接で制度の実態を必ず確認してください。
        </p>
      </div>
    </>
  )
}
