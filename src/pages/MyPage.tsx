import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, LogOut, Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { CAREER_PATH_MAP } from '@/data/careerPaths'
import { formatDate } from '@/lib/utils'
import { diagnosisService } from '@/services/diagnosisService'
import type { DiagnosisResult } from '@/types'

const GRAD_YEARS = [2027, 2028, 2029, 2030]

export default function MyPage() {
  const { user, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [results, setResults] = useState<DiagnosisResult[]>([])
  const [deleteTarget, setDeleteTarget] = useState<DiagnosisResult | null>(null)
  const [nickname, setNickname] = useState(user?.nickname ?? '')

  useEffect(() => {
    diagnosisService.listResults(user?.id ?? null).then(setResults)
  }, [user])

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await diagnosisService.deleteResult(deleteTarget.id)
    setResults((rs) => rs.filter((r) => r.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <>
      <PageHeader eyebrow="MY PAGE" title="マイページ" description="これまでの診断結果と、就活軸の変化を振り返れます。" />
      <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black">診断履歴</h2>
            <Button size="sm" variant="accent" asChild>
              <Link to="/diagnosis"><Plus /> 新しく診断</Link>
            </Button>
          </div>

          {results.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
                <p className="font-bold">まだ診断結果がありません</p>
                <p className="text-sm text-muted-foreground">約5分の対話で、あなたの就活軸をつくりましょう。</p>
                <Button asChild variant="accent"><Link to="/diagnosis">診断をはじめる</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <ul className="space-y-3">
              {results.map((r, i) => (
                <li key={r.id}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                      <Link to={`/result/${r.id}`} className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDate(r.createdAt)}</span>
                          {i === 0 && <Badge variant="accent">最新</Badge>}
                        </div>
                        <p className="mt-1 text-lg font-black hover:text-primary">{r.typeName}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          目指すキャリア：{CAREER_PATH_MAP[r.pathMatches[0]?.pathId]?.name}
                        </p>
                      </Link>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/card/${r.id}`}><CreditCard /> カード</Link>
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(r)} aria-label="削除">
                          <Trash2 className="text-muted-foreground" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader><CardTitle>プロフィール</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">ニックネーム</Label>
                    <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} onBlur={() => updateProfile({ nickname })} />
                  </div>
                  <div className="space-y-2">
                    <Label>卒業予定年</Label>
                    <div className="flex flex-wrap gap-2">
                      {GRAD_YEARS.map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => updateProfile({ graduationYear: y })}
                          className={`rounded-full border px-3 py-1.5 text-sm font-bold ${user.graduationYear === y ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                          {String(y).slice(2)}卒
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      await signOut()
                      navigate('/')
                    }}
                  >
                    <LogOut /> ログアウト
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    現在はこの端末にのみ結果が保存されています。ログインすると、どの端末からでも見返せます。
                  </p>
                  <Button asChild className="w-full"><Link to="/login">ログイン / 新規登録</Link></Button>
                </>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>診断結果を削除しますか？</DialogTitle>
            <DialogDescription>
              {deleteTarget && `${formatDate(deleteTarget.createdAt)}の「${deleteTarget.typeName}」を削除します。この操作は取り消せません。`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>キャンセル</Button>
            <Button variant="destructive" onClick={confirmDelete}>削除する</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
