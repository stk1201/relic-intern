import { useState } from 'react'
import { BarChart3, Table2 } from 'lucide-react'

export interface BarDatum {
  label: string
  value: number
}

/** 単一系列の横棒グラフ（値ラベル直接表示・ホバーで詳細・表ビュー切替つき） */
export function HBarChart({ title, unit, data }: { title: string; unit: string; data: BarDatum[] }) {
  const [asTable, setAsTable] = useState(false)
  const max = Math.max(...data.map((d) => d.value))
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-bold">{title}</p>
        <button
          type="button"
          onClick={() => setAsTable((v) => !v)}
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-muted-foreground hover:bg-muted"
        >
          {asTable ? <BarChart3 className="h-3.5 w-3.5" /> : <Table2 className="h-3.5 w-3.5" />}
          {asTable ? 'グラフで見る' : '表で見る'}
        </button>
      </div>
      {asTable ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-2 font-bold">項目</th>
              <th className="py-2 text-right font-bold">{unit}</th>
              <th className="py-2 text-right font-bold">割合</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b last:border-0">
                <td className="py-2">{d.label}</td>
                <td className="py-2 text-right tabular-nums">{d.value}</td>
                <td className="py-2 text-right tabular-nums">{Math.round((d.value / total) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="space-y-2.5">
          {data.map((d) => (
            <li key={d.label} className="group grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm sm:grid-cols-[10rem_1fr_3rem]">
              <span className="truncate text-muted-foreground group-hover:text-foreground" title={d.label}>{d.label}</span>
              <div className="relative h-3 rounded-full bg-secondary" title={`${d.label}：${d.value}${unit}（${Math.round((d.value / total) * 100)}%）`}>
                <div className="h-full rounded-r-[4px] rounded-l-full bg-primary transition-opacity group-hover:opacity-80" style={{ width: `${(d.value / max) * 100}%` }} />
              </div>
              <span className="text-right font-bold tabular-nums">{d.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
