import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle, X } from 'lucide-react'
import emailjs from '@emailjs/browser'

// ─── EmailJS config ───────────────────────────────────────────────
// Destination: info@thedesignverse.co.in
// Setup (one-time, free at emailjs.com):
//   1. Email Services → Add Service → connect info@thedesignverse.co.in → copy Service ID
//   2. Email Templates → Create → set To: info@thedesignverse.co.in
//      Variables: {{from_name}} {{from_email}} {{phone}} {{project_type}} {{message}}
//      → copy Template ID
//   3. Account → API Keys → copy Public Key
// ─────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_8d4bw0p'
const EMAILJS_TEMPLATE_ID = 'template_rkphm6f'
const EMAILJS_PUBLIC_KEY  = 'Ojoa14pPQ4ujtn9WO'

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const projectTypes = [
  'Residential Interior', 'Commercial Space', 'Office Interior',
  'Coworking Space', 'Material Sourcing (B2B)', 'Other',
]

export default function GetEstimate() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showSuccess, setShowSuccess] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', type: '', message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          phone:        form.phone,
          project_type: form.type,
          message:      form.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setShowSuccess(true)
      setForm({ name: '', email: '', phone: '', type: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
    } finally {
      setSending(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(244, 247, 242, 0.04)',
    border: '1px solid rgba(206, 212, 129, 0.2)',
    borderRadius: '3px',
    color: 'var(--warm-white)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    fontSize: '0.88rem',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(244, 247, 242, 0.5)',
    marginBottom: '0.4rem',
  }

  return (
    <>
    {/* ── Success popup ── */}
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(6, 12, 18, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowSuccess(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f1e29',
              border: '1px solid rgba(206,212,129,0.2)',
              borderRadius: 12,
              padding: 'clamp(2.5rem,5vw,3.5rem) clamp(2rem,5vw,4rem)',
              maxWidth: 440, width: '100%',
              textAlign: 'center',
              position: 'relative',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)', padding: '0.25rem',
              }}
            >
              <X size={16} />
            </button>

            {/* Check icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(206,212,129,0.1)',
                border: '1px solid rgba(206,212,129,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.75rem',
              }}
            >
              <CheckCircle size={32} color="#CED481" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 20, height: 1, background: 'rgba(206,212,129,0.4)' }} />
                <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#CED481' }}>
                  Message Sent
                </span>
                <div style={{ width: 20, height: 1, background: 'rgba(206,212,129,0.4)' }} />
              </div>
              <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 300, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Thank You!
              </h3>
              <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2rem' }}>
                We've received your enquiry and will get back to you within 24 hours to schedule your free consultation.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                style={{
                  padding: '0.8rem 2.5rem',
                  background: '#CED481', color: '#0f1e29',
                  border: 'none', borderRadius: 4,
                  fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem 0',
        background: 'linear-gradient(135deg, #0f1e29 0%, var(--teal) 100%)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="estimate-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Get in Touch</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--warm-white)',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
              }}
            >
              Start Your{' '}
              <em style={{ color: 'var(--brass)', fontStyle: 'italic' }}>Transformation</em>
            </h2>
            <p
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 300,
                color: 'rgba(244, 247, 242, 0.6)',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}
            >
              Book a free consultation at our Experience Centre. Our design experts will walk you
              through possibilities, materials, and a tailored plan  , no obligation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <Phone size={16} color="var(--brass)" strokeWidth={1.5} />, label: 'Call Us', value: '+91 95501 56644', href: 'tel:+919550156644' },
                { icon: <WhatsAppIcon />, label: 'WhatsApp', value: '+91 95501 56644', href: 'https://wa.me/919550156644' },
                { icon: <Mail size={16} color="var(--brass)" strokeWidth={1.5} />, label: 'Email', value: 'info@thedesignverse.co.in', href: 'mailto:info@thedesignverse.co.in' },
                { icon: <MapPin size={16} color="var(--brass)" strokeWidth={1.5} />, label: 'Visit', value: '3rd Floor, Apurupa Towers, Road No. 36, Jawahar Colony, Jubilee Hills, Hyderabad – 500033', href: 'https://maps.google.com/?q=Apurupa+Towers+Road+No+36+Jawahar+Colony+Jubilee+Hills+Hyderabad' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      background: 'rgba(206, 212, 129, 0.1)',
                      border: '1px solid rgba(206, 212, 129, 0.2)',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--brass)',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244, 247, 242, 0.4)', marginBottom: '0.15rem' }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif', fontSize: '0.88rem', fontWeight: 400, color: 'rgba(244, 247, 242, 0.8)', textDecoration: 'none' }}>{value}</a>
                    ) : (
                      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif', fontSize: '0.88rem', fontWeight: 400, color: 'rgba(244, 247, 242, 0.8)' }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              padding: '2.5rem',
              background: 'rgba(244, 247, 242, 0.04)',
              border: '1px solid rgba(206, 212, 129, 0.15)',
              borderRadius: '6px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontSize: '1.6rem',
                    color: 'var(--warm-white)',
                    marginBottom: '1.75rem',
                  }}
                >
                  Get a Free Estimate
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                  <div>
                    <label style={labelStyle} htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--brass)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(206, 212, 129, 0.2)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      style={inputStyle}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--brass)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(206, 212, 129, 0.2)')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brass)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(206, 212, 129, 0.2)')}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle} htmlFor="type">Project Type *</label>
                  <select
                    id="type"
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brass)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(206, 212, 129, 0.2)')}
                  >
                    <option value="" style={{ background: '#1E394F' }}>Select project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} style={{ background: '#1E394F' }}>{t}</option>
                    ))}
                  </select>
                </div>


                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={labelStyle} htmlFor="message">Tell Us More</label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Brief description of your project..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brass)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(206, 212, 129, 0.2)')}
                  />
                </div>

                <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                  {sending ? (
                    <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                  ) : (
                    <>Get Free Estimate <Send size={14} /></>
                  )}
                </button>
                <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
              </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .estimate-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
    </>
  )
}
