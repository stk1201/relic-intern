import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toBlob } from 'html-to-image'
import { ArrowLeft, Download, Globe, Loader2, Lock, Share2 } from 'lucide-react'
import { AxisCard, CARD_SIZE, type CardFormat, type CardTheme } from '@/components/card/AxisCard'
import { ScaledPreview } from '@/components/card/ScaledPreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { CAREER_PATH_MAP } from '@/data/careerPaths'
import { cn } from '@/lib/utils'
import { diagnosisService } from '@/services/diagnosisService'
import type { DiagnosisResult } from '@/types'
import NotFoundPage from './NotFoundPage'

const THEME_OPTIONS: { id: CardTheme; label: string; swatch: string }[] = [
  { id: 'navy', label: 'ネイビー', swatch: 'bg-[#1e2a5a]' },
  { id: 'sunrise', label: 'サンライズ', swatch: 'bg-gradient-to-br from-[#f5a524] to-[#f08c3a]' },
  { id: 'paper', label: 'ペーパー', swatch: 'bg-[#fbf9f4] ring-1 ring-inset ring-border' },
]

function OptionButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-colors',
        active ? 'border-primary bg-secondary text-primary' : 'border-transparent bg-muted/60 hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}

export default function CardPage() {
  const { id = '' } = useParams()
  const { user } = useAuth()
  const cardRef = useRef<HTMLDivElement>(null)
  const [result, setResult] = useState<DiagnosisResult | null | undefined>(undefined)
  const [theme, setTheme] = useState<CardTheme>('navy')
  const [format, setFormat] = useState<CardFormat>('landscape')
  const [pathId, setPathId] = useState('')
  const [showName, setShowName] = useState(false)
  const [nickname, setNickname] = useState(user?.nickname ?? '')
  const [busy, setBusy] = useState<'download' | 'share' | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    diagnosisService.getResult(id).then((r) => {
      setResult(r)
      if (r) setPathId(r.pathMatches[0]?.pathId ?? '')
    })
  }, [id])

  if (result === undefined) return <div className="container py-20 text-center text-muted-foreground">読み込み中…</div>
  if (result === null) return <NotFoundPage message="診断結果が見つかりませんでした" />

  const careerName = CAREER_PATH_MAP[pathId]?.name ?? ''
  const size = CARD_SIZE[format]
  const shareText = `私の就活軸は「${result.axisStatements[0]}」。キャリアタイプは「${result.typeName}」でした！`
  const shareUrl = window.location.origin

  /**
   * カードを PNG 化。
   * Supabase 接続時は storage.from('axis-cards').upload(`${userId}/${id}.png`, blob) で保存し、
   * 公開URLを OGP 画像として使う想定。
   */
  const renderBlob = async () => {
    if (!cardRef.current) return null
    const opts = { width: size.w, height: size.h, pixelRatio: 1, cacheBust: true }
    try {
      return await toBlob(cardRef.current, opts)
    } catch {
      // Webフォントの取得に失敗した場合はフォント埋め込みなしで再試行
      return await toBlob(cardRef.current, { ...opts, skipFonts: true })
    }
  }

  const download = async () => {
    setBusy('download')
    setMessage('')
    try {
      const blob = await renderBlob()
      if (!blob) throw new Error()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `career-axis-${format}.png`
      a.click()
      URL.revokeObjectURL(url)
      setMessage('画像を保存しました')
    } catch {
      setMessage('画像の生成に失敗しました。もう一度お試しください')
    } finally {
      setBusy(null)
    }
  }

  const nativeShare = async () => {
    setBusy('share')
    setMessage('')
    try {
      const blob = await renderBlob()
      const file = blob ? new File([blob], 'career-axis.png', { type: 'image/png' }) : null
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
      } else if (navigator.share) {
        await navigator.share({ text: shareText, url: shareUrl })
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        setMessage('シェア文をコピーしました')
      }
    } catch {
      /* ユーザーがキャンセルした場合など */
    } finally {
      setBusy(null)
    }
  }

  const togglePublic = async () => {
    await diagnosisService.updateVisibility(result.id, !result.isPublic)
    setResult({ ...result, isPublic: !result.isPublic })
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent('就活軸,キャリア逆算ナビ')}`
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`

  return (
    <div className="container py-8 sm:py-12">
      <Link to={`/result/${result.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> 診断結果に戻る
      </Link>
      <h1 className="mt-3 text-2xl font-black sm:text-3xl">就活軸カードをつくる</h1>
      <p className="mt-2 text-muted-foreground">デザインを選んで、画像として保存・シェアできます。</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* プレビュー */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className={cn('mx-auto', format === 'square' ? 'max-w-md' : 'max-w-3xl')}>
            <ScaledPreview width={size.w} height={size.h}>
              <AxisCard
                ref={cardRef}
                result={result}
                careerName={careerName}
                nickname={showName ? nickname : undefined}
                theme={theme}
                format={format}
              />
            </ScaledPreview>
          </div>
        </div>

        {/* 設定 */}
        <div className="min-w-0 space-y-6">
          <Card>
            <CardContent className="space-y-6 p-5 sm:p-6">
              <div className="space-y-2">
                <Label>デザイン</Label>
                <div className="flex flex-wrap gap-2">
                  {THEME_OPTIONS.map((o) => (
                    <OptionButton key={o.id} active={theme === o.id} onClick={() => setTheme(o.id)}>
                      <span className={cn('h-4 w-4 rounded-full', o.swatch)} />
                      {o.label}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>サイズ</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(CARD_SIZE) as CardFormat[]).map((f) => (
                    <OptionButton key={f} active={format === f} onClick={() => setFormat(f)}>
                      {CARD_SIZE[f].label}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>目指すキャリア</Label>
                <div className="flex flex-wrap gap-2">
                  {result.pathMatches.slice(0, 3).map((m) => (
                    <OptionButton key={m.pathId} active={pathId === m.pathId} onClick={() => setPathId(m.pathId)}>
                      {CAREER_PATH_MAP[m.pathId].shortName}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={showName}
                    onChange={(e) => setShowName(e.target.checked)}
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  ニックネームを表示する
                </label>
                {showName && (
                  <Input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={12} placeholder="例：さとう（12文字まで）" />
                )}
                <p className="text-xs text-muted-foreground">本名や大学名など、個人が特定される情報の掲載は控えましょう。</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3">
            <Button size="lg" onClick={download} disabled={busy !== null}>
              {busy === 'download' ? <Loader2 className="animate-spin" /> : <Download />} 画像を保存
            </Button>
            <Button size="lg" variant="accent" onClick={nativeShare} disabled={busy !== null}>
              {busy === 'share' ? <Loader2 className="animate-spin" /> : <Share2 />} 画像をシェア
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <a href={xUrl} target="_blank" rel="noopener noreferrer">Xでポスト</a>
              </Button>
              <Button asChild variant="outline">
                <a href={lineUrl} target="_blank" rel="noopener noreferrer">LINEで送る</a>
              </Button>
            </div>
            {message && <p className="text-center text-sm font-bold text-primary" role="status">{message}</p>}
          </div>

          <Card className="bg-muted/40">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex gap-3">
                {result.isPublic ? <Globe className="h-5 w-5 shrink-0 text-primary" /> : <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-bold">{result.isPublic ? '結果ページを公開中' : '結果ページは非公開'}</p>
                  <p className="text-xs text-muted-foreground">公開すると、URLを知っている人がカードを閲覧できます（バックエンド接続後に有効）</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={togglePublic} disabled={!user} title={!user ? 'ログインが必要です' : undefined}>
                {result.isPublic ? '非公開にする' : '公開する'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
