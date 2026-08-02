import { BookOpen, Cpu, Layers, FileText, Users, CheckCircle } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function DesignProcess() {
  return (
    <B2BPageLayout
      badge="Interior · Design Process"
      title="A Process Built for"
      titleHighlight="Zero Surprises"
      subtitle="Our design process is structured to keep you informed, in control, and excited at every stage  , from first brief to final handover."
      heroColor="#1E2F4A"
      heroImage="/Images/Gen4Turbo-change-the-above-reference-image-color-into-ggreen-s-high-contrast-1348160066.webp"
      breadcrumbs={[{ label: 'Interior Designing' }, { label: 'Design Process' }]}
      features={[
        { icon: <Users size={20} color="#1E394F" />, title: 'Discovery & Briefing', desc: 'We start by deeply understanding your lifestyle, functional needs, aesthetic preferences, and budget realities.' },
        { icon: <FileText size={20} color="#1E394F" />, title: 'Concept Development', desc: 'Mood boards, layout options, and material palettes presented for your feedback before any 3D work begins.' },
        { icon: <Cpu size={20} color="#1E394F" />, title: '3D Design & Walkthroughs', desc: 'Photorealistic renders of every room so you can virtually walk through the finished space before approval.' },
        { icon: <Layers size={20} color="#1E394F" />, title: 'Material Selection Session', desc: 'A dedicated session at our Experience Centre to physically touch and compare all specified materials.' },
        { icon: <BookOpen size={20} color="#1E394F" />, title: 'Detailed Documentation', desc: 'Complete BOQ, shop drawings, and specification sheets  , a single source of truth for execution.' },
        { icon: <CheckCircle size={20} color="#1E394F" />, title: 'Execution Monitoring', desc: 'Weekly progress reports, site photos, and milestone sign-offs keep you informed without requiring you on-site.' },
      ]}
      steps={[
        { num: '01', title: 'Discovery Call', desc: 'A 60-minute session to understand your project, timeline, and budget in depth.' },
        { num: '02', title: 'Concept Presentation', desc: 'Mood boards and layout options presented. Feedback collected and incorporated.' },
        { num: '03', title: '3D Design Approval', desc: 'Photorealistic renders finalised and approved. Material selection session at our showroom.' },
        { num: '04', title: 'Execution & Updates', desc: 'Weekly reports, milestone check-ins, and a smooth handover with all documentation.' },
      ]}
      stats={[
        { value: '2 Weeks', label: 'Avg. Design Phase' },
        { value: '3D', label: 'Every Room Visualised' },
        { value: '100%', label: 'Design Approval Before Build' },
        { value: '0', label: 'Hidden Costs' },
      ]}
      whyUs={[
        { title: 'Decisions Before Demolition', desc: 'Every design decision is made on paper and in 3D before any physical work begins  , eliminating costly mid-project changes.' },
        { title: 'Client as Co-Creator', desc: 'We involve you at every stage. Your feedback shapes the design  , we\'re executing your vision, not ours.' },
        { title: 'Full Documentation', desc: 'You receive complete design drawings and specs. If you ever need another contractor, the documentation is yours.' },
        { title: 'Transparent Timeline', desc: 'A project Gantt chart is shared and updated weekly so you always know what\'s happening and when.' },
      ]}
    />
  )
}
