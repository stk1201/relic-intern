import { VALUE_AXES } from '@/data/values'
import type { ValueScores } from '@/types'

/** 価値観スコア：単一系列の横棒グラフ（値は直接ラベル表示） */
export function ValueBars({ scores }: { scores: ValueScores }) {
  const sorted = [...VALUE_AXES].sort((a, b) => scores[b.id] - scores[a.id])
  return (
    <ul className="space-y-3" aria-label="価値観スコア">
      {sorted.map((axis, i) => (
        <li key={axis.id} title={`${axis.label}：${scores[axis.id]}`}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className={i < 2 ? 'font-bold' : 'text-muted-foreground'}>{axis.label}</span>
            <span className="tabular-nums font-bold">{scores[axis.id]}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-secondary">
            <div
              className={`h-full rounded-r-[4px] rounded-l-full transition-all duration-700 ${i < 2 ? 'bg-primary' : 'bg-primary/40'}`}
              style={{ width: `${scores[axis.id]}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
