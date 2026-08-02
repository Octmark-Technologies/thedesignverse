import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Home, Palette, Users, Building2, Coffee, Factory, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import GetEstimate from '../../components/GetEstimate'
import WhatsAppFloat from '../../components/WhatsAppFloat'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif'

const services = [
  {
    icon: Palette,
    title: 'Interior Designers',
    desc: 'Trade pricing, material library access, dedicated account management, and procurement support for practising designers.',
    href: '/b2b/interior-designers',
    tag: 'Trade Professionals',
  },
  {
    icon: Users,
    title: 'Vendors',
    desc: 'List your products in our 11,500 sq ft experience centre and reach 3,000+ high-intent buyers every month.',
    href: '/b2b/vendors',
    tag: 'Suppliers & Brands',
  },
  {
    icon: Building2,
    title: 'Architects',
    desc: 'Material specification, BOQ generation, BIM coordination, and phased site delivery aligned to your construction schedule.',
    href: '/b2b/architects',
    tag: 'Architecture Firms',
  },
  {
    icon: Coffee,
    title: 'CoWorking Spaces',
    desc: 'Design, fitout, and furniture supply for coworking operators  , from single-floor fitouts to multi-location rollouts.',
    href: '/b2b/coworking-spaces',
    tag: 'Space Operators',
  },
  {
    icon: Factory,
    title: 'Manufacturing Support',
    desc: 'Custom furniture, modular components, and bespoke joinery  , manufactured to drawing, QC-checked, and delivered to site.',
    href: '/b2b/manufacturing-support',
    tag: 'Fabricators & Builders',
  },
  {
    icon: BookOpen,
    title: 'Material Library',
    desc: '10,000+ physical samples across 40+ categories. Browse, borrow, and specify with our expert material consultants.',
    href: '/b2b/material-library',
    tag: 'All Professionals',
  },
]

const stats = [
  { value: '850+', label: 'Registered Trade Partners' },
  { value: '5,000+', label: 'Verified Vendors' },
  { value: '10,000+', label: 'Material Samples' },
  { value: '4,000+', label: 'Projects Delivered' },
]

export default function B2BHub() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          minHeight: '60vh', display: 'flex', alignItems: 'center',
          background: '#0f1e29',
          position: 'relative', overflow: 'hidden', paddingTop: '7rem',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/Images/Gen4-A-luxurious-dream-home-interior-with-open-plan-design-spacious-living-room-flowi-a-2-28291373.webp)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            transform: 'scale(1.03)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: '#1E394F',
            opacity: 0.45,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.04) 100%)',
            pointerEvents: 'none',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ maxWidth: 680 }}>
              <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: 'rgba(244,247,242,0.45)', fontFamily: FONT, fontSize: '0.72rem', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,247,242,0.45)')}>
                  <Home size={11} /> Home
                </Link>
                <ChevronRight size={11} color="rgba(244,247,242,0.25)" />
                <span style={{ fontFamily: FONT, fontSize: '0.72rem', fontWeight: 600, color: '#CED481' }} aria-current="page">B2B Hub</span>
              </nav>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', background: 'rgba(206,212,129,0.12)', border: '1px solid rgba(206,212,129,0.25)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: FONT, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#CED481' }}>B2B Hub</span>
              </div>
              <h1 style={{ fontFamily: FONT, fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.05, marginBottom: '1.25rem' }}>
                The Professional Hub for<br /><em style={{ color: '#CED481', fontStyle: 'normal' }}>Hyderabad's Industry</em>
              </h1>
              <p style={{ fontFamily: FONT, fontSize: '1.05rem', fontWeight: 300, color: 'rgba(244,247,242,0.7)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 540 }}>
                Whether you're a designer, architect, vendor, or fabricator  , TDV's B2B Hub gives you the tools, materials, and support to deliver exceptional work at scale.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Become a Partner <ArrowRight size={14} />
                </a>
                <a href="#services" className="btn-outline">Explore Services</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: '#1E394F', padding: '2.5rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }} className="stats-bar">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ textAlign: 'center', padding: '1rem', borderRight: i < stats.length - 1 ? '1px solid rgba(244,247,242,0.1)' : 'none' }}>
                  <div style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#CED481', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: FONT, fontSize: '0.78rem', color: 'rgba(244,247,242,0.55)', marginTop: '0.3rem' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" style={{ padding: '6rem 0', background: '#F4F7F2' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
              <span className="section-label">Our B2B Services</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>Built for Every Professional</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <Link to={s.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <motion.div
                        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(30,57,79,0.1)', borderColor: '#CED481' }}
                        style={{ padding: '2rem', background: '#fff', border: '1px solid #e4e9e0', borderRadius: '4px', transition: 'all 0.22s ease', height: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                          <div style={{ width: 44, height: 44, background: 'rgba(30,57,79,0.06)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={20} color="#1E394F" strokeWidth={1.5} />
                          </div>
                          <span style={{ fontFamily: FONT, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#CED481', padding: '0.2rem 0.6rem', background: 'rgba(206,212,129,0.1)', borderRadius: '2px' }}>{s.tag}</span>
                        </div>
                        <h3 style={{ fontFamily: FONT, fontSize: '1.15rem', fontWeight: 600, color: '#1E394F', marginBottom: '0.6rem' }}>{s.title}</h3>
                        <p style={{ fontFamily: FONT, fontSize: '0.85rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: FONT, fontSize: '0.78rem', fontWeight: 600, color: '#1E394F' }}>
                          Learn More <ArrowRight size={13} />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <GetEstimate />
      </main>
      <Footer />
      <WhatsAppFloat />
      <style>{`@media(max-width:768px){.stats-bar{grid-template-columns:1fr 1fr!important}}`}</style>
    </>
  )
}
