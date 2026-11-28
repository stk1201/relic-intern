import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage({ message = 'ページが見つかりませんでした' }: { message?: string }) {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <Compass className="h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-black">{message}</h1>
      <p className="mt-2 text-muted-foreground">URLが間違っているか、データが削除された可能性があります。</p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="outline"><Link to="/">トップへ</Link></Button>
        <Button asChild variant="accent"><Link to="/diagnosis">診断をはじめる</Link></Button>
      </div>
    </div>
  )
}
