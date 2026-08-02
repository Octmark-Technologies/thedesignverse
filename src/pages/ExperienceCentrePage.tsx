import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Phone, X, ChevronLeft, ChevronRight, Maximize2, Layers, Zap, Award, Users, Eye } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import GetEstimate from '../components/GetEstimate'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

const stats = [
  { icon: Maximize2, value: '11,500', unit: 'sq ft', label: 'Experience Floor' },
  { icon: Layers,   value: '10,000+', unit: '',      label: 'Material Samples' },
  { icon: Zap,      value: '3D',      unit: 'Studio', label: 'Visualisation' },
  { icon: Award,    value: '7',       unit: 'Days',   label: 'Open Weekly' },
  { icon: Users,    value: '50+',     unit: '',       label: 'Expert Consultants' },
  { icon: Eye,      value: '4,000+',  unit: '',       label: 'Projects Delivered' },
]

const spaces = [
  {
    title: 'Private Cabins',
    desc: 'Dedicated consultation cabins where you can review designs, browse materials, and plan your space in complete privacy with a senior design consultant.',
    img: `${B}Images/Cabins.png`,
    tag: 'Consultation',
    accent: '#CED481',
  },
  {
    title: 'Hot Seats & Co-working',
    desc: 'Open co-working zones where architects, designers, and homeowners collaborate side by side ,  sharing ideas and sourcing materials in real time.',
    img: `${B}Images/Hot-seats.png`,
    tag: 'Collaboration',
    accent: '#7ECAC3',
  },
  {
    title: 'Event Ready Spaces',
    desc: 'Flexible event spaces for product launches, design workshops, and client presentations ,  fully equipped with AV, modular furniture, and catering support.',
    img: `${B}Images/event-ready.png`,
    tag: 'Events',
    accent: '#E8A87C',
  },
]

const galleryImages = [
  { src: `${B}Images/Expereince-centre.png`,   alt: 'Experience Centre ,  Main Floor',  label: 'Main Floor' },
  { src: `${B}Images/Experiance-Center-1.jpg`, alt: 'Kids Room Display',               label: 'Kids Room' },
  { src: `${B}Images/Experiance-Center-2.jpg`, alt: 'Interior Space 2',                label: 'Living Concepts' },
  { src: `${B}Images/Experiance-Center-3.jpg`, alt: 'Interior Space 3',                label: 'Modular Displays' },
  { src: `${B}Images/Experiance-Center-4.jpg`, alt: 'Interior Space 4',                label: 'Material Zone' },
  { src: `${B}Images/Experiance-Center-5.jpg`, alt: 'Interior Space 5',                label: 'Bedroom Vignette' },
  { src: `${B}Images/Experiance-Center-6.jpg`, alt: 'Interior Space 6',                label: 'Kitchen Studio' },
  { src: `${B}Images/Experiance-Center-7.jpg`, alt: 'Interior Space 7',                label: 'Wardrobe Gallery' },
  { src: `${B}Images/Experiance-Center-8.jpg`, alt: 'Interior Space 8',                label: 'Accent Lounge' },
]

const scenes = [
  { src: `${B}scenes/entrance1.png`, label: 'Entrance Foyer' },
  { src: `${B}scenes/2.png`,         label: 'Living Room A' },
  { src: `${B}scenes/3.png`,         label: 'Kitchen Concept' },
  { src: `${B}scenes/4.png`,         label: 'Master Bedroom' },
  { src: `${B}scenes/5.png`,         label: 'Study Nook' },
  { src: `${B}scenes/6.png`,         label: 'Dining Area' },
  { src: `${B}scenes/7.png`,         label: 'Home Office' },
  { src: `${B}scenes/8.png`,         label: 'Kids Zone' },
  { src: `${B}scenes/10.png`,        label: 'Balcony Studio' },
  { src: `${B}scenes/14.png`,        label: 'Luxury Suite' },
]

function Lightbox({ images, startIndex, onClose }: { images: typeof galleryImages; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images.length, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(7, 16, 22, 0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22 }}
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 6, display: 'block' }}
          />
        </AnimatePresence>

        <div style={{
          position: 'absolute', bottom: '-2.5rem', left: 0, right: 0,
          textAlign: 'center', fontFamily: FONT, fontSize: '0.82rem',
          color: 'rgba(244,247,242,0.6)', letterSpacing: '0.08em',
        }}>
          {images[idx].label} &nbsp;·&nbsp; {idx + 1} / {images.length}
        </div>

        <button
          onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
          aria-label="Previous image"
          style={{
            position: 'absolute', left: '-3.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(244,247,242,0.08)', border: '1px solid rgba(244,247,242,0.15)',
            borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#F4F7F2',
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setIdx(i => (i + 1) % images.length)}
          aria-label="Next image"
          style={{
            position: 'absolute', right: '-3.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(244,247,242,0.08)', border: '1px solid rgba(244,247,242,0.15)',
            borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#F4F7F2',
          }}
        >
          <ChevronRight size={20} />
        </button>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            position: 'absolute', top: '-3rem', right: 0,
            background: 'rgba(244,247,242,0.08)', border: '1px solid rgba(244,247,242,0.15)',
            borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#F4F7F2',
          }}
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function ExperienceCentrePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [lightbox, setLightbox] = useState<{ images: typeof galleryImages; idx: number } | null>(null)

  return (
    <>
      <Navbar />
      <main>
        {/* ─── Hero ─── */}
        <section style={{
          minHeight: '100vh', position: 'relative', display: 'flex',
          alignItems: 'center', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${B}Images/Expereince-centre.png)`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,32,0.88) 0%, rgba(10,22,32,0.55) 60%, rgba(10,22,32,0.3) 100%)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '8rem', paddingBottom: '5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              style={{ maxWidth: 700 }}
            >
              <span className="section-label" style={{ color: 'var(--brass)' }}>
                Experience Centre · Hyderabad
              </span>
              <h1 style={{
                fontFamily: FONT, fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                fontWeight: 700, color: '#F4F7F2', lineHeight: 1.05,
                marginBottom: '1.5rem', marginTop: '1rem',
              }}>
                One Destination.{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--brass)' }}>Everything Interior.</em>
              </h1>
              <p style={{
                fontFamily: FONT, fontSize: '1.1rem', fontWeight: 300,
                color: 'rgba(244,247,242,0.72)', lineHeight: 1.8,
                marginBottom: '2.5rem', maxWidth: 560,
              }}>
                Hyderabad's most comprehensive interior destination ,  11,500 sq ft of live installations,
                curated material zones, private cabins, and immersive 3D visualisation.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-primary">Book a Visit</a>
                <a
                  href="#gallery"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.85rem 1.75rem', border: '1px solid rgba(244,247,242,0.3)',
                    borderRadius: 4, color: '#F4F7F2', fontFamily: FONT,
                    fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brass)'; e.currentTarget.style.color = 'var(--brass)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,247,242,0.3)'; e.currentTarget.style.color = '#F4F7F2' }}
                >
                  Explore Gallery
                </a>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            }}
          >
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(244,247,242,0.4))' }} />
          </motion.div>
        </section>

        {/* ─── Stats Strip ─── */}
        <section style={{ background: 'var(--teal-dark, #142939)', padding: '3rem 0', borderBottom: '1px solid rgba(206,212,129,0.1)' }}>
          <div className="container">
            <div className="ec-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0' }}>
              {stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      textAlign: 'center', padding: '1.5rem 1rem',
                      borderRight: i < stats.length - 1 ? '1px solid rgba(244,247,242,0.07)' : 'none',
                    }}
                  >
                    <Icon size={20} color="var(--brass)" strokeWidth={1.5} style={{ margin: '0 auto 0.75rem' }} />
                    <div style={{ fontFamily: FONT, fontSize: '1.6rem', fontWeight: 700, color: '#F4F7F2', lineHeight: 1 }}>
                      {s.value}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--brass)', marginLeft: 2 }}>{s.unit}</span>
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: '0.7rem', fontWeight: 500, color: 'rgba(244,247,242,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                      {s.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Space Cards ─── */}
        <section style={{ background: '#0f1e29', padding: '7rem 0' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto 4rem' }}
            >
              <span className="section-label">Spaces Inside</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.1 }}>
                Everything Under One Roof
              </h2>
              <p style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 300, color: 'rgba(244,247,242,0.55)', lineHeight: 1.75, marginTop: '0.75rem' }}>
                From private consultation cabins to open collaboration zones ,  the centre is designed
                for every kind of interior journey.
              </p>
            </motion.div>

            <div className="ec-spaces-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {spaces.map((space, i) => (
                <motion.div
                  key={space.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  style={{
                    borderRadius: 6, overflow: 'hidden',
                    border: '1px solid rgba(244,247,242,0.07)',
                    background: 'rgba(244,247,242,0.02)',
                    cursor: 'default',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={space.img}
                      alt={space.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      background: space.accent, borderRadius: 3,
                      padding: '0.25rem 0.65rem',
                      fontFamily: FONT, fontSize: '0.65rem', fontWeight: 700,
                      color: '#0f1e29', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {space.tag}
                    </div>
                  </div>
                  <div style={{ padding: '1.75rem' }}>
                    <h3 style={{ fontFamily: FONT, fontSize: '1.15rem', fontWeight: 600, color: '#F4F7F2', marginBottom: '0.75rem' }}>
                      {space.title}
                    </h3>
                    <p style={{ fontFamily: FONT, fontSize: '0.83rem', fontWeight: 300, color: 'rgba(244,247,242,0.5)', lineHeight: 1.7 }}>
                      {space.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Photo Gallery ─── */}
        <section id="gallery" style={{ background: 'var(--teal-dark, #142939)', padding: '7rem 0' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto 4rem' }}
            >
              <span className="section-label">Photo Tour</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.1 }}>
                Inside the Experience Centre
              </h2>
              <p style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 300, color: 'rgba(244,247,242,0.55)', lineHeight: 1.75, marginTop: '0.75rem' }}>
                Browse real photos of our showroom floor. Click any image to explore in full screen.
              </p>
            </motion.div>

            <div className="ec-gallery-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '3px',
              borderRadius: 6,
              overflow: 'hidden',
              border: '1px solid rgba(244,247,242,0.05)',
            }}>
              {galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setLightbox({ images: galleryImages, idx: i })}
                  aria-label={`Open ${img.label}`}
                  style={{
                    position: 'relative', aspectRatio: i === 0 ? '2/1' : '1/1',
                    gridColumn: i === 0 ? 'span 2' : 'span 1',
                    overflow: 'hidden', padding: 0, border: 'none',
                    cursor: 'pointer', background: '#0f1e29',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    className="gallery-overlay"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(10,22,32,0.8) 0%, transparent 55%)',
                      opacity: 0, transition: 'opacity 0.3s ease',
                      display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                  >
                    <span style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 500, color: '#F4F7F2' }}>
                      {img.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3D Scenes ─── */}
        <section style={{ background: '#0a1620', padding: '7rem 0', overflow: 'hidden' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 4rem' }}
            >
              <span className="section-label">3D Visualisation Studio</span>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.1 }}>
                Walk Through Your Space{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--brass)' }}>Before It's Built</em>
              </h2>
              <p style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 300, color: 'rgba(244,247,242,0.55)', lineHeight: 1.75, marginTop: '0.75rem' }}>
                Our in-house 3D studio lets you visualise every room, material, and finish before
                a single piece of furniture is purchased.
              </p>
            </motion.div>

            <div
              className="ec-scenes-scroll"
              style={{
                display: 'flex', gap: '1rem', overflowX: 'auto',
                paddingBottom: '1rem', scrollbarWidth: 'none',
                cursor: 'grab',
              }}
            >
              {scenes.map((scene, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setLightbox({
                    images: scenes.map(s => ({ src: s.src, alt: s.label, label: s.label })),
                    idx: i,
                  })}
                  aria-label={`View ${scene.label}`}
                  style={{
                    flexShrink: 0, width: 280, height: 200, borderRadius: 5,
                    overflow: 'hidden', position: 'relative', padding: 0,
                    border: '1px solid rgba(206,212,129,0.12)', cursor: 'pointer',
                    background: '#0f1e29',
                  }}
                >
                  <img
                    src={scene.src}
                    alt={scene.label}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(10,22,32,0.75) 0%, transparent 55%)',
                    display: 'flex', alignItems: 'flex-end', padding: '0.85rem',
                    pointerEvents: 'none',
                  }}>
                    <span style={{ fontFamily: FONT, fontSize: '0.78rem', fontWeight: 500, color: '#F4F7F2' }}>
                      {scene.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            <p style={{ fontFamily: FONT, fontSize: '0.72rem', color: 'rgba(244,247,242,0.3)', marginTop: '1rem', textAlign: 'center', letterSpacing: '0.05em' }}>
              Scroll to explore · Click to view full screen
            </p>
          </div>
        </section>

        {/* ─── Visit Info ─── */}
        <section style={{ background: 'var(--teal-dark, #142939)', padding: '7rem 0', borderTop: '1px solid rgba(206,212,129,0.1)' }}>
          <div className="container">
            <div className="ec-visit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="section-label">Plan Your Visit</span>
                <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F4F7F2', lineHeight: 1.1, marginBottom: '2rem' }}>
                  Come See It{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--brass)' }}>In Person</em>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { icon: MapPin, label: 'Address', value: 'Hyderabad, Telangana ,  Full address shared on booking' },
                    { icon: Clock,  label: 'Hours',   value: 'Monday – Sunday · 10:00 AM – 7:00 PM · By Appointment' },
                    { icon: Phone,  label: 'Contact', value: 'Book online or call to schedule a personalised tour' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 4, flexShrink: 0,
                        background: 'rgba(206,212,129,0.08)', border: '1px solid rgba(206,212,129,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={18} color="var(--brass)" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontFamily: FONT, fontSize: '0.7rem', fontWeight: 700, color: 'var(--brass)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                          {label}
                        </div>
                        <div style={{ fontFamily: FONT, fontSize: '0.88rem', fontWeight: 300, color: 'rgba(244,247,242,0.65)', lineHeight: 1.6 }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="btn-primary" style={{ display: 'inline-block', marginTop: '2.5rem' }}>
                  Schedule a Visit
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}
              >
                {galleryImages.slice(1, 5).map((img, i) => (
                  <div key={i} style={{ borderRadius: 5, overflow: 'hidden', aspectRatio: '4/3' }}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <GetEstimate />
      </main>

      <Footer />
      <WhatsAppFloat />

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.idx}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .ec-stats-grid { grid-template-columns: repeat(6,1fr) !important; }
        @media(max-width:900px) {
          .ec-stats-grid { grid-template-columns: repeat(3,1fr) !important; }
          .ec-spaces-grid { grid-template-columns: 1fr !important; }
          .ec-gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ec-gallery-grid > *:first-child { grid-column: span 2 !important; aspect-ratio: 16/9 !important; }
          .ec-visit-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media(max-width:600px) {
          .ec-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ec-gallery-grid { grid-template-columns: 1fr !important; }
          .ec-gallery-grid > *:first-child { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
          .ec-gallery-grid > * { aspect-ratio: 4/3 !important; }
        }
        .ec-scenes-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
