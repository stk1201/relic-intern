import type { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, description, children }: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="border-b bg-grid">
      <div className="container py-10 sm:py-14">
        {eyebrow && <p className="mb-2 text-sm font-bold text-amber-700">{eyebrow}</p>}
        <h1 className="text-balance text-2xl font-black sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
        {children}
      </div>
    </section>
  )
}
