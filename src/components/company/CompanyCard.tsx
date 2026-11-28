import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { COMPANY_TRAIT_MAP } from '@/data/companyTraits'
import type { Company } from '@/types'

export function CompanyLogo({ company, size = 44 }: { company: Company; size?: number }) {
  const initial = company.name.replace(/^株式会社|株式会社$/g, '').trim().charAt(0)
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl font-display font-black text-white"
      style={{ backgroundColor: company.color, width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export function SampleBadge() {
  return (
    <Badge variant="outline" className="border-dashed text-[10px] text-muted-foreground">
      架空のサンプル企業
    </Badge>
  )
}

/** highlightTraitIds に含まれる特徴は「軸と一致」として強調 */
export function CompanyCard({ company, highlightTraitIds = [] }: { company: Company; highlightTraitIds?: string[] }) {
  return (
    <Link to={`/companies/${company.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
        <CardContent className="flex flex-1 flex-col gap-3 p-5 sm:p-5">
          <div className="flex items-start gap-3">
            <CompanyLogo company={company} />
            <div className="min-w-0">
              <p className="font-bold leading-snug group-hover:text-primary">{company.name}</p>
              <p className="text-xs text-muted-foreground">
                {company.industry}・{company.size}
              </p>
            </div>
          </div>
          <p className="text-sm font-bold text-primary">{company.tagline}</p>
          <ul className="flex flex-wrap gap-1.5">
            {company.traitIds.map((t) => {
              const hit = highlightTraitIds.includes(t)
              return (
                <li
                  key={t}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${hit ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
                >
                  {hit && <Check className="h-3 w-3" />}
                  {COMPANY_TRAIT_MAP[t]?.name}
                </li>
              )
            })}
          </ul>
          <div className="mt-auto flex items-center justify-between pt-1">
            <SampleBadge />
            <span className="flex items-center gap-1 text-sm font-bold text-primary">
              詳しく <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
