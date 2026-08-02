import { Palette, Layers, Users, Zap, Package, Clock } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function InteriorDesigners() {
  return (
    <B2BPageLayout
      badge="B2B · Interior Designers"
      title="The Professional Hub for"
      titleHighlight="Interior Designers"
      subtitle="Access 10,000+ material samples, exclusive trade pricing, and a dedicated project support team  , everything you need to deliver exceptional results for your clients."
      heroColor="#1E394F"
      heroImage="/Images/2151892478-1.webp"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'Interior Designers' }]}
      features={[
        { icon: <Layers size={20} color="#1E394F" />, title: 'Material Library Access', desc: 'Browse 10,000+ curated samples across flooring, cladding, fabrics, and hardware  , all available for physical inspection.' },
        { icon: <Package size={20} color="#1E394F" />, title: 'Trade Pricing', desc: 'Exclusive professional rates on all materials and products. Margin protection guaranteed for registered designers.' },
        { icon: <Palette size={20} color="#1E394F" />, title: '3D Visualisation Suite', desc: 'Use our in-house 3D rendering studio to present photorealistic concepts to your clients before execution.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Dedicated Account Manager', desc: 'A single point of contact who understands your workflow and ensures every project runs on time.' },
        { icon: <Zap size={20} color="#1E394F" />, title: 'Fast Procurement', desc: 'Same-day material dispatch for in-stock items. Direct vendor relationships mean zero supply chain delays.' },
        { icon: <Clock size={20} color="#1E394F" />, title: 'Project Tracking Portal', desc: 'Real-time updates on orders, deliveries, and installation schedules  , accessible from anywhere.' },
      ]}
      steps={[
        { num: '01', title: 'Register as a Trade Partner', desc: 'Submit your portfolio and business details. Approval within 24 hours.' },
        { num: '02', title: 'Visit the Experience Centre', desc: 'Walk through 11,500 sq ft with your client and select materials with our team.' },
        { num: '03', title: 'Lock Specifications', desc: 'Finalise BOQ with your account manager and receive a trade quotation.' },
        { num: '04', title: 'Procure & Execute', desc: 'We handle procurement, delivery coordination, and on-site support.' },
      ]}
      stats={[
        { value: '850+', label: 'Registered Designers' },
        { value: '10,000+', label: 'Material Samples' },
        { value: '24hr', label: 'Trade Approval' },
        { value: '98%', label: 'On-Time Delivery' },
      ]}
      whyUs={[
        { title: 'No Middlemen', desc: 'Direct manufacturer relationships mean better prices and faster turnarounds for your projects.' },
        { title: 'Reputation Protection', desc: 'We only supply verified, quality-certified materials  , your client satisfaction is our priority.' },
        { title: 'Collaborative Showroom', desc: 'Bring your clients in and let our 11,500 sq ft experience centre do the selling for you.' },
        { title: 'Flexible Credit Terms', desc: 'Registered trade partners enjoy 30-day credit facilities and consolidated monthly invoicing.' },
      ]}
    />
  )
}
