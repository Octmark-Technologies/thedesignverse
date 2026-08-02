import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, Building2, Briefcase, Coffee, Factory, Archive, ArrowRight } from 'lucide-react'

const b2c = [
  { icon: Home, title: 'Residential Interiors', desc: 'Bespoke home interiors from concept to completion.' },
  { icon: Building2, title: 'Commercial Hubs', desc: 'Retail, hospitality, and public spaces that leave an impression.' },
  { icon: Briefcase, title: 'Office Spaces', desc: 'Productive, brand-aligned workplaces designed for performance.' },
]

const b2b = [
  { icon: Coffee, title: 'Coworking Spaces', desc: 'Flexible work environments that attract and retain talent.' },
  { icon: Factory, title: 'Manufacturing Support', desc: 'Factory-finish precision at scale for fabricators and builders.' },
  { icon: Archive, title: 'Material Library Access', desc: '10,000+ samples for professional designers and architects.' },
]

function HubCard({ icon: Icon, title, desc, index, inView, dark }: {
  icon: typeof Home; title: string; desc: string; index: number; inView: boolean; dark?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1.5rem',
        border: `1px solid ${dark ? 'rgba(206, 212, 129, 0.12)' : 'var(--warm-white-dark)'}`,
        borderRadius: '4px',
        background: dark ? 'rgba(244, 247, 242, 0.03)' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        borderColor: 'var(--brass)',
        y: -2,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          flexShrink: 0,
          background: dark ? 'rgba(206, 212, 129, 0.12)' : 'rgba(30, 57, 79, 0.06)',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={18} color={dark ? 'var(--brass)' : 'var(--teal)'} strokeWidth={1.5} />
      </div>
      <div>
        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: dark ? 'var(--warm-white)' : 'var(--teal)',
            marginBottom: '0.3rem',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 300,
            color: dark ? 'rgba(244, 247, 242, 0.5)' : 'var(--text-muted)',
            lineHeight: 1.55,
          }}
        >
          {desc}
        </div>
      </div>
    </motion.div>
  )
}

export default function DualHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: 'var(--warm-white)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Dual Audience Platform</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--teal)',
              lineHeight: 1.1,
            }}
          >
            One Hub,{' '}
            <em style={{ color: 'var(--brass-dark)', fontStyle: 'italic' }}>Two Worlds</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30, 57, 79, 0.12)',
          }}
          className="dual-grid"
        >
          {/* B2C Side */}
          <div style={{ background: 'var(--warm-white)', padding: '3rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  background: 'var(--teal)',
                  color: 'var(--brass)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  marginBottom: '1rem',
                }}
              >
                B2C  , For Homeowners
              </span>
              <h3
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: 'var(--teal)',
                  marginBottom: '0.75rem',
                }}
              >
                Your Space, Elevated
              </h3>
              <p
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                }}
              >
                Whether it's your first home or a luxury renovation, we handle every detail with precision and care.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {b2c.map((item, i) => (
                <HubCard key={item.title} {...item} index={i} inView={inView} />
              ))}
            </div>
            <a
              href="#contact"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Start Your Project <ArrowRight size={14} />
            </a>
          </div>

          {/* B2B Side */}
          <div style={{ background: 'var(--teal)', padding: '3rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  background: 'var(--brass)',
                  color: 'var(--teal)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  marginBottom: '1rem',
                }}
              >
                B2B  , For Professionals
              </span>
              <h3
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: 'var(--warm-white)',
                  marginBottom: '0.75rem',
                }}
              >
                Your Industry Partner
              </h3>
              <p
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  color: 'rgba(244, 247, 242, 0.6)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                }}
              >
                Designers, architects, and fabricators  , access the tools, materials, and space you need to deliver exceptional projects.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {b2b.map((item, i) => (
                <HubCard key={item.title} {...item} index={i} inView={inView} dark />
              ))}
            </div>
            <a
              href="#contact"
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Partner With Us <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dual-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
