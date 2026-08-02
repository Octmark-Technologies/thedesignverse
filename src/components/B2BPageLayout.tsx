import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import GetEstimate from './GetEstimate'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFloat from './WhatsAppFloat'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif'

export type B2BFeature = { icon: React.ReactNode; title: string; desc: string }
export type B2BStep   = { num: string; title: string; desc: string }

export type Crumb = { label: string; href?: string }

type Props = {
  badge: string
  title: string
  titleHighlight: string
  subtitle: string
  heroColor?: string
  heroImage?: string
  breadcrumbs?: Crumb[]
  features: B2BFeature[]
  steps: B2BStep[]
  stats: { value: string; label: string }[]
  whyUs: { title: string; desc: string }[]
  children?: React.ReactNode
}

export default function B2BPageLayout({ badge, title, titleHighlight, subtitle, heroColor = '#1E394F', heroImage, breadcrumbs = [], features, steps, stats, whyUs, children }: Props) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="b2b-hero" style={{
          minHeight: '70vh', display: 'flex', alignItems: 'center',
          background: heroImage ? '#0f1e29' : `linear-gradient(135deg, ${heroColor} 0%, #0f1e29 100%)`,
          position: 'relative', overflow: 'hidden', paddingTop: '7rem',
        }}>
          {heroImage && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${import.meta.env.BASE_URL}${heroImage.replace(/^\//, '')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              transform: 'scale(1.03)',
            }} />
          )}
          {/* Two-layer overlay: colour tint + directional gradient for text legibility */}
          {heroImage ? (
            <>
              {/* Base colour wash ,  keeps page colour identity visible */}
              <div style={{
                position: 'absolute', inset: 0,
                background: heroColor,
                opacity: 0.45,
                pointerEvents: 'none',
              }} />
              {/* Directional gradient ,  left dark for text, right open for image */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.04) 100%)',
                pointerEvents: 'none',
              }} />
            </>
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, ${heroColor} 0%, #0f1e29 100%)`,
              backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(206,212,129,0.08) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
          )}
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ maxWidth: 680 }}>
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: 'rgba(244,247,242,0.45)', fontFamily: FONT, fontSize: '0.72rem', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.45)')}>
                  <Home size={11} /> Home
                </Link>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ChevronRight size={11} color="rgba(244,247,242,0.25)" />
                    {crumb.href ? (
                      <Link to={crumb.href} style={{ textDecoration: 'none', color: 'rgba(244,247,242,0.45)', fontFamily: FONT, fontSize: '0.72rem', fontWeight: 500, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.85)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.45)')}>
                        {crumb.label}
                      </Link>
                    ) : (
                      <span style={{ fontFamily: FONT, fontSize: '0.72rem', fontWeight: 600, color: '#CED481' }} aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', background: 'rgba(206,212,129,0.12)', border: '1px solid rgba(206,212,129,0.25)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: FONT, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#CED481' }}>{badge}</span>
              </div>
              <h1 style={{ fontFamily: FONT, fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.05, marginBottom: '1.25rem' }}>
                {title}<br /><em style={{ color: '#CED481', fontStyle: 'normal' }}>{titleHighlight}</em>
              </h1>
              <p style={{ fontFamily: FONT, fontSize: '1.05rem', fontWeight: 300, color: 'rgba(244,247,242,0.7)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 540 }}>
                {subtitle}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Get in Touch <ArrowRight size={14} />
                </a>
                <a href="#features" className="btn-outline">See What We Offer</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: '#1E394F', padding: '2.5rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: '1rem' }} className="stats-bar">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ textAlign: 'center', padding: '1rem', borderRight: i < stats.length - 1 ? '1px solid rgba(244,247,242,0.1)' : 'none' }}>
                  <div style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#CED481', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: FONT, fontSize: '0.78rem', fontWeight: 400, color: 'rgba(244,247,242,0.55)', marginTop: '0.3rem' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" style={{ padding: '6rem 0', background: '#F4F7F2' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
              <span className="section-label">What We Offer</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>Designed for Professionals</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ padding: '2rem', background: '#fff', border: '1px solid #e4e9e0', borderRadius: '4px', transition: 'all 0.22s ease' }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(30,57,79,0.1)', borderColor: 'var(--brass)' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(30,57,79,0.06)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>{f.icon}</div>
                  <h3 style={{ fontFamily: FONT, fontSize: '1.1rem', fontWeight: 600, color: '#1E394F', marginBottom: '0.6rem' }}>{f.title}</h3>
                  <p style={{ fontFamily: FONT, fontSize: '0.85rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.65 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '6rem 0', background: '#fff' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="section-label">The Process</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>How It Works</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: '1px', background: '#e4e9e0', borderRadius: '4px', overflow: 'hidden' }} className="steps-row">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ padding: '2.5rem 2rem', background: '#fff', textAlign: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? '#1E394F' : '#F4F7F2', border: `2px solid ${i === 0 ? '#1E394F' : '#e4e9e0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <span style={{ fontFamily: FONT, fontSize: '0.75rem', fontWeight: 700, color: i === 0 ? '#CED481' : '#5a7a8a' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontFamily: FONT, fontSize: '1rem', fontWeight: 600, color: '#1E394F', marginBottom: '0.6rem' }}>{step.title}</h3>
                  <p style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.6 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.steps-row{grid-template-columns:1fr!important}.stats-bar{grid-template-columns:1fr 1fr!important}}`}</style>
        </section>

        {/* Why TDV */}
        <section style={{ padding: '6rem 0', background: '#1E394F' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
              <span className="section-label">Why TDV</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#F4F7F2' }}>Why Professionals Choose Us</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
              {whyUs.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ padding: '2rem', border: '1px solid rgba(206,212,129,0.15)', borderRadius: '4px', background: 'rgba(244,247,242,0.03)' }}>
                  <div style={{ fontFamily: FONT, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CED481', marginBottom: '0.6rem' }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: FONT, fontSize: '1.1rem', fontWeight: 600, color: '#F4F7F2', marginBottom: '0.5rem' }}>{w.title}</h3>
                  <p style={{ fontFamily: FONT, fontSize: '0.83rem', fontWeight: 300, color: 'rgba(244,247,242,0.55)', lineHeight: 1.65 }}>{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {children}
        <GetEstimate />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
