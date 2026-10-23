'use client'
import { useEffect, useRef, useState } from 'react'

export default function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ob.disconnect()
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  )
}
