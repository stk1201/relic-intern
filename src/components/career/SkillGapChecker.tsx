import { useEffect, useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { storage, STORAGE_KEYS } from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { CareerPath } from '@/types'

const TYPE_LABEL = { technical: '技術', human: 'ヒューマン', business: 'ビジネス' } as const

/**
 * 必要スキル・経験の自己チェック（＝今の自分とのギャップを可視化）
 * チェック状態はキャリアごとにローカルストレージへ保存する。
 */
export function SkillGapChecker({ path }: { path: CareerPath }) {
  const key = STORAGE_KEYS.skillChecks(path.id)
  const [checked, setChecked] = useState<string[]>(() => storage.get<string[]>(key, []))

  useEffect(() => {
    setChecked(storage.get<string[]>(key, []))
  }, [key])

  const toggle = (item: string) => {
    const next = checked.includes(item) ? checked.filter((c) => c !== item) : [...checked, item]
    setChecked(next)
    storage.set(key, next)
  }

  const items = [...path.skills.map((s) => s.name), ...path.experiences]
  const done = items.filter((i) => checked.includes(i)).length
  const rate = Math.round((done / items.length) * 100)
  const nextExperience = path.experiences.find((e) => !checked.includes(e))

  const renderRow = (label: string, tag?: string) => {
    const on = checked.includes(label)
    return (
      <li key={label}>
        <button
          type="button"
          onClick={() => toggle(label)}
          aria-pressed={on}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
            on ? 'border-primary/30 bg-secondary' : 'hover:bg-muted/60',
          )}
        >
          {on ? <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> : <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />}
          <span className={cn('flex-1', on && 'font-bold')}>{label}</span>
          {tag && <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{tag}</span>}
        </button>
      </li>
    )
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-primary/5 p-4">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="font-bold">今のあなたの到達度</span>
          <span className="font-display text-2xl font-black text-primary tabular-nums">{rate}%</span>
        </div>
        <Progress value={rate} indicatorClassName="bg-accent" />
        <p className="mt-3 text-xs text-muted-foreground">
          {nextExperience ? (
            <>
              次に積みたい経験：<span className="font-bold text-foreground">{nextExperience}</span>
            </>
          ) : (
            'すべての経験にチェックが入りました！面接で具体的なエピソードとして話せるよう整理しましょう。'
          )}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold">必要なスキル <span className="font-normal text-muted-foreground">（できるものをタップ）</span></p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {path.skills.map((s) => (
            renderRow(s.name, TYPE_LABEL[s.type])
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold">積んでおきたい経験</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {path.experiences.map((e) => (
            renderRow(e)
          ))}
        </ul>
      </div>
    </div>
  )
}
