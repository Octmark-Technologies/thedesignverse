import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarCheck, X, Loader2, Wifi, Coffee, Shield, Zap,
  Users, Briefcase, CheckCircle, MapPin, Lightbulb,
  Maximize2, Sparkles, Palette, Hammer, Sofa, Handshake,
  TrendingUp, ClipboardList, Check, ChevronRight
} from 'lucide-react'
import WhatsAppFloat from '../components/WhatsAppFloat'

const FONT_HEAD = '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
const FONT_BODY = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
const B = import.meta.env.BASE_URL
const WEBHOOK = 'https://thedesignverse.co.in/webhook/ad1676c2-78f0-4a31-a3dc-f96f606632ed'

// ─── Input Styles ─────────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1.1rem',
  background: 'rgba(244,247,242,0.03)',
  border: '1px solid rgba(206,212,129,0.18)',
  borderRadius: 8,
  color: '#F4F7F2',
  fontFamily: FONT_BODY,
  fontSize: '0.88rem',
  fontWeight: 400,
  outline: 'none',
  transition: 'all 0.25s ease',
  boxSizing: 'border-box',
}

const lbl: React.CSSProperties = {
  display: 'block',
  fontFamily: FONT_HEAD,
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#CED481',
  marginBottom: '0.4rem',
}

// ─── Form Popup ─────────────────────────────────────────────────────────────
function FormPopup({ onClose, onSuccess, preType = '' }: { onClose: () => void, onSuccess: () => void, preType?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: preType })
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) { setErr('Name and phone are required.'); return }
    setSending(true)
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || '',
          project_type: form.type || 'Coworking Enquiry',
          source: 'Coworking Landing Page',
          submitted_at: new Date().toISOString(),
        }),
      })
      onSuccess()
    } catch { setErr('Something went wrong. Please try WhatsApp.') }
    finally { setSending(false) }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9100, background: 'rgba(4,10,16,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />
      <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          zIndex: 9200, width: 'min(480px, 100vw)',
          background: 'linear-gradient(165deg, #091014 0%, #050B0E 100%)',
          borderLeft: '1px solid rgba(206,212,129,0.15)',
          boxShadow: '-24px 0 64px rgba(0,0,0,0.7)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ background: 'rgba(20,35,49,0.25)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(206,212,129,0.08)' }}>
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: '1.25rem', fontWeight: 800, color: '#F4F7F2', letterSpacing: '-0.01em' }}>
              Book Your Workspace
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: '0.78rem', color: 'rgba(244,247,242,0.5)', marginTop: 4 }}>
              Quick response and free day pass
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={lbl} htmlFor="cw-name">Full Name</label>
            <input id="cw-name" type="text" required placeholder="Your name" style={inp} value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#CED481'; e.target.style.background = 'rgba(206,212,129,0.02)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(206,212,129,0.18)'; e.target.style.background = 'rgba(244,247,242,0.03)' }}
            />
          </div>

          <div>
            <label style={lbl} htmlFor="cw-phone">Phone Number</label>
            <input id="cw-phone" type="tel" required placeholder="+91 00000 00000" style={inp} value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#CED481'; e.target.style.background = 'rgba(206,212,129,0.02)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(206,212,129,0.18)'; e.target.style.background = 'rgba(244,247,242,0.03)' }}
            />
          </div>

          <div>
            <label style={lbl} htmlFor="cw-email">Email (optional)</label>
            <input id="cw-email" type="email" placeholder="your@email.com" style={inp} value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#CED481'; e.target.style.background = 'rgba(206,212,129,0.02)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(206,212,129,0.18)'; e.target.style.background = 'rgba(244,247,242,0.03)' }}
            />
          </div>

          <div>
            <label style={lbl} htmlFor="cw-type">Workspace Needed</label>
            <select id="cw-type" style={{ ...inp, cursor: 'pointer' }} value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#CED481'; e.target.style.background = 'rgba(206,212,129,0.02)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(206,212,129,0.18)'; e.target.style.background = 'rgba(244,247,242,0.03)' }}
            >
              <option value="" style={{ background: '#0a1014' }}>Select option</option>
              {['Hot Seat', 'Dedicated Desk', 'Private Cabin (2-4 Seater)', 'Private Cabin (6+ Seater)', 'B2B Partner Enquiry'].map(t => (
                <option key={t} value={t} style={{ background: '#0a1014' }}>{t}</option>
              ))}
            </select>
          </div>

          {err && <div style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', color: '#ff7b7b', marginTop: '0.25rem' }}>{err}</div>}

          <button type="submit" disabled={sending} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '1.1rem', background: sending ? 'rgba(206,212,129,0.4)' : '#CED481',
            border: 'none', borderRadius: 8, fontFamily: FONT_HEAD, fontSize: '0.85rem',
            fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#050B0E', cursor: sending ? 'not-allowed' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)', marginTop: '0.75rem',
            boxShadow: '0 8px 24px rgba(206,212,129,0.2)'
          }}
            onMouseEnter={e => { if(!sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(206,212,129,0.35)' } }}
            onMouseLeave={e => { if(!sending) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(206,212,129,0.2)' } }}
          >
            {sending
              ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
              : <><CalendarCheck size={16} strokeWidth={2.5} /> Secure My Free Pass</>
            }
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(244,247,242,0.06)' }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: '0.7rem', fontWeight: 800, color: '#CED481', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Direct Sourcing Line
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href="tel:+919550156644" style={{ color: 'rgba(244,247,242,0.7)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#CED481'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,247,242,0.7)'}>
                <span style={{ fontSize: '1rem' }}>📞</span> +91 95501 56644
              </a>
              <a href="mailto:info@thedesignverse.co.in" style={{ color: 'rgba(244,247,242,0.7)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#CED481'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,247,242,0.7)'}>
                <span style={{ fontSize: '1rem' }}>✉️</span> info@thedesignverse.co.in
              </a>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  )
}

// ─── Main Landing Page ──────────────────────────────────────────────────────
export default function CoworkingLandingPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [popup, setPopup] = useState(false)
  const [prefilledType, setPrefilledType] = useState('')
  
  // Interactive Elements State
  const [activeZone, setActiveZone] = useState<number>(0)

  const openForm = (type = '') => {
    setPrefilledType(type)
    setPopup(true)
  }

  const handleSuccess = () => {
    setPopup(false)
    window.location.href = `${B}lp/thank-you`
  }

  // Experience Zones Data
  const zones = [
    {
      title: "Interactive Material Lab",
      desc: "Explore a large collection of material samples and create mood boards on site.",
      metric: "10,000+ Curated Samples",
      perk: "Direct-to-Factory Trade Rates",
      image: `${B}Images/material-lab.png`
    },
    {
      title: "German Modular Kitchen",
      desc: "Visit fully built high-end kitchens with premium German hardware and smooth operation.",
      metric: "Fully Operational Exhibits",
      perk: "Millimeter-Perfect CNC Precision",
      image: `${B}Images/kitchen-german-bright.jpeg`
    },
    {
      title: "Acoustic Drafting Suites",
      desc: "Focus intensely on detailed CAD layout plans and 3D architectural renders. Sound-damping glass partitions, ergonomic posture seating, individual dimmable lighting control, and secure entry with full security camera coverage create the perfect sanctuary for deep workflow.",
      metric: "Acoustically Calibrated Space",
      perk: "Distraction-Free Deep Work",
      image: `${B}Images/Cabins.png`
    },
    {
      title: "HNW Client Presentation",
      desc: "Give important presentations for high-end projects in a luxurious setting with great audio and video.",
      metric: "4K Presentation Arrays",
      perk: "High-Conversion Client Pitches",
      image: `${B}Images/Experiance-Center-4.jpg`
    },
    {
      title: "B2B Co-Design Lounge",
      desc: "A vibrant space where creative minds meet. Connect with structural estimators, custom woodwork manufacturers, and premium smart home integrators. Draft and detail your projects while enjoying unlimited pantry coffee and tea.",
      metric: "Leased Multi-WAN Fiber",
      perk: "Elite Design Professional Community",
      image: `${B}Images/Hot-seats.png`
    }
  ]

  // Pricing Data Calculation
  const hotseatPrice = 9999
  const cabinPrice = 40000

  return (
    <div style={{ backgroundColor: '#050B0E', minHeight: '100vh', color: '#F4F7F2', fontFamily: FONT_BODY, overflowX: 'hidden', position: 'relative' }}>
      
      {/* ─── Premium Google Fonts Import ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        /* Dynamic keyframes for subtle drifting background blooms */
        @keyframes driftOne {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(8%, 12%) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes driftTwo {
          0% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-10%, -6%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.35; }
          50% { opacity: 0.65; }
          100% { opacity: 0.35; }
        }

        .cw-blob-1 {
          animation: driftOne 22s infinite ease-in-out;
        }
        .cw-blob-2 {
          animation: driftTwo 18s infinite ease-in-out;
        }
        .cw-btn-glow {
          position: relative;
        }
        .cw-btn-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 20px rgba(206,212,129,0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .cw-btn-glow:hover::after {
          opacity: 1;
        }
        
        /* Elegant custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050B0E;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(206, 212, 129, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(206, 212, 129, 0.4);
        }
      `}</style>

      {/* ─── Dynamic background light architecture ─── */}
      <div className="cw-blob-1" style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '45vw', height: '45vw',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(206,212,129,0.05) 0%, rgba(206,212,129,0) 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(80px)'
      }} />
      <div className="cw-blob-2" style={{
        position: 'absolute', top: '35%', left: '-10%', width: '55vw', height: '55vw',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,57,79,0.06) 0%, rgba(30,57,79,0) 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(100px)'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%', width: '50vw', height: '50vw',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(206,212,129,0.03) 0%, rgba(206,212,129,0) 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(90px)'
      }} />

      <AnimatePresence>
        {popup && <FormPopup onClose={() => setPopup(false)} onSuccess={handleSuccess} preType={prefilledType} />}
      </AnimatePresence>

      {/* ─── ELITE BLUR NAVBAR ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="cw-header"
        style={{ position: 'fixed', top: '1.25rem', left: '1.25rem', right: '1.25rem', zIndex: 1000 }}
      >
        <nav className="cw-nav-container" style={{
          height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2.5rem', borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(5, 11, 14, 0.08)',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.15)',
        }}>
          <img src={`${B}Logo-website.webp`} alt="The DesignVerse" style={{ height: 44, width: 'auto', objectFit: 'contain', display: 'block' }} />
          
          <button
            onClick={() => openForm()}
            className="cw-btn-glow"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.8rem 1.6rem',
              background: '#050B0E',
              border: 'none', borderRadius: 8,
              fontFamily: FONT_HEAD, fontSize: '0.8rem', fontWeight: 800,
              color: '#F4F7F2', cursor: 'pointer', letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 6px 20px rgba(5, 11, 14, 0.15)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1E394F'; e.currentTarget.style.transform = 'translateY(-1.5px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 11, 14, 0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#050B0E'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 11, 14, 0.15)' }}
          >
            <CalendarCheck size={15} strokeWidth={2.5} />
            Book a Tour
          </button>
        </nav>
      </motion.header>

      {/* ─── HERO SECTION ─── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#050B0E', paddingTop: '8rem', paddingBottom: '4rem' }}>
        
        {/* Fine background tech-grid gridline mask */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(244,247,242,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(244,247,242,0.015) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,11,14,0.92) 0%, rgba(5,11,14,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${B}Images/Hot-seats.png)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />

        <div className="cw-hero-grid" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          
          {/* Left Column: Premium Pitch */}
          <div>
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.22)',
                borderRadius: 99, padding: '0.5rem 1.1rem', marginBottom: '2rem', cursor: 'default',
              }}
            >
              <Zap size={13} color="#CED481" fill="#CED481" strokeWidth={1.5} />
              <span style={{ fontFamily: FONT_HEAD, fontSize: '0.72rem', fontWeight: 800, color: '#CED481', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                ELITE B2B CO-DESIGN HUB · JUBILEE HILLS
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}
            >
              A place for architects and interior designers to present, find resources, and grow.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ fontFamily: FONT_BODY, fontSize: '1.1rem', fontWeight: 300, color: 'rgba(244,247,242,0.65)', lineHeight: 1.65, marginBottom: '3rem', maxWidth: 550 }}
            >
              Work in a 11,500 sq ft design centre. Meet clients in professional boardrooms, browse over 10,000 material samples, and let us handle detailed drawings and production.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="cw-hero-actions"
              style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
            >
              <button onClick={() => openForm()} className="cw-btn-glow" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
                padding: '1.2rem 2.5rem', background: '#CED481', border: 'none', borderRadius: 8,
                fontFamily: FONT_HEAD, fontSize: '0.9rem', fontWeight: 800, color: '#050B0E', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(206,212,129,0.25)', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(206,212,129,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(206,212,129,0.25)' }}
              >
                <CalendarCheck size={16} strokeWidth={2.5} /> Schedule a Tour
              </button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1.2rem 2.2rem', background: 'rgba(244,247,242,0.03)', border: '1px solid rgba(244,247,242,0.12)',
                borderRadius: 8, fontFamily: FONT_HEAD, fontSize: '0.9rem', fontWeight: 700, color: '#F4F7F2',
                cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.04em', textTransform: 'uppercase'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,247,242,0.07)'; e.currentTarget.style.borderColor = 'rgba(206,212,129,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(244,247,242,0.03)'; e.currentTarget.style.borderColor = 'rgba(244,247,242,0.12)' }}
              >
                View Pricing Plans
              </button>
            </motion.div>
          </div>

          {/* Right Column: Immersive HUD Glass Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(135deg, rgba(20,38,54,0.4) 0%, rgba(10,21,30,0.65) 100%)',
              border: '1px solid rgba(206,212,129,0.2)',
              borderRadius: 24,
              padding: '2.5rem',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              position: 'relative'
            }}
          >
            {/* Top decorative glass status header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(244,247,242,0.08)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#63E2B7', display: 'inline-block', boxShadow: '0 0 12px #63E2B7', animation: 'pulseGlow 2s infinite' }} />
                <span style={{ fontFamily: FONT_HEAD, fontSize: '0.72rem', fontWeight: 800, color: 'rgba(244,247,242,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Live Space HUD Console
                </span>
              </div>
              <span style={{ fontFamily: FONT_HEAD, fontSize: '0.72rem', fontWeight: 800, color: '#CED481', background: 'rgba(206,212,129,0.08)', border: '1px solid rgba(206,212,129,0.15)', padding: '0.35rem 0.75rem', borderRadius: 6 }}>
                Jubilee Hills Centre
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: "Client Pitching Authority", value: "11,500 Sq Ft Showroom", desc: "Ditch noisy cafes. Host design presentations surrounded by high-end, fully built luxury interiors.", icon: <Sparkles size={16} color="#CED481" /> },
                { title: "Instant Sourcing Lab", value: "10,000+ Live Samples", desc: "Touch, feel, and specify premium veneers, wallpapers, automation panels, and Asian Paints textures.", icon: <Palette size={16} color="#CED481" /> },
                { title: "Zero Execution Drag", value: "Done-For-You BOQs", desc: "Delegate modular estimations, 2D shop drawings, factory production, and certified installer labor.", icon: <Hammer size={16} color="#CED481" /> }
              ].map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'start', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(206,212,129,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="hud-stat-header" style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: 3 }}>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>{stat.value}</span>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: '0.72rem', fontWeight: 700, color: '#CED481', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{stat.title}</span>
                    </div>
                    <span style={{ fontFamily: FONT_BODY, fontSize: '0.8rem', color: 'rgba(244,247,242,0.5)', lineHeight: 1.45 }}>{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES QUICK STRIP ─── */}
      <section style={{ background: '#050B0E', padding: '1rem 1.5rem 4rem 1.5rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', borderTop: '1px solid rgba(244,247,242,0.06)', paddingTop: '3.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Wifi size={18} color="#CED481" />, title: "High-Speed Fiber Internet", desc: "Reliable high-speed fiber internet with fast upload and download speeds for all your design work and files." },
              { icon: <Coffee size={18} color="#CED481" />, title: "Pantry & Unlimited Coffee", desc: "A fully stocked pantry with unlimited fresh coffee and tea to keep you energized throughout the day." },
              { icon: <Shield size={18} color="#CED481" />, title: "24/7 Secure Studio Access", desc: "Work on your own schedule with 24/7 secure card entry and full security camera coverage." },
              { icon: <Briefcase size={18} color="#CED481" />, title: "Meeting Rooms & Screens", desc: "Professional meeting rooms equipped with presentation screens to host your clients and present your designs." },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(206,212,129,0.05)', border: '1px solid rgba(206,212,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontFamily: FONT_HEAD, fontSize: '0.9rem', fontWeight: 700, color: '#F4F7F2' }}>{f.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(244,247,242,0.5)', lineHeight: 1.45, display: 'block' }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY & DYNAMIC EXPERIENCE ZONE EXPLORER ─── */}
      <section style={{ padding: '7rem 1.5rem', background: '#091014', borderTop: '1px solid rgba(244,247,242,0.04)', borderBottom: '1px solid rgba(244,247,242,0.04)', position: 'relative' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.2)',
              borderRadius: 99, padding: '0.4rem 1.1rem', marginBottom: '1.25rem'
            }}>
              <Sparkles size={12} color="#CED481" />
              <span style={{ fontFamily: FONT_HEAD, fontSize: '0.7rem', fontWeight: 800, color: '#CED481', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Interactive Studio Tour
              </span>
            </div>
            
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Physical Experience Zones Built for Professional Specs
            </h2>
            <p style={{ color: 'rgba(244,247,242,0.5)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 640, margin: '0 auto', fontWeight: 300 }}>
              Stop running across the city for material boards and client signatures. Pitch high-luxury products, draft plans, and secure project advances in a single co-located workspace.
            </p>
          </div>

          {/* DYNAMIC TAB CONTROLLER */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', alignItems: 'stretch' }} className="cw-b2b-grid">
            
            {/* Left Col: Interactive Tabs (4 cols) */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="zone-tabs-container experience-tabs-list">
              {zones.map((zone, idx) => {
                const isActive = activeZone === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveZone(idx)}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, rgba(20,38,54,0.3) 0%, rgba(10,21,30,0.5) 100%)' : 'rgba(255,255,255,0.01)',
                      border: isActive ? '1px solid rgba(206,212,129,0.22)' : '1px solid rgba(255,255,255,0.03)',
                      borderRadius: 12,
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={e => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(256,256,256,0.1)' }}
                    onMouseLeave={e => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)' }}
                  >
                    <div>
                      <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1rem', fontWeight: isActive ? 800 : 600, color: isActive ? '#CED481' : '#F4F7F2', margin: 0, transition: 'color 0.2s' }}>
                        {zone.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(244,247,242,0.4)', marginTop: 4, display: 'block' }}>
                        {zone.metric}
                      </span>
                    </div>
                    <ChevronRight size={16} color={isActive ? '#CED481' : 'rgba(255,255,255,0.2)'} style={{ transform: isActive ? 'translateX(2px)' : 'none', transition: 'all 0.2s' }} />
                  </button>
                )
              })}
            </div>

            {/* Right Col: Active Zone Canvas (8 cols) */}
            <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column' }} className="zone-canvas-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZone}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="zone-canvas-card"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(145deg, rgba(20,38,54,0.2) 0%, rgba(10,21,30,0.4) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 20,
                    padding: '2.5rem',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '2rem'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="zone-sub-grid">
                    <div>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: '0.68rem', fontWeight: 800, color: '#CED481', background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.15)', padding: '0.3rem 0.7rem', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1.25rem' }}>
                        Active Zone View
                      </span>
                      <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>
                        {zones[activeZone].title}
                      </h3>
                      <p style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: 'rgba(244,247,242,0.6)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                        {zones[activeZone].desc}
                      </p>
                    </div>

                    <div style={{ borderRadius: 12, overflow: 'hidden', height: 200, border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                      <img
                        src={zones[activeZone].image}
                        alt={zones[activeZone].title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid rgba(244,247,242,0.06)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.6rem 1.1rem', borderRadius: 8 }}>
                      <Check size={14} color="#CED481" />
                      <span style={{ fontSize: '0.82rem', color: '#F4F7F2', fontWeight: 500 }}>{zones[activeZone].metric}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(206,212,129,0.04)', border: '1px solid rgba(206,212,129,0.15)', padding: '0.6rem 1.1rem', borderRadius: 8 }}>
                      <Sparkles size={14} color="#CED481" />
                      <span style={{ fontSize: '0.82rem', color: '#CED481', fontWeight: 600 }}>{zones[activeZone].perk}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Virtual Walkthrough Thumbnail Grid */}
          <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.35rem', fontWeight: 800, color: '#F4F7F2', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>Take a Virtual Tour</h3>
            <span style={{ fontSize: '0.85rem', color: 'rgba(244,247,242,0.4)', fontFamily: FONT_BODY }}>High-resolution physical previews of our material showcase and dynamic cabins</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', padding: '0.6rem', background: 'rgba(255,255,255,0.015)' }} className="cw-gal-grid">
            {['1', '2', '3', '4', '5', '6', '7', '8'].map(num => (
              <div key={num} style={{ overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)' }}>
                <img
                  src={`${B}Images/Experiance-Center-${num}.jpg`}
                  alt={`Experience Centre Physical View ${num}`}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media(max-width:991px){
            .cw-b2b-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .zone-tabs-container { grid-column: span 12 !important; }
            .zone-canvas-container { grid-column: span 12 !important; }
            .cw-hero-grid {
              grid-template-columns: 1fr !important;
              gap: 3.5rem !important;
            }
          }
          @media(max-width:768px){
            .cw-header {
              top: 0.75rem !important;
              left: 0.75rem !important;
              right: 0.75rem !important;
            }
            .cw-nav-container {
              height: 64px !important;
              padding: 0 1.25rem !important;
              border-radius: 12px !important;
            }
            .cw-nav-container img {
              height: 40px !important;
            }
            .cw-nav-container button {
              padding: 0.6rem 1rem !important;
              font-size: 0.72rem !important;
              gap: 0.4rem !important;
            }
            .hud-stat-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 0.15rem !important;
            }
            .experience-tabs-list {
              flex-direction: row !important;
              overflow-x: auto !important;
              padding: 0.5rem 0.25rem !important;
              gap: 0.65rem !important;
              -webkit-overflow-scrolling: touch;
              width: 100% !important;
              scrollbar-width: none;
            }
            .experience-tabs-list::-webkit-scrollbar {
              display: none;
            }
            .experience-tabs-list button {
              flex-shrink: 0 !important;
              padding: 0.75rem 1.1rem !important;
            }
            .zone-canvas-card {
              padding: 1.5rem !important;
              gap: 1.5rem !important;
            }
            .b2b-support-card {
              padding: 1.5rem !important;
              position: relative !important;
              top: 0 !important;
            }
            .cw-amenities-grid {
              grid-template-columns: 1fr !important;
            }
            .cw-pricing-card {
              padding: 1.5rem !important;
            }
            .cw-gal-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .zone-sub-grid { grid-template-columns: 1fr !important; }
          }
          @media(max-width:480px){
            .cw-hero-actions {
              flex-direction: column !important;
              gap: 0.85rem !important;
            }
            .cw-hero-actions button {
              width: 100% !important;
              justify-content: center !important;
            }
            .cw-footer-btn {
              padding: 1.1rem 1.5rem !important;
              width: 100% !important;
              font-size: 0.85rem !important;
            }
          }
        `}</style>
      </section>

      {/* ─── B2B PARTNER ECOSYSTEM ─── */}
      <section style={{ padding: '7.5rem 1.5rem', background: '#050B0E', borderBottom: '1px solid rgba(244,247,242,0.04)', position: 'relative' }}>
        
        {/* Ambient background central radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '65vw', height: '30vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(206,212,129,0.025) 0%, rgba(206,212,129,0) 70%)',
          pointerEvents: 'none', filter: 'blur(110px)'
        }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.22)',
              borderRadius: 99, padding: '0.45rem 1.25rem', marginBottom: '1.5rem', cursor: 'default'
            }}>
              <Handshake size={13} color="#CED481" />
              <span style={{ fontFamily: FONT_HEAD, fontSize: '0.7rem', fontWeight: 800, color: '#CED481', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                B2B Sourcing Integration
              </span>
            </div>
            
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Turn Our Space Into <span style={{ color: '#CED481', fontStyle: 'italic', fontWeight: 900 }}>Your High-Margin Trade Desk</span>
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: '1.05rem', fontWeight: 300, color: 'rgba(244,247,242,0.65)', lineHeight: 1.6, maxWidth: 840, margin: '0 auto' }}>
              Stop losing profits to third-party retailers and complex on-site carpentry delays. Leverage pre-negotiated direct factory trade pricing across 7 premier home decor categories, fully supported by our in-house shop drawing, estimation, and execution teams.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3.5rem', alignItems: 'start' }} className="cw-b2b-grid">
            
            {/* Products Column (7 cols) */}
            <div style={{ gridColumn: 'span 7' }} className="zone-tabs-container">
              <div style={{ borderBottom: '1px solid rgba(244,247,242,0.06)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.35rem', fontWeight: 800, color: '#CED481', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={18} /> High-Margin B2B Product Portfolios
                </h3>
                <span style={{ color: 'rgba(244,247,242,0.45)', fontSize: '0.85rem', fontFamily: FONT_BODY }}>
                  Present and specify these luxury products directly to clients inside our Jubilee Hills showroom:
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    icon: <Lightbulb size={18} color="#CED481" />,
                    title: "Smart Automation & Architectural Lighting",
                    desc: "High trade margins on architectural magnetic tracks, designer COB fixtures, smart dimmer touch panels, and acoustic speaker integrations."
                  },
                  {
                    icon: <Maximize2 size={18} color="#CED481" />,
                    title: "Invisiblebed Space-Saving Systems by The Space Company",
                    desc: "Certified hydraulic wall beds, retractable work desks, multi-functional space saving console systems with complete engineering support."
                  },
                  {
                    icon: <Sparkles size={18} color="#CED481" />,
                    title: "Exotic Natural Veneers & Custom Fluted Panels",
                    desc: "An endless physical library of luxury exotic natural veneers, customized louvers, charcoal sheets, and acoustic backdrops."
                  },
                  {
                    icon: <Palette size={18} color="#CED481" />,
                    title: "Designer Wallpapers & Motorized Drapes",
                    desc: "Premium texturized wallpapers, motorized curtain tracks, velvet layers, and custom-tailored drapes built to site specifications."
                  },
                  {
                    icon: <Palette size={18} color="#CED481" />,
                    title: "Asian Paints Luxury Surface Textures",
                    desc: "Present high-end finishes live, concrete micro-toppings, metallic plasters, stucco layers, and custom texture applications by certified teams."
                  },
                  {
                    icon: <Hammer size={18} color="#CED481" />,
                    title: "Modular Wardrobes & Kitchens with Certified Installation",
                    desc: "100% German factory-precision CNC modular layouts with fully pre-calculated modular BOQs and dedicated cabinet assemblers."
                  },
                  {
                    icon: <Sofa size={18} color="#CED481" />,
                    title: "Bespoke Premium Furniture & Structural Accents",
                    desc: "Living room accent pieces, luxury loungers, customized dining sets, and custom tables built exactly to your drawing sheets."
                  }
                ].map((prod, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 6, backgroundColor: 'rgba(206,212,129,0.02)', borderColor: 'rgba(206,212,129,0.2)' }}
                    style={{
                      background: 'rgba(20,38,54,0.18)',
                      border: '1px solid rgba(206,212,129,0.08)',
                      borderRadius: 16,
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      gap: '1.25rem',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(206,212,129,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, border: '1px solid rgba(206,212,129,0.15)'
                    }}>
                      {prod.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.3rem 0', fontFamily: FONT_HEAD, fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {prod.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(244,247,242,0.5)', lineHeight: 1.5, fontWeight: 300 }}>
                        {prod.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sourcing / Business Support Column (5 cols) */}
            <div style={{ gridColumn: 'span 5' }} className="zone-canvas-container">
              <div className="b2b-support-card" style={{
                display: 'flex', flexDirection: 'column', gap: '2rem',
                background: 'linear-gradient(145deg, rgba(20,38,54,0.45) 0%, rgba(10,21,30,0.65) 100%)',
                border: '1px solid rgba(206,212,129,0.22)', borderRadius: 24,
                padding: '2.5rem', boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                position: 'sticky', top: '7.5rem'
              }}>
                <div style={{ borderBottom: '1px solid rgba(244,247,242,0.08)', paddingBottom: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(206,212,129,0.08)', color: '#CED481', border: '1px solid rgba(206,212,129,0.15)',
                    fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase', padding: '0.35rem 0.8rem', borderRadius: 4,
                    display: 'inline-block', marginBottom: '0.85rem'
                  }}>
                    Operational Sourcing Flow
                  </div>
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                    Complete Sourcing & Backend Enablement
                  </h3>
                  <p style={{ color: 'rgba(244,247,242,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.6rem', marginBottom: 0, fontWeight: 300 }}>
                    We eliminate operational friction by managing estimating, detailing, fabricating, and certified carpenter installations for you.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    {
                      icon: <TrendingUp size={16} color="#CED481" />,
                      title: "Elevated HNW Client Conversion",
                      desc: "Impress high-budget clients by conducting presentations in an active 11,500 sq ft luxury interior showroom."
                    },
                    {
                      icon: <ClipboardList size={16} color="#CED481" />,
                      title: "Done-For-You BOQs & Shop Drawings",
                      desc: "Upload basic line drawings. Our in-house designers create production-ready modular BOQs and layouts within 24 hours."
                    },
                    {
                      icon: <Hammer size={16} color="#CED481" />,
                      title: "German CNC-Calibrated Manufacturing",
                      desc: "Modular wardrobes, drawers, and kitchen units are precision-manufactured at our local factory to eliminate carpentry errors."
                    },
                    {
                      icon: <Handshake size={16} color="#CED481" />,
                      title: "Unbeatable Direct Trade Margins",
                      desc: "Capture direct B2B trade commissions on lighting, modular systems, furniture, and custom space savers."
                    }
                  ].map((sup, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.1rem', alignItems: 'start' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'rgba(206,212,129,0.05)', border: '1px solid rgba(206,212,129,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem'
                      }}>
                        {sup.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.3rem 0', fontFamily: FONT_HEAD, fontSize: '0.92rem', fontWeight: 700, color: '#CED481' }}>
                          {sup.title}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(244,247,242,0.5)', lineHeight: 1.5, fontWeight: 300 }}>
                          {sup.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(244,247,242,0.08)' }}>
                  <button
                    onClick={() => openForm('B2B Sourcing Partner')}
                    className="cw-btn-glow"
                    style={{
                      width: '100%',
                      padding: '1.1rem',
                      background: '#CED481',
                      border: 'none',
                      borderRadius: 10,
                      color: '#050B0E',
                      fontFamily: FONT_HEAD,
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(206,212,129,0.2)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(206,212,129,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(206,212,129,0.2)' }}
                  >
                    Join B2B Partner
                  </button>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* ─── AMENITIES SECTION ─── */}
      <section style={{ padding: '6.5rem 1.5rem', background: '#091014', position: 'relative' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Our 8 Premium Offerings: Built Directly For Your Design Practice
            </h2>
            <p style={{ color: 'rgba(244,247,242,0.5)', maxWidth: 640, margin: '0 auto', fontSize: '0.98rem', fontWeight: 300, lineHeight: 1.5, fontFamily: FONT_BODY }}>
              We have eliminated the administrative, sourcing, and execution friction points that slow your practice down. Here is how we support your studio directly:
            </p>
          </div>

          <div className="cw-amenities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { 
                icon: <MapPin size={24} />, 
                title: 'Bring your clients & work from our 11,500 Sq Ft Experience Centre!', 
                desc: 'You get complete, unrestricted access to our premium Jubilee Hills showroom and active coworking space. Use this high-end, inspiring environment to draft your plans, meet your clients, and pitch in an elite luxury atmosphere.' 
              },
              { 
                icon: <Sofa size={24} />, 
                title: 'Need privacy or flexibility? We offer premium cabins and hotseats.', 
                desc: 'Whether you want a private, quiet acoustic cabin suite to run your design firm or dynamic hotseats for flexible, focus-driven daily sketching, we have the perfect setup tailored for your flow.' 
              },
              { 
                icon: <Handshake size={24} />, 
                title: 'Get exclusive access to vendor management & seamless conversions!', 
                desc: 'We have got you fully supported. We negotiate directly with top-tier brands, manage order pipelines, and handle the backend paperwork for you, ensuring your business conversions are smooth and profitable.' 
              },
              { 
                icon: <TrendingUp size={24} />, 
                title: 'We back you up with marketing support to scale your studio.', 
                desc: 'We do not just give you a desk, we help you grow your brand. Benefit from a registered business address, active brand presentation slots in our showroom, and co-branded digital marketing push.' 
              },
              { 
                icon: <Briefcase size={24} />, 
                title: 'Get modular production support direct from our CNC factory!', 
                desc: 'Bring us your CAD drawings and design specifications. We will manufacture your custom modular kitchens, wardrobes, and cabinet designs directly at our precision German CNC factory with flawless accuracy.' 
              },
              { 
                icon: <Hammer size={24} />, 
                title: 'No more labor hassles, we handle your on-site installation!', 
                desc: 'Stop chasing unreliable contractors. We supply and manage skilled installation teams, including certified master carpenters and on-site supervisors, to execute your designs exactly as you envisioned.' 
              },
              { 
                icon: <Users size={24} />, 
                title: 'Pitch perfectly in our 8-seater meeting rooms with 4K screens!', 
                desc: 'Need to present complex 3D renders or have deep-dive design discussions? Host up to 8 people in our premium boardrooms equipped with large high-definition screens and wireless casting setup.' 
              },
              { 
                icon: <Palette size={24} />, 
                title: 'Step into our massive material library to touch and specify!', 
                desc: 'Stop carrying heavy sample bags around. Work directly out of our co-located sourcing lab containing over 10,000+ curated material samples, veneers, wallpapers, fabrics, and hardware are all at your fingertips.' 
              },
            ].map((amenity, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{
                  background: 'rgba(20,38,54,0.15)',
                  padding: '2.5rem 2.25rem',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.04)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                whileHover={{ y: -6, borderColor: 'rgba(206,212,129,0.22)', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}
              >
                <div style={{ color: '#CED481', marginBottom: '1.25rem' }}>{amenity.icon}</div>
                <h4 style={{ fontSize: '1.1rem', fontFamily: FONT_HEAD, fontWeight: 700, color: '#FFFFFF', marginBottom: '0.6rem' }}>{amenity.title}</h4>
                <p style={{ color: 'rgba(244,247,242,0.5)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300, margin: 0, fontFamily: FONT_BODY }}>{amenity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING / PLANS SECTION ─── */}
      <section id="pricing" style={{ padding: '7.5rem 1.5rem', background: '#050B0E', borderTop: '1px solid rgba(244,247,242,0.04)', borderBottom: '1px solid rgba(244,247,242,0.04)', position: 'relative' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(206,212,129,0.06)', border: '1px solid rgba(206,212,129,0.2)',
              borderRadius: 99, padding: '0.4rem 1.1rem', marginBottom: '1.5rem'
            }}>
              <span style={{ fontFamily: FONT_HEAD, fontSize: '0.68rem', fontWeight: 800, color: '#CED481', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Simple Memberships
              </span>
            </div>
            
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 1.5rem 0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Choose Your Workspace Plan
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', maxWidth: 940, margin: '0 auto' }} className="cw-b2b-grid">
            
            {/* Hot Seats Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="cw-pricing-card"
              style={{
                background: 'rgba(20,38,54,0.18)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              whileHover={{ y: -6, borderColor: 'rgba(206,212,129,0.25)' }}
            >
              <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img src={`${B}Images/Hot-seats.png`} alt="Hot Seats Setup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,11,14,1) 100%)' }} />
              </div>
              
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <Users size={26} color="#CED481" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>Hotseats</h3>
                  <p style={{ color: 'rgba(244,247,242,0.5)', fontSize: '0.88rem', lineHeight: 1.5, minHeight: '44px', fontWeight: 300, margin: 0 }}>
                    Perfect for independent architects, interior designers, and sourcing specifiers looking to access our premium material library and high-end co-working lounge.
                  </p>
                </div>
                
                <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', fontFamily: FONT_HEAD, fontWeight: 800, color: '#CED481', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    ₹{hotseatPrice.toLocaleString('en-IN')}
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(244,247,242,0.45)', fontFamily: FONT_BODY }}>
                      {' + 18% GST / mo'}
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    'Access to quiet open-plan co-design lounges',
                    'High-speed fiber internet',
                    'Full access to the 10,000+ physical Material Library',
                    'Unlimited pantry coffee and tea',
                    'Complimentary scanning of architectural sheets & plans',
                    'Direct access to competitive direct-to-factory trade pricing'
                  ].map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <CheckCircle size={15} color="#CED481" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', color: 'rgba(244,247,242,0.7)', fontWeight: 300 }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openForm('Hotseats')} style={{ width: '100%', padding: '1.1rem', background: 'rgba(206,212,129,0.04)', border: '1px solid rgba(206,212,129,0.3)', borderRadius: 10, color: '#CED481', fontFamily: FONT_HEAD, fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CED481'; e.currentTarget.style.color = '#050B0E' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(206,212,129,0.04)'; e.currentTarget.style.color = '#CED481' }}
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>

            {/* Private Cabins Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="cw-pricing-card"
              style={{
                background: 'linear-gradient(145deg, rgba(20,38,54,0.6) 0%, rgba(10,21,30,0.85) 100%)',
                border: '1px solid rgba(206,212,129,0.4)',
                borderRadius: 20, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(206,212,129,0.1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              whileHover={{ y: -6, borderColor: 'rgba(206,212,129,0.75)', boxShadow: '0 24px 60px rgba(206,212,129,0.15)' }}
            >
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10, background: '#CED481', color: '#050B0E', padding: '0.45rem 1.25rem', fontSize: '0.68rem', fontWeight: 800, borderRadius: 6, letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', fontFamily: FONT_HEAD }}>
                Elite Suite
              </div>
              <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img src={`${B}Images/Cabins.png`} alt="Private Cabins Setup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,11,14,1) 100%)' }} />
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <Briefcase size={26} color="#CED481" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>Private Cabins</h3>
                  <p style={{ color: 'rgba(244,247,242,0.5)', fontSize: '0.88rem', lineHeight: 1.5, minHeight: '44px', fontWeight: 300, margin: 0 }}>
                    Private lockable cabins available in two sizes: 9x10 (up to 5 members) and 9x20 (up to 10 members). Ideal for growing design firms, structural teams, and boutique agencies.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontFamily: FONT_BODY, fontWeight: 500, color: 'rgba(244,247,242,0.5)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting From</div>
                  <div style={{ fontSize: '2.5rem', fontFamily: FONT_HEAD, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    ₹{cabinPrice.toLocaleString('en-IN')}
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(244,247,242,0.45)', fontFamily: FONT_BODY }}>
                      {' + 18% GST / mo (for 9x10)'}
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    'Lockable, sound-damped private cabins for your team',
                    'Bespoke executive desks, ergonomic chairs & drawing drawers',
                    'Generous complimentary HNW presentation boardroom credits',
                    'Elite brand display signage in our commercial entrance lobby',
                    'Google My Business registered address verification',
                    'Direct factory-to-site German modular trade execution integrations',
                    'Priority booking for CAD support & certified installers'
                  ].map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <CheckCircle size={15} color="#CED481" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', color: 'rgba(244,247,242,0.7)', fontWeight: 300 }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openForm('Private Cabins')} className="cw-btn-glow" style={{ width: '100%', padding: '1.1rem', background: '#CED481', border: 'none', borderRadius: 10, color: '#050B0E', fontFamily: FONT_HEAD, fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(206,212,129,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(206,212,129,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(206,212,129,0.2)' }}
                >
                  Book a Cabin
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section style={{ padding: '7.5rem 1.5rem', background: 'linear-gradient(180deg, #050B0E 0%, #091014 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '55vw', height: '28vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(206,212,129,0.03) 0%, rgba(206,212,129,0) 70%)',
          pointerEvents: 'none', filter: 'blur(110px)', zIndex: 0
        }} />
        
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Ready to Scale Your Practice?
          </h2>
          <p style={{ color: 'rgba(244,247,242,0.6)', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '3rem', fontWeight: 300, fontFamily: FONT_BODY }}>
            Schedule a Tour of the showroom and workspace. Book a private walkthrough today and see how Hyderabad's leading interior designers and architects are dramatically accelerating client conversion cycles.
          </p>
          
          <button onClick={() => openForm()} className="cw-btn-glow cw-footer-btn" style={{
            padding: '1.2rem 3.5rem', background: '#CED481', border: 'none', borderRadius: 10,
            fontFamily: FONT_HEAD, fontSize: '0.95rem', fontWeight: 800, color: '#050B0E', cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(206,212,129,0.25)', transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            letterSpacing: '0.06em', textTransform: 'uppercase'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(206,212,129,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(206,212,129,0.25)' }}
          >
            Schedule a Tour
          </button>
        </div>
      </section>
      
      <WhatsAppFloat />
    </div>
  )
}
