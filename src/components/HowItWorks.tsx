import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Book a Free Consultation',
    desc: 'Walk into our Experience Centre or schedule online. Meet our design experts and share your vision.',
  },
  {
    num: '02',
    title: 'Design & Visualise',
    desc: 'We create your full design in 3D  , materials, layouts, finishes  , so you see exactly what you\'re getting.',
  },
  {
    num: '03',
    title: 'Select Materials On-Floor',
    desc: 'Browse 10,000+ samples in our Touch & Feel library. Touch, compare, and approve before anything is ordered.',
  },
  {
    num: '04',
    title: 'Execution & Delivery',
    desc: 'Our verified vendors execute with precision. We supervise every stage and deliver on time, every time.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="process"
      ref={ref}
      style={{
        padding: '7rem 0',
        background: 'linear-gradient(to bottom, var(--warm-white), var(--warm-white-dark))',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <span className="section-label">Our Process</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--teal)',
            }}
          >
            How It Works
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            position: 'relative',
          }}
          className="steps-grid"
        >
          {/* Connector line */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: 'calc(12.5% + 1.5rem)',
              right: 'calc(12.5% + 1.5rem)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--brass), rgba(179,184,92,0.2))',
              zIndex: 0,
            }}
            className="steps-connector"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                padding: '0 1.5rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: i === 0 ? 'var(--brass)' : 'var(--warm-white)',
                  border: `2px solid ${i === 0 ? 'var(--brass)' : 'var(--warm-white-dark)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 4px 16px rgba(30,57,79,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: i === 0 ? 'var(--teal)' : 'var(--text-muted)',
                  }}
                >
                  {step.num}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--teal)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.83rem',
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
          .steps-connector { display: none; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
