import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, CheckCircle, CalendarCheck } from 'lucide-react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_8d4bw0p'
const EMAILJS_TEMPLATE_ID = 'template_rkphm6f'
const EMAILJS_PUBLIC_KEY  = 'Ojoa14pPQ4ujtn9WO'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'

const projectTypes = [
  'Residential Interior', 'Commercial Space', 'Office Interior',
  'Coworking Space', 'Material Sourcing (B2B)', 'Other',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(244,247,242,0.05)',
  border: '1px solid rgba(206,212,129,0.2)',
  borderRadius: 4,
  color: '#F4F7F2',
  fontFamily: FONT,
  fontSize: '0.85rem',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: FONT,
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(244,247,242,0.45)',
  marginBottom: '0.35rem',
}

export default function ConsultationFloat() {
  const location = useLocation()
  const isCoworking = location.pathname.startsWith('/coworking')
  const [open, setOpen] = useState(false)

  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' })

  useEffect(() => {
    if (isCoworking) {
      setForm(prev => ({ ...prev, type: 'Coworking Space' }))
    } else {
      setForm(prev => ({ ...prev, type: '' }))
    }
  }, [location.pathname, isCoworking])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, phone: form.phone, project_type: form.type, message: form.message },
        EMAILJS_PUBLIC_KEY,
      )
      setDone(true)
      setForm({ name: '', phone: '', email: '', type: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
    } finally {
      setSending(false)
    }
  }

  const reset = () => { setOpen(false); setTimeout(() => setDone(false), 400) }

  return (
    <>
      {/* ── Floating pill button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Book your consultation"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0 1.4rem',
          height: 50,
          background: isCoworking 
            ? 'linear-gradient(135deg, #CED481 0%, #B8BD6E 100%)' 
            : 'linear-gradient(135deg, #1E394F 0%, #142939 100%)',
          border: isCoworking 
            ? '1px solid rgba(255,255,255,0.2)' 
            : '1px solid rgba(206,212,129,0.35)',
          borderRadius: 999,
          cursor: 'pointer',
          fontFamily: FONT,
          fontSize: '0.8rem',
          fontWeight: 700,
          color: isCoworking ? '#050B0E' : '#F4F7F2',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          boxShadow: isCoworking
            ? '0 6px 24px rgba(206,212,129,0.35), 0 0 0 1px rgba(206,212,129,0.1)'
            : '0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(206,212,129,0.1)',
        }}
      >
        {/* Pulse ring */}
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 28, height: 28,
              borderRadius: '50%',
              background: isCoworking ? 'rgba(5,11,14,0.15)' : 'rgba(206,212,129,0.25)',
              pointerEvents: 'none',
            }}
          />
          <CalendarCheck size={17} color={isCoworking ? "#050B0E" : "#CED481"} strokeWidth={2} />
        </span>
        {isCoworking ? 'Schedule a Tour' : 'Book Your Consultation'}
      </motion.button>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={reset}
            style={{
              position: 'fixed', inset: 0, zIndex: 9100,
              background: 'rgba(6,12,18,0.7)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '1.5rem',
              zIndex: 9200,
              width: 'min(420px, calc(100vw - 3rem))',
              background: 'linear-gradient(160deg, #142939 0%, #0f1e29 100%)',
              border: '1px solid rgba(206,212,129,0.2)',
              borderRadius: 12,
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.4rem 1.75rem 1rem',
              borderBottom: '1px solid rgba(244,247,242,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'rgba(206,212,129,0.1)',
                  border: '1px solid rgba(206,212,129,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CalendarCheck size={16} color="#CED481" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 600, color: '#F4F7F2', lineHeight: 1.2 }}>
                    {isCoworking ? 'Schedule a Tour' : 'Book a Consultation'}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: '0.68rem', fontWeight: 400, color: 'rgba(244,247,242,0.4)', marginTop: 2 }}>
                    {isCoworking ? 'Experience our 11,500 Sq Ft Jubilee Hills Space' : 'Free · No obligation'}
                  </div>
                </div>
              </div>
              <button
                onClick={reset}
                aria-label="Close"
                style={{
                  background: 'rgba(244,247,242,0.06)', border: '1px solid rgba(244,247,242,0.1)',
                  borderRadius: 6, width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(244,247,242,0.5)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,247,242,0.1)'; e.currentTarget.style.color = '#F4F7F2' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(244,247,242,0.06)'; e.currentTarget.style.color = 'rgba(244,247,242,0.5)' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem 1.75rem 1.75rem', maxHeight: 'calc(100vh - 12rem)', overflowY: 'auto' }}>
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '2rem 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
                      style={{
                        width: 60, height: 60, borderRadius: '50%',
                        background: 'rgba(206,212,129,0.1)',
                        border: '1px solid rgba(206,212,129,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                      }}
                    >
                      <CheckCircle size={26} color="#CED481" strokeWidth={1.5} />
                    </motion.div>
                    <div style={{ fontFamily: FONT, fontSize: '1.15rem', fontWeight: 600, color: '#F4F7F2', marginBottom: '0.5rem' }}>
                      We'll be in touch soon!
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 300, color: 'rgba(244,247,242,0.5)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      Your request has been received. Our team will call you within 24 hours.
                    </div>
                    <button
                      onClick={reset}
                      style={{
                        padding: '0.65rem 2rem',
                        background: '#CED481', color: '#0f1e29',
                        border: 'none', borderRadius: 4,
                        fontFamily: FONT, fontSize: '0.75rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={labelStyle} htmlFor="cf-name">Name *</label>
                        <input id="cf-name" type="text" required placeholder="Your name"
                          style={inputStyle} value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={e => (e.target.style.borderColor = '#CED481')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(206,212,129,0.2)')}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="cf-phone">Phone *</label>
                        <input id="cf-phone" type="tel" required placeholder="+91 00000 00000"
                          style={inputStyle} value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          onFocus={e => (e.target.style.borderColor = '#CED481')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(206,212,129,0.2)')}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="cf-email">Email</label>
                      <input id="cf-email" type="email" placeholder="your@email.com"
                        style={inputStyle} value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = '#CED481')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(206,212,129,0.2)')}
                      />
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="cf-type">Project Type *</label>
                      <select id="cf-type" required style={{ ...inputStyle, cursor: 'pointer' }}
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = '#CED481')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(206,212,129,0.2)')}
                      >
                        <option value="" style={{ background: '#1E394F' }}>Select project type</option>
                        {projectTypes.map(t => (
                          <option key={t} value={t} style={{ background: '#1E394F' }}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="cf-msg">Tell Us More</label>
                      <textarea id="cf-msg" rows={2} placeholder="Brief description..."
                        style={{ ...inputStyle, resize: 'none', minHeight: 72 }}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = '#CED481')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(206,212,129,0.2)')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.85rem',
                        background: sending ? 'rgba(206,212,129,0.5)' : '#CED481',
                        border: 'none', borderRadius: 4,
                        fontFamily: FONT, fontSize: '0.8rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#0f1e29', cursor: sending ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                        marginTop: '0.25rem',
                      }}
                    >
                      {sending ? (
                        <><Loader2 size={14} style={{ animation: 'cfspin 1s linear infinite' }} /> Sending...</>
                      ) : (
                        <>{isCoworking ? 'Schedule My Tour' : 'Book Consultation'} <Send size={13} /></>
                      )}
                    </button>
                    <style>{`@keyframes cfspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
