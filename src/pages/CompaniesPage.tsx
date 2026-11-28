import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { CompanyCard } from '@/components/company/CompanyCard'
import { PageHeader } from '@/components/common/PageHeader'
import { COMPANIES } from '@/data/companies'
import { COMPANY_TRAITS } from '@/data/companyTraits'
import { cn } from '@/lib/utils'

export default function CompaniesPage() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const companies = useMemo(
    () => (selected.length === 0 ? COMPANIES : COMPANIES.filter((c) => selected.every((t) => c.traitIds.includes(t)))),
    [selected],
  )

  return (
    <>
      <PageHeader
        eyebrow="COMPANIES"
        title="軸から探す企業"
        description="業界や知名度ではなく、「キャリアを実現できる制度・環境」から企業を探せます。"
      >
        <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-xl border border-dashed bg-background/80 p-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          掲載している企業はすべて架空のサンプルです。実在の企業・団体とは関係ありません。
        </p>
      </PageHeader>
      <div className="container py-10">
        <p className="mb-3 text-sm font-bold">会社の特徴で絞り込む</p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
          {COMPANY_TRAITS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => toggle(t.id)}
              aria-pressed={selected.includes(t.id)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1.5 text-sm font-bold transition-colors',
                selected.includes(t.id) ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
              )}
            >
              {t.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{companies.length}社</p>
        {companies.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">条件に合う企業がありません。条件を減らしてみてください。</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => (
              <CompanyCard key={c.id} company={c} highlightTraitIds={selected} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
