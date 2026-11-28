import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotateCcw, SendHorizontal } from 'lucide-react'
import { AnalyzingScreen } from '@/components/diagnosis/AnalyzingScreen'
import { ChatBubble, TypingBubble } from '@/components/diagnosis/ChatBubble'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import type { ScriptQuestion } from '@/data/questions'
import { uid } from '@/lib/storage'
import { cn } from '@/lib/utils'
import { analyze, getFirstQuestion, inferAxisFromText, respond, TOTAL_QUESTIONS } from '@/services/aiService'
import { diagnosisService } from '@/services/diagnosisService'
import type { ChatChoice, ChatMessage, DiagnosisAnswer, DiagnosisSession, EngineerField } from '@/types'

const newMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: uid(),
  role,
  content,
  createdAt: new Date().toISOString(),
})

const createSession = (): DiagnosisSession => ({
  id: uid(),
  engineerField: null,
  answers: [],
  messages: [newMessage('ai', getFirstQuestion().prompt)],
  createdAt: new Date().toISOString(),
})

export default function DiagnosisPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [session, setSession] = useState<DiagnosisSession>(createSession)
  const [question, setQuestion] = useState<ScriptQuestion | null>(getFirstQuestion)
  const [isTyping, setIsTyping] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [session.messages.length, isTyping])

  const progress = Math.round((session.answers.length / TOTAL_QUESTIONS) * 100)

  const submit = async (answerText: string, choice?: ChatChoice) => {
    if (!question || isTyping) return
    const answer: DiagnosisAnswer = {
      questionId: question.id,
      value: choice?.value ?? 'free_text',
      text: answerText,
      axis: choice?.axis ?? inferAxisFromText(answerText),
    }
    const engineerField =
      question.id === 'engineer_field' ? (answer.value as EngineerField) : session.engineerField

    const updated: DiagnosisSession = {
      ...session,
      engineerField,
      answers: [...session.answers, answer],
      messages: [...session.messages, newMessage('user', answerText)],
    }
    setSession(updated)
    setText('')
    setIsTyping(true)

    const turn = await respond(session, answer)
    const messages = [...updated.messages, newMessage('ai', turn.reply)]
    if (turn.nextQuestion) messages.push(newMessage('ai', turn.nextQuestion.prompt))
    const finalSession = { ...updated, messages }
    setSession(finalSession)
    setQuestion(turn.nextQuestion)
    setIsTyping(false)

    if (!turn.nextQuestion) {
      setTimeout(async () => {
        setIsAnalyzing(true)
        const analysis = await analyze(finalSession)
        const saved = await diagnosisService.saveResult({ ...analysis, userId: user?.id ?? null })
        navigate(`/result/${saved.id}`)
      }, 1200)
    }
  }

  const onSubmitText = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim()) submit(text.trim())
  }

  const restart = () => {
    setSession(createSession())
    setQuestion(getFirstQuestion())
    setText('')
  }

  if (isAnalyzing) return <AnalyzingScreen />

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-muted/30">
      {/* 進捗 */}
      <div className="border-b bg-background">
        <div className="container flex max-w-3xl items-center gap-3 py-3">
          <span className="shrink-0 text-xs font-bold text-muted-foreground">
            {Math.min(session.answers.length + 1, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}
          </span>
          <Progress value={progress} className="flex-1" indicatorClassName="bg-accent" />
          <Button variant="ghost" size="sm" onClick={restart} disabled={isTyping} aria-label="最初からやり直す">
            <RotateCcw /> <span className="hidden sm:inline">やり直す</span>
          </Button>
        </div>
      </div>

      {/* メッセージ */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container max-w-3xl space-y-4 py-6">
          {session.messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} content={m.content} />
          ))}
          {isTyping && <TypingBubble />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* 入力エリア */}
      {question && (
        <div className="border-t bg-background pb-[env(safe-area-inset-bottom)]">
          <div className="container max-w-3xl space-y-3 py-3 sm:py-4">
            <div
              className={cn(
                'flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible',
                question.choices.length <= 3 && 'flex-wrap',
              )}
            >
              {question.choices.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  disabled={isTyping}
                  onClick={() => submit(c.label, c)}
                  className="shrink-0 rounded-full border-2 border-primary/15 bg-card px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-secondary disabled:opacity-40"
                >
                  {c.label}
                </button>
              ))}
            </div>
            {question.allowFreeText && (
              <form onSubmit={onSubmitText} className="flex items-end gap-2">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault()
                      onSubmitText(e)
                    }
                  }}
                  rows={1}
                  maxLength={300}
                  placeholder={question.placeholder ?? '自由に入力することもできます'}
                  className="max-h-32 resize-none"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={!text.trim() || isTyping} aria-label="送信">
                  <SendHorizontal />
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
