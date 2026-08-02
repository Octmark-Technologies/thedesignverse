import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Phone, CalendarCheck, ArrowRight, Tag, Sparkles } from 'lucide-react'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
const WA   = 'https://wa.me/919550156644?text=Hi%2C%20I%20just%20submitted%20a%20consultation%20request%20on%20your%20website.'
const B    = import.meta.env.BASE_URL

function fmt(n: number) { return '₹' + n.toLocaleString('en-IN') }

export default function ThankYouPage() {
  useEffect(() => { window.scrollTo(0,0) }, [])

  const params   = new URLSearchParams(window.location.search)
  const total    = parseInt(params.get('total') || '0', 10)
  const finish   = params.get('finish') || ''
  const roomsN   = parseInt(params.get('rooms') || '0', 10)
  const hasEst   = total > 0

  const [discounted, setDiscounted] = useState(false)
  const [couponUsed, setCouponUsed] = useState(false)

  const displayPrice = discounted ? Math.round(total * 0.8) : total

  const applyDiscount = () => {
    setDiscounted(true)
    setCouponUsed(true)
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#071016 0%,#0f1e29 50%,#071016 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'3rem 1.5rem',fontFamily:FONT}}>

      {/* Logo */}
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        style={{marginBottom:'2.5rem'}}
      >
        <img src={`${B}Logo-website.webp`} alt="The DesignVerse" style={{height:48,width:'auto',objectFit:'contain'}}/>
      </motion.div>

      {/* Card */}
      <motion.div initial={{opacity:0,y:32,scale:0.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.5,ease:[0.22,1,0.36,1]}}
        style={{
          background:'rgba(244,247,242,0.03)',
          border:'1px solid rgba(206,212,129,0.2)',
          borderRadius:16, padding:'clamp(2rem,5vw,3.5rem)',
          maxWidth:580, width:'100%', textAlign:'center',
          boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Checkmark */}
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3,type:'spring',stiffness:260,damping:18}}
          style={{width:80,height:80,borderRadius:'50%',background:'rgba(206,212,129,0.1)',border:'2px solid rgba(206,212,129,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.75rem'}}
        >
          <CheckCircle size={36} color="#CED481" strokeWidth={1.5}/>
        </motion.div>

        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.45}}>
          <div style={{fontSize:'0.65rem',fontWeight:700,letterSpacing:'0.2em',color:'#CED481',textTransform:'uppercase',marginBottom:'0.75rem'}}>
            You're In ,  Consultation Booked
          </div>
          <h1 style={{fontSize:'clamp(1.8rem,4vw,2.6rem)',fontWeight:800,color:'#F4F7F2',lineHeight:1.1,marginBottom:'1rem'}}>
            We'll Call You Within<br/><span style={{color:'#CED481'}}>1 Hour.</span>
          </h1>
          <p style={{fontSize:'0.92rem',fontWeight:300,color:'rgba(244,247,242,0.55)',lineHeight:1.75,marginBottom: hasEst ? '1.5rem' : '2rem'}}>
            Thank you for reaching out. A senior designer from The DesignVerse will call you shortly to understand your vision and schedule your free 3D walkthrough.
          </p>
        </motion.div>

        {/* Estimate Card */}
        {hasEst && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
            style={{
              background:'linear-gradient(135deg,rgba(206,212,129,0.08) 0%,rgba(126,202,195,0.06) 100%)',
              border:'1px solid rgba(206,212,129,0.25)',
              borderRadius:12,
              padding:'1.75rem',
              marginBottom:'1.5rem',
              textAlign:'center',
            }}
          >
            <div style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.18em',color:'rgba(206,212,129,0.6)',textTransform:'uppercase',marginBottom:'0.5rem'}}>
              Your Estimate
            </div>

            {/* Price display */}
            <div style={{marginBottom:'0.5rem'}}>
              {discounted && (
                <div style={{fontSize:'1rem',color:'rgba(244,247,242,0.35)',textDecoration:'line-through',marginBottom:'0.25rem'}}>
                  {fmt(total)}
                </div>
              )}
              <div style={{fontSize:'clamp(2rem,5vw,2.8rem)',fontWeight:800,color:'#CED481',lineHeight:1}}>
                {fmt(displayPrice)}
              </div>
              {discounted && (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                  style={{display:'inline-flex',alignItems:'center',gap:'0.3rem',marginTop:'0.5rem',padding:'0.25rem 0.75rem',background:'rgba(37,211,102,0.12)',border:'1px solid rgba(37,211,102,0.25)',borderRadius:999,fontSize:'0.68rem',fontWeight:700,color:'#25D366',letterSpacing:'0.06em'}}
                >
                  <Sparkles size={11}/> 20% OFF Applied ,  You Save {fmt(total - displayPrice)}
                </motion.div>
              )}
            </div>

            {finish && (
              <div style={{fontSize:'0.75rem',color:'rgba(244,247,242,0.4)',marginBottom:'0.25rem'}}>
                {finish} Finish · {roomsN} Room{roomsN !== 1 ? 's' : ''}
              </div>
            )}
            <div style={{fontSize:'0.68rem',color:'rgba(244,247,242,0.25)',marginBottom:'1.25rem'}}>
              *Estimate based on provided dimensions. Final quote after site visit.
            </div>

            {/* Coupon button */}
            {!couponUsed ? (
              <motion.button
                whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                onClick={applyDiscount}
                style={{
                  display:'inline-flex',alignItems:'center',gap:'0.5rem',
                  padding:'0.75rem 1.5rem',
                  background:'linear-gradient(135deg,#CED481 0%,#b8bc6a 100%)',
                  border:'none',borderRadius:8,
                  fontSize:'0.82rem',fontWeight:700,
                  color:'#0f1e29',letterSpacing:'0.06em',
                  cursor:'pointer',
                  boxShadow:'0 4px 20px rgba(206,212,129,0.3)',
                }}
              >
                <Tag size={15}/> Apply 20% Launch Discount
              </motion.button>
            ) : (
              <div style={{fontSize:'0.78rem',color:'rgba(37,211,102,0.8)',fontWeight:600}}>
                ✓ Discount locked in ,  mention code <strong style={{color:'#25D366'}}>LAUNCH20</strong> when we call.
              </div>
            )}
          </motion.div>
        )}

        {/* What happens next */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
          style={{background:'rgba(244,247,242,0.03)',borderRadius:10,padding:'1.5rem',marginBottom:'2rem',textAlign:'left',border:'1px solid rgba(244,247,242,0.07)'}}
        >
          <div style={{fontSize:'0.65rem',fontWeight:700,letterSpacing:'0.14em',color:'rgba(244,247,242,0.35)',textTransform:'uppercase',marginBottom:'1rem'}}>What Happens Next</div>
          {[
            { icon:<Phone size={15} color="#CED481" strokeWidth={1.8}/>,        step:'Within 1 hour',    text:'Designer calls you to understand your requirements' },
            { icon:<CalendarCheck size={15} color="#7ECAC3" strokeWidth={1.8}/>, step:'Within 2 days',   text:'Visit scheduled at our 11,500 sq ft Experience Centre' },
            { icon:<Clock size={15} color="#E8A87C" strokeWidth={1.8}/>,         step:'Within 3 days',   text:'Your personalised 3D design is ready for review' },
          ].map((item,i)=>(
            <div key={i} style={{display:'flex',gap:'0.9rem',alignItems:'flex-start',marginBottom: i < 2 ? '1rem' : 0}}>
              <div style={{width:34,height:34,borderRadius:8,background:'rgba(244,247,242,0.04)',border:'1px solid rgba(244,247,242,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {item.icon}
              </div>
              <div>
                <div style={{fontSize:'0.68rem',fontWeight:700,color:'rgba(206,212,129,0.6)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.15rem'}}>{item.step}</div>
                <div style={{fontSize:'0.85rem',fontWeight:300,color:'rgba(244,247,242,0.6)',lineHeight:1.5}}>{item.text}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.75}}
          style={{display:'flex',gap:'0.75rem',flexDirection:'column'}}
        >
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',padding:'1rem',background:'#25D366',borderRadius:7,fontSize:'0.88rem',fontWeight:700,color:'#fff',textDecoration:'none',boxShadow:'0 4px 20px rgba(37,211,102,0.3)'}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp Now
          </a>
          <a href="/lp"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem',padding:'0.9rem',background:'rgba(244,247,242,0.05)',border:'1px solid rgba(244,247,242,0.1)',borderRadius:7,fontSize:'0.82rem',fontWeight:500,color:'rgba(244,247,242,0.5)',textDecoration:'none'}}
          >
            Back to Page <ArrowRight size={13}/>
          </a>
        </motion.div>
      </motion.div>

      {/* Footer note */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
        style={{marginTop:'2rem',fontSize:'0.72rem',color:'rgba(244,247,242,0.2)',textAlign:'center',maxWidth:400,lineHeight:1.6}}
      >
        The DesignVerse · Jubilee Hills, Hyderabad · info@thedesignverse.co.in · +91 95501 56644
        <br/>*45-Day Guarantee & 10-Year Warranty subject to terms & conditions.
      </motion.div>
    </div>
  )
}
