import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience', sub: 'Trusted Since 2014' },
  { value: 10000, suffix: '+', label: 'Material Samples', sub: 'Touch & Feel Library' },
  { value: 5000, suffix: '+', label: 'Verified Vendors', sub: 'Trusted Network' },
  { value: 1500, suffix: '+', label: 'Projects Completed', sub: '100% Client Satisfaction' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--teal)',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRight: i < stats.length - 1 ? '1px solid rgba(244, 247, 242, 0.1)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--brass)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--warm-white)',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'rgba(244, 247, 242, 0.5)',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="borderRight"] { border-right: none !important; border-bottom: 1px solid rgba(244, 247, 242, 0.1); }
        }
      `}</style>
    </section>
  )
}
