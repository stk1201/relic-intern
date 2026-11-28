import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CAREER_PATHS, CATEGORY_LABEL } from '@/data/careerPaths'
import type { CareerCategory } from '@/types'

type Filter = 'all' | CareerCategory

export default function CareersPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const paths = useMemo(
    () => (filter === 'all' ? CAREER_PATHS : CAREER_PATHS.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <>
      <PageHeader
        eyebrow="CAREER MAP"
        title="キャリア図鑑"
        description="新卒エンジニアの先に、どんな道があるのか。それぞれのゴールと必要なスキル、合う会社の特徴をまとめました。"
      />
      <div className="container py-10">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
            <TabsList className="w-max">
              <TabsTrigger value="all">すべて</TabsTrigger>
              {(Object.keys(CATEGORY_LABEL) as CareerCategory[]).map((c) => (
                <TabsTrigger key={c} value={c}>{CATEGORY_LABEL[c]}</TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => (
            <Link key={p.id} to={`/careers/${p.id}`} className="group">
              <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{CATEGORY_LABEL[p.category]}</Badge>
                  <CardTitle className="pt-2 group-hover:text-primary">{p.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{p.catchcopy}</p>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.skills.slice(0, 3).map((s) => (
                      <span key={s.name} className="rounded-full bg-muted px-2.5 py-1 text-xs">{s.name}</span>
                    ))}
                  </div>
                  <p className="flex items-center gap-1 text-sm font-bold text-primary">
                    詳しく見る <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
