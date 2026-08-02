import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${import.meta.env.BASE_URL}Images/home-image.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.04)',
          willChange: 'transform',
        }}
      />

      {/* Dark gradient overlay ,  keeps text readable over any image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(10,20,28,0.88) 0%, rgba(10,20,28,0.55) 55%, rgba(10,20,28,0.25) 100%)',
        }}
      />
      {/* Bottom fade for smooth section transition */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '18%',
          background: 'linear-gradient(to bottom, transparent, rgba(10,20,28,0.7))',
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '7rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          style={{ maxWidth: 700 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: 'rgba(206, 212, 129, 0.1)',
              border: '1px solid rgba(206, 212, 129, 0.3)',
              borderRadius: '2px',
              marginBottom: '1.5rem',
            }}
          >
            <MapPin size={12} color="var(--brass)" />
            <span
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--brass)',
              }}
            >
              Hyderabad · 11,500 sq ft Experience Centre
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 600,
              color: '#F4F7F2',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
          >
            The Ultimate
            <br />
            <em style={{ color: 'var(--brass)', fontStyle: 'italic' }}>Interior Hub</em>
            <br />
            for Hyderabad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
              fontSize: '1.05rem',
              fontWeight: 300,
              color: 'rgba(244, 247, 242, 0.8)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 560,
            }}
          >
            One space. Every solution. Trusted for over 10 years ,  from design to execution,
            materials to project management. Your transformation starts with a single visit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <a href="#contact" className="btn-primary" style={{ fontSize: '0.82rem' }}>
              Book Free Consultation
              <ArrowRight size={14} />
            </a>
            <a href="#experience" className="btn-outline">
              Explore Centre
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244, 247, 242, 0.4)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(206, 212, 129, 0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
