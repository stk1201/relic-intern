import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください')
      return
    }
    setLoading(true)
    try {
      if (mode === 'signin') await signIn(email, password)
      else await signUp(email, password, nickname)
      navigate('/mypage')
    } catch {
      setError('ログインに失敗しました。入力内容をご確認ください')
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
    navigate('/mypage')
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-grid px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <Logo />
            <p className="text-sm text-muted-foreground">診断結果を保存して、いつでも見返せます</p>
          </div>

          <Tabs value={mode} onValueChange={(v) => setMode(v as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">ログイン</TabsTrigger>
              <TabsTrigger value="signup">新規登録</TabsTrigger>
            </TabsList>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <TabsContent value="signup" className="mt-0 space-y-2">
                <Label htmlFor="nickname">ニックネーム</Label>
                <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="例：さとう" maxLength={20} />
              </TabsContent>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8文字以上"
                />
              </div>
              {error && <p className="text-sm font-bold text-destructive" role="alert">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading && <Loader2 className="animate-spin" />}
                {mode === 'signin' ? 'ログイン' : '登録してはじめる'}
              </Button>
            </form>
          </Tabs>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> または <span className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" size="lg" className="w-full" onClick={onGoogle} disabled={loading}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Googleで続ける
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            続行すると<Link to="/terms" className="underline">利用規約</Link>と
            <Link to="/privacy" className="underline">プライバシーポリシー</Link>に同意したものとみなされます。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
