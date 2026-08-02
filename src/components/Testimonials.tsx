import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'


const googleReviews = [
  {
    name: 'Suresh Kumar',
    date: '2 months ago',
    text: 'Best interior designers in Hyderabad. Their Experience Centre is a must-visit. The 45-day guarantee is real!',
    avatar: 'S',
  },
  {
    name: 'Megha Agarwal',
    date: '1 month ago',
    text: 'Professional team and high-quality materials. Loved the transparency in pricing.',
    avatar: 'M',
  },
  {
    name: 'Rahul Varma',
    date: '3 weeks ago',
    text: 'Highly recommended for residential interiors. The design process was very smooth.',
    avatar: 'R',
  },
]


export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '7rem 0',
        background: 'var(--teal)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Client Stories</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--warm-white)',
            }}
          >
            What Our Clients Say
          </h2>
        </motion.div>



        {/* Google Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" style={{ height: '24px' }} />
              <span style={{ fontSize: '1.25rem', color: 'var(--warm-white)', fontWeight: 600 }}>Reviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', color: 'var(--warm-white)', fontWeight: 700 }}>4.9</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#FBBC04" color="#FBBC04" />)}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'rgba(244,247,242,0.5)', marginTop: '2px' }}>Based on 450+ reviews</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {googleReviews.map((review, i) => (
              <div key={i} style={{ textAlign: 'left', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
                    {review.avatar}
                  </div>
                  <div>
                    <div style={{ color: '#333', fontWeight: 600, fontSize: '0.9rem' }}>{review.name}</div>
                    <div style={{ color: '#777', fontSize: '0.75rem' }}>{review.date}</div>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Color_Icon.svg/1200px-Google_Color_Icon.svg.png" alt="G" style={{ height: '16px', marginLeft: 'auto' }} />
                </div>
                <div style={{ display: 'flex', gap: '1px', marginBottom: '0.75rem' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#FBBC04" color="#FBBC04" />)}
                </div>
                <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{review.text}</p>
              </div>
            ))}
          </div>
          
          <button 
            style={{ 
              marginTop: '3rem', 
              padding: '0.8rem 2rem', 
              background: 'transparent', 
              border: '1px solid rgba(255,255,255,0.2)', 
              borderRadius: '999px', 
              color: 'var(--warm-white)', 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            View All Google Reviews
          </button>
        </motion.div>
      </div>
    </section>
  )
}
