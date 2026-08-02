import { Image, Star, Home, Building2, Briefcase, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import B2BPageLayout from '../../components/B2BPageLayout'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

const portfolioImages = [
  { src: `${B}Images/Gen4-A-luxurious-dream-home-interior-with-open-plan-design-spacious-living-room-flowi-a-2-28291373.webp`, label: 'Luxury Villa', category: 'Residential' },
  { src: `${B}Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17047330.png`, label: 'Modern Living Room', category: 'Residential' },
  { src: `${B}Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17120936.webp`, label: 'Contemporary Living', category: 'Residential' },
  { src: `${B}Images/Gen4Turbo-change-the-above-reference-image-color-into-ggreen-s-high-contrast-1348160066.webp`, label: 'Premium Apartment', category: 'Residential' },
  { src: `${B}Images/Cabins.png`, label: 'Office Cabins', category: 'Commercial' },
  { src: `${B}Images/event-ready.png`, label: 'Conference Suite', category: 'Commercial' },
  { src: `${B}Images/armchair-green-living-room-with-copy-space.webp`, label: 'Accent Living', category: 'Residential' },
  { src: `${B}Images/2151892478-1.webp`, label: 'Reading Corner', category: 'Residential' },
  { src: `${B}Images/Gen4-generate-am-modular-kitchen-image-with-fully-interior-s-dreamscape-a-2-3176733956.webp`, label: 'Modular Kitchen', category: 'Modular' },
  { src: `${B}Images/Gen4-generate-am-modular-bedroom-image-with-fully-interior-s-dreamscape-a-2-1579175243.webp`, label: 'Modular Bedroom', category: 'Modular' },
  { src: `${B}Images/Hot-seats.png`, label: 'Co-working Hub', category: 'Commercial' },
  { src: `${B}Images/Expereince-centre.png`, label: 'Experience Centre', category: 'Showcase' },
]

function PortfolioGallery() {
  return (
    <section style={{ padding: '5rem 0', background: '#F4F7F2' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 3rem' }}
        >
          <span className="section-label">Our Work</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>
            Selected Projects
          </h2>
          <p style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.7, marginTop: '0.75rem' }}>
            A glimpse across residential, commercial, and modular projects delivered across Hyderabad.
          </p>
        </motion.div>
        <div
          className="portfolio-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: '#e4e9e0',
            border: '1px solid #e4e9e0',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {portfolioImages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: '#fff', cursor: 'pointer' }}
              whileHover={{ zIndex: 2 }}
            >
              <img
                src={item.src}
                alt={item.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(14,29,41,0.75) 0%, transparent 55%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex', alignItems: 'flex-end', padding: '1rem',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
              >
                <div>
                  <div style={{ fontFamily: FONT, fontSize: '0.82rem', fontWeight: 600, color: '#F4F7F2' }}>{item.label}</div>
                  <div style={{ fontFamily: FONT, fontSize: '0.68rem', fontWeight: 400, color: '#CED481', letterSpacing: '0.08em', marginTop: '0.15rem' }}>{item.category}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.portfolio-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:600px){.portfolio-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}

export default function Portfolio() {
  return (
    <B2BPageLayout
      badge="Interior · Portfolio"
      heroImage="/Images/Gen4-A-luxurious-dream-home-interior-with-open-plan-design-spacious-living-room-flowi-a-2-28291373.webp"
      breadcrumbs={[{ label: 'Interior Designing' }, { label: 'Portfolio' }]}
      title="4,000+ Projects."
      titleHighlight="Every One a Story."
      subtitle="From intimate 1BHK transformations to sprawling luxury villas and flagship commercial spaces  , each project in our portfolio reflects a client's unique vision, brought to life with precision."
      heroColor="#2A1E3A"
      features={[
        { icon: <Home size={20} color="#1E394F" />, title: 'Residential Portfolio', desc: '10+ years of experience transforming homes across Hyderabad  , apartments, villas, penthouses, and independent houses in every style.' },
        { icon: <Building2 size={20} color="#1E394F" />, title: 'Commercial Portfolio', desc: 'Retail, restaurants, hotels, clinics, and showrooms  , designed for performance and brand impact.' },
        { icon: <Briefcase size={20} color="#1E394F" />, title: 'Office Portfolio', desc: 'Corporate headquarters, startup spaces, and co-working fitouts that reflect each organisation\'s culture.' },
        { icon: <Star size={20} color="#1E394F" />, title: 'Luxury Projects', desc: 'High-budget residential and hospitality projects where no detail is too small and no specification is compromised.' },
        { icon: <Image size={20} color="#1E394F" />, title: 'Before & After Stories', desc: 'Documentation of the transformation journey  , from raw state to finished space  , for client reference.' },
        { icon: <Award size={20} color="#1E394F" />, title: 'Award-Winning Work', desc: 'Recognised by industry bodies for design excellence, sustainability, and innovation in interior solutions.' },
      ]}
      steps={[
        { num: '01', title: 'Browse by Category', desc: 'Filter our portfolio by project type  , residential, commercial, office, or luxury.' },
        { num: '02', title: 'Visit Our Showroom', desc: 'See physical material samples and finished vignettes from real projects on our showroom floor.' },
        { num: '03', title: 'Reference Your Favourites', desc: 'Share portfolio references with your design consultant to inform your own project brief.' },
        { num: '04', title: 'Start Your Project', desc: 'Book a consultation and begin your own portfolio-worthy interior transformation.' },
      ]}
      stats={[
        { value: '4,000+', label: 'Projects Completed' },
        { value: '12', label: 'Design Awards' },
        { value: '8 Years', label: 'Portfolio History' },
        { value: '100%', label: 'Client Permission' },
      ]}
      whyUs={[
        { title: 'Proven Across Styles', desc: 'Our portfolio spans contemporary, traditional, industrial, Japandi, and bespoke styles  , not a one-trick studio.' },
        { title: 'Real Projects, Real Clients', desc: 'Every portfolio project was executed for a real client. No concept renders dressed up as completed work.' },
        { title: 'Detailed Case Studies', desc: 'For major projects we produce full case studies covering design brief, challenges, solutions, and outcomes.' },
        { title: 'Reference Site Visits', desc: 'For large projects, we can arrange reference visits to completed sites  , with client permission  , so you can see our work in person.' },
      ]}
    >
      <PortfolioGallery />
    </B2BPageLayout>
  )
}
