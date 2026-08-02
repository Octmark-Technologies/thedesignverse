import { Grid, Settings, Package, Zap, Layers, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import B2BPageLayout from '../../components/B2BPageLayout'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

function ModularShowcase() {
  return (
    <section style={{ padding: '5rem 0', background: '#F4F7F2' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 3rem' }}
        >
          <span className="section-label">Real Work</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>
            Precision in Every Detail
          </h2>
        </motion.div>
        <div className="modular-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { src: `${B}Images/ModKitchen.png`, label: 'Modular Kitchen', sub: 'Custom-fit, premium finishes' },
            { src: `${B}Images/ModBedroom.png`, label: 'Master Bedroom', sub: 'Floor-to-ceiling wardrobes' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              style={{ borderRadius: 4, overflow: 'hidden', position: 'relative', border: '1px solid #e4e9e0' }}
            >
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img
                  src={item.src}
                  alt={item.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1.25rem 1.5rem', background: '#fff' }}>
                <div style={{ fontFamily: FONT, fontSize: '1rem', fontWeight: 600, color: '#1E394F' }}>{item.label}</div>
                <div style={{ fontFamily: FONT, fontSize: '0.8rem', fontWeight: 300, color: '#5a7a8a', marginTop: '0.2rem' }}>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.modular-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export default function ModularExcellence() {
  return (
    <B2BPageLayout
      badge="Interior · Modular"
      heroImage="/Images/ModKitchen.png"
      breadcrumbs={[{ label: 'Interior Designing' }, { label: 'Modular Excellence' }]}
      title="Modular Solutions Built for"
      titleHighlight="Indian Homes & Offices"
      subtitle="Precision-engineered modular kitchens, wardrobes, and storage systems  , designed for your space, manufactured to last, and installed in days not weeks."
      heroColor="#1E2F3A"
      features={[
        { icon: <Grid size={20} color="#1E394F" />, title: 'Modular Kitchens', desc: 'Custom-sized modular kitchen systems with 200+ finish options  , shutter styles, hardware, countertop materials, and appliance integration.' },
        { icon: <Package size={20} color="#1E394F" />, title: 'Wardrobes & Storage', desc: 'Floor-to-ceiling modular wardrobes with internal fittings tailored to your clothing, accessories, and storage habits.' },
        { icon: <Settings size={20} color="#1E394F" />, title: 'CNC Precision Manufacturing', desc: 'Every panel is cut to micron-level accuracy by CNC machinery  , ensuring perfect fit and consistent quality across all components.' },
        { icon: <Layers size={20} color="#1E394F" />, title: 'Premium Material Options', desc: 'European hardware, moisture-resistant boards, soft-close mechanisms, and scratch-resistant shutters as standard.' },
        { icon: <Zap size={20} color="#1E394F" />, title: '7-Day Installation', desc: 'Pre-manufactured off-site and assembled on location  , most modular projects are fully installed within a week.' },
        { icon: <Shield size={20} color="#1E394F" />, title: '10-Year Product Warranty', desc: 'Extended 10-year warranty on all modular furniture covering manufacturing defects, hardware failure, and structural issues.' },
      ]}
      steps={[
        { num: '01', title: 'Space Measurement', desc: 'Our team takes precise measurements and photographs of your kitchen or room.' },
        { num: '02', title: '3D Layout & Finish Selection', desc: 'A full 3D design with your chosen finishes and internal fittings presented for approval.' },
        { num: '03', title: 'Factory Manufacturing', desc: 'CNC-manufactured panels produced to your exact specifications with QC at every stage.' },
        { num: '04', title: 'On-Site Installation', desc: 'Factory-finished components installed by trained carpenters in 5–7 working days.' },
      ]}
      stats={[
        { value: '3,200+', label: 'Modular Units Installed' },
        { value: '7 Days', label: 'Avg. Installation' },
        { value: '200+', label: 'Finish Options' },
        { value: '10 Year', label: 'Product Warranty' },
      ]}
      whyUs={[
        { title: 'Factory-Finish Quality', desc: 'CNC manufacturing eliminates the inconsistencies of site carpentry  , every door aligns, every edge is clean.' },
        { title: 'Speed Without Compromise', desc: '7-day installation means minimal disruption to your home life without sacrificing quality or customisation.' },
        { title: 'True Customisation', desc: 'Not a catalogue product adapted to your space  , designed from scratch to your exact dimensions and preferences.' },
        { title: 'Long-Term Value', desc: 'Modular systems can be reconfigured, extended, and partly replaced as your needs change  , a better investment than built-in carpentry.' },
      ]}
    >
      <ModularShowcase />
    </B2BPageLayout>
  )
}
