import { BookOpen, Search, Package, Layers, Star, RefreshCw } from 'lucide-react'
import B2BPageLayout from '../../components/B2BPageLayout'

export default function MaterialLibrary() {
  return (
    <B2BPageLayout
      badge="B2B · Material Library"
      title="10,000+ Materials."
      titleHighlight="Touch. Feel. Specify."
      subtitle="The largest curated material library in Hyderabad  , spanning flooring, wall cladding, textiles, hardware, and finishes. All in one place, open to professionals."
      heroColor="#1E394F"
      heroImage="/Images/Gen4-A-modern-luxury-living-room-interior-featuring-elegant-furniture-warm-ambient-l-a-2-17120936.webp"
      breadcrumbs={[{ label: 'B2B Hub', href: '/b2b' }, { label: 'Material Library' }]}
      features={[
        { icon: <Layers size={20} color="#1E394F" />, title: '10,000+ Physical Samples', desc: 'The most comprehensive touch-and-feel library in Hyderabad, curated across 40+ material categories.' },
        { icon: <Search size={20} color="#1E394F" />, title: 'Digital Catalogue', desc: 'Every sample is digitised with specs, pricing, and availability  , searchable from anywhere before your visit.' },
        { icon: <Package size={20} color="#1E394F" />, title: 'Sample Loan Programme', desc: 'Borrow physical samples for up to 7 days to present to your clients in their home environment.' },
        { icon: <BookOpen size={20} color="#1E394F" />, title: 'Technical Specifications', desc: 'Download detailed spec sheets, finish guides, and installation manuals for every product in the library.' },
        { icon: <Star size={20} color="#1E394F" />, title: 'New Arrivals Programme', desc: 'Registered professionals receive monthly updates on new materials, finishes, and supplier launches.' },
        { icon: <RefreshCw size={20} color="#1E394F" />, title: 'Fast Restock', desc: 'Our procurement team monitors stock levels daily. If a material is out of stock, we fast-track reorder.' },
      ]}
      steps={[
        { num: '01', title: 'Browse Online', desc: 'Search our digital catalogue by category, material type, colour, or finish.' },
        { num: '02', title: 'Visit & Select', desc: 'Come in to physically compare and shortlist materials with our team\'s guidance.' },
        { num: '03', title: 'Borrow Samples', desc: 'Take samples home or to the project site through our 7-day loan programme.' },
        { num: '04', title: 'Order & Deliver', desc: 'Place your order  , we fulfil from stock or source directly from the manufacturer.' },
      ]}
      stats={[
        { value: '10,000+', label: 'Material Samples' },
        { value: '40+', label: 'Categories' },
        { value: '7 Days', label: 'Sample Loan Period' },
        { value: '200+', label: 'Brand Partners' },
      ]}
      whyUs={[
        { title: 'Unmatched Breadth', desc: 'No other library in Hyderabad comes close. From Italian marble to Indian handloom textiles  , it\'s all here.' },
        { title: 'Expert Guidance', desc: 'Our material consultants have deep product knowledge and will help you navigate the library efficiently.' },
        { title: 'Transparent Pricing', desc: 'Trade pricing is displayed alongside retail pricing. No hidden margins, no surprise quotes.' },
        { title: 'Constantly Updated', desc: 'We add 100+ new samples monthly and retire discontinued lines  , the library is always current.' },
      ]}
    />
  )
}
