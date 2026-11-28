import { Info, Users } from 'lucide-react'
import { HBarChart } from '@/components/admin/HBarChart'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DEMO_KPIS, DEMO_PATH_DIST, DEMO_SHARED, DEMO_UNIVERSITY, DEMO_VALUE_DIST } from '@/data/adminDemo'

export default function AdminDashboardPage() {
  return (
    <div className="bg-muted/30">
      <div className="container space-y-6 py-8 sm:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary" className="mb-2"><Users className="h-3.5 w-3.5" /> キャリアセンター管理画面</Badge>
            <h1 className="text-2xl font-black sm:text-3xl">{DEMO_UNIVERSITY}</h1>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" /> 表示しているのは架空のデモデータです
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DEMO_KPIS.map((k) => (
            <Card key={k.label}>
              <CardContent className="p-4 sm:p-5">
                <p className="text-xs font-bold text-muted-foreground">{k.label}</p>
                <p className="mt-1 font-display text-3xl font-black tabular-nums">{k.value.toLocaleString()}</p>
                {k.note && <p className="mt-0.5 text-[11px] text-muted-foreground">{k.note}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <HBarChart title="いちばん強い価値観（学生数）" unit="人" data={DEMO_VALUE_DIST} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 sm:p-6">
              <HBarChart title="目指すキャリア（第1候補・学生数）" unit="人" data={DEMO_PATH_DIST} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>面談前に共有された就活軸</CardTitle>
            <p className="text-sm text-muted-foreground">学生が「キャリアセンターに共有する」をオンにした結果のみ表示されます。</p>
          </CardHeader>
          <CardContent>
            <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="py-2 font-bold">ニックネーム</th>
                    <th className="py-2 font-bold">卒業年</th>
                    <th className="py-2 font-bold">タイプ</th>
                    <th className="py-2 font-bold">目指すキャリア</th>
                    <th className="py-2 font-bold">共有日</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_SHARED.map((s) => (
                    <tr key={s.nickname} className="border-b last:border-0">
                      <td className="py-3 font-bold">{s.nickname}</td>
                      <td className="py-3">{s.grade}</td>
                      <td className="py-3">{s.typeName}</td>
                      <td className="py-3">{s.career}</td>
                      <td className="py-3 tabular-nums text-muted-foreground">{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
