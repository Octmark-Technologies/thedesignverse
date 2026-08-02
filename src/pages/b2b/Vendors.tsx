import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, Truck, BarChart2, Handshake, Globe } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B = import.meta.env.BASE_URL

const vendors = [
  { name: 'Hettich',       src: `${B}Vendors/hettich.png` },
  { name: 'Hafele',        src: `${B}Vendors/hafele.png` },
  { name: 'Blum',          src: `${B}Vendors/blum.png` },
  { name: 'Sleek',         src: `${B}Vendors/sleek.png` },
  { name: 'Ebco',          src: `${B}Vendors/ebco.jpeg` },
  { name: 'Aristro',       src: `${B}Vendors/aristro.png` },
  { name: 'Kessebohmer',   src: `${B}Vendors/kessebohmer.png` },
  { name: 'Greenlam',      src: `${B}Vendors/Greenlam-Laminate.jpg` },
  { name: 'Greenply',      src: `${B}Vendors/greenply.png` },
  { name: 'Century',       src: `${B}Vendors/century.png` },
  { name: 'Merino',        src: `${B}Vendors/merino.jpg` },
  { name: 'Royale Touche', src: `${B}Vendors/royale-touche.png` },
  { name: 'Higold',        src: `${B}Vendors/higold.png` },
  { name: 'Action',        src: `${B}Vendors/action.png` },
]

function BrandPartners() {
  return (
    <section style={{ padding: '6rem 0', background: '#F4F7F2' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 3.5rem' }}
        >
          <span className="section-label">Our Partners</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 700, color: '#1E394F' }}>
            Trusted Brand Partners
          </h2>
          <p style={{ fontFamily: FONT, fontSize: '0.95rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.7, marginTop: '0.75rem' }}>
            We display and recommend only certified, premium brands ,  giving your products direct access to Hyderabad's most active interior buyers.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1px',
            background: '#e4e9e0',
            border: '1px solid #e4e9e0',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {vendors.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ background: '#fff', boxShadow: '0 4px 24px rgba(30,57,79,0.08)' }}
              style={{
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '2rem 1.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <img
                src={v.src}
                alt={v.name}
                style={{
                  height: 48,
                  width: 'auto',
                  maxWidth: 110,
                  objectFit: 'contain',
                  filter: 'grayscale(20%)',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(20%)')}
              />
              <span style={{ fontFamily: FONT, fontSize: '0.72rem', fontWeight: 500, color: '#8a9da8', letterSpacing: '0.04em' }}>
                {v.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Vendors() {
  return (
    <B2BPageLayout
      badge="B2B · Vendors"
      title="Partner with Hyderabad's"
      titleHighlight="Leading Interior Hub"
      subtitle="List your products in our 11,500 sq ft experience centre and reach thousands of homeowners, designers, and architects every month."
      heroColor="#2C4A5A"
      heroImage="/Images/armchair-green-living-room-with-copy-space.webp"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'Vendors' }]}
      features={[
        { icon: <Globe size={20} color="#1E394F" />, title: 'Showroom Presence', desc: 'Physical product placement in our high-footfall experience centre, seen by 3,000+ monthly visitors.' },
        { icon: <TrendingUp size={20} color="#1E394F" />, title: 'High-Intent Buyers', desc: 'Every visitor is actively planning a project. Your products are in front of the right audience at the right time.' },
        { icon: <ShieldCheck size={20} color="#1E394F" />, title: 'Quality Certification', desc: 'Joining our vendor network signals credibility. We verify all partners ,  a mark of trust for end customers.' },
        { icon: <BarChart2 size={20} color="#1E394F" />, title: 'Sales Analytics', desc: 'Monthly reports on product views, enquiries generated, and conversion rates from our showroom floor.' },
        { icon: <Truck size={20} color="#1E394F" />, title: 'Logistics Support', desc: 'We coordinate last-mile delivery to project sites, so your job ends at our warehouse.' },
        { icon: <Handshake size={20} color="#1E394F" />, title: 'Long-Term Partnerships', desc: 'We prefer exclusive or preferred vendor arrangements that benefit both sides over the long term.' },
      ]}
      steps={[
        { num: '01', title: 'Submit Application', desc: 'Share your product catalogue, certifications, and pricing structure.' },
        { num: '02', title: 'Product Review', desc: 'Our sourcing team evaluates quality, pricing, and fit for our audience.' },
        { num: '03', title: 'Onboarding & Display', desc: 'We place your products in the relevant zone of our experience centre.' },
        { num: '04', title: 'Ongoing Sales Support', desc: 'Our floor staff are trained on your products and actively recommend them.' },
      ]}
      stats={[
        { value: '5,000+', label: 'Verified Vendors' },
        { value: '3,000+', label: 'Monthly Visitors' },
        { value: '11,500 sq ft', label: 'Showroom Space' },
        { value: '92%', label: 'Vendor Retention' },
      ]}
      whyUs={[
        { title: 'Qualified Traffic', desc: 'Our visitors are mid-to-high income homeowners actively spending on interiors ,  not window shoppers.' },
        { title: 'Cross-Sell Ecosystem', desc: 'Your products sit alongside complementary categories, driving higher basket sizes and repeat orders.' },
        { title: 'Transparent Reporting', desc: 'Full visibility into enquiries, quotes, and conversions generated by your display.' },
        { title: 'Flexible Listing Models', desc: 'Choose from consignment, catalogue listing, or exclusive display arrangements based on your strategy.' },
      ]}
    >
      <BrandPartners />
    </B2BPageLayout>
  )
}
