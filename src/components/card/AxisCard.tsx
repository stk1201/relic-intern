import { forwardRef } from 'react'
import { VALUE_AXES } from '@/data/values'
import { cn } from '@/lib/utils'
import type { DiagnosisResult } from '@/types'

export type CardTheme = 'navy' | 'sunrise' | 'paper'
export type CardFormat = 'landscape' | 'square'

export const CARD_SIZE: Record<CardFormat, { w: number; h: number; label: string }> = {
  landscape: { w: 1200, h: 630, label: '横長（X・LINE向け）' },
  square: { w: 1080, h: 1080, label: '正方形（Instagram向け）' },
}

const THEMES: Record<CardTheme, { root: string; sub: string; accent: string; item: string; bar: string; barBg: string }> = {
  navy: {
    root: 'bg-[#1e2a5a] text-[#fbf9f4]',
    sub: 'text-[#fbf9f4]/70',
    accent: 'text-[#f5a524]',
    item: 'bg-white/10',
    bar: 'bg-[#f5a524]',
    barBg: 'bg-white/15',
  },
  sunrise: {
    root: 'bg-gradient-to-br from-[#f5a524] to-[#f08c3a] text-[#1e2a5a]',
    sub: 'text-[#1e2a5a]/70',
    accent: 'text-[#fbf9f4]',
    item: 'bg-white/35',
    bar: 'bg-[#1e2a5a]',
    barBg: 'bg-[#1e2a5a]/15',
  },
  paper: {
    root: 'bg-[#fbf9f4] text-[#1e2a5a] ring-1 ring-inset ring-[#1e2a5a]/10',
    sub: 'text-[#1e2a5a]/60',
    accent: 'text-[#d9860b]',
    item: 'bg-[#1e2a5a]/[0.06]',
    bar: 'bg-[#1e2a5a]',
    barBg: 'bg-[#1e2a5a]/10',
  },
}

interface Props {
  result: DiagnosisResult
  careerName: string
  nickname?: string
  theme: CardTheme
  format: CardFormat
}

/** 画像出力される就活軸カード（固定ピクセルサイズで描画） */
export const AxisCard = forwardRef<HTMLDivElement, Props>(({ result, careerName, nickname, theme, format }, ref) => {
  const t = THEMES[theme]
  const { w, h } = CARD_SIZE[format]
  const isSquare = format === 'square'
  const topValues = [...VALUE_AXES].sort((a, b) => result.valueScores[b.id] - result.valueScores[a.id]).slice(0, 3)

  return (
    <div
      ref={ref}
      style={{ width: w, height: h, fontFamily: '"Noto Sans JP", sans-serif' }}
      className={cn('relative flex flex-col overflow-hidden', isSquare ? 'p-[72px]' : 'p-[60px]', t.root)}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-white/10" />

      <div className="relative flex items-center justify-between">
        <p className={cn('text-[22px] font-bold tracking-[0.2em]', t.accent)}>MY CAREER AXIS</p>
        <p className={cn('text-[20px] font-bold', t.sub)}>{nickname ? `${nickname} の就活軸` : '私の就活軸'}</p>
      </div>

      <div className={cn('relative flex flex-1 gap-12', isSquare ? 'mt-10 flex-col gap-10' : 'mt-6')}>
        <div className={cn('flex flex-col', isSquare ? '' : 'w-[42%]')}>
          <p className={cn('text-[22px] font-bold', t.sub)}>キャリアタイプ</p>
          <p
            className="mt-2 font-black leading-tight"
            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif', fontSize: isSquare ? 84 : 64 }}
          >
            {result.typeName}
          </p>
          <p className={cn('mt-4 text-[22px]', t.sub)}>目指すキャリア</p>
          <p className="text-[32px] font-black leading-snug">{careerName}</p>

          <div className={cn('space-y-3', isSquare ? 'mt-8' : 'mt-auto')}>
            {topValues.map((v) => (
              <div key={v.id} className="flex items-center gap-3 text-[18px] font-bold">
                <span className="w-[72px] shrink-0">{v.short}</span>
                <div className={cn('h-[10px] flex-1 rounded-full', t.barBg)}>
                  <div className={cn('h-full rounded-full', t.bar)} style={{ width: `${result.valueScores[v.id]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <p className={cn('text-[22px] font-bold', t.sub)}>会社選びの3つの軸</p>
          <ol className="mt-4 flex flex-1 flex-col gap-4">
            {result.axisStatements.map((a, i) => (
              <li key={a} className={cn('flex flex-1 items-center gap-5 rounded-[24px] px-7', t.item)}>
                <span
                  className={cn('font-black', t.accent)}
                  style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif', fontSize: 48 }}
                >
                  {i + 1}
                </span>
                <span className={cn('font-bold leading-snug', isSquare ? 'text-[30px]' : 'text-[26px]')}>{a}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={cn('relative mt-8 flex items-center justify-between text-[18px] font-bold', t.sub)}>
        <span>#キャリア逆算ナビ #就活軸</span>
        <span>キャリア逆算ナビ</span>
      </div>
    </div>
  )
})
AxisCard.displayName = 'AxisCard'
