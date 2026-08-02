import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Interior Solutions',
    href: '/b2c/residential-interiors',
    children: [
      { label: 'Residential Interiors', href: '/b2c/residential-interiors' },
      { label: 'Commercial Hubs', href: '/b2c/commercial-hubs' },
      { label: 'Office Spaces', href: '/b2c/office-spaces' },
    ],
  },
  {
    label: 'Our Expertise',
    href: '/interior/craftsmanship',
    children: [
      { label: 'Craftsmanship', href: '/interior/craftsmanship' },
      { label: 'Design Process', href: '/interior/design-process' },
      { label: 'Portfolio', href: '/interior/portfolio' },
      { label: 'Modular Excellence', href: '/interior/modular-excellence' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience Centre', href: '/experience-centre' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      className="navbar-wrapper"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          zIndex: 1000,
          borderRadius: '4px',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.97)'
            : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(30, 57, 79, 0.1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
        ref={dropdownRef}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}Logo-website.webp`}
            alt="The DesignVerse"
            style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain' }}
          />
          <div style={{ display: 'none' }}>
            <div
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: 'var(--warm-white)',
                lineHeight: 1.1,
              }}
            >
              The DesignVerse
            </div>
            <div
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: 'var(--brass)',
                textTransform: 'uppercase',
              }}
            >
              Ultimate Interior Hub
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            listStyle: 'none',
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.label} style={{ position: 'relative' }}>
              {link.children ? (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === link.label ? null : link.label)
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.5rem 0.75rem',
                      background: 'none',
                      border: 'none',
                      color:
                        activeDropdown === link.label
                          ? 'var(--teal)'
                          : 'rgba(15, 30, 41, 0.75)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                    onMouseLeave={(e) => {
                      if (activeDropdown !== link.label)
                        e.currentTarget.style.color = 'rgba(15, 30, 41, 0.75)'
                    }}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={12}
                      style={{
                        transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 0.5rem)',
                          left: 0,
                          minWidth: '200px',
                          background: 'rgba(255, 255, 255, 0.98)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(30, 57, 79, 0.1)',
                          borderRadius: '4px',
                          listStyle: 'none',
                          padding: '0.5rem 0',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        {link.children.map((child) => {
                          const isRoute = child.href.startsWith('/')
                          const linkStyle = {
                            display: 'block',
                            padding: '0.6rem 1.2rem',
                            color: 'rgba(15, 30, 41, 0.75)',
                            fontSize: '0.78rem',
                            fontWeight: 400,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }
                          return (
                            <li key={child.label}>
                              {isRoute ? (
                                <Link
                                  to={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={linkStyle}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--teal)'; e.currentTarget.style.paddingLeft = '1.5rem' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(15, 30, 41, 0.75)'; e.currentTarget.style.paddingLeft = '1.2rem' }}
                                >
                                  {child.label}
                                </Link>
                              ) : (
                                <a
                                  href={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={linkStyle}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--teal)'; e.currentTarget.style.paddingLeft = '1.5rem' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(15, 30, 41, 0.75)'; e.currentTarget.style.paddingLeft = '1.2rem' }}
                                >
                                  {child.label}
                                </a>
                              )}
                            </li>
                          )
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : link.href.startsWith('/') ? (
                <Link
                  to={link.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    color: 'rgba(15, 30, 41, 0.75)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.75)')}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    color: 'rgba(15, 30, 41, 0.75)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 30, 41, 0.75)')}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary nav-cta" style={{ fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}>
          Book Consultation
        </a>

        {/* Mobile toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--teal)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: '5.5rem',
              left: '1rem',
              right: '1rem',
              zIndex: 999,
              background: 'rgba(255, 255, 255, 0.99)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(30, 57, 79, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <ul style={{ listStyle: 'none', padding: '0.5rem 0' }}>
              {navLinks.map((link) => {
                const isExpanded = mobileExpanded === link.label
                return (
                  <li key={link.label} style={{ borderBottom: '1px solid rgba(30, 57, 79, 0.07)' }}>
                    {link.children ? (
                      /* Parent with children ,  toggle accordion, don't navigate */
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '0.9rem 1.5rem',
                          background: 'none',
                          border: 'none',
                          color: '#0f1e29',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={15}
                          style={{
                            color: 'rgba(15,30,41,0.4)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.22s ease',
                            flexShrink: 0,
                          }}
                        />
                      </button>
                    ) : (
                      /* Leaf link ,  navigate and close */
                      link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                          style={{
                            display: 'block',
                            padding: '0.9rem 1.5rem',
                            color: '#0f1e29',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                          style={{
                            display: 'block',
                            padding: '0.9rem 1.5rem',
                            color: '#0f1e29',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {link.label}
                        </a>
                      )
                    )}

                    {/* Dropdown children */}
                    <AnimatePresence initial={false}>
                      {link.children && isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          style={{ listStyle: 'none', overflow: 'hidden', background: 'rgba(15,30,41,0.025)' }}
                        >
                          {link.children.map((child) => (
                            <li key={child.label} style={{ borderTop: '1px solid rgba(30,57,79,0.06)' }}>
                              <Link
                                to={child.href}
                                onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                                style={{
                                  display: 'block',
                                  padding: '0.75rem 1.5rem 0.75rem 2.25rem',
                                  color: 'rgba(15, 30, 41, 0.72)',
                                  fontSize: '0.82rem',
                                  fontWeight: 400,
                                  textDecoration: 'none',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                                }}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
              <li style={{ padding: '1rem 1.5rem' }}>
                <a href="#contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Book Consultation
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
