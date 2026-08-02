import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

const PROJECTS = [
  {
    id: 1,
    client: 'Dheeraj',
    sft: 1650,
    budget: '₹30L',
    location: 'Hasthinapuram',
    category: 'Residential',
    images: [
      `${B}projects/Dheeraj/KK105221.jpg`,
      `${B}projects/Dheeraj/KK105222.jpg`,
      `${B}projects/Dheeraj/KK105225.jpg`,
      `${B}projects/Dheeraj/KK105231.jpg`,
      `${B}projects/Dheeraj/KK105254.jpg`,
      `${B}projects/Dheeraj/KK105258.jpg`,
      `${B}projects/Dheeraj/KK105305.jpg`,
    ],
  },
  {
    id: 2,
    client: 'Vamshi Krishna',
    sft: 1450,
    budget: '₹20L',
    location: 'Kondapur, Lakshmi Cadillac',
    category: 'Residential',
    images: [
      `${B}projects/Vamshi%20Krishna/ARBE%20(1).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(6).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(8).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(9).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(11).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(12).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(14).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(16).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(18).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(19).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(21).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(22).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(23).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(28).jpg`,
      `${B}projects/Vamshi%20Krishna/ARBE%20(29).jpg`,
    ],
  },
  {
    id: 3,
    client: 'Sri Laxmi',
    sft: 1850,
    budget: '₹28L',
    location: 'Khajaguda, Niharika Skyline',
    category: 'Residential',
    images: [
      `${B}projects/Sri%20laxmi/SO102165.jpg`,
      `${B}projects/Sri%20laxmi/SO102168.jpg`,
      `${B}projects/Sri%20laxmi/SO102222.jpg`,
      `${B}projects/Sri%20laxmi/SO102258.jpg`,
      `${B}projects/Sri%20laxmi/SO102285.jpg`,
      `${B}projects/Sri%20laxmi/SO102291.jpg`,
      `${B}projects/Sri%20laxmi/SO102303.jpg`,
      `${B}projects/Sri%20laxmi/SO102312.jpg`,
      `${B}projects/Sri%20laxmi/SO102316.jpg`,
      `${B}projects/Sri%20laxmi/SO102328.jpg`,
      `${B}projects/Sri%20laxmi/SO102333.jpg`,
      `${B}projects/Sri%20laxmi/SO102345.jpg`,
      `${B}projects/Sri%20laxmi/SO102346.jpg`,
      `${B}projects/Sri%20laxmi/SO102354.jpg`,
      `${B}projects/Sri%20laxmi/SO102360.jpg`,
      `${B}projects/Sri%20laxmi/SO102367.jpg`,
      `${B}projects/Sri%20laxmi/SO102378.jpg`,
      `${B}projects/Sri%20laxmi/SO102392.jpg`,
      `${B}projects/Sri%20laxmi/SO102423.jpg`,
    ],
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

// ── Single project card with internal image slider ────────────────────────────
function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = project.images.length
  const noImages = total === 0

  const go = (idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
  }
  const prev = () => go((current - 1 + total) % total, -1)
  const next = () => go((current + 1) % total,  1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#fff',
        border: '1px solid rgba(15,30,41,0.08)',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* ── Image slider ── */}
      <div style={{ position: 'relative', height: 260, background: '#e8e8e3', overflow: 'hidden' }}>
        {noImages && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.3)', fontFamily: FONT }}>Images coming soon</span>
          </div>
        )}
        <AnimatePresence initial={false} custom={direction}>
          {!noImages && <motion.img
            key={current}
            src={project.images[current]}
            alt={`${project.client} ,  image ${current + 1}`}
            custom={direction}
            variants={{
              enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />}
        </AnimatePresence>

        {/* Arrows ,  only shown when more than 1 image */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.88)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 2,
                boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.88)')}
              aria-label="Previous image"
            >
              <ChevronLeft size={15} color="#0f1e29" />
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.88)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 2,
                boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.88)')}
              aria-label="Next image"
            >
              <ChevronRight size={15} color="#0f1e29" />
            </button>
          </>
        )}

        {/* Dot navigation */}
        {total > 1 && (
          <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '5px', zIndex: 2,
          }}>
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: i === current ? 18 : 6,
                  height: 6, borderRadius: 3,
                  background: i === current ? '#CED481' : 'rgba(255,255,255,0.65)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.25s ease, background 0.2s',
                }}
              />
            ))}
          </div>
        )}

        {/* Category tag */}
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 2,
          background: 'rgba(15,30,41,0.75)', backdropFilter: 'blur(6px)',
          borderRadius: 3, padding: '0.28rem 0.65rem',
          fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#CED481', fontFamily: FONT,
        }}>
          {project.category}
        </div>
      </div>

      {/* ── Project info ── */}
      <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
        <h3 style={{
          fontFamily: FONT, fontSize: '0.95rem', fontWeight: 400,
          color: '#0f1e29', marginBottom: '0.2rem', letterSpacing: '-0.01em',
        }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.38)', marginRight: '0.4rem' }}>Client:</span>
          {project.client}
        </h3>
        <p style={{ fontSize: '0.7rem', color: 'rgba(15,30,41,0.4)', marginBottom: '0.75rem', letterSpacing: '0.02em', fontFamily: FONT }}>
          {project.location}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.35)', marginBottom: '0.2rem' }}>
              Area
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0f1e29' }}>
              {project.sft.toLocaleString('en-IN')} sft
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main style={{ background: '#f9f9f6', minHeight: '100vh', fontFamily: FONT }}>

        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f1e29 0%, #1a3347 100%)',
          padding: 'clamp(6rem,12vh,9rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vh,4.5rem)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.65rem' }}>›</span>
              <span style={{ fontSize: '0.68rem', color: '#CED481', letterSpacing: '0.05em', fontWeight: 500 }}>Projects</span>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 24, height: 1, background: 'rgba(206,212,129,0.5)' }} />
              <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#CED481' }}>
                Our Work
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 200,
              color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Finished Projects
            </h1>
          </div>
        </div>

        {/* ── Filter + Grid ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2.5rem,5vh,4rem) clamp(1.5rem,5vw,4rem)' }}>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: 3,
                    border: active ? '1px solid #6b700a' : '1px solid rgba(15,30,41,0.12)',
                    background: active ? '#6b700a' : '#fff',
                    color: active ? '#fff' : 'rgba(15,30,41,0.6)',
                    fontSize: '0.75rem', fontWeight: active ? 600 : 400,
                    letterSpacing: '0.06em', cursor: 'pointer', fontFamily: FONT,
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(107,112,10,0.4)'; e.currentTarget.style.color = '#6b700a' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(15,30,41,0.12)'; e.currentTarget.style.color = 'rgba(15,30,41,0.6)' } }}
                >
                  {cat}
                </button>
              )
            })}
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'rgba(15,30,41,0.35)', alignSelf: 'center' }}>
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  )
}
