import { Briefcase, Users, Cpu, Zap, Layout, Shield } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function OfficeSpaces() {
  return (
    <B2BPageLayout
      badge="B2C · Office"
      title="Offices Designed for"
      titleHighlight="How Your Team Actually Works"
      subtitle="A well-designed office increases productivity, reduces attrition, and communicates your brand to every visitor. We design offices that do all three."
      heroColor="#1A2F3D"
      heroImage="/Images/Hot-seats.png"
      breadcrumbs={[{ label: 'B2C Solutions' }, { label: 'Office Spaces' }]}
      features={[
        { icon: <Layout size={20} color="#1E394F" />, title: 'Smart Space Planning', desc: 'Balance focused work zones, collaboration areas, and social spaces for maximum team performance.' },
        { icon: <Briefcase size={20} color="#1E394F" />, title: 'Brand Expression', desc: 'Reception areas, boardrooms, and common zones that communicate your company culture and values.' },
        { icon: <Cpu size={20} color="#1E394F" />, title: '3D Concept Presentation', desc: 'Visualise the finished office in detail before approving a single element  , materials, furniture, lighting.' },
        { icon: <Zap size={20} color="#1E394F" />, title: 'Tech-Ready Infrastructure', desc: 'Cable management, server room planning, AV systems, and charging points integrated from day one.' },
        { icon: <Users size={20} color="#1E394F" />, title: 'Ergonomics & Wellbeing', desc: 'Acoustic panels, biophilic elements, and ergonomic furniture selection that keeps your team healthy.' },
        { icon: <Shield size={20} color="#1E394F" />, title: 'Minimal Disruption', desc: 'Phased execution scheduled around your working hours  , your team stays productive throughout.' },
      ]}
      steps={[
        { num: '01', title: 'Workplace Brief', desc: 'We understand your headcount, work style, brand, and growth plans.' },
        { num: '02', title: '3D Office Design', desc: 'Full 3D design with zoning plan, furniture layout, and finish specifications.' },
        { num: '03', title: 'Material & Furniture Approval', desc: 'Visit our showroom to physically approve all materials and furniture selections.' },
        { num: '04', title: 'Weekend/After-Hours Build', desc: 'Execution timed to minimise disruption. Ready for Monday morning.' },
      ]}
      stats={[
        { value: '600+', label: 'Offices Designed' },
        { value: '45 Days', label: 'Avg. Completion' },
        { value: '40+', label: 'Industries Served' },
        { value: '96%', label: 'Repeat Clients' },
      ]}
      whyUs={[
        { title: 'Productivity by Design', desc: 'Research-backed space planning that demonstrably improves team output and collaboration.' },
        { title: 'Talent Retention', desc: 'A workplace people love coming to reduces attrition  , one of the highest ROI investments a company can make.' },
        { title: 'Built Around Your Culture', desc: 'Not a template  , every office we design reflects the specific personality of the company that inhabits it.' },
        { title: 'Post-Handover Support', desc: 'Furniture reconfigurations, expansion panels, and maintenance support as your team grows.' },
      ]}
    />
  )
}
