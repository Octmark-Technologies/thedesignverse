import { Building2, TrendingUp, Cpu, Users, Zap, Shield } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function CommercialHubs() {
  return (
    <B2BPageLayout
      badge="B2C · Commercial"
      title="Spaces That Work as Hard"
      titleHighlight="as Your Business"
      subtitle="Retail stores, restaurants, hotels, clinics  , we design commercial interiors that attract customers, reinforce your brand, and drive revenue from day one."
      heroColor="#243B4A"
      heroImage="/Images/event-ready.png"
      breadcrumbs={[{ label: 'B2C Solutions' }, { label: 'Commercial Hubs' }]}
      features={[
        { icon: <Building2 size={20} color="#1E394F" />, title: 'Brand-Aligned Design', desc: 'Every element  , from flooring to lighting  , is chosen to reinforce your brand identity and customer experience.' },
        { icon: <TrendingUp size={20} color="#1E394F" />, title: 'Revenue-Optimised Layouts', desc: 'Space planning driven by customer flow, dwell time, and conversion  , not just aesthetics.' },
        { icon: <Cpu size={20} color="#1E394F" />, title: 'Immersive 3D Walkthroughs', desc: 'Pre-approved 3D renders so you know exactly how your commercial space will look before construction.' },
        { icon: <Zap size={20} color="#1E394F" />, title: 'Fast-Track Delivery', desc: 'Commercial timelines are tight. We plan phased execution to minimise downtime and lost trading days.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Multi-Location Capability', desc: 'Standardised design systems that can be replicated across franchise or chain locations consistently.' },
        { icon: <Shield size={20} color="#1E394F" />, title: 'Compliance & Safety', desc: 'All commercial fitouts comply with fire safety, accessibility, and local authority guidelines.' },
      ]}
      steps={[
        { num: '01', title: 'Brief & Site Survey', desc: 'We understand your business, brand, customer, and space constraints in detail.' },
        { num: '02', title: 'Concept & 3D Design', desc: 'A full concept presentation with floor plan, 3D render, and material board.' },
        { num: '03', title: 'Approval & BOQ', desc: 'You approve the design. We lock pricing with a detailed bill of quantities.' },
        { num: '04', title: 'Phased Build & Handover', desc: 'Execution is phased to keep disruption minimal. Final handover with snag-free guarantee.' },
      ]}
      stats={[
        { value: '400+', label: 'Commercial Projects' },
        { value: '45 Days', label: 'Avg. Fitout Time' },
        { value: '50+', label: 'Brand Types Served' },
        { value: '98%', label: 'On-Time Delivery' },
      ]}
      whyUs={[
        { title: 'Commercial Specialists', desc: 'Our team has deep experience across retail, F&B, healthcare, and hospitality  , each with different requirements.' },
        { title: 'Revenue-First Thinking', desc: 'We design with your business KPIs in mind, not just industry awards.' },
        { title: 'Turnkey Responsibility', desc: 'One contract covers design, materials, execution, and aftercare  , no gaps, no blame-shifting.' },
        { title: 'Scalable for Chains', desc: 'Design systems that can be standardised and rolled out across multiple locations without quality loss.' },
      ]}
    />
  )
}
