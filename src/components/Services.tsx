import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Layers, Users, Wrench, Calendar, Shield } from 'lucide-react'

const B = import.meta.env.BASE_URL

const services = [
  {
    icon: BookOpen,
    title: 'Material & Design Library',
    desc: 'Browse over 10,000+ premium samples  , laminates, fabrics, tiles, finishes. Touch and feel before you decide.',
    tag: 'Exclusive Access',
    image: `${B}Images/wall.png`,
  },
  {
    icon: Layers,
    title: '3D Design & Visualisation',
    desc: 'Experience your home or office in stunning 3D before a single nail goes in. See it, approve it, love it.',
    tag: 'Immersive Studio',
    image: `${B}Images/3D.png`,
  },
  {
    icon: Users,
    title: 'Verified Vendor Network',
    desc: '5,000+ trusted experts at your service. Architects, contractors, suppliers  , all vetted, all under one roof.',
    tag: '5000+ Vendors',
    image: `${B}Images/Gen4Turbo-change-the-above-reference-image-color-into-ggreen-s-high-contrast-1348160066.webp`,
  },
  {
    icon: Wrench,
    title: 'Turnkey Interior Solutions',
    desc: 'Design, materials, execution  , all in one streamlined process. No chasing. No surprises. Honest pricing.',
    tag: 'End-to-End',
    image: `${B}Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17047330.png`,
  },
  {
    icon: Calendar,
    title: 'Events & Workshops',
    desc: 'Attend design showcases, vendor exhibitions and hands-on workshops at the Experience Centre.',
    tag: 'Experience Centre',
    image: `${B}Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17120936.webp`,
  },
  {
    icon: Shield,
    title: 'Project Management & Aftercare',
    desc: 'From site supervision to annual maintenance  , we stay with your project long after the keys are handed over.',
    tag: 'Lifetime Support',
    image: `${B}Images/Gen4-A-luxurious-dream-home-interior-with-open-plan-design-spacious-living-room-flowi-a-2-28291373.webp`,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="b2c"
      ref={ref}
      style={{ padding: '7rem 0', background: 'var(--warm-white)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 4rem' }}
        >
          <span className="section-label">Everything Under One Roof</span>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              color: 'var(--teal)',
              marginBottom: '1rem',
            }}
          >
            Your Dream Home,{' '}
            <em style={{ color: 'var(--brass-dark)', fontStyle: 'italic' }}>
              Minus the Headache
            </em>
          </h2>
          <p
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}
          >
            We make interiors effortless. One contact, all solutions  , from first inspiration to final finish.
          </p>
        </motion.div>

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{
                  background: '#fff',
                  border: '1px solid var(--warm-white-dark)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 40px rgba(30, 57, 79, 0.12)',
                  borderColor: 'var(--brass)',
                }}
              >
                {/* Image header */}
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(14,29,41,0.45) 100%)' }} />
                  <span
                    style={{
                      position: 'absolute', bottom: '0.75rem', left: '0.9rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#CED481',
                      padding: '0.22rem 0.55rem',
                      background: 'rgba(14,29,41,0.65)',
                      borderRadius: '2px',
                    }}
                  >
                    {svc.tag}
                  </span>
                </div>

                {/* Card content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: 40, height: 40,
                        background: 'rgba(30, 57, 79, 0.06)',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color="var(--teal)" strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--teal)',
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {svc.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.88rem',
                      fontWeight: 300,
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
