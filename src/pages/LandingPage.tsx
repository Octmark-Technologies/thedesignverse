import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, X, Loader2, CheckCircle, Shield, Clock, Zap,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Star, Award, CalendarCheck,
  Plus, Trash2,
} from 'lucide-react'
const FONT    = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const B       = import.meta.env.BASE_URL
const WA      = 'https://wa.me/919550156644'
const WEBHOOK = 'https://thedesignverse.co.in/webhook/ad1676c2-78f0-4a31-a3dc-f96f606632ed'

// ─── Calculator constants (mirrors CostCalculator) ───────────────────
const FINISHES = [
  { key:'laminate', label:'Laminate', subtitle:'Durable & Versatile',  rate:2000, loftRate:1600, color:'#9a7424' },
  { key:'acrylic',  label:'Acrylic',  subtitle:'High Gloss Finish',    rate:2400, loftRate:2000, color:'#1e3d60' },
  { key:'duco',     label:'Duco',     subtitle:'Premium Matte',        rate:3000, loftRate:2600, color:'#2e2e2e' },
] as const
type FinishKey = typeof FINISHES[number]['key']
const UNIT_RATES: Record<string,number> = { 
  'TV Unit':1400, 
  'Headboard Panel':1200, 
  'False Ceiling (sft)':120,
  'Accent Wall (Economic)':150,
  'Accent Wall (Medium)':400,
  'Accent Wall (Luxury)':800
}
const ROOM_TYPES = [
  {key:'living',label:'Living Room'},{key:'master',label:'Master Bedroom'},
  {key:'bed2',label:'Bedroom 2'},{key:'bed3',label:'Bedroom 3'},
  {key:'kitchen',label:'Kitchen'},{key:'dining',label:'Dining Area'},
  {key:'study',label:'Study / Office'},{key:'mbath',label:'Master Bathroom'},
  {key:'bath2',label:'Bathroom 2'},{key:'utility',label:'Utility / Store'},
]
const UNIT_PRESETS: Record<string,string[]> = {
  living:['TV Unit','Feature Wall','Crockery Unit','Console Unit','Bar Unit','False Ceiling (sft)','Accent Wall (Economic)','Accent Wall (Medium)','Accent Wall (Luxury)'],
  master:['Wardrobe','Study Desk Unit','Headboard Panel','Dresser','False Ceiling (sft)','Accent Wall (Economic)','Accent Wall (Medium)','Accent Wall (Luxury)'],
  bed2:['Wardrobe','Study Desk Unit','Loft Storage','False Ceiling (sft)','Accent Wall (Economic)','Accent Wall (Medium)','Accent Wall (Luxury)'],
  bed3:['Wardrobe','Study Desk Unit','False Ceiling (sft)','Accent Wall (Economic)','Accent Wall (Medium)','Accent Wall (Luxury)'],
  kitchen:['Upper Cabinets','Lower Cabinets','Tall Pantry Unit','Island Counter','False Ceiling (sft)'],
  dining:['Crockery Cabinet','Bar Counter','Display Unit','False Ceiling (sft)'],
  study:['Work Desk','Bookshelf Wall','Storage Cabinet','False Ceiling (sft)','Accent Wall (Economic)','Accent Wall (Medium)','Accent Wall (Luxury)'],
  mbath:['Vanity Unit','Storage Cabinet'],
  bath2:['Vanity Unit','Storage Cabinet'],
  utility:['Storage Rack','Loft Storage'],
}
interface CalcWall { id:string; name:string; width:string; height:string; loft:boolean; loftHeight:string }
interface CalcRoom { id:string; typeKey:string; label:string; walls:CalcWall[]; collapsed:boolean }
const uid = () => Math.random().toString(36).slice(2,9)
const newWall = (name=''): CalcWall => ({id:uid(),name,width:'',height:'',loft:false,loftHeight:'2'})
const newRoom = (typeKey:string, label:string): CalcRoom => ({id:uid(),typeKey,label,walls:[newWall()],collapsed:false})
const wallCost = (w:CalcWall, rate:number, loftRate:number) => {
  const wd=parseFloat(w.width)||0, h=parseFloat(w.height)||0, lh=w.loft?(parseFloat(w.loftHeight)||2):0
  const sr=UNIT_RATES[w.name]; if(sr!==undefined) return wd*(h+lh)*sr
  return wd*h*rate + wd*lh*loftRate
}
// dark-theme input style for calculator
const calcInp: React.CSSProperties = {
  background:'rgba(244,247,242,0.05)', border:'1px solid rgba(244,247,242,0.12)',
  borderRadius:4, color:'#F4F7F2', fontFamily:FONT, fontSize:'0.82rem', fontWeight:300,
  outline:'none', padding:'0.55rem 0.7rem', width:'100%', transition:'border-color 0.2s',
}

// ─── Data ────────────────────────────────────────────────────────────
const vendors = [
  { name:'Hettich',      logo:`${B}Vendors/hettich.png`          },
  { name:'Blum',         logo:`${B}Vendors/blum.png`             },
  { name:'Sleek',        logo:`${B}Vendors/sleek.png`            },
  { name:'Greenply',     logo:`${B}Vendors/greenply.png`         },
  { name:'Century',      logo:`${B}Vendors/century.png`          },
  { name:'Greenlam',     logo:`${B}Vendors/Greenlam-Laminate.jpg`},
  { name:'Merino',       logo:`${B}Vendors/merino.jpg`           },
  { name:'Royale Touche',logo:`${B}Vendors/royale-touche.png`    },
  { name:'Action Tesa',  logo:`${B}Vendors/action.png`           },
  { name:'Higold',       logo:`${B}Vendors/higold.png`           },
]

const projects = [
  { client:'Dheeraj Residence',       type:'3BHK · Full Home',    photos:[`${B}projects/Dheeraj/KK105221.jpg`,`${B}projects/Dheeraj/KK105222.jpg`,`${B}projects/Dheeraj/KK105225.jpg`,`${B}projects/Dheeraj/KK105231.jpg`,`${B}projects/Dheeraj/KK105254.jpg`,`${B}projects/Dheeraj/KK105258.jpg`,`${B}projects/Dheeraj/KK105260.jpg`,`${B}projects/Dheeraj/KK105305.jpg`] },
  { client:'Sri Laxmi Residence',     type:'2BHK · Premium',      photos:[`${B}projects/Sri laxmi/SO102303.jpg`,`${B}projects/Sri laxmi/SO102312.jpg`,`${B}projects/Sri laxmi/SO102316.jpg`,`${B}projects/Sri laxmi/SO102328.jpg`,`${B}projects/Sri laxmi/SO102330.jpg`,`${B}projects/Sri laxmi/SO102333.jpg`,`${B}projects/Sri laxmi/SO102345.jpg`,`${B}projects/Sri laxmi/SO102346.jpg`] },
  { client:'Vamshi Krishna Residence',type:'Villa · Luxury',       photos:[`${B}projects/Vamshi Krishna/ARBE (1).jpg`,`${B}projects/Vamshi Krishna/ARBE (6).jpg`,`${B}projects/Vamshi Krishna/ARBE (8).jpg`,`${B}projects/Vamshi Krishna/ARBE (9).jpg`,`${B}projects/Vamshi Krishna/ARBE (11).jpg`,`${B}projects/Vamshi Krishna/ARBE (12).jpg`,`${B}projects/Vamshi Krishna/ARBE (14).jpg`,`${B}projects/Vamshi Krishna/ARBE (16).jpg`] },
]

const process = [
  { day:'Day 1',    title:'Free Consultation',      desc:'Meet our designer at our 11,500 sq ft Experience Centre. We listen, measure, and understand your vision ,  zero cost, zero obligation.' },
  { day:'Day 3',    title:'3D Design Presentation', desc:'Your full 3D walkthrough is ready. See every room, every material, every finish before a single rupee is spent.' },
  { day:'Day 7',    title:'Materials Finalised',    desc:'Walk our 10,000+ sample floor. Touch, compare, confirm. Every choice is yours ,  we just guide.' },
  { day:'Day 15',   title:'Factory Manufacturing',  desc:'CNC-precision manufacturing begins at our facility. Panels cut to micron accuracy, hardware fitted, quality-checked.' },
  { day:'Day 22–45',title:'Installation & Handover',desc:'Our trained team installs in days ,  not weeks. Day 45: you get the keys to a completed, warranty-certified home.' },
]

const faqs = [
  { q:"What if it takes more than 45 days?",            a:"We pay your rent for every extra day. This guarantee is in writing in our contract. T&C apply ,  ask your consultant for the full terms." },
  { q:"What does the 10-year warranty cover?",          a:"All modular furniture: kitchens, wardrobes, storage units, and hardware. Covers manufacturing defects, structural failure, and hardware issues for 10 years from handover date." },
  { q:"Is the consultation and 3D design really free?", a:"Yes ,  100% free. No booking fees, no design charges, no obligation. We only start billing after you approve the design and sign the contract." },
  { q:"Are these brands genuine or substituted?",       a:"Every project uses Hettich/Blum/Sleek hardware and Greenply/Century boards by default. Substitutions require your written approval ,  we don't downgrade silently." },
  { q:"What is the minimum project size?",              a:"From a single modular kitchen (₹2.5L+) to a full luxury villa. No minimum size ,  but we are a premium studio and are not the cheapest quote in the market." },
  { q:"Can I visit the Experience Centre before deciding?",a:"Yes ,  and we encourage it. Call us on +91 95501 56644 to book a slot. It's free, takes about 90 minutes, and most clients say it's the clearest picture they've ever had of their future home." },
]

// ─── Input style ─────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width:'100%', padding:'0.8rem 1rem',
  background:'rgba(244,247,242,0.05)',
  border:'1px solid rgba(206,212,129,0.25)',
  borderRadius:5, color:'#F4F7F2',
  fontFamily:FONT, fontSize:'0.88rem', fontWeight:300,
  outline:'none', transition:'border-color 0.2s', boxSizing:'border-box',
}
const lbl: React.CSSProperties = {
  display:'block', fontFamily:FONT, fontSize:'0.62rem', fontWeight:700,
  letterSpacing:'0.12em', textTransform:'uppercase',
  color:'rgba(244,247,242,0.4)', marginBottom:'0.3rem',
}

// ─── Form Popup ───────────────────────────────────────────────────────
interface FormPopupProps {
  onClose: () => void
  onSuccess: () => void
  preType?: string
  fromEstimator?: boolean
}
function FormPopup({ onClose, onSuccess, preType = '', fromEstimator }: FormPopupProps) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', type: preType })
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) { setErr('Name and phone are required.'); return }
    setSending(true)
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || '',
          project_type: form.type || 'Not specified',
          source: fromEstimator ? 'Landing Page ,  Price Estimator' : 'Landing Page',
          submitted_at: new Date().toISOString(),
        }),
      })
      onSuccess()
    } catch { setErr('Something went wrong. Please try WhatsApp.') }
    finally { setSending(false) }
  }

  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        style={{position:'fixed',inset:0,zIndex:9100,background:'rgba(4,10,16,0.8)',backdropFilter:'blur(8px)'}}
        onClick={onClose}
      />
      <motion.div initial={{opacity:0,y:50,scale:0.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:30,scale:0.97}}
        transition={{duration:0.35,ease:[0.22,1,0.36,1]}}
        className="lp-popup-modal"
        style={{
          position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          zIndex:9200, width:'min(460px,calc(100vw - 2rem))',
          background:'linear-gradient(160deg,#142939 0%,#0a1620 100%)',
          border:'1px solid rgba(206,212,129,0.22)', borderRadius:14,
          boxShadow:'0 32px 80px rgba(0,0,0,0.6)', overflow:'hidden',
        }}
      >
        {/* Top bar */}
        <div style={{background:'linear-gradient(90deg,#1a3347,#0f2030)',padding:'1.1rem 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(206,212,129,0.1)'}}>
          <div>
            <div style={{fontFamily:FONT,fontSize:'1rem',fontWeight:700,color:'#F4F7F2'}}>
              {fromEstimator ? 'Unlock Your Price Estimate' : 'Book Free Consultation'}
            </div>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',color:'rgba(206,212,129,0.7)',marginTop:2}}>
              Free · No Obligation · Response in 1 hour
            </div>
          </div>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(255,255,255,0.5)'}}>
            <X size={13}/>
          </button>
        </div>

        <form onSubmit={submit} style={{padding:'1.5rem'}}>
          {fromEstimator && (
            <div style={{background:'rgba(206,212,129,0.08)',border:'1px solid rgba(206,212,129,0.2)',borderRadius:6,padding:'0.75rem 1rem',marginBottom:'1.25rem',fontFamily:FONT,fontSize:'0.8rem',color:'rgba(244,247,242,0.7)',lineHeight:1.5}}>
              Your price estimate is ready ,  share your details to reveal it instantly.
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'0.75rem'}} className="lp-form-row">
            <div>
              <label style={lbl} htmlFor="lp-name">Full Name *</label>
              <input id="lp-name" type="text" required placeholder="Your name" style={inp} value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})}
                onFocus={e=>(e.target.style.borderColor='#CED481')}
                onBlur={e=>(e.target.style.borderColor='rgba(206,212,129,0.25)')}
              />
            </div>
            <div>
              <label style={lbl} htmlFor="lp-phone">Phone *</label>
              <input id="lp-phone" type="tel" required placeholder="+91 00000 00000" style={inp} value={form.phone}
                onChange={e=>setForm({...form,phone:e.target.value})}
                onFocus={e=>(e.target.style.borderColor='#CED481')}
                onBlur={e=>(e.target.style.borderColor='rgba(206,212,129,0.25)')}
              />
            </div>
          </div>

          <div style={{marginBottom:'0.75rem'}}>
            <label style={lbl} htmlFor="lp-email">Email (optional)</label>
            <input id="lp-email" type="email" placeholder="your@email.com" style={inp} value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
              onFocus={e=>(e.target.style.borderColor='#CED481')}
              onBlur={e=>(e.target.style.borderColor='rgba(206,212,129,0.25)')}
            />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={lbl} htmlFor="lp-type">Project Type</label>
            <select id="lp-type" style={{...inp,cursor:'pointer'}} value={form.type}
              onChange={e=>setForm({...form,type:e.target.value})}
              onFocus={e=>(e.target.style.borderColor='#CED481')}
              onBlur={e=>(e.target.style.borderColor='rgba(206,212,129,0.25)')}
            >
              <option value="" style={{background:'#0f1e29'}}>Select type</option>
              {['1BHK','2BHK','3BHK','4BHK / Villa','Office / Commercial','Other'].map(t=>(
                <option key={t} value={t} style={{background:'#0f1e29'}}>{t}</option>
              ))}
            </select>
          </div>

          {err && <div style={{fontFamily:FONT,fontSize:'0.78rem',color:'#ff7b7b',marginBottom:'0.75rem'}}>{err}</div>}

          <button type="submit" disabled={sending} style={{
            width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',
            padding:'0.95rem', background: sending ? 'rgba(206,212,129,0.4)' : '#CED481',
            border:'none', borderRadius:6, fontFamily:FONT, fontSize:'0.82rem',
            fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase',
            color:'#0a1620', cursor: sending ? 'not-allowed' : 'pointer',
            transition:'all 0.2s',
          }}>
            {sending
              ? <><Loader2 size={14} style={{animation:'lpspin 1s linear infinite'}}/> Sending...</>
              : fromEstimator
                ? <><Zap size={14}/> Reveal My Price</>
                : <><CalendarCheck size={14}/> Book Free Consultation</>
            }
          </button>

          <div style={{fontFamily:FONT,fontSize:'0.65rem',color:'rgba(244,247,242,0.3)',textAlign:'center',marginTop:'0.9rem',lineHeight:1.5}}>
            By submitting you agree to our <button onClick={()=>{}} style={{background:'none',border:'none',color:'rgba(206,212,129,0.5)',cursor:'pointer',fontSize:'0.65rem',textDecoration:'underline',fontFamily:FONT,padding:0}}>Privacy Policy</button>.
            We never share your data.
          </div>
        </form>
      </motion.div>
    </>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose, onPrev, onNext }: { src:string; alt:string; onClose:()=>void; onPrev:()=>void; onNext:()=>void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if(e.key==='Escape') onClose(); if(e.key==='ArrowLeft') onPrev(); if(e.key==='ArrowRight') onNext() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, onPrev, onNext])
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9500,background:'rgba(4,10,16,0.95)',display:'flex',alignItems:'center',justifyContent:'center'}}
      onClick={onClose}
    >
      <button onClick={e=>{e.stopPropagation();onPrev()}} aria-label="Prev" style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50%',width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
        <ChevronLeft size={20}/>
      </button>
      <motion.img key={src} src={src} alt={alt} initial={{opacity:0,scale:0.93}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.22}}
        onClick={e=>e.stopPropagation()}
        style={{maxWidth:'90vw',maxHeight:'88vh',objectFit:'contain',borderRadius:6,display:'block'}}
      />
      <button onClick={e=>{e.stopPropagation();onNext()}} aria-label="Next" style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50%',width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
        <ChevronRight size={20}/>
      </button>
      <button onClick={onClose} aria-label="Close" style={{position:'absolute',top:16,right:16,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
        <X size={15}/>
      </button>
    </motion.div>
  )
}

// ─── Privacy Policy Modal ─────────────────────────────────────────────
function PrivacyModal({ onClose }: { onClose:()=>void }) {
  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
        style={{position:'fixed',inset:0,zIndex:9600,background:'rgba(4,10,16,0.85)',backdropFilter:'blur(6px)'}}
      />
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}
        style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:9700,
          width:'min(640px,calc(100vw - 2rem))',maxHeight:'80vh',overflowY:'auto',
          background:'#0f1e29',border:'1px solid rgba(206,212,129,0.15)',borderRadius:12,
          padding:'2rem',fontFamily:FONT,color:'rgba(244,247,242,0.7)',fontSize:'0.83rem',lineHeight:1.75,
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <h2 style={{fontFamily:FONT,fontSize:'1.2rem',fontWeight:700,color:'#F4F7F2',margin:0}}>Privacy Policy</h2>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.07)',border:'none',borderRadius:6,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(255,255,255,0.5)'}}>
            <X size={13}/>
          </button>
        </div>
        {[
          ['Information We Collect','We collect your name, phone number, email address, and project details when you submit a form on this page.'],
          ['How We Use It','Your information is used solely to respond to your enquiry, schedule consultations, and send you information about our services. We do not sell or rent your data to any third party.'],
          ['Data Storage','Form submissions are processed via EmailJS and delivered to info@thedesignverse.co.in. We store enquiry data internally for a period of 24 months.'],
          ['Communications','By submitting this form you consent to being contacted by The DesignVerse via phone, WhatsApp, or email regarding your enquiry. You may opt out at any time by contacting us.'],
          ['Third Party Services','This page uses EmailJS for form delivery. Their privacy policy is available at emailjs.com/legal.'],
          ['Contact','For any privacy-related requests, email info@thedesignverse.co.in or call +91 95501 56644.'],
        ].map(([title, body]) => (
          <div key={title} style={{marginBottom:'1.25rem'}}>
            <div style={{fontFamily:FONT,fontWeight:700,color:'#CED481',marginBottom:'0.3rem',fontSize:'0.82rem'}}>{title}</div>
            <div>{body}</div>
          </div>
        ))}
        <div style={{fontSize:'0.72rem',color:'rgba(244,247,242,0.3)',marginTop:'1rem'}}>Last updated: April 2026 · The DesignVerse, Jubilee Hills, Hyderabad</div>
      </motion.div>
    </>
  )
}

// ─── Project Gallery Component (Mobile touch slider + Arrow Nav) ──────
interface ProjectGalleryProps {
  proj: typeof projects[number]
  allImgs: string[]
  onPhotoClick: (idx: number) => void
}

function ProjectGallery({ proj, allImgs, onPhotoClick }: ProjectGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const cardWidth = container.clientWidth * 0.82
      container.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => scroll('left')}
        className="lp-proj-arrow"
        aria-label="Previous image"
        style={{
          position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(7,16,22,0.85)', backdropFilter: 'blur(4px)',
          border: '1px solid rgba(206,212,129,0.3)', borderRadius: '50%',
          width: 38, height: 38, display: 'none', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#CED481', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          padding: 0,
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="lp-proj-arrow"
        aria-label="Next image"
        style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(7,16,22,0.85)', backdropFilter: 'blur(4px)',
          border: '1px solid rgba(206,212,129,0.3)', borderRadius: '50%',
          width: 38, height: 38, display: 'none', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#CED481', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          padding: 0,
        }}
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={scrollRef}
        className="lp-proj-grid"
        style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'3px',borderRadius:8,overflow:'hidden'}}
      >
        {proj.photos.map((src, ii) => {
          const globalIdx = allImgs.indexOf(src)
          return (
            <motion.button key={ii} whileHover={{scale:1.02}} onClick={()=>onPhotoClick(globalIdx)}
              aria-label="View full size"
              style={{padding:0,border:'none',cursor:'pointer',background:'#071016',aspectRatio:'4/3',overflow:'hidden',display:'block',position:'relative'}}
            >
              <img src={src} alt={`${proj.client} ${ii+1}`} loading="lazy"
                style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.4s ease'}}
                onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.07)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
              />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Landing Page ────────────────────────────────────────────────
export default function LandingPage() {
  useEffect(() => { window.scrollTo(0,0) }, [])

  const [popup, setPopup]         = useState(false)
  const [fromEst, setFromEst]     = useState(false)
  const [privacy, setPrivacy]     = useState(false)
  const [lightbox, setLightbox]   = useState<{imgs:string[]; i:number}|null>(null)
  const [openFaq, setOpenFaq]     = useState<number|null>(null)
  const estimatorRef              = useRef<HTMLDivElement>(null)

  // Full calculator state
  const [calcFinish, setCalcFinish] = useState<FinishKey>('laminate')
  const [rooms, setRooms]           = useState<CalcRoom[]>([])
  const [addingRoom, setAddingRoom] = useState(false)

  const selFinish  = FINISHES.find(f => f.key === calcFinish)!
  const totalCost  = rooms.reduce((s,r) => s + r.walls.reduce((ws,w) => ws + wallCost(w, selFinish.rate, selFinish.loftRate), 0), 0)
  const hasEstimate = totalCost > 0

  const addRoom    = (typeKey:string, label:string) => { setRooms(p=>[...p,newRoom(typeKey,label)]); setAddingRoom(false) }
  const removeRoom = (id:string) => setRooms(p=>p.filter(r=>r.id!==id))
  const toggleCollapse = (id:string) => setRooms(p=>p.map(r=>r.id===id?{...r,collapsed:!r.collapsed}:r))
  const addWall    = (rId:string) => setRooms(p=>p.map(r=>r.id===rId?{...r,walls:[...r.walls,newWall()]}:r))
  const removeWall = (rId:string, wId:string) => setRooms(p=>p.map(r=>r.id===rId?{...r,walls:r.walls.filter(w=>w.id!==wId)}:r))
  const updateWall = (rId:string, wId:string, upd:Partial<CalcWall>) => setRooms(p=>p.map(r=>r.id===rId?{...r,walls:r.walls.map(w=>w.id===wId?{...w,...upd}:w)}:r))

  const openForm = (fromEstimator = false) => { setFromEst(fromEstimator); setPopup(true) }
  const handleSuccess = () => {
    setPopup(false)
    if (fromEst && hasEstimate) {
      const p = new URLSearchParams({ total: String(totalCost), finish: calcFinish, rooms: String(rooms.length) })
      window.location.href = `/lp/thank-you?${p}`
    } else {
      window.location.href = '/lp/thank-you'
    }
  }

  // project gallery flat list for lightbox
  const allImgs = projects.flatMap(p => p.photos)

  return (
    <>
      <AnimatePresence>
        {popup && <FormPopup onClose={()=>setPopup(false)} onSuccess={handleSuccess} fromEstimator={fromEst} preType="" />}
        {privacy && <PrivacyModal onClose={()=>setPrivacy(false)} />}
        {lightbox && (
          <Lightbox
            src={lightbox.imgs[lightbox.i]} alt="Project photo"
            onClose={()=>setLightbox(null)}
            onPrev={()=>setLightbox(l=>l?{...l,i:(l.i-1+l.imgs.length)%l.imgs.length}:null)}
            onNext={()=>setLightbox(l=>l?{...l,i:(l.i+1)%l.imgs.length}:null)}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'fixed', top: '1rem', left: '1rem', right: '1rem', zIndex: 1000 }}
      >
        <nav style={{
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.75rem', borderRadius: 4,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,57,79,0.1)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>
          <img src={`${B}Logo-website.webp`} alt="The DesignVerse" style={{ height: 42, width: 'auto', objectFit: 'contain', display: 'block' }} />
          <button
            onClick={() => openForm()}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.25rem',
              background: 'var(--teal, #1E394F)',
              border: 'none', borderRadius: 4,
              fontFamily: FONT, fontSize: '0.78rem', fontWeight: 700,
              color: '#F4F7F2', cursor: 'pointer', letterSpacing: '0.03em',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#142939')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--teal, #1E394F)')}
          >
            <CalendarCheck size={14} />
            Book Your Consultation
          </button>
        </nav>
      </motion.header>

      {/* ══════════════════════════════════════════════════════════════
          HERO  ,   above the fold
      ══════════════════════════════════════════════════════════════ */}
      <section style={{minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',overflow:'hidden',background:'#071016'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url(${B}Images/Expereince-centre.png)`,backgroundSize:'cover',backgroundPosition:'center',opacity:0.35}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(4,12,20,0.92) 0%,rgba(14,30,42,0.75) 60%,rgba(4,12,20,0.88) 100%)'}}/>

        <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:1120,margin:'0 auto',padding:'7rem 1.5rem 4rem'}}>
          {/* Guarantee badge */}
          <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',
              background:'rgba(206,212,129,0.12)',border:'1px solid rgba(206,212,129,0.35)',
              borderRadius:999,padding:'0.45rem 1rem',marginBottom:'1.5rem',cursor:'default',
            }}
          >
            <Shield size={13} color="#CED481" strokeWidth={2}/>
            <span style={{fontFamily:FONT,fontSize:'0.72rem',fontWeight:700,color:'#CED481',letterSpacing:'0.1em',textTransform:'uppercase'}}>
              Hyderabad's Only 45-Day Guarantee Studio
            </span>
          </motion.div>

          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{fontFamily:FONT,fontSize:'clamp(2.4rem,6vw,4.2rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.05,marginBottom:'0.75rem',maxWidth:760}}
          >
            Get Your Dream Interiors{' '}
            <span style={{color:'#CED481',fontStyle:'italic',fontWeight:800}}>Done in 45 Days.</span>
          </motion.h1>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
            style={{fontFamily:FONT,fontSize:'clamp(1.1rem,2.5vw,1.5rem)',fontWeight:700,color:'rgba(244,247,242,0.9)',marginBottom:'0.35rem'}}
          >
            If Not ,  We Pay Your Rent.*
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.45}}
            style={{fontFamily:FONT,fontSize:'0.72rem',color:'rgba(244,247,242,0.35)',marginBottom:'2rem',letterSpacing:'0.04em'}}
          >
            *Terms & conditions apply
          </motion.div>

          <motion.div
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.5}}
            style={{fontFamily:FONT,fontSize:'1rem',fontWeight:300,color:'rgba(244,247,242,0.65)',lineHeight:1.75,marginBottom:'2.5rem',maxWidth:540}}
          >
            <ul style={{margin:0, paddingLeft:'1.2rem'}}>
              <li>Over <strong>4,000 homes</strong> have been transformed across Hyderabad.</li>
              <li>All modular work is covered by a <strong>10‑year warranty</strong> *.</li>
              <li>We use only premium brands – Hettich, Blum and Greenply.</li>
              <li>There is a single <strong>Experience Centre</strong> for you to visit.</li>
              <li><strong>One phone call</strong> is all that’s needed to start your project.</li>
            </ul>
          </motion.div>

          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
            style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'3rem'}}
          >
            <button onClick={()=>openForm()} style={{
              display:'inline-flex',alignItems:'center',gap:'0.5rem',
              padding:'1rem 2rem',background:'#CED481',border:'none',borderRadius:6,
              fontFamily:FONT,fontSize:'0.9rem',fontWeight:800,color:'#071016',cursor:'pointer',
              boxShadow:'0 8px 32px rgba(206,212,129,0.35)',letterSpacing:'0.03em',
              transition:'transform 0.15s,box-shadow 0.15s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(206,212,129,0.45)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 32px rgba(206,212,129,0.35)'}}
            >
              <CalendarCheck size={16}/> Book Free Consultation
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.75}}
            className="lp-trust-badges"
            style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}
          >
            {[
              {icon:<Shield size={13} color="#CED481"/>, text:'10-Year Warranty*'},
              {icon:<Clock size={13} color="#CED481"/>, text:'45-Day Delivery'},
              {icon:<Star size={13} color="#CED481"/>, text:'4,000+ Homes'},
              {icon:<Award size={13} color="#CED481"/>, text:'11,500 sq ft Showroom'},
              {icon:<CheckCircle size={13} color="#25D366"/>, text:'Free 3D Design'},
            ].map(b=>(
              <div key={b.text} style={{display:'flex',alignItems:'center',gap:'0.4rem',background:'rgba(244,247,242,0.06)',border:'1px solid rgba(244,247,242,0.1)',borderRadius:999,padding:'0.35rem 0.85rem'}}>
                {b.icon}
                <span style={{fontFamily:FONT,fontSize:'0.72rem',fontWeight:500,color:'rgba(244,247,242,0.75)'}}>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VENDOR TRUST STRIP ,  auto-sliding marquee
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#0a1620',padding:'0',borderTop:'1px solid rgba(206,212,129,0.08)',borderBottom:'1px solid rgba(206,212,129,0.08)'}}>
        <div style={{display:'flex',alignItems:'stretch'}}>
          {/* Static label */}
          <div style={{flexShrink:0,padding:'1.1rem 1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRight:'1px solid rgba(206,212,129,0.1)'}}>
            <span style={{fontFamily:FONT,fontSize:'0.52rem',fontWeight:700,color:'rgba(206,212,129,0.55)',letterSpacing:'0.2em',textTransform:'uppercase',whiteSpace:'nowrap',display:'block',textAlign:'center',lineHeight:1.5}}>
              BRANDS<br/>WE USE
            </span>
          </div>
          {/* Marquee */}
          <div style={{flex:1,overflow:'hidden',maskImage:'linear-gradient(to right,transparent,black 6%,black 94%,transparent)',WebkitMaskImage:'linear-gradient(to right,transparent,black 6%,black 94%,transparent)'}}>
            <div className="lp-marquee-track" style={{display:'flex',alignItems:'center',gap:'0',animation:'lp-marquee 28s linear infinite',width:'max-content',padding:'1rem 0'}}>
              {[...vendors,...vendors].map((v,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'0.55rem',flexShrink:0,padding:'0 2rem'}}>
                  <img src={v.logo} alt={v.name} style={{height:22,width:'auto',objectFit:'contain',display:'block',maxWidth:72,filter:'brightness(2) saturate(0.5) contrast(0.9)',opacity:0.75}}/>
                  <span style={{fontFamily:FONT,fontSize:'0.72rem',fontWeight:600,color:'rgba(244,247,242,0.55)',whiteSpace:'nowrap',letterSpacing:'0.03em'}}>{v.name}</span>
                  <span style={{marginLeft:'2rem',color:'rgba(206,212,129,0.2)',fontSize:'0.55rem',flexShrink:0}}>◆</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          USP CARDS  ,   ~30% mark
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#0f1e29',padding:'5rem 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>
              Why 4,000 Hyderabad Families Chose Us
            </div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.7rem,3.5vw,2.6rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.1,margin:0}}>
              The DesignVerse Difference
            </h2>
          </div>

          <div className="lp-usp-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
            {[
              { icon:<Clock size={24} color="#CED481" strokeWidth={1.5}/>, title:'45 Days or We Pay Rent', body:'Industry-first guarantee. Your project delivered in 45 days or we pay your rent for every extra day.', badge:'Unique to us', tc:true },
              { icon:<Shield size={24} color="#7ECAC3" strokeWidth={1.5}/>, title:'10-Year Warranty*', body:'All modular work ,  kitchens, wardrobes, storage ,  covered for a full decade against defects and failure.' , badge:'In writing'},
              { icon:<Zap size={24} color="#E8A87C" strokeWidth={1.5}/>,   title:'Free 3D Walkthrough', body:'See every room, every material, every finish in immersive 3D before you approve a single item.' , badge:'No cost'},
              { icon:<Star size={24} color="#CED481" strokeWidth={1.5}/>,  title:'10,000+ Material Samples', body:'Touch and compare every finish at our 11,500 sq ft Experience Centre. No catalogue guessing.', badge:'In-person'},
            ].map((c,i)=>(
              <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09}}
                style={{background:'rgba(244,247,242,0.03)',border:'1px solid rgba(244,247,242,0.07)',borderRadius:10,padding:'1.75rem',position:'relative',overflow:'hidden'}}
              >
                <div style={{position:'absolute',top:'1rem',right:'1rem',background:'rgba(206,212,129,0.1)',border:'1px solid rgba(206,212,129,0.2)',borderRadius:999,padding:'0.2rem 0.6rem',fontFamily:FONT,fontSize:'0.6rem',fontWeight:700,color:'#CED481',letterSpacing:'0.1em',textTransform:'uppercase'}}>
                  {c.badge}
                </div>
                <div style={{marginBottom:'1rem'}}>{c.icon}</div>
                <div style={{fontFamily:FONT,fontSize:'1rem',fontWeight:700,color:'#F4F7F2',marginBottom:'0.6rem'}}>{c.title}</div>
                <div style={{fontFamily:FONT,fontSize:'0.8rem',fontWeight:300,color:'rgba(244,247,242,0.5)',lineHeight:1.65}}>{c.body}</div>
                {c.tc && <div style={{fontFamily:FONT,fontSize:'0.62rem',color:'rgba(244,247,242,0.25)',marginTop:'0.75rem'}}>*T&C apply</div>}
              </motion.div>
            ))}
          </div>

          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <button onClick={()=>openForm()} style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.9rem 2.5rem',background:'#CED481',border:'none',borderRadius:6,fontFamily:FONT,fontSize:'0.82rem',fontWeight:800,color:'#071016',cursor:'pointer',letterSpacing:'0.05em'}}>
              <CalendarCheck size={15}/> Get My Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRICE ESTIMATOR  ,   full room-based calculator
      ══════════════════════════════════════════════════════════════ */}
      <section ref={estimatorRef} id="estimate-calc" style={{background:'#071016',padding:'5rem 0',fontFamily:FONT}}>
        <div style={{maxWidth:1020,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>Instant Price Estimate</div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.1,margin:'0 0 0.75rem'}}>What Will Your Interiors Cost?</h2>
            <p style={{fontFamily:FONT,fontSize:'0.88rem',color:'rgba(244,247,242,0.45)',margin:'0 0 0.5rem'}}>Select each room, add the units you want designed, enter dimensions ,  get an instant estimate.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.5 }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#CED481', letterSpacing: '0.08em' }}>MATERIAL GUARANTEE:</span>
              <span style={{ fontSize: '0.6rem', color: '#F4F7F2', fontWeight: 300 }}>Built with 100% Century Brand Plywood</span>
            </div>
          </div>

          {/* Finish selector */}
          <div style={{marginBottom:'2.5rem'}}>
            <p style={{textAlign:'center',fontSize:'0.58rem',fontWeight:600,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(244,247,242,0.3)',marginBottom:'1rem'}}>Select Finish</p>
            <div style={{display:'flex',justifyContent:'center',gap:'0.875rem',flexWrap:'wrap'}}>
              {FINISHES.map(f=>{
                const active = calcFinish===f.key
                return (
                  <button key={f.key} onClick={()=>setCalcFinish(f.key as FinishKey)} style={{
                    display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.8rem 1.4rem',
                    background: active?'rgba(206,212,129,0.08)':'rgba(244,247,242,0.03)',
                    border: active?'1px solid rgba(206,212,129,0.4)':'1px solid rgba(244,247,242,0.1)',
                    borderRadius:6,cursor:'pointer',fontFamily:FONT,minWidth:170,position:'relative',transition:'all 0.22s',
                  }}>
                    <div style={{width:28,height:28,borderRadius:'50%',flexShrink:0,background:f.color,border: active?'2px solid #CED481':'2px solid rgba(244,247,242,0.2)',transition:'all 0.22s'}}/>
                    <div style={{textAlign:'left'}}>
                      <div style={{fontSize:'0.8rem',fontWeight:active?600:400,color:active?'#CED481':'rgba(244,247,242,0.6)',letterSpacing:'0.04em'}}>{f.label}</div>
                      <div style={{fontSize:'0.6rem',color:'rgba(244,247,242,0.3)',letterSpacing:'0.05em',marginTop:'0.1rem'}}>{f.subtitle}</div>
                    </div>
                    {active&&<motion.div layoutId="lp-finish-line" style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(to right,transparent,#CED481,transparent)',borderRadius:'0 0 6px 6px'}} transition={{duration:0.25}}/>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Room cards */}
          <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'1.5rem'}}>
            <AnimatePresence initial={false}>
              {rooms.map(room=>{
                const presets=UNIT_PRESETS[room.typeKey]??[]
                return (
                  <motion.div key={room.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8,height:0}} transition={{duration:0.3,ease:[0.22,1,0.36,1]}}
                    style={{background:'rgba(244,247,242,0.04)',border:'1px solid rgba(244,247,242,0.1)',borderRadius:8,overflow:'hidden'}}
                  >
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 1.25rem',cursor:'pointer',borderBottom:room.collapsed?'none':'1px solid rgba(244,247,242,0.07)'}} onClick={()=>toggleCollapse(room.id)}>
                      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                        <div style={{width:3,height:18,background:'#CED481',borderRadius:2,flexShrink:0}}/>
                        <span style={{fontSize:'0.82rem',fontWeight:600,color:'#F4F7F2',letterSpacing:'0.04em'}}>{room.label}</span>
                        <span style={{fontSize:'0.68rem',color:'rgba(244,247,242,0.3)'}}>{room.walls.length} unit{room.walls.length!==1?'s':''}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                        <div style={{display:'flex',gap:'0.25rem'}}>
                          {room.collapsed?<ChevronDown size={15} color="rgba(244,247,242,0.35)"/>:<ChevronUp size={15} color="rgba(244,247,242,0.35)"/>}
                          <button onClick={e=>{e.stopPropagation();removeRoom(room.id)}} style={{background:'none',border:'none',cursor:'pointer',padding:'0 0.15rem',lineHeight:1}}>
                            <Trash2 size={14} color="rgba(255,80,80,0.5)"/>
                          </button>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {!room.collapsed&&(
                        <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.28,ease:'easeInOut'}} style={{overflow:'hidden'}}>
                          <div style={{padding:'1rem 1.25rem 1.25rem'}}>
                            <div className="lp-wall-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:'0.5rem',marginBottom:'0.5rem',alignItems:'center'}}>
                              {['Unit / Wall','Width (ft)','Height (ft)','Loft',''].map((h,i)=>(
                                <span key={i} style={{fontSize:'0.56rem',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(244,247,242,0.3)'}}>{h}</span>
                              ))}
                            </div>
                            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                              {room.walls.map(wall=>{
                                return (
                                  <div key={wall.id} className="lp-wall-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:'0.5rem',alignItems:'center'}}>
                                    <div style={{ position: 'relative' }}>
                                      <select value={wall.name} onChange={e=>updateWall(room.id,wall.id,{name:e.target.value})} style={{...calcInp,appearance:'none',WebkitAppearance:'none',cursor:'pointer'}}>
                                        <option value="" disabled style={{background:'#0f1e29'}}>Select unit</option>
                                        {presets.map(p=><option key={p} value={p} style={{background:'#0f1e29'}}>{p}</option>)}
                                        <option value="Custom" style={{background:'#0f1e29'}}>Custom</option>
                                      </select>
                                      {wall.name === 'False Ceiling (sft)' && (
                                        <div style={{ fontSize: '0.55rem', color: '#CED481', marginTop: '0.2rem', fontWeight: 500, lineHeight: 1.2 }}>
                                          (Lights & wiring as per actuals)
                                        </div>
                                      )}
                                    </div>
                                    <input type="number" min="0" placeholder="0" value={wall.width} onChange={e=>updateWall(room.id,wall.id,{width:e.target.value})} style={calcInp} onFocus={e=>(e.target.style.borderColor='rgba(206,212,129,0.5)')} onBlur={e=>(e.target.style.borderColor='rgba(244,247,242,0.12)')}/>
                                    <input type="number" min="0" placeholder="0" value={wall.height} onChange={e=>updateWall(room.id,wall.id,{height:e.target.value})} style={calcInp} onFocus={e=>(e.target.style.borderColor='rgba(206,212,129,0.5)')} onBlur={e=>(e.target.style.borderColor='rgba(244,247,242,0.12)')}/>
                                    <div style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                                      {wall.name==='TV Unit' || wall.name==='False Ceiling (sft)' ? <span style={{fontSize:'0.62rem',color:'rgba(244,247,242,0.2)'}}>N/A</span>:(
                                        <>
                                          <button onClick={()=>updateWall(room.id,wall.id,{loft:!wall.loft})} style={{width:36,height:20,borderRadius:10,flexShrink:0,background:wall.loft?'#6b700a':'rgba(244,247,242,0.1)',border:'none',cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
                                            <span style={{position:'absolute',top:3,width:14,height:14,borderRadius:'50%',background:wall.loft?'#fff':'rgba(244,247,242,0.4)',left:wall.loft?19:3,transition:'left 0.2s,background 0.2s'}}/>
                                          </button>
                                          {wall.loft&&<input type="number" min="0" placeholder="2" value={wall.loftHeight} onChange={e=>updateWall(room.id,wall.id,{loftHeight:e.target.value})} style={{...calcInp,width:52,padding:'0.55rem 0.4rem'}}/>}
                                        </>
                                      )}
                                    </div>
                                    <button onClick={()=>room.walls.length>1?removeWall(room.id,wall.id):undefined} style={{background:'none',border:'none',cursor:room.walls.length>1?'pointer':'default',padding:'0.2rem',opacity:room.walls.length>1?1:0.2}}>
                                      <Trash2 size={13} color="rgba(255,100,100,0.5)"/>
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                            <button onClick={()=>addWall(room.id)} style={{display:'flex',alignItems:'center',gap:'0.4rem',marginTop:'0.875rem',background:'none',border:'1px dashed rgba(206,212,129,0.2)',borderRadius:4,color:'rgba(206,212,129,0.5)',fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.1em',padding:'0.5rem 1rem',cursor:'pointer',fontFamily:FONT,transition:'all 0.2s'}} onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(206,212,129,0.5)';e.currentTarget.style.color='#CED481'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(206,212,129,0.2)';e.currentTarget.style.color='rgba(206,212,129,0.5)'}}>
                              <Plus size={12}/> Add Unit
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Add room */}
          <div style={{marginBottom:'2.5rem'}}>
            <AnimatePresence mode="wait">
              {!addingRoom?(
                <motion.button key="add-btn" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setAddingRoom(true)}
                  style={{display:'flex',alignItems:'center',gap:'0.6rem',width:'100%',justifyContent:'center',padding:'1rem',background:'transparent',border:'1px dashed rgba(244,247,242,0.12)',borderRadius:8,color:'rgba(244,247,242,0.35)',fontSize:'0.75rem',fontWeight:500,letterSpacing:'0.1em',cursor:'pointer',fontFamily:FONT,transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(206,212,129,0.35)';e.currentTarget.style.color='#CED481'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(244,247,242,0.12)';e.currentTarget.style.color='rgba(244,247,242,0.35)'}}
                ><Plus size={15}/> Add Room</motion.button>
              ):(
                <motion.div key="room-picker" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:0.25}}
                  style={{background:'rgba(244,247,242,0.04)',border:'1px solid rgba(244,247,242,0.1)',borderRadius:8,padding:'1.25rem'}}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.875rem'}}>
                    <span style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(244,247,242,0.3)'}}>Select a Room</span>
                    <button onClick={()=>setAddingRoom(false)} style={{background:'none',border:'none',color:'rgba(244,247,242,0.3)',cursor:'pointer',fontSize:'1.1rem',lineHeight:1,padding:0}}>×</button>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'0.5rem'}}>
                    {ROOM_TYPES.map(rt=>{
                      const already=rooms.filter(r=>r.typeKey===rt.key).length
                      const label=already>0?`${rt.label} ${already+1}`:rt.label
                      return (
                        <button key={rt.key} onClick={()=>addRoom(rt.key,label)} style={{padding:'0.65rem 0.9rem',background:'rgba(244,247,242,0.03)',border:'1px solid rgba(244,247,242,0.08)',borderRadius:5,color:'rgba(244,247,242,0.6)',fontSize:'0.75rem',fontWeight:400,cursor:'pointer',fontFamily:FONT,textAlign:'left',transition:'all 0.18s'}} onMouseEnter={e=>{e.currentTarget.style.background='rgba(206,212,129,0.08)';e.currentTarget.style.borderColor='rgba(206,212,129,0.3)';e.currentTarget.style.color='#CED481'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(244,247,242,0.03)';e.currentTarget.style.borderColor='rgba(244,247,242,0.08)';e.currentTarget.style.color='rgba(244,247,242,0.6)'}}>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Total result ,  blurred until form submitted */}
          <AnimatePresence mode="wait">
            {hasEstimate?(
              <motion.div key="result" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
                style={{background:'linear-gradient(135deg,#0f1e29 0%,#0a1520 100%)',border:'1px solid rgba(206,212,129,0.15)',borderRadius:10,padding:'clamp(1.5rem,3vw,2.25rem) clamp(1.5rem,4vw,2.75rem)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem',position:'relative',overflow:'hidden'}}
              >
                <div style={{position:'absolute',top:-80,right:-80,width:220,height:220,borderRadius:'50%',background:'radial-gradient(circle,rgba(206,212,129,0.08) 0%,transparent 70%)',pointerEvents:'none'}}/>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.65rem'}}>
                    <div style={{width:14,height:1,background:'#CED481',opacity:0.7}}/>
                    <span style={{fontSize:'0.56rem',fontWeight:700,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(206,212,129,0.8)'}}>Estimated Interior Cost</span>
                  </div>
                  <div style={{fontSize:'clamp(2.2rem,5vw,3.2rem)',fontWeight:200,color:'#fff',letterSpacing:'-0.03em',lineHeight:1,filter:'blur(14px)',userSelect:'none',marginBottom:'0.4rem'}}>
                    ₹{totalCost.toLocaleString('en-IN')}
                  </div>
                  <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.35)',marginTop:'0.4rem'}}>{selFinish.label} finish · {rooms.length} room{rooms.length!==1?'s':''}</div>
                  <div style={{marginTop:'0.75rem',display:'inline-flex',alignItems:'center',gap:'0.4rem',background:'rgba(206,212,129,0.08)',border:'1px solid rgba(206,212,129,0.2)',borderRadius:5,padding:'0.3rem 0.75rem'}}>
                    <span style={{fontSize:'0.65rem',color:'rgba(206,212,129,0.7)',fontWeight:600}}>🔒 Submit your details to unlock the full estimate</span>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.65rem',minWidth:200}}>
                  <button onClick={()=>openForm(true)} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',padding:'0.95rem 1.75rem',background:'#CED481',border:'none',borderRadius:5,fontFamily:FONT,fontSize:'0.78rem',fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:'#060d15',cursor:'pointer',boxShadow:'0 4px 20px rgba(206,212,129,0.25)'}}>
                    <Zap size={14}/> Unlock My Estimate
                  </button>
                  <button onClick={()=>{setRooms([]);setAddingRoom(false)}} style={{display:'block',textAlign:'center',padding:'0.65rem 1.75rem',background:'transparent',color:'rgba(255,255,255,0.3)',fontSize:'0.65rem',fontWeight:400,letterSpacing:'0.1em',border:'1px solid rgba(255,255,255,0.1)',borderRadius:4,cursor:'pointer',fontFamily:FONT,transition:'color 0.2s,border-color 0.2s'}} onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.6)';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}} onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
                    Start Over
                  </button>
                </div>
                {rooms.some(r => r.walls.some(w => w.name === 'False Ceiling (sft)')) && (
                  <div style={{ position: 'absolute', bottom: '0.5rem', left: '1.5rem', right: '1.5rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                    * False Ceiling costs are for standard gypsum ceiling. Electrical wiring and lighting fixtures will be charged as per actuals.
                  </div>
                )}
              </motion.div>
            ):(
              <motion.div key="placeholder" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{border:'1px dashed rgba(244,247,242,0.08)',borderRadius:10,padding:'2.25rem',textAlign:'center'}}>
                <p style={{color:'rgba(244,247,242,0.25)',fontSize:'0.78rem',letterSpacing:'0.08em',margin:0}}>Add rooms and enter dimensions above to see your estimate</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <style>{`
          #estimate-calc input[type=number]::-webkit-inner-spin-button,
          #estimate-calc input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
          #estimate-calc input[type=number]{-moz-appearance:textfield}
          @media(max-width:700px){.lp-wall-grid{grid-template-columns:1fr 1fr!important}}
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          REAL PROJECTS GALLERY
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#0a1620',padding:'5rem 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>Real Projects · Real Homes</div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.7rem,3.5vw,2.6rem)',fontWeight:800,color:'#F4F7F2',margin:'0 0 0.5rem'}}>4,000+ Projects Delivered</h2>
            <p style={{fontFamily:FONT,fontSize:'0.88rem',color:'rgba(244,247,242,0.4)',margin:0}}>Click any photo to enlarge</p>
          </div>

          {projects.map((proj, pi) => (
            <motion.div key={pi} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:pi*0.1}} style={{marginBottom:'3rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1rem'}}>
                <div>
                  <div style={{fontFamily:FONT,fontSize:'1rem',fontWeight:700,color:'#F4F7F2'}}>{proj.client}</div>
                  <div style={{fontFamily:FONT,fontSize:'0.75rem',color:'rgba(244,247,242,0.4)',marginTop:2}}>{proj.type}</div>
                </div>
                <div style={{flex:1,height:1,background:'rgba(244,247,242,0.07)'}}/>
                <div style={{fontFamily:FONT,fontSize:'0.7rem',color:'rgba(206,212,129,0.5)',fontWeight:600}}>Hyderabad</div>
              </div>
              <ProjectGallery proj={proj} allImgs={allImgs} onPhotoClick={(idx) => setLightbox({imgs:allImgs,i:idx})} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROCESS ,  45-Day Timeline
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#071016',padding:'5rem 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>How It Works</div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.7rem,3.5vw,2.6rem)',fontWeight:800,color:'#F4F7F2',margin:'0 0 0.5rem'}}>From Call to Keys ,  in 45 Days</h2>
            <p style={{fontFamily:FONT,fontSize:'0.88rem',color:'rgba(244,247,242,0.4)',margin:0}}>Our factory-first model eliminates the delays of traditional site carpentry</p>
          </div>
          <div className="lp-process-grid" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',position:'relative'}}>
            <div style={{position:'absolute',top:32,left:'10%',right:'10%',height:1,background:'linear-gradient(to right,transparent,rgba(206,212,129,0.25),transparent)'}} className="lp-proc-line"/>
            {process.map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{textAlign:'center',padding:'0 1rem',position:'relative'}}
              >
                <div style={{width:64,height:64,borderRadius:'50%',background:i===4?'rgba(206,212,129,0.15)':'rgba(244,247,242,0.04)',border:i===4?'2px solid #CED481':'1px solid rgba(244,247,242,0.1)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',position:'relative',zIndex:1}}>
                  <div style={{fontFamily:FONT,fontSize:'0.6rem',fontWeight:700,color:i===4?'#CED481':'rgba(244,247,242,0.4)',letterSpacing:'0.08em'}}>{s.day}</div>
                </div>
                <div style={{fontFamily:FONT,fontSize:'0.88rem',fontWeight:700,color: i===4?'#CED481':'#F4F7F2',marginBottom:'0.5rem'}}>{s.title}</div>
                <div style={{fontFamily:FONT,fontSize:'0.75rem',fontWeight:300,color:'rgba(244,247,242,0.4)',lineHeight:1.6}}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'3rem'}}>
            <button onClick={()=>openForm()} style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'1rem 2.5rem',background:'#CED481',border:'none',borderRadius:6,fontFamily:FONT,fontSize:'0.85rem',fontWeight:800,color:'#071016',cursor:'pointer'}}>
              <CalendarCheck size={15}/> Start My 45-Day Journey
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VENDORS SHOWCASE
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#0f1e29',padding:'5rem 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>Premium Brands Only</div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.7rem,3.5vw,2.4rem)',fontWeight:800,color:'#F4F7F2',margin:'0 0 0.5rem'}}>No Shortcuts. No Substitutions.</h2>
            <p style={{fontFamily:FONT,fontSize:'0.88rem',color:'rgba(244,247,242,0.4)',margin:0,maxWidth:520,marginLeft:'auto',marginRight:'auto'}}>
              Every project uses hardware and materials from brands you can independently verify. We don't downgrade without your written approval.
            </p>
          </div>
          <div className="lp-vendor-grid" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1px',background:'rgba(244,247,242,0.06)',borderRadius:10,overflow:'hidden',border:'1px solid rgba(244,247,242,0.06)'}}>
            {vendors.map(v=>(
              <div key={v.name} style={{background:'rgba(10,22,32,0.95)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.75rem 1rem',gap:'0.75rem'}}>
                <img src={v.logo} alt={v.name} style={{height:36,width:'auto',objectFit:'contain',filter:'grayscale(0.4) brightness(1.2)',maxWidth:100}}/>
                <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:600,color:'rgba(244,247,242,0.4)',letterSpacing:'0.06em'}}>{v.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GUARANTEE BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'linear-gradient(135deg,#1a3347 0%,#0a1620 100%)',padding:'4rem 0',borderTop:'1px solid rgba(206,212,129,0.12)',borderBottom:'1px solid rgba(206,212,129,0.12)'}}>
        <div style={{maxWidth:860,margin:'0 auto',padding:'0 1.5rem',textAlign:'center'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(206,212,129,0.1)',border:'2px solid rgba(206,212,129,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.5rem'}}>
            <Shield size={30} color="#CED481" strokeWidth={1.5}/>
          </div>
          <h2 style={{fontFamily:FONT,fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.1,marginBottom:'0.75rem'}}>
            45 Days or <span style={{color:'#CED481'}}>We Pay Your Rent.</span>
          </h2>
          <p style={{fontFamily:FONT,fontSize:'1rem',color:'rgba(244,247,242,0.6)',lineHeight:1.75,marginBottom:'0.5rem',maxWidth:580,margin:'0 auto 0.5rem'}}>
            This is our guarantee ,  in writing, in the contract. If your project isn't completed within 45 days of the agreed start date, we pay your rent for every extra day.
          </p>
          <p style={{fontFamily:FONT,fontSize:'0.72rem',color:'rgba(244,247,242,0.25)',marginBottom:'2rem'}}>*Terms & conditions apply. Valid for standard residential modular projects.</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'2rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
            {[['10 Years','Product Warranty'],['45 Days','Or We Pay Rent'],['4,000+','Homes Delivered'],['100%','Free Consultation']].map(([v,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontFamily:FONT,fontSize:'1.8rem',fontWeight:800,color:'#CED481',lineHeight:1}}>{v}</div>
                <div style={{fontFamily:FONT,fontSize:'0.7rem',color:'rgba(244,247,242,0.4)',marginTop:4,letterSpacing:'0.06em'}}>{l}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>openForm()} style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'1rem 2.5rem',background:'#CED481',border:'none',borderRadius:6,fontFamily:FONT,fontSize:'0.88rem',fontWeight:800,color:'#071016',cursor:'pointer',letterSpacing:'0.03em',boxShadow:'0 8px 32px rgba(206,212,129,0.3)'}}>
            <CalendarCheck size={16}/> Claim Your Free Consultation
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'#071016',padding:'5rem 0'}}>
        <div style={{maxWidth:760,margin:'0 auto',padding:'0 1.5rem'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontFamily:FONT,fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>Questions Answered</div>
            <h2 style={{fontFamily:FONT,fontSize:'clamp(1.7rem,3.5vw,2.4rem)',fontWeight:800,color:'#F4F7F2',margin:0}}>Everything You Need to Know</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {faqs.map((f,i)=>(
              <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
                style={{background:'rgba(244,247,242,0.03)',border:'1px solid rgba(244,247,242,0.07)',borderRadius:8,overflow:'hidden'}}
              >
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{
                  width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',
                  padding:'1.25rem 1.5rem',background:'none',border:'none',cursor:'pointer',textAlign:'left',
                }}>
                  <span style={{fontFamily:FONT,fontSize:'0.92rem',fontWeight:600,color:'#F4F7F2',lineHeight:1.4,paddingRight:'1rem'}}>{f.q}</span>
                  <ChevronDown size={16} color="#CED481" style={{flexShrink:0,transition:'transform 0.2s',transform:openFaq===i?'rotate(180deg)':'rotate(0)'}}/>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.22}}>
                      <div style={{padding:'0 1.5rem 1.25rem',fontFamily:FONT,fontSize:'0.85rem',fontWeight:300,color:'rgba(244,247,242,0.55)',lineHeight:1.75}}>
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section style={{background:'linear-gradient(135deg,#0f1e29 0%,#071016 100%)',padding:'6rem 0'}}>
        <div style={{maxWidth:700,margin:'0 auto',padding:'0 1.5rem',textAlign:'center'}}>
          <h2 style={{fontFamily:FONT,fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.1,marginBottom:'1rem'}}>
            Ready to Transform Your Space?
          </h2>
          <p style={{fontFamily:FONT,fontSize:'1rem',color:'rgba(244,247,242,0.55)',lineHeight:1.75,marginBottom:'2.5rem'}}>
            Book your free consultation today. Our designer will call you within 1 hour (during business hours) to understand your vision and schedule your 3D walkthrough.
          </p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>openForm()} style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'1.1rem 2.5rem',background:'#CED481',border:'none',borderRadius:6,fontFamily:FONT,fontSize:'0.9rem',fontWeight:800,color:'#071016',cursor:'pointer',boxShadow:'0 8px 32px rgba(206,212,129,0.3)',letterSpacing:'0.03em'}}>
              <CalendarCheck size={16}/> Book Free Consultation
            </button>
            <a href={`tel:+919550156644`} style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'1.1rem 2rem',background:'rgba(244,247,242,0.06)',border:'1px solid rgba(244,247,242,0.15)',borderRadius:6,fontFamily:FONT,fontSize:'0.9rem',fontWeight:600,color:'#F4F7F2',textDecoration:'none'}}>
              <Phone size={16}/> +91 95501 56644
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer style={{background:'#040a10',borderTop:'1px solid rgba(244,247,242,0.06)',padding:'2rem 1.5rem'}}>
        <div style={{maxWidth:1120,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontFamily:FONT,fontSize:'0.75rem',color:'rgba(244,247,242,0.25)'}}>
            © 2026 The DesignVerse · Jubilee Hills, Hyderabad · info@thedesignverse.co.in
          </div>
          <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
            <button onClick={()=>setPrivacy(true)} style={{background:'none',border:'none',cursor:'pointer',fontFamily:FONT,fontSize:'0.75rem',color:'rgba(244,247,242,0.35)',textDecoration:'underline'}}>Privacy Policy</button>
            <span style={{fontFamily:FONT,fontSize:'0.72rem',color:'rgba(244,247,242,0.2)'}}>*45-Day Guarantee & Warranty subject to T&C. Ask your consultant for full terms.</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════
          FLOATING ELEMENTS
      ══════════════════════════════════════════════════════════════ */}

      {/* Sticky CTA ,  bottom center on mobile */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.5}}
        className="lp-sticky-bar"
        style={{position:'fixed',bottom:0,left:0,right:0,zIndex:8000,background:'rgba(7,16,22,0.97)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(206,212,129,0.15)',padding:'0.85rem 1.5rem',display:'none',alignItems:'center',justifyContent:'space-between',gap:'0.75rem'}}
      >
        <div style={{fontFamily:FONT,fontSize:'0.82rem',fontWeight:600,color:'#F4F7F2',flexShrink:0}}>
          Free Consultation · <span style={{color:'#CED481'}}>45 Day Guarantee</span>
        </div>
        <button onClick={()=>openForm()} style={{flexShrink:0,padding:'0.7rem 1.5rem',background:'#CED481',border:'none',borderRadius:5,fontFamily:FONT,fontSize:'0.8rem',fontWeight:800,color:'#071016',cursor:'pointer',whiteSpace:'nowrap'}}>
          Book Now →
        </button>
      </motion.div>

      {/* WhatsApp float */}
      <motion.a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} transition={{delay:1.8,type:'spring',stiffness:260,damping:18}}
        whileHover={{scale:1.1}} whileTap={{scale:0.95}}
        className="lp-wa-float"
        style={{position:'fixed',bottom:'5.25rem',right:'1.25rem',zIndex:8500,width:52,height:52,borderRadius:'50%',background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(37,211,102,0.45)',textDecoration:'none',cursor:'pointer'}}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.a>

      {/* Phone call float */}
      <motion.a href="tel:+919550156644" aria-label="Call us"
        initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} transition={{delay:2,type:'spring',stiffness:260,damping:18}}
        whileHover={{scale:1.1}} whileTap={{scale:0.95}}
        className="lp-phone-float"
        style={{position:'fixed',bottom:'1.25rem',right:'1.25rem',zIndex:8500,width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,#1E394F,#142939)',border:'1px solid rgba(206,212,129,0.35)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(0,0,0,0.4)',textDecoration:'none',cursor:'pointer'}}
      >
        <Phone size={22} color="#CED481" strokeWidth={2}/>
      </motion.a>

      {/* ── Styles ── */}
      <style>{`
        @keyframes lpspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes lp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .lp-marquee-track:hover { animation-play-state: paused }
        @media(max-width:1024px) {
          .lp-usp-grid { grid-template-columns: repeat(2,1fr) !important; }
          .lp-process-grid { grid-template-columns: 1fr !important; gap:1.25rem !important; }
          .lp-proc-line { display:none !important; }
          .lp-vendor-grid { grid-template-columns: repeat(5,1fr) !important; }
        }
        @media(max-width:768px) {
          .lp-prop-grid { grid-template-columns: repeat(3,1fr) !important; }
          .lp-proj-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            scroll-behavior: smooth !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 10px !important;
            padding: 6px 4px !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .lp-proj-grid::-webkit-scrollbar {
            display: none !important;
          }
          .lp-proj-grid > button {
            flex: 0 0 82% !important;
            width: 82% !important;
            aspect-ratio: 4/3 !important;
            scroll-snap-align: start !important;
            border-radius: 6px !important;
            overflow: hidden !important;
          }
          .lp-proj-arrow {
            display: flex !important;
          }
          .lp-vendor-grid { grid-template-columns: repeat(3,1fr) !important; }
          .lp-sticky-bar { display:flex !important; }
          .lp-form-row { grid-template-columns: 1fr !important; }
          .lp-popup-modal {
            top: auto !important;
            bottom: 1.5rem !important;
            left: 1.5rem !important;
            right: 1.5rem !important;
            max-width: none !important;
            width: auto !important;
            transform: none !important;
          }
          .lp-wa-float   { bottom: 5.25rem !important; }
          .lp-phone-float{ display: none !important; }
        }
        @media(max-width:480px) {
          .lp-usp-grid { grid-template-columns: 1fr !important; }
          .lp-prop-grid { grid-template-columns: repeat(2,1fr) !important; }
          .lp-vendor-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
