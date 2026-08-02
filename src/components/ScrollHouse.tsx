import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

const scenes = [
  { src: `${B}scenes/entrance1.png`, area: 'Living Room',      title: 'Entertainment Wall',  desc: 'Warmth meets sophistication in every crafted detail' },
  { src: `${B}scenes/2.png`,         area: 'Dining Area',      title: 'Open Plan Living',     desc: 'Where every meal becomes a moment' },
  { src: `${B}scenes/4.png`,         area: 'Dining · Kitchen', title: 'Connected Spaces',     desc: 'Flow and function, seamlessly joined' },
  { src: `${B}scenes/3.png`,         area: 'Kitchen',          title: 'Pantry & Storage',     desc: 'Organisation elevated to an art form' },
  { src: `${B}scenes/5.png`,         area: 'Modular Kitchen',  title: 'Premium Finishes',     desc: 'European hardware, flawless execution' },
  { src: `${B}scenes/6.png`,         area: 'Kitchen',          title: 'Built-in Storage',     desc: 'Every centimetre purposefully designed' },
  { src: `${B}scenes/14.png`,        area: 'Master Suite',     title: 'Wardrobe Unit',        desc: 'A dressing room worthy of the collection' },
  { src: `${B}scenes/7.png`,         area: 'Master Suite',     title: 'Wardrobe Wall',        desc: 'Geometry and restraint in perfect balance' },
  { src: `${B}scenes/8.png`,         area: 'Master Suite',     title: 'Study Corner',         desc: 'Quiet focus, refined in form' },
  { src: `${B}scenes/10.png`,        area: 'Master Bedroom',   title: 'Restful Sanctuary',    desc: 'Where the day gracefully ends' },
]

/*
 * SceneFrame ,  the core of the walkthrough illusion.
 *
 * As fp (float frame index) approaches this frame's index:
 *   scale goes 0.90 → 1.00  (camera "arriving" into the room ,  pulling back to normal)
 * As fp moves past this frame's index:
 *   scale goes 1.00 → 1.18  (camera "walking through" ,  pushing forward into the room)
 *
 * Combined with a quick crossfade this creates continuous forward momentum,
 * not a slideshow.
 */
function SceneFrame({ src, index, fp }: { src: string; index: number; fp: MotionValue<number> }) {
  const opacity = useTransform(fp, (v) => {
    const lp = v - index
    // Tight crossfade window: ±0.45 total, sharp at ±0.12 to feel like a real cut
    if (lp < -0.45 || lp > 0.45) return 0
    if (lp < -0.12) return (lp + 0.45) / 0.33
    if (lp > 0.12)  return (0.45 - lp) / 0.33
    return 1
  })

  const scale = useTransform(fp, (v) => {
    const lp = v - index
    if (lp < -0.5) return 0.90
    if (lp > 0.5)  return 1.18
    if (lp <= 0) {
      // Arriving: 0.90 → 1.00  (camera pulls back to settle in the room)
      const t = (lp + 0.5) / 0.5
      return 0.90 + 0.10 * t
    } else {
      // Leaving: 1.00 → 1.18  (camera pushes forward through the room)
      const t = lp / 0.5
      return 1.00 + 0.18 * t
    }
  })

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 42%',
        backgroundRepeat: 'no-repeat',
        scale,
        opacity,
        transformOrigin: 'center 46%',  // slightly above centre ,  first-person eye level
        filter: 'contrast(1.06) brightness(0.82) saturate(0.68)',
        willChange: 'transform, opacity',
      }}
    />
  )
}

export default function ScrollHouse() {
  const containerRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const fp           = useTransform(scrollYProgress, [0, 1], [0, scenes.length - 1])
  const barWidth     = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const scrollCueOp  = useTransform(fp, [0, 0.5], [1, 0])

  useMotionValueEvent(fp, 'change', (v) =>
    setActive(Math.min(scenes.length - 1, Math.max(0, Math.round(v))))
  )

  const scene = scenes[active]

  return (
    <section
      ref={containerRef}
      id="walkthrough"
      style={{ height: `${scenes.length * 150}vh`, position: 'relative', background: '#000' }}
    >
      {/* ── Sticky full-screen viewport ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#040404' }}>

        {/* Scene frames */}
        {scenes.map((s, i) => <SceneFrame key={i} src={s.src} index={i} fp={fp} />)}

        {/* ── Cinematic vignette ── */}
        {/* Top dark band for UI legibility */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.95) 100%)',
        }} />
        {/* Edge vignette ,  the cinematic letterbox feel */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* ── Top bar ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: 'clamp(1.25rem,3vh,2rem) clamp(1.5rem,4vw,3rem)',
        }}>
          {/* Brand mark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontFamily: FONT, fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#CED481' }}>
              The Designverse
            </span>
            <span style={{ fontFamily: FONT, fontSize: '0.52rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
              Project Walk-Through
            </span>
          </div>

          {/* Frame counter */}
          <div style={{ fontFamily: FONT, fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.28)', lineHeight: 1 }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'rgba(206,212,129,0.75)', letterSpacing: '-0.01em' }}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <span style={{ margin: '0 0.4rem', opacity: 0.3 }}>/</span>
            {String(scenes.length).padStart(2, '0')}
          </div>
        </div>

        {/* ── Right: dot journey tracker ── */}
        <div style={{
          position: 'absolute', right: 'clamp(1rem,2.5vw,2.25rem)', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 10,
        }}>
          {scenes.map((_, i) => (
            <motion.div key={i}
              animate={{
                height: i === active ? 26 : 7,
                background: i === active ? '#CED481' : 'rgba(255,255,255,0.18)',
                boxShadow: i === active ? '0 0 10px rgba(206,212,129,0.55)' : 'none',
              }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ width: 2, borderRadius: 2 }}
            />
          ))}
        </div>

        {/* ── Bottom: room label ── */}
        <div style={{
          position: 'absolute', bottom: 'clamp(3.5rem,8vh,5.5rem)',
          left: 'clamp(1.5rem,4vw,3rem)',
          zIndex: 10, maxWidth: 560,
        }}>
          <motion.div
            key={`label-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Area label with horizontal rule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{ height: 1, background: '#CED481', flexShrink: 0 }}
              />
              <span style={{
                fontFamily: FONT, fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.28em', textTransform: 'uppercase', color: '#CED481',
              }}>
                {scene.area}
              </span>
            </div>

            {/* Room title ,  large, light weight */}
            <div style={{
              fontFamily: FONT,
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              fontWeight: 200,
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '0.85rem',
            }}>
              {scene.title}
            </div>

            {/* Description */}
            <div style={{
              fontFamily: FONT, fontSize: '0.82rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.42)', letterSpacing: '0.01em', lineHeight: 1.6,
            }}>
              {scene.desc}
            </div>
          </motion.div>
        </div>

        {/* ── Scroll cue (fades out after entering) ── */}
        <motion.div style={{
          position: 'absolute', bottom: 'clamp(1rem,2.5vh,1.75rem)', left: '50%',
          x: '-50%', zIndex: 10, opacity: scrollCueOp,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          pointerEvents: 'none',
        }}>
          <span style={{ fontFamily: FONT, fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Scroll to walk through
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 26, background: 'linear-gradient(to bottom, rgba(206,212,129,0.6), transparent)' }}
          />
        </motion.div>

        {/* ── Gold progress bar ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)', zIndex: 10 }}>
          <motion.div style={{
            height: '100%',
            background: 'linear-gradient(to right, rgba(206,212,129,0.4), #CED481)',
            width: barWidth,
            boxShadow: '0 0 8px rgba(206,212,129,0.35)',
          }} />
        </div>

      </div>
    </section>
  )
}
