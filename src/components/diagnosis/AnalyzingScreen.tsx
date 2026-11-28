import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PHASES = ['あなたの価値観を整理しています', 'キャリアパスと照らし合わせています', '会社選びの軸をまとめています']

export function AnalyzingScreen() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => Math.min(p + 1, PHASES.length - 1)), 750)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black">あなたのキャリアを逆算中…</h2>
        <ul className="mt-6 space-y-3 text-left">
          {PHASES.map((p, i) => (
            <li key={p} className={cn('flex items-center gap-3 text-sm transition-opacity', i > phase && 'opacity-30')}>
              {i < phase ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Loader2 className={cn('h-4 w-4', i === phase && 'animate-spin')} />
              )}
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
