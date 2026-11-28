import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Compass, LogIn, Map, Menu, Sparkles, User } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/diagnosis', label: 'AI診断', icon: Sparkles },
  { to: '/careers', label: 'キャリア図鑑', icon: Map },
  { to: '/mypage', label: 'マイページ', icon: User },
]

export function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" aria-label="トップへ">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary',
                  isActive && 'bg-secondary text-primary',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
          {user ? (
            <span className="ml-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary">
              {user.nickname} さん
            </span>
          ) : (
            <Button variant="ghost" size="sm" className="ml-2" onClick={() => navigate('/login')}>
              <LogIn /> ログイン
            </Button>
          )}
          <Button size="sm" variant="accent" className="ml-2" onClick={() => navigate('/diagnosis')}>
            無料で診断する
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="メニューを開く">
              <Menu className="!size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>メニュー</SheetTitle>
            <SheetDescription className="sr-only">サイト内のページへ移動します</SheetDescription>
            <nav className="mt-2 flex flex-col gap-1">
              {[{ to: '/', label: 'トップ', icon: Compass }, ...NAV].map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-3 font-bold text-muted-foreground',
                      isActive && 'bg-secondary text-primary',
                    )
                  }
                >
                  <n.icon className="h-5 w-5" /> {n.label}
                </NavLink>
              ))}
              {!user && (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 font-bold text-muted-foreground"
                >
                  <LogIn className="h-5 w-5" /> ログイン / 新規登録
                </NavLink>
              )}
            </nav>
            <Button
              variant="accent"
              size="lg"
              className="mt-auto"
              onClick={() => {
                setOpen(false)
                navigate('/diagnosis')
              }}
            >
              <Sparkles /> 無料で診断する
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
