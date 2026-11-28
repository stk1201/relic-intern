import { Link } from 'react-router-dom'
import { Logo } from '@/components/common/Logo'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            なりたい未来から逆算して、会社選びの軸をつくる。就活生のためのAIキャリア対話アプリです。
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold">サービス</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/diagnosis" className="hover:text-primary">AI診断</Link></li>
            <li><Link to="/careers" className="hover:text-primary">キャリア図鑑</Link></li>
            <li><Link to="/mypage" className="hover:text-primary">マイページ</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold">ご利用にあたって</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">このサービスについて</Link></li>
            <li><Link to="/terms" className="hover:text-primary">利用規約</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">プライバシーポリシー</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        診断結果はキャリアを考えるための参考情報です。© {new Date().getFullYear()} キャリア逆算ナビ
      </div>
    </footer>
  )
}
