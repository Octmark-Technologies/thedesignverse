import { Ruler, Cpu, FileText, Users, Layers, Award } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function Architects() {
  return (
    <B2BPageLayout
      badge="B2B · Architects"
      title="Built for the Way"
      titleHighlight="Architects Work"
      subtitle="From material specification to procurement and site delivery  , TDV integrates into your project workflow so you can focus on design, not logistics."
      heroColor="#1A3040"
      heroImage="/Images/Cabins.png"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'Architects' }]}
      features={[
        { icon: <Layers size={20} color="#1E394F" />, title: 'Full Material Specification', desc: 'Specify from 10,000+ samples across structural, surface, and finish categories  , all in one place.' },
        { icon: <Ruler size={20} color="#1E394F" />, title: 'Technical Documentation', desc: 'Access detailed spec sheets, CAD blocks, BIM objects, and installation guidelines for every product.' },
        { icon: <Cpu size={20} color="#1E394F" />, title: '3D & BIM Integration', desc: 'Our team can map your design intent into 3D renders and coordinate with BIM workflows for complex projects.' },
        { icon: <FileText size={20} color="#1E394F" />, title: 'BOQ & Cost Estimation', desc: 'Automated bill of quantities generation from your material schedule, with live trade pricing.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Site Coordination', desc: 'A dedicated project coordinator manages vendor schedules and on-site deliveries aligned to your construction timeline.' },
        { icon: <Award size={20} color="#1E394F" />, title: 'Certified Material Partners', desc: 'All vendor materials come with quality certifications, ensuring compliance with IS and international standards.' },
      ]}
      steps={[
        { num: '01', title: 'Register Your Practice', desc: 'Register as an architectural partner with your firm details and COA credentials.' },
        { num: '02', title: 'Receive Project Brief', desc: 'Share your project brief  , we assign a dedicated material consultant to your team.' },
        { num: '03', title: 'Specify & Approve', desc: 'Visit or browse our digital catalogue to finalise material specifications.' },
        { num: '04', title: 'Procure & Deliver', desc: 'We handle bulk procurement, QC, and phased delivery to match your site schedule.' },
      ]}
      stats={[
        { value: '320+', label: 'Architecture Firms' },
        { value: '1,500+', label: 'Projects Executed' },
        { value: '48hr', label: 'BOQ Turnaround' },
        { value: '100%', label: 'Certified Materials' },
      ]}
      whyUs={[
        { title: 'One Source of Truth', desc: 'A single procurement partner for all interior materials means fewer vendors, fewer delays, and cleaner project accounting.' },
        { title: 'Site-Ready Logistics', desc: 'Materials arrive phased, labelled, and ready for installation  , reducing site clutter and rework.' },
        { title: 'Design Integrity', desc: 'We source to your exact specification rather than substituting. What you designed is what gets built.' },
        { title: 'Long Project Memory', desc: 'We maintain your material specifications for the life of the project, making rectifications and extensions seamless.' },
      ]}
    />
  )
}
