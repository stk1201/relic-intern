import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  Flag,
  MessageCircle,
  Route,
  Share2,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STEPS = [
  {
    icon: MessageCircle,
    title: 'AIと対話する',
    text: '「10年後、どんな瞬間にやりがいを感じたい？」など、約5分の質問に答えるだけ。',
  },
  {
    icon: Route,
    title: '未来のキャリアを知る',
    text: 'エンジニアの先にある道（スペシャリスト・テックリード・PM・EM・CTO・起業など）と、必要なスキルを整理。',
  },
  {
    icon: Building2,
    title: '会社選びの軸にする',
    text: 'その未来を実現しやすい会社の特徴と、面接で確かめる質問まで提案します。',
  },
]

const PAINS = [
  '「エンジニア」までは決めたけど、その先が想像できない',
  '面接で「5年後どうなっていたい？」に答えられない',
  '会社ごとに志望理由がバラバラで、軸がぶれている',
]

const TREE = [
  { id: 'specialist', name: 'スペシャリスト', sub: '技術を極める' },
  { id: 'techlead', name: 'テックリード', sub: '技術でチームを導く' },
  { id: 'pm', name: 'PM', sub: 'プロダクトを率いる' },
  { id: 'em', name: 'EM', sub: 'チームを育てる' },
  { id: 'cto', name: 'CTO', sub: '技術で経営をリード' },
  { id: 'founder', name: '起業', sub: '事業を自らつくる' },
  { id: 'solution-engineer', name: 'セールスエンジニア', sub: '技術で顧客を支える' },
  { id: 'corporate-se', name: '社内SE', sub: '社内をITで支える' },
]

const COMPARE = [
  { label: '考える起点', old: '今の性格・適性', ours: '将来なりたい姿' },
  { label: 'わかること', old: '向いている職種', ours: '職種の先のキャリアと必要スキル' },
  { label: '会社選び', old: '業界・職種で絞る', ours: 'キャリアを実現できる制度・環境で選ぶ' },
  { label: '面接での活用', old: '自己PRの材料', ours: '逆質問・志望動機の軸' },
]

const FAQ = [
  { q: '料金はかかりますか？', a: 'すべての機能を無料でご利用いただけます。' },
  { q: 'プログラミング未経験・文系でも使えますか？', a: 'はい。エンジニアを目指しているなら経験は問いません。必要なスキルのチェックで、今から何を準備すればよいかがわかります。' },
  { q: '分野（Web・インフラ・AIなど）が決まっていなくても大丈夫？', a: '大丈夫です。分野よりも「どんなエンジニアになりたいか」から考えるのがこのサービスの特徴です。' },
  { q: '診断結果は正解ですか？', a: '結果は「考えるための地図」です。正解を決めるものではありません。何度でも診断し直し、OB・OG訪問や面接で確かめながら更新してください。' },
  { q: '登録しないと使えませんか？', a: '診断は登録なしで利用できます。結果を保存して見返したい場合はログインしてください。' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div className="animate-fade-up">
            <Badge variant="accent" className="mb-4">
              <Sparkles className="h-3.5 w-3.5" /> エンジニア志望の就活生のためのAIキャリア対話
            </Badge>
            <h1 className="text-balance text-[2rem] font-black leading-tight sm:text-5xl sm:leading-tight">
              入る会社より、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">なりたい未来</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-accent/60 sm:h-4" />
              </span>
              から選ぶ。
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              AIとの対話で、あなたの価値観から「エンジニアの先のキャリア」を逆算。
              必要なスキルと、実現しやすい会社の特徴がわかる「就活軸カード」をつくります。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link to="/diagnosis">
                  無料で診断をはじめる <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/careers">キャリア図鑑を見る</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">所要時間 約5分・登録不要</p>
          </div>

          {/* 逆算ロードマップのビジュアル */}
          <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
            <Card className="relative overflow-hidden border-primary/10 p-5 shadow-xl">
              <div className="flex items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground">
                <Flag className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-xs opacity-80">10年後のゴール</p>
                  <p className="font-bold">プロダクトを率いるPM</p>
                </div>
              </div>
              <div className="relative ml-7 border-l-2 border-dashed border-primary/30 py-2 pl-6">
                {[
                  { y: '5年目', t: 'アソシエイトPMに挑戦', s: '職種転換制度がある会社' },
                  { y: '3年目', t: 'ユーザーと話す経験を積む', s: 'ユーザーとの距離が近い' },
                  { y: '1年目', t: 'エンジニアとして入社', s: '育成体制が整っている' },
                ].map((x) => (
                  <div key={x.y} className="relative py-3">
                    <span className="absolute -left-[33px] top-4 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    <p className="text-xs font-bold text-amber-700">{x.y}</p>
                    <p className="text-sm font-bold">{x.t}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" /> {x.s}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-accent bg-accent/10 p-3 text-sm font-bold">
                <ArrowDown className="h-4 w-4 rotate-180 text-amber-700" />
                今のあなたから逆算
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="container py-16 sm:py-20">
        <h2 className="text-center text-2xl font-black sm:text-3xl">こんなモヤモヤ、ありませんか？</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PAINS.map((p) => (
            <Card key={p} className="bg-muted/40">
              <CardContent className="flex items-start gap-3 p-5 sm:p-6">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <p className="font-bold leading-relaxed">{p}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          エンジニアの「その先」が見えないまま選考に進むと、志望がぶれたり、入社後に「思っていたキャリアと違う」と感じやすくなります。
        </p>
      </section>

      {/* How it works */}
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="container">
          <p className="text-center text-sm font-bold text-accent">HOW IT WORKS</p>
          <h2 className="mt-2 text-center text-2xl font-black sm:text-3xl">3ステップで、就活の軸ができる</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-black text-accent">0{i + 1}</span>
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career tree */}
      <section className="container py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-black sm:text-3xl">「エンジニア」の先にも、こんなに道がある</h2>
          <p className="mt-3 text-muted-foreground">道ごとに、必要なスキルも、合う会社も変わります。</p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="mx-auto w-fit rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">
            新卒エンジニア
          </div>
          <div className="mx-auto h-8 w-0.5 bg-primary/30" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TREE.map((t) => (
              <Link
                key={t.id}
                to={`/careers/${t.id}`}
                className="group rounded-2xl border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-bold group-hover:text-primary">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-center text-2xl font-black sm:text-3xl">一般的な適職診断との違い</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border bg-card">
            <div className="grid grid-cols-[5.5rem_1fr_1fr] bg-secondary text-xs font-bold sm:grid-cols-[9rem_1fr_1fr] sm:text-sm">
              <div className="p-3 sm:p-4" />
              <div className="p-3 text-muted-foreground sm:p-4">一般的な適職診断</div>
              <div className="bg-primary p-3 text-primary-foreground sm:p-4">キャリア逆算ナビ</div>
            </div>
            {COMPARE.map((c) => (
              <div key={c.label} className="grid grid-cols-[5.5rem_1fr_1fr] border-t text-xs sm:grid-cols-[9rem_1fr_1fr] sm:text-sm">
                <div className="p-3 font-bold sm:p-4">{c.label}</div>
                <div className="flex items-start gap-1.5 p-3 text-muted-foreground sm:p-4">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {c.old}
                </div>
                <div className="flex items-start gap-1.5 bg-primary/5 p-3 font-bold sm:p-4">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {c.ours}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card preview */}
      <section className="container grid items-center gap-10 py-16 sm:py-20 md:grid-cols-2">
        <div>
          <Badge variant="secondary" className="mb-3">
            <Share2 className="h-3.5 w-3.5" /> SNSでシェア
          </Badge>
          <h2 className="text-2xl font-black sm:text-3xl">結果は「就活軸カード」に</h2>
          <p className="mt-4 text-muted-foreground">
            あなたのタイプ、目指すキャリア、会社選びの3つの軸を1枚の画像に。
            ESや面接準備のメモとして、友だちとの共有に。公開範囲は自分で選べます。
          </p>
        </div>
        <div className="mx-auto w-full max-w-md rotate-1 rounded-3xl bg-primary p-6 text-primary-foreground shadow-2xl">
          <p className="text-xs font-bold text-accent">MY CAREER AXIS</p>
          <p className="mt-2 font-display text-2xl font-black">巻き込む開拓者</p>
          <p className="mt-1 text-sm opacity-80">目指すキャリア：プロダクトマネージャー</p>
          <ol className="mt-5 space-y-2">
            {['新しい事業やプロダクトに、手を挙げて挑戦できる', '自社プロダクトを持ち、職種を越えて企画に関われる', '若手のうちから意思決定に関われる'].map(
              (a, i) => (
                <li key={a} className="flex gap-3 rounded-xl bg-white/10 p-3 text-sm">
                  <span className="font-display font-black text-accent">{i + 1}</span>
                  {a}
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-center text-2xl font-black sm:text-3xl">よくある質問</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-card p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  {f.q}
                  <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center sm:py-24">
        <h2 className="text-balance text-2xl font-black sm:text-4xl">後悔の少ない就活を、未来から。</h2>
        <p className="mt-4 text-muted-foreground">約5分の対話で、あなたの就活軸をつくりましょう。</p>
        <Button asChild size="lg" variant="accent" className="mt-8">
          <Link to="/diagnosis">
            無料で診断をはじめる <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  )
}
