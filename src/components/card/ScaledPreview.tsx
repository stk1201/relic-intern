import { useEffect, useRef, useState, type ReactNode } from 'react'

/** 固定サイズの要素を、親の幅に合わせて縮小表示する */
export function ScaledPreview({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={wrapRef} className="w-full overflow-hidden rounded-2xl shadow-xl" style={{ height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}
