import { Award, Wrench, Layers, Eye, CheckCircle, Star } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function Craftsmanship() {
  return (
    <B2BPageLayout
      badge="Interior · Craftsmanship"
      title="Where Skill Meets"
      titleHighlight="Obsessive Detail"
      subtitle="Every joint, every edge, every surface finish  , crafted by artisans who take pride in work that outlasts trends. This is what makes TDV interiors unmistakable."
      heroColor="#1E3A2A"
      heroImage="/Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17047330.png"
      breadcrumbs={[{ label: 'Interior Designing' }, { label: 'Craftsmanship' }]}
      features={[
        { icon: <Wrench size={20} color="#1E394F" />, title: 'Master Craftsmen', desc: 'A curated roster of artisans with 10–30 years of specialist experience in carpentry, stone, metal, and fabric.' },
        { icon: <Layers size={20} color="#1E394F" />, title: 'Premium Materials Only', desc: 'We specify and source materials that meet strict quality benchmarks  , no substitutions without client approval.' },
        { icon: <Eye size={20} color="#1E394F" />, title: 'On-Site Quality Supervision', desc: 'A dedicated site supervisor inspects every stage of execution against the approved drawings and specifications.' },
        { icon: <CheckCircle size={20} color="#1E394F" />, title: '12-Point QC Protocol', desc: 'Every deliverable is checked against a 12-point quality checklist before handover to the client.' },
        { icon: <Award size={20} color="#1E394F" />, title: 'Bespoke Joinery', desc: 'Custom cabinetry, shelving, and furniture pieces crafted to exact dimensions  , nothing off-the-shelf unless you want it.' },
        { icon: <Star size={20} color="#1E394F" />, title: 'Finishing Excellence', desc: 'Paint prep, caulking, edge finishing, and final detailing that separates a good interior from a great one.' },
      ]}
      steps={[
        { num: '01', title: 'Design Freeze', desc: 'All drawings and specifications are finalised and locked before any craftsmanship begins.' },
        { num: '02', title: 'Material Procurement', desc: 'Every material is sourced, inspected, and approved before reaching the site.' },
        { num: '03', title: 'Skilled Execution', desc: 'Assigned craftsmen execute with regular supervision checkpoints and photo documentation.' },
        { num: '04', title: 'QC & Handover', desc: '12-point quality inspection. Snag list resolved before keys are handed over.' },
      ]}
      stats={[
        { value: '25+', label: 'Years Avg. Craftsman Experience' },
        { value: '12-Point', label: 'QC Checklist' },
        { value: '99.1%', label: 'Snag-Free Handovers' },
        { value: '10 Year', label: 'Workmanship Warranty' },
      ]}
      whyUs={[
        { title: 'Pride in the Invisible', desc: 'The edges behind doors, the alignment of concealed hinges, the perfectly level shelf  , we care about what most won\'t see.' },
        { title: 'Artisan Relationships', desc: 'Our craftsmen are long-term partners, not transient labour  , they\'re invested in the reputation of every project.' },
        { title: 'Material Integrity', desc: 'We never substitute a specified material without written client approval, no matter what the supply chain situation.' },
        { title: 'Accountable Until Done', desc: 'Site supervision continues until every snag is closed and you are genuinely satisfied  , not just signed off.' },
      ]}
    />
  )
}
