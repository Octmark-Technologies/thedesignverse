import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thedesignverse.hyd/',
    brandGradient: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/thedesignversehub',
    brandColor: '#1877F2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@DesignVerseInteriorHub',
    brandColor: '#FF0000',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon fill="#FF0000" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/the-designverse/',
    brandColor: '#0A66C2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919550156644',
    brandColor: '#25D366',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#f4f7f2', borderTop: '1px solid rgba(30, 57, 79, 0.1)' }}>
      <div className="container" style={{ padding: '4rem 2rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <img src={`${import.meta.env.BASE_URL}Logo-website.webp`} alt="The DesignVerse" style={{ height: 40, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)', lineHeight: 1.7, maxWidth: 280, marginBottom: '1.5rem' }}>
              Hyderabad's most comprehensive interior experience  , 11,500 sq ft of design inspiration, 10,000+ material samples, and end-to-end project solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socialLinks.map(({ label, href, icon, brandColor, brandGradient }) => {
                const hasBrand = !!(brandColor || brandGradient)
                return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    border: hasBrand ? 'none' : '1px solid rgba(30, 57, 79, 0.15)',
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: brandGradient ?? brandColor ?? 'transparent',
                    color: hasBrand ? 'white' : 'rgba(15, 30, 41, 0.45)',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.82'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {icon}
                </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontFamily: FONT, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.25rem' }}>Services</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Residential Interiors', 'Commercial Spaces', 'Office Design', 'Modular Solutions', '3D Visualisation'].map((item) => (
                <li key={item}>
                  <a href="#" style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.5)')}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* B2C Highlights */}
          <div>
            <div style={{ fontFamily: FONT, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.25rem' }}>Experience</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Experience Centre', href: '/experience-centre' },
                { label: 'Design Process', href: '/interior/design-process' },
                { label: 'Project Portfolio', href: '/projects' },
                { label: 'Cost Calculator', href: '#calculator' },
                { label: 'Residential Solutions', href: '/b2c/residential-interiors' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.5)')}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: FONT, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '1.25rem' }}>Contact Us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.1rem' }}>
              <a href="tel:+919182221363" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.55)')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 91822 21363
              </a>
              <a href="https://wa.me/919182221363" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.55)')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="mailto:info@thedesignverse.co.in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.55)')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                info@thedesignverse.co.in
              </a>
            </div>
            <div style={{ fontFamily: FONT, fontSize: '0.8rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)', lineHeight: 1.75, marginBottom: '0.7rem' }}>
              3rd Floor, Apurupa Towers,<br />Road No. 36, Jawahar Colony,<br />Jubilee Hills, Hyderabad,<br />Telangana 500033
            </div>
            <div style={{ fontFamily: FONT, fontSize: '0.75rem', fontWeight: 600, color: 'var(--teal)', marginBottom: '0.25rem' }}>Open 7 Days</div>
            <div style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.55)' }}>10:00 AM – 7:00 PM</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(30, 57, 79, 0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: FONT, fontSize: '0.75rem', fontWeight: 400, color: 'rgba(15, 30, 41, 0.35)' }}>
            © {new Date().getFullYear()} The DesignVerse. All rights reserved.
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2 }}
            style={{
              width: 36, height: 36,
              border: '1px solid rgba(30, 57, 79, 0.15)',
              borderRadius: '3px',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(15, 30, 41, 0.35)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--teal)'
              e.currentTarget.style.color = 'var(--teal)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(30, 57, 79, 0.15)'
              e.currentTarget.style.color = 'rgba(15, 30, 41, 0.35)'
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={15} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
