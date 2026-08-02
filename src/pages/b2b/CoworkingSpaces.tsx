import { Layout, Wifi, Coffee, Users, Zap, Shield } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function CoworkingSpaces() {
  return (
    <B2BPageLayout
      badge="B2B · CoWorking Spaces"
      title="Design-Forward Interiors for"
      titleHighlight="CoWorking Operators"
      subtitle="We design, furnish, and fit out coworking spaces that attract members and retain them. From the first impression to every workstation detail  , TDV handles it all."
      heroColor="#243B4A"
      heroImage="/Images/Hot-seats.png"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'CoWorking Spaces' }]}
      features={[
        { icon: <Layout size={20} color="#1E394F" />, title: 'Space Planning', desc: 'Optimise every square foot for hot-desking, private cabins, collaboration zones, and breakout areas.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Member Experience Design', desc: 'We design with your members in mind  , acoustics, lighting, ergonomics, and flow that improves productivity.' },
        { icon: <Wifi size={20} color="#1E394F" />, title: 'Tech-Ready Infrastructure', desc: 'Cable management, server room planning, charging stations, and AV setups integrated from day one.' },
        { icon: <Coffee size={20} color="#1E394F" />, title: 'Pantry & Lounge Fitout', desc: 'Custom pantry counters, lounge seating, and hospitality zones that become the heart of your community.' },
        { icon: <Zap size={20} color="#1E394F" />, title: 'Fast-Track Delivery', desc: 'Phased fitout delivery so your revenue zones go live first while the rest of the build continues.' },
        { icon: <Shield size={20} color="#1E394F" />, title: 'Warranty & AMC', desc: '10-year workmanship warranty and annual maintenance contracts to protect your investment.' },
      ]}
      steps={[
        { num: '01', title: 'Site Assessment', desc: 'Our team visits your space and prepares a detailed feasibility and design brief.' },
        { num: '02', title: '3D Concept Presentation', desc: 'Receive photorealistic renders of the finished space before a single rupee is spent on execution.' },
        { num: '03', title: 'Phased Execution', desc: 'We execute in phases aligned to your opening schedule  , zero downtime disruptions.' },
        { num: '04', title: 'Handover & Support', desc: 'Full handover with a snag-free guarantee and an ongoing AMC if required.' },
      ]}
      stats={[
        { value: '180+', label: 'Coworking Fitouts' },
        { value: '45 Days', label: 'Avg Delivery Time' },
        { value: '10 Year', label: 'Warranty' },
        { value: '96%', label: 'Client Satisfaction' },
      ]}
      whyUs={[
        { title: 'Operator Mindset', desc: 'We understand your economics. Every design decision is optimised for occupancy, not just aesthetics.' },
        { title: 'Scalable Solutions', desc: 'Whether you\'re fitting out 2,000 sq ft or 20,000 sq ft, our process and pricing scale with you.' },
        { title: 'Turnkey Delivery', desc: 'One contract, one team, zero coordination headache. We manage every vendor from flooring to fixtures.' },
        { title: 'Community-Ready Design', desc: 'Spaces designed to foster spontaneous collaboration  , the invisible differentiator for member retention.' },
      ]}
    />
  )
}
