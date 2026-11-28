import { Flag } from 'lucide-react'
import type { CareerPath } from '@/types'

/** ゴールから今へ「逆算」で並べたロードマップ */
export function CareerRoadmap({ path }: { path: CareerPath }) {
  const reversed = [...path.steps].reverse()
  return (
    <ol className="relative">
      {reversed.map((s, i) => (
        <li key={s.period} className="relative flex gap-4 pb-6 last:pb-0">
          {i < reversed.length - 1 && (
            <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5 border-l-2 border-dashed border-primary/25" />
          )}
          <span
            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
              i === 0 ? 'bg-primary text-accent' : 'border-2 border-primary/30 bg-background text-primary'
            }`}
          >
            {i === 0 ? <Flag className="h-4 w-4" /> : reversed.length - i}
          </span>
          <div className="pt-0.5">
            <p className="text-xs font-bold text-amber-700">{s.period}</p>
            <p className="font-bold">{s.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
