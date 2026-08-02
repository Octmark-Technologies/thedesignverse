import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Maximize2, Layers, Zap, Award } from 'lucide-react'

const features = [
  { icon: Maximize2, title: '11,500 sq ft', desc: 'Sprawling experience floor with live installations and curated material zones' },
  { icon: Layers, title: '10,000+ Samples', desc: 'Every texture, finish, and material ,  touch it, feel it, before you commit' },
  { icon: Zap, title: '3D Visualisation Studio', desc: 'Walk through your space in immersive 3D before a single material is purchased' },
  { icon: Award, title: 'Expert Consultants', desc: 'On-floor design experts available 7 days a week for personalised guidance' },
]

const B = import.meta.env.BASE_URL

const galleryImages = [
  { src: `${B}Images/Expereince-centre.png`,    alt: 'Experience Centre Kitchen' },
  { src: `${B}Images/Experiance-Center-1.jpg`,  alt: 'Kids Room' },
  { src: `${B}Images/Experiance-Center-2.jpg`,  alt: 'Interior Space 2' },
  { src: `${B}Images/Experiance-Center-3.jpg`,  alt: 'Interior Space 3' },
  { src: `${B}Images/Experiance-Center-4.jpg`,  alt: 'Interior Space 4' },
  { src: `${B}Images/Experiance-Center-5.jpg`,  alt: 'Interior Space 5' },
  { src: `${B}Images/Experiance-Center-6.jpg`,  alt: 'Interior Space 6' },
  { src: `${B}Images/Experiance-Center-7.jpg`,  alt: 'Interior Space 7' },
]

export default function ExperienceCentre() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], [40, -40])
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  const y = isMobile ? 0 : yRaw

  return (
    <section
      id="experience"
      ref={ref}
      className="exp-section"
      style={{ padding: '7rem 0', background: 'var(--teal-dark, #142939)', overflow: 'hidden' }}
    >
      <div className="container">
        <div
          className="exp-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
        >
          {/* ── Left: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Experience Centre · Hyderabad</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: 'var(--warm-white)',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
              }}
            >
              One Visit,{' '}
              <em style={{ color: 'var(--brass)', fontStyle: 'italic' }}>Endless Possibilities</em>
            </h2>
            <p
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'rgba(244, 247, 242, 0.65)',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}
            >
              Step into Hyderabad's most comprehensive interior destination. Our 11,500 sq ft
              Experience Centre brings together materials, technology, and expertise in a single,
              curated space ,  eliminating the need to visit dozens of showrooms.
            </p>

            <div className="exp-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    style={{
                      padding: '1.25rem',
                      border: '1px solid rgba(206, 212, 129, 0.15)',
                      borderRadius: '4px',
                      background: 'rgba(244, 247, 242, 0.03)',
                    }}
                  >
                    <Icon size={18} color="var(--brass)" strokeWidth={1.5} style={{ marginBottom: '0.75rem' }} />
                    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--warm-white)', marginBottom: '0.35rem' }}>
                      {f.title}
                    </div>
                    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(244, 247, 242, 0.5)', lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <a href="#contact" className="btn-primary">Schedule a Visit</a>
          </motion.div>

          {/* ── Right: Image gallery ── */}
          <motion.div style={{ y }} className="exp-visual-wrap">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* Main image */}
              <div
                className="exp-main-img"
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid rgba(206, 212, 129, 0.2)',
                  position: 'relative',
                }}
              >
                <motion.img
                  key={active}
                  src={galleryImages[active].src}
                  alt={galleryImages[active].alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,29,41,0.6) 0%, transparent 50%)' }} />

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    padding: '0.6rem 0.9rem',
                    background: 'var(--brass)',
                    borderRadius: '4px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                  }}
                >
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--teal)', lineHeight: 1 }}>11,500</div>
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase' }}>sq ft</div>
                </motion.div>

                {/* Caption */}
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '0.9rem', color: '#F4F7F2', fontWeight: 500 }}>
                    Hyderabad's Largest Interior Destination
                  </div>
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontSize: '0.7rem', color: 'rgba(244,247,242,0.5)', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                    Open 7 days · By Appointment
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  overflowX: 'auto',
                  paddingBottom: '0.25rem',
                  scrollbarWidth: 'none',
                }}
              >
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    className="exp-thumb"
                    onClick={() => setActive(i)}
                    style={{
                      flexShrink: 0,
                      width: 56,
                      height: 40,
                      borderRadius: '3px',
                      overflow: 'hidden',
                      border: i === active ? '2px solid var(--brass)' : '2px solid transparent',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      opacity: i === active ? 1 : 0.55,
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .exp-visual-wrap { order: -1; }
          .exp-main-img { aspect-ratio: 16/9 !important; }
          .exp-features-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .exp-section { padding: 4rem 0 !important; }
          .exp-features-grid { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
          .exp-visual-wrap { transform: none !important; }
          .exp-thumb { width: 44px !important; height: 32px !important; }
        }
      `}</style>
    </section>
  )
}
