import { PageHeader } from '@/components/common/PageHeader'

const CONTENT = {
  about: {
    title: 'このサービスについて',
    body: [
      'キャリア逆算ナビは、「どの会社に入るか」ではなく「将来どうなりたいか」から就活の軸をつくるためのAI対話アプリです。',
      'AIとの対話を通じて価値観を整理し、最初の職種の先にあるキャリアの選択肢と、必要なスキル・経験、そのキャリアを実現しやすい会社の特徴を提案します。',
      '診断結果は正解を決めるものではなく、考えるための「地図」です。OB・OG訪問や説明会で確かめながら、何度でも更新してください。',
    ],
  },
  terms: {
    title: '利用規約',
    body: ['（準備中）正式リリース前に掲載します。'],
  },
  privacy: {
    title: 'プライバシーポリシー',
    body: [
      '（準備中）正式リリース前に掲載します。',
      '対話内容や診断結果の取り扱い、AIへの送信範囲、保存期間、削除方法について明記する予定です。',
    ],
  },
} as const

export default function StaticPage({ page }: { page: keyof typeof CONTENT }) {
  const c = CONTENT[page]
  return (
    <>
      <PageHeader title={c.title} />
      <div className="container max-w-3xl space-y-4 py-10 leading-relaxed text-muted-foreground">
        {c.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </>
  )
}
