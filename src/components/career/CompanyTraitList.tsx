import { Building2, MessageSquareQuote } from 'lucide-react'
import { COMPANY_TRAIT_MAP } from '@/data/companyTraits'

export function CompanyTraitList({ traitIds }: { traitIds: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {traitIds.map((id, i) => {
        const t = COMPANY_TRAIT_MAP[id]
        if (!t) return null
        return (
          <li key={id} className="rounded-2xl border bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-amber-800">
                <Building2 className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold">
                  {i < 2 && <span className="mr-1.5 text-xs text-amber-700">重要</span>}
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
            <p className="mt-3 flex gap-2 rounded-xl bg-muted/60 p-3 text-xs leading-relaxed">
              <MessageSquareQuote className="h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="font-bold">確かめ方：</span>
                {t.howToCheck}
              </span>
            </p>
          </li>
        )
      })}
    </ul>
  )
}
