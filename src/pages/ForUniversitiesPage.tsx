import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, CheckCircle2, ClipboardList, GraduationCap, Lock, MessageSquareText, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const PAINS = [
  '面談の時間が限られ、学生の価値観を掘り下げきれない',
  '「エンジニアになりたい」の先を一緒に描く材料が少ない',
  '学生全体の志向や傾向がデータで見えない',
]

const FEATURES = [
  { icon: MessageSquareText, title: '面談の前準備をAIが', text: '学生は事前にAIと対話して就活軸を言語化。面談はその「先」の相談から始められます。' },
  { icon: ClipboardList, title: '就活軸カードの共有', text: '学生が同意した場合のみ、診断結果を面談前にキャリアセンターへ共有できます。' },
  { icon: BarChart3, title: '傾向がわかる管理画面', text: '価値観や目指すキャリアの分布を匿名で集計。ガイダンスや企業連携の企画に活かせます。' },
  { icon: GraduationCap, title: '学生は無料で利用', text: '大学単位でのご契約のため、学生は費用負担なくすべての機能を利用できます。' },
]

const FLOW = ['お問い合わせ', 'オンラインでのご説明・デモ', '試験導入（一部学年など）', '本導入・学生への案内']

export default function ForUniversitiesPage() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Supabase 接続後は inquiries テーブルに保存し、担当者へ通知する
    setSent(true)
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-14 sm:py-20">
          <p className="text-sm font-bold text-accent">大学・キャリアセンターの方へ</p>
          <h1 className="mt-3 text-balance text-3xl font-black leading-tight sm:text-5xl sm:leading-tight">
            学生一人ひとりの「その先」を、
            <br className="hidden sm:block" />
            キャリアセンターと一緒に。
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed opacity-85">
            キャリア逆算ナビは、エンジニア志望の学生がAIとの対話で将来像と会社選びの軸を言語化するサービスです。
            面談の質を高め、学生全体の傾向を把握するためのツールとしてご導入いただけます。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg"><a href="#contact">導入について相談する</a></Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link to="/admin">管理画面のデモを見る</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-center text-2xl font-black sm:text-3xl">キャリア支援の現場で、こんな課題はありませんか？</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PAINS.map((p) => (
            <Card key={p} className="bg-muted/40"><CardContent className="p-5 font-bold leading-relaxed sm:p-6">{p}</CardContent></Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-black sm:text-3xl">導入でできること</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-accent"><f.icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-bold">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-black sm:text-3xl">学生のプライバシーを守る設計</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed">
            {[
              '個人の診断結果は、学生本人が共有をオンにした場合のみキャリアセンターに表示',
              '管理画面の統計は匿名で集計し、個人が特定されない形で表示',
              '学生はいつでも共有を取り消し、結果を削除可能',
            ].map((t) => (
              <li key={t} className="flex gap-2"><Lock className="h-4 w-4 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-black sm:text-3xl">導入の流れ</h2>
          <ol className="mt-6 space-y-3">
            {FLOW.map((f, i) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-bold">
                <span className="font-display text-xl font-black text-accent">{i + 1}</span>{f}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">料金は学生数・導入範囲に応じてお見積もりします。</p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-muted/40 py-16">
        <div className="container max-w-2xl">
          <h2 className="text-center text-2xl font-black sm:text-3xl">お問い合わせ</h2>
          <Card className="mt-8">
            <CardContent className="p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <p className="font-bold">お問い合わせを受け付けました</p>
                  <p className="text-sm text-muted-foreground">担当者より3営業日以内にご連絡します。（デモのため実際には送信されません）</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="univ">大学名</Label><Input id="univ" required placeholder="〇〇大学" /></div>
                    <div className="space-y-2"><Label htmlFor="dept">部署名</Label><Input id="dept" placeholder="キャリアセンター" /></div>
                    <div className="space-y-2"><Label htmlFor="name">ご担当者名</Label><Input id="name" required /></div>
                    <div className="space-y-2"><Label htmlFor="mail">メールアドレス</Label><Input id="mail" type="email" required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="msg">ご相談内容</Label><Textarea id="msg" rows={4} placeholder="対象学年や学生数、導入時期など" /></div>
                  <Button type="submit" size="lg" className="w-full"><Send /> 送信する</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
