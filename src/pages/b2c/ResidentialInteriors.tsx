import { Home, Layers, Cpu, Wrench, Shield, Users } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function ResidentialInteriors() {
  return (
    <B2BPageLayout
      badge="B2C · Residential"
      title="Your Home, Designed"
      titleHighlight="Exactly as You Imagined"
      subtitle="From a single room refresh to a complete home transformation  , we handle every detail with craftsmanship and honesty, so you can simply move in and love it."
      heroColor="#1E394F"
      heroImage="/Images/Gen4-A-luxurious-dream-home-interior-with-open-plan-design-spacious-living-room-flowi-a-2-28291373.webp"
      breadcrumbs={[{ label: 'B2C Solutions' }, { label: 'Residential Interiors' }]}
      features={[
        { icon: <Cpu size={20} color="#1E394F" />, title: '3D Visualisation First', desc: 'See your home in photorealistic 3D before a single nail goes in. Approve every detail before execution begins.' },
        { icon: <Layers size={20} color="#1E394F" />, title: '10,000+ Material Choices', desc: 'Choose from the largest material library in Hyderabad  , flooring, wall finishes, fabrics, hardware, and more.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Dedicated Design Team', desc: 'A personal design consultant who understands your lifestyle, budget, and vision  , with you from day one.' },
        { icon: <Wrench size={20} color="#1E394F" />, title: 'Turnkey Execution', desc: 'We manage every vendor, every timeline, and every on-site detail. You get the finished home, not the headache.' },
        { icon: <Shield size={20} color="#1E394F" />, title: 'Honest Pricing', desc: 'Detailed, transparent quotations with no hidden costs. What you approve is exactly what you pay.' },
        { icon: <Home size={20} color="#1E394F" />, title: '10-Year Warranty', desc: 'Full workmanship warranty on all executed work  , because we stand behind what we build.' },
      ]}
      steps={[
        { num: '01', title: 'Free Consultation', desc: 'Visit our Experience Centre or schedule a home visit. Share your vision and requirements.' },
        { num: '02', title: '3D Design Presentation', desc: 'Receive a full 3D render of your home with selected materials and layout proposals.' },
        { num: '03', title: 'Material Selection', desc: 'Walk through our 11,500 sq ft showroom and physically approve every material.' },
        { num: '04', title: 'Execution & Handover', desc: 'We execute, supervise, and hand over your transformed home on time.' },
      ]}
      stats={[
        { value: '10+', label: 'Years Experience' },
        { value: '10,000+', label: 'Material Samples' },
        { value: '45 Days', label: 'Avg. Delivery' },
        { value: '100%', label: 'Client Satisfaction' },
      ]}
      whyUs={[
        { title: 'See Before You Spend', desc: 'Our 3D visualisation studio lets you walk through your finished home digitally before any work begins.' },
        { title: 'One Point of Contact', desc: 'No juggling contractors, vendors, and designers separately. We manage everything under one roof.' },
        { title: 'No Surprise Costs', desc: 'Our pricing is locked after design approval. Zero change orders without your written consent.' },
        { title: 'Lifetime Relationship', desc: 'We stay connected post-handover for annual maintenance, additions, and renovations as your needs evolve.' },
      ]}
    />
  )
}
