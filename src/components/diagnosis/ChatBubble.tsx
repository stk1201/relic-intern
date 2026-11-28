import { LogoMark } from '@/components/common/Logo'
import { cn } from '@/lib/utils'
import type { ChatRole } from '@/types'

export function ChatBubble({ role, content }: { role: ChatRole; content: string }) {
  const isAi = role === 'ai'
  return (
    <div className={cn('flex animate-fade-up gap-2.5', isAi ? 'justify-start' : 'justify-end')}>
      {isAi && <LogoMark className="mt-1 h-8 w-8 shrink-0" />}
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%]',
          isAi ? 'rounded-tl-sm border bg-card' : 'rounded-tr-sm bg-primary text-primary-foreground',
        )}
      >
        {content}
      </div>
    </div>
  )
}

export function TypingBubble() {
  return (
    <div className="flex gap-2.5" aria-label="AIが入力中">
      <LogoMark className="mt-1 h-8 w-8 shrink-0" />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border bg-card px-4 py-4">
        {[0, 200, 400].map((d) => (
          <span key={d} className="h-2 w-2 animate-blink rounded-full bg-primary/60" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  )
}
