import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import ExperienceCentre from './components/ExperienceCentre'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CostCalculator from './components/CostCalculator'
import GetEstimate from './components/GetEstimate'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ResidentialInteriors from './pages/b2c/ResidentialInteriors'
import CommercialHubs from './pages/b2c/CommercialHubs'
import OfficeSpaces from './pages/b2c/OfficeSpaces'
import Craftsmanship from './pages/interior/Craftsmanship'
import DesignProcess from './pages/interior/DesignProcess'
import Portfolio from './pages/interior/Portfolio'
import ModularExcellence from './pages/interior/ModularExcellence'
import B2BHub from './pages/b2b/B2BHub'
import InteriorDesigners from './pages/b2b/InteriorDesigners'
import Vendors from './pages/b2b/Vendors'
import Architects from './pages/b2b/Architects'
import CoworkingSpaces from './pages/b2b/CoworkingSpaces'
import ManufacturingSupport from './pages/b2b/ManufacturingSupport'
import MaterialLibrary from './pages/b2b/MaterialLibrary'
import Projects from './pages/Projects'
import ExperienceCentrePage from './pages/ExperienceCentrePage'
import ConsultationFloat from './components/ConsultationFloat'
import LandingPage from './pages/LandingPage'
import ThankYouPage from './pages/ThankYouPage'
import CoworkingLandingPage from './pages/CoworkingLandingPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <ExperienceCentre />
        <HowItWorks />
        <Testimonials />
        <CostCalculator />
        <GetEstimate />
      </main>
      <Footer />
    </>
  )
}

export default function App() {

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FloatWrapper />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/b2c/residential-interiors" element={<ResidentialInteriors />} />
        <Route path="/b2c/commercial-hubs" element={<CommercialHubs />} />
        <Route path="/b2c/office-spaces" element={<OfficeSpaces />} />
        <Route path="/interior/craftsmanship" element={<Craftsmanship />} />
        <Route path="/interior/design-process" element={<DesignProcess />} />
        <Route path="/interior/portfolio" element={<Portfolio />} />
        <Route path="/interior/modular-excellence" element={<ModularExcellence />} />
        <Route path="/b2b" element={<B2BHub />} />
        <Route path="/b2b/interior-designers" element={<InteriorDesigners />} />
        <Route path="/b2b/vendors" element={<Vendors />} />
        <Route path="/b2b/architects" element={<Architects />} />
        <Route path="/b2b/coworking-spaces" element={<CoworkingSpaces />} />
        <Route path="/b2b/manufacturing-support" element={<ManufacturingSupport />} />
        <Route path="/b2b/material-library" element={<MaterialLibrary />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience-centre" element={<ExperienceCentrePage />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/coworking" element={<CoworkingLandingPage />} />
        <Route path="/lp/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  )
}
function FloatWrapper() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/lp' && <ConsultationFloat />}
      {location.pathname !== '/lp' && <WhatsAppFloat />}
    </>
  );
}

