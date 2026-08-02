import { Settings, Factory, Package, BarChart2, Truck, CheckCircle } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function ManufacturingSupport() {
  return (
    <B2BPageLayout
      badge="B2B · Manufacturing Support"
      title="End-to-End"
      titleHighlight="Manufacturing Support"
      subtitle="Custom furniture, modular components, and bespoke joinery  , manufactured to specification, quality-checked in-house, and delivered to site."
      heroColor="#162D3D"
      heroImage="/Images/Gen4-generate-am-modular-kitchen-image-with-fully-interior-s-dreamscape-a-2-3176733956.webp"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'Manufacturing Support' }]}
      features={[
        { icon: <Factory size={20} color="#1E394F" />, title: 'Custom Manufacturing', desc: 'Furniture, cabinetry, and joinery manufactured to your exact drawings with no MOQ restrictions.' },
        { icon: <Settings size={20} color="#1E394F" />, title: 'CNC & Precision Cutting', desc: 'State-of-the-art CNC machinery ensures micron-level accuracy on all panel and frame components.' },
        { icon: <Package size={20} color="#1E394F" />, title: 'Modular Components', desc: 'Pre-engineered modular systems for kitchens, wardrobes, and storage  , fast to install, built to last.' },
        { icon: <CheckCircle size={20} color="#1E394F" />, title: 'In-House QC', desc: 'Every piece passes a 12-point quality inspection before leaving our facility. No exceptions.' },
        { icon: <Truck size={20} color="#1E394F" />, title: 'Site Delivery & Installation', desc: 'Our installation teams handle delivery, assembly, and on-site commissioning for all manufactured items.' },
        { icon: <BarChart2 size={20} color="#1E394F" />, title: 'Production Tracking', desc: 'Real-time production dashboards so you know exactly where your order is in the manufacturing pipeline.' },
      ]}
      steps={[
        { num: '01', title: 'Submit Drawings', desc: 'Share CAD/shop drawings or a brief  , we\'ll create shop drawings if needed.' },
        { num: '02', title: 'Material Approval', desc: 'Select from our in-stock material library or we source to your specification.' },
        { num: '03', title: 'Production & QC', desc: 'Manufacturing begins with dedicated QC checkpoints at each stage.' },
        { num: '04', title: 'Deliver & Install', desc: 'On-site delivery, installation, and snag resolution within agreed timelines.' },
      ]}
      stats={[
        { value: '12,000+', label: 'Units Manufactured' },
        { value: '21 Days', label: 'Avg Lead Time' },
        { value: '12-Point', label: 'QC Checklist' },
        { value: '99.2%', label: 'Defect-Free Rate' },
      ]}
      whyUs={[
        { title: 'Design Fidelity', desc: 'We manufacture exactly what was specified  , no hidden substitutions or tolerance shortcuts.' },
        { title: 'Integrated Supply Chain', desc: 'Materials, manufacturing, and installation under one roof means fewer hand-offs and faster resolution.' },
        { title: 'Competitive Lead Times', desc: '21-day standard lead time with express options available for time-critical projects.' },
        { title: 'Volume Pricing', desc: 'Significant cost advantages for bulk orders  , ideal for developers, hotel chains, and large commercial projects.' },
      ]}
    />
  )
}
