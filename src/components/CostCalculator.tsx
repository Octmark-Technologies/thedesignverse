import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'

const FINISHES = [
  { key: 'laminate', label: 'Laminate', subtitle: 'Durable & Versatile', rate: 2000, loftRate: 1600, color: '#9a7424' },
  { key: 'acrylic',  label: 'Acrylic',  subtitle: 'High Gloss Finish',   rate: 2400, loftRate: 2000, color: '#1e3d60' },
  { key: 'pu',       label: 'PU Finish', subtitle: 'Premium Matte',        rate: 3000, loftRate: 2600, color: '#2e2e2e' },
] as const

const UNIT_RATES: Record<string, number> = {
  'TV Unit': 1400,
  'Headboard Panel': 1200,
  'False Ceiling (sft)': 120,
  'Accent Wall (Economic)': 150,
  'Accent Wall (Medium)': 400,
  'Accent Wall (Luxury)': 800,
}

const ROOM_TYPES = [
  { key: 'living',  label: 'Living Room' },
  { key: 'master',  label: 'Master Bedroom' },
  { key: 'bed2',    label: 'Bedroom 2' },
  { key: 'bed3',    label: 'Bedroom 3' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'dining',  label: 'Dining Area' },
  { key: 'study',   label: 'Study / Office' },
  { key: 'mbath',   label: 'Master Bathroom' },
  { key: 'bath2',   label: 'Bathroom 2' },
  { key: 'utility', label: 'Utility / Store' },
]

const UNIT_PRESETS: Record<string, string[]> = {
  living:  ['TV Unit', 'Feature Wall', 'Crockery Unit', 'Console Unit', 'Bar Unit', 'False Ceiling (sft)', 'Accent Wall (Economic)', 'Accent Wall (Medium)', 'Accent Wall (Luxury)'],
  master:  ['Wardrobe', 'Study Desk Unit', 'Headboard Panel', 'Dresser', 'False Ceiling (sft)', 'Accent Wall (Economic)', 'Accent Wall (Medium)', 'Accent Wall (Luxury)'],
  bed2:    ['Wardrobe', 'Study Desk Unit', 'Loft Storage', 'False Ceiling (sft)', 'Accent Wall (Economic)', 'Accent Wall (Medium)', 'Accent Wall (Luxury)'],
  bed3:    ['Wardrobe', 'Study Desk Unit', 'False Ceiling (sft)', 'Accent Wall (Economic)', 'Accent Wall (Medium)', 'Accent Wall (Luxury)'],
  kitchen: ['Upper Cabinets', 'Lower Cabinets', 'Tall Pantry Unit', 'Island Counter', 'False Ceiling (sft)'],
  dining:  ['Crockery Cabinet', 'Crockery overhead Cabinet', 'Bar Counter', 'Display Unit', 'False Ceiling (sft)'],
  study:   ['Work Desk', 'Bookshelf Wall', 'Storage Cabinet', 'False Ceiling (sft)', 'Accent Wall (Economic)', 'Accent Wall (Medium)', 'Accent Wall (Luxury)'],
  mbath:   ['Vanity Unit', 'Storage Cabinet'],
  bath2:   ['Vanity Unit', 'Storage Cabinet'],
  utility: ['Storage Rack', 'Loft Storage'],
}

type FinishKey = typeof FINISHES[number]['key']

interface Wall {
  id: string
  name: string
  width: string
  height: string
  loft: boolean
  loftHeight: string
  depth: string
}

interface Room {
  id: string
  typeKey: string
  label: string
  walls: Wall[]
  collapsed: boolean
}

const uid = () => Math.random().toString(36).slice(2, 9)

const newWall = (name = ''): Wall => ({
  id: uid(), name, width: '', height: '', loft: false, loftHeight: '2', depth: '2',
})

const newRoom = (typeKey: string, label: string): Room => {
  const presets = UNIT_PRESETS[typeKey] || []
  const initialWallName = presets.length === 1 ? presets[0] : ''
  return {
    id: uid(), typeKey, label, walls: [newWall(initialWallName)], collapsed: false,
  }
}

const wallCost = (wall: Wall, rate: number, loftRate: number): number => {
  const w  = parseFloat(wall.width)  || 0
  const h  = parseFloat(wall.height) || 0
  const lh = wall.loft ? (parseFloat(wall.loftHeight) || 2) : 0
  const specialRate = UNIT_RATES[wall.name]
  if (specialRate !== undefined) return w * (h + lh) * specialRate
  return w * h * rate + w * lh * loftRate
}

// ── Input shared style ──────────────────────────────────────────────────────
const inputSx: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(15,30,41,0.14)',
  borderRadius: 4,
  color: '#0f1e29',
  fontFamily: FONT,
  fontSize: '0.82rem',
  fontWeight: 300,
  outline: 'none',
  padding: '0.55rem 0.7rem',
  width: '100%',
  transition: 'border-color 0.2s',
  caretColor: '#6b700a',
}

export default function CostCalculator() {
  const [finish, setFinish]           = useState<FinishKey>('laminate')
  const [rooms, setRooms]             = useState<Room[]>([])
  const [addingRoom, setAddingRoom]   = useState(false)
  const [discountApplied, setDiscount] = useState(false)

  const selectedFinish = FINISHES.find(f => f.key === finish)!
  const rate           = selectedFinish.rate
  const loftRate       = selectedFinish.loftRate
  const totalCost      = rooms.reduce(
    (sum, r) => sum + r.walls.reduce((s, w) => s + wallCost(w, rate, loftRate), 0), 0
  )
  const displayCost    = discountApplied ? Math.round(totalCost * 0.8) : totalCost
  const hasEstimate    = totalCost > 0

  // Room helpers
  const addRoom   = (typeKey: string, label: string) => {
    setRooms(p => [...p, newRoom(typeKey, label)])
    setAddingRoom(false)
  }
  const removeRoom    = (id: string) => setRooms(p => p.filter(r => r.id !== id))
  const toggleCollapse = (id: string) => setRooms(p => p.map(r => r.id === id ? { ...r, collapsed: !r.collapsed } : r))

  // Wall helpers
  const addWall = (rId: string) =>
    setRooms(p => p.map(r => r.id === rId ? { ...r, walls: [...r.walls, newWall()] } : r))
  const removeWall = (rId: string, wId: string) =>
    setRooms(p => p.map(r => r.id === rId ? { ...r, walls: r.walls.filter(w => w.id !== wId) } : r))
  const updateWall = (rId: string, wId: string, upd: Partial<Wall>) =>
    setRooms(p => p.map(r => r.id === rId ? { ...r, walls: r.walls.map(w => w.id === wId ? { ...w, ...upd } : w) } : r))

  return (
    <section
      id="estimate-calc"
      style={{
        background: '#f9f9f6',
        padding: 'clamp(4.5rem,9vh,7rem) clamp(1.25rem,5vw,3.5rem)',
        fontFamily: FONT,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(15,30,41,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,30,41,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div style={{ maxWidth: 1020, margin: '0 auto', position: 'relative' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.9rem' }}>
            <div style={{ width: 24, height: 1, background: 'rgba(107,112,10,0.4)' }} />
            <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b700a' }}>
              Interior Cost Estimator
            </span>
            <div style={{ width: 24, height: 1, background: 'rgba(107,112,10,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 200, color: '#0f1e29', margin: '0 0 0.85rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            How much will your<br />
            <span style={{ color: '#6b700a', fontWeight: 300 }}>interior design cost?</span>
          </h2>
          <p style={{ color: 'rgba(15,30,41,0.5)', fontSize: '0.85rem', fontWeight: 300, maxWidth: 460, margin: '0 auto 0.5rem', lineHeight: 1.7 }}>
            Select each room, add the walls or units you want designed, enter dimensions, and get an instant estimate.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.6 }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#6b700a', letterSpacing: '0.05em' }}>PREMIUM QUALITY:</span>
            <span style={{ fontSize: '0.65rem', color: '#0f1e29', fontWeight: 400 }}>Built with 100% Century Brand Plywood</span>
          </div>
        </div>

        {/* ── Finish Selector ── */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ textAlign: 'center', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.35)', marginBottom: '0.5rem' }}>
            Select Finish
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'rgba(15,30,41,0.35)', marginBottom: '1rem', letterSpacing: '0.02em' }}>
            Pricing may vary based on your design
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
            {FINISHES.map(f => {
              const active = finish === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setFinish(f.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    padding: '0.8rem 1.4rem',
                    background: active ? 'rgba(107,112,10,0.06)' : '#fff',
                    border: active ? '1px solid rgba(107,112,10,0.4)' : '1px solid rgba(15,30,41,0.1)',
                    borderRadius: 6, cursor: 'pointer', fontFamily: FONT,
                    minWidth: 170, position: 'relative', transition: 'all 0.22s ease',
                    boxShadow: active ? '0 2px 12px rgba(107,112,10,0.1)' : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: f.color,
                    border: active ? '2px solid #6b700a' : '2px solid rgba(15,30,41,0.15)',
                    boxShadow: active ? '0 0 8px rgba(107,112,10,0.2)' : 'none',
                    transition: 'all 0.22s ease',
                  }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: active ? 600 : 400, color: active ? '#6b700a' : 'rgba(15,30,41,0.65)', letterSpacing: '0.04em', transition: 'color 0.2s' }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(15,30,41,0.38)', letterSpacing: '0.05em', marginTop: '0.1rem' }}>
                      {f.subtitle}
                    </div>
                  </div>
                  {active && (
                    <motion.div layoutId="finish-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, #6b700a, transparent)', borderRadius: '0 0 6px 6px' }} transition={{ duration: 0.25 }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Room Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <AnimatePresence initial={false}>
            {rooms.map(room => {
              const roomCost = room.walls.reduce((s, w) => s + wallCost(w, rate, loftRate), 0)
              const presets  = UNIT_PRESETS[room.typeKey] ?? []
              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(15,30,41,0.1)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Room header */}
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 1.25rem', cursor: 'pointer',
                      borderBottom: room.collapsed ? 'none' : '1px solid rgba(15,30,41,0.07)',
                    }}
                    onClick={() => toggleCollapse(room.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 3, height: 18, background: '#CED481', borderRadius: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f1e29', letterSpacing: '0.04em' }}>
                        {room.label}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'rgba(15,30,41,0.35)', letterSpacing: '0.04em' }}>
                        {room.walls.length} unit{room.walls.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {roomCost > 0 && (
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#CED481', letterSpacing: '-0.01em' }}>
                          ₹{roomCost.toLocaleString('en-IN')}
                        </span>
                      )}
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {room.collapsed
                          ? <ChevronDown size={15} color="rgba(15,30,41,0.35)" />
                          : <ChevronUp   size={15} color="rgba(15,30,41,0.35)" />
                        }
                        <button
                          onClick={e => { e.stopPropagation(); removeRoom(room.id) }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.15rem', lineHeight: 1 }}
                          title="Remove room"
                        >
                          <Trash2 size={14} color="rgba(255,80,80,0.45)" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Walls */}
                  <AnimatePresence initial={false}>
                    {!room.collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1rem 1.25rem 1.25rem' }}>

                          {/* Column labels */}
                          <div className="wall-row-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr 1fr auto auto',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            alignItems: 'center',
                          }}>
                            {['Unit / Wall', 'Width (ft)', 'Height (ft)', 'Loft', 'Cost', ''].map((h, i) => (
                              <span key={i} style={{ fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.35)' }}>
                                {h}
                              </span>
                            ))}
                          </div>

                          {/* Wall rows */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {room.walls.map((wall) => {
                              const cost = wallCost(wall, rate, loftRate)
                              return (
                                <div key={wall.id} className="wall-row-grid" style={{
                                  display: 'grid',
                                  gridTemplateColumns: '2fr 1fr 1fr 1fr auto auto',
                                  gap: '0.5rem',
                                  alignItems: 'center',
                                }}>
                                  {/* Unit name */}
                                  <div style={{ position: 'relative' }}>
                                    <select
                                      value={wall.name}
                                      onChange={e => updateWall(room.id, wall.id, { name: e.target.value })}
                                      style={{ ...inputSx, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                                    >
                                      <option value="" disabled>Select unit</option>
                                      {presets.map(p => <option key={p} value={p}>{p}</option>)}
                                      <option value="Custom">Custom</option>
                                    </select>
                                    {wall.name === 'False Ceiling (sft)' && (
                                      <div style={{ fontSize: '0.6rem', color: '#6b700a', marginTop: '0.25rem', fontWeight: 500, lineHeight: 1.2 }}>
                                        (Lights and wiring as per actuals)
                                      </div>
                                    )}
                                  </div>

                                  {/* Width */}
                                  <input
                                    type="number" min="0" placeholder="0"
                                    value={wall.width}
                                    onChange={e => updateWall(room.id, wall.id, { width: e.target.value })}
                                    style={inputSx}
                                  />

                                  {/* Height */}
                                  <input
                                    type="number" min="0" placeholder="0"
                                    value={wall.height}
                                    onChange={e => updateWall(room.id, wall.id, { height: e.target.value })}
                                    style={inputSx}
                                  />

                                  {/* Loft toggle + height ,  hidden for TV Unit */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    {wall.name === 'TV Unit' || wall.name === 'False Ceiling (sft)' ? (
                                      <span style={{ fontSize: '0.62rem', color: 'rgba(15,30,41,0.25)', letterSpacing: '0.05em' }}>N/A</span>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => updateWall(room.id, wall.id, { loft: !wall.loft })}
                                          style={{
                                            width: 36, height: 20, borderRadius: 10, flexShrink: 0,
                                            background: wall.loft ? '#6b700a' : 'rgba(15,30,41,0.12)',
                                            border: 'none', cursor: 'pointer', position: 'relative',
                                            transition: 'background 0.2s',
                                          }}
                                          title="Toggle loft"
                                        >
                                          <span style={{
                                            position: 'absolute', top: 3, width: 14, height: 14, borderRadius: '50%',
                                            background: wall.loft ? '#fff' : 'rgba(15,30,41,0.4)',
                                            left: wall.loft ? 19 : 3,
                                            transition: 'left 0.2s, background 0.2s',
                                          }} />
                                        </button>
                                        {wall.loft && (
                                          <input
                                            type="number" min="0" placeholder="2"
                                            value={wall.loftHeight}
                                            onChange={e => updateWall(room.id, wall.id, { loftHeight: e.target.value })}
                                            title="Loft height (ft)"
                                            style={{ ...inputSx, width: 52, padding: '0.55rem 0.4rem' }}
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>

                                  {/* Cost */}
                                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: cost > 0 ? '#6b700a' : 'rgba(15,30,41,0.2)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', minWidth: 72, textAlign: 'right' }}>
                                    {cost > 0 ? `₹${cost.toLocaleString('en-IN')}` : ', '}
                                  </span>

                                  {/* Delete wall */}
                                  <button
                                    onClick={() => room.walls.length > 1 ? removeWall(room.id, wall.id) : undefined}
                                    style={{
                                      background: 'none', border: 'none', cursor: room.walls.length > 1 ? 'pointer' : 'default',
                                      padding: '0.2rem', opacity: room.walls.length > 1 ? 1 : 0.2,
                                    }}
                                    title="Remove unit"
                                  >
                                    <Trash2 size={13} color="rgba(255,100,100,0.5)" />
                                  </button>
                                </div>
                              )
                            })}
                          </div>

                          {/* Add unit */}
                          <button
                            onClick={() => addWall(room.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.4rem',
                              marginTop: '0.875rem',
                              background: 'none', border: '1px dashed rgba(107,112,10,0.25)',
                              borderRadius: 4, color: 'rgba(107,112,10,0.6)',
                              fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em',
                              padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: FONT,
                              transition: 'border-color 0.2s, color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,112,10,0.55)'; e.currentTarget.style.color = '#6b700a' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(107,112,10,0.25)'; e.currentTarget.style.color = 'rgba(107,112,10,0.6)' }}
                          >
                            <Plus size={12} /> Add Unit
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

        {/* ── Add Room button / picker ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <AnimatePresence mode="wait">
            {!addingRoom ? (
              <motion.button
                key="add-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setAddingRoom(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  width: '100%', justifyContent: 'center',
                  padding: '1rem',
                  background: 'transparent',
                  border: '1px dashed rgba(15,30,41,0.15)',
                  borderRadius: 8, color: 'rgba(15,30,41,0.45)',
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em',
                  cursor: 'pointer', fontFamily: FONT,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,112,10,0.4)'; e.currentTarget.style.color = '#6b700a' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,30,41,0.15)'; e.currentTarget.style.color = 'rgba(15,30,41,0.45)' }}
              >
                <Plus size={15} /> Add Room
              </motion.button>
            ) : (
              <motion.div
                key="room-picker"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(15,30,41,0.1)',
                  borderRadius: 8, padding: '1.25rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(15,30,41,0.38)' }}>
                    Select a Room
                  </span>
                  <button onClick={() => setAddingRoom(false)} style={{ background: 'none', border: 'none', color: 'rgba(15,30,41,0.3)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: 0 }}>
                    ×
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {ROOM_TYPES.map(rt => {
                    const already = rooms.filter(r => r.typeKey === rt.key).length
                    const label   = already > 0 ? `${rt.label} ${already + 1}` : rt.label
                    return (
                      <button
                        key={rt.key}
                        onClick={() => addRoom(rt.key, label)}
                        style={{
                          padding: '0.65rem 0.9rem',
                          background: '#f8f8f5',
                          border: '1px solid rgba(15,30,41,0.08)',
                          borderRadius: 5, color: 'rgba(15,30,41,0.65)',
                          fontSize: '0.75rem', fontWeight: 400,
                          cursor: 'pointer', fontFamily: FONT,
                          textAlign: 'left', transition: 'all 0.18s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,112,10,0.06)'; e.currentTarget.style.borderColor = 'rgba(107,112,10,0.3)'; e.currentTarget.style.color = '#6b700a' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f8f8f5'; e.currentTarget.style.borderColor = 'rgba(15,30,41,0.08)'; e.currentTarget.style.color = 'rgba(15,30,41,0.65)' }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Total Estimate ── */}
        <AnimatePresence mode="wait">
          {hasEstimate ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'linear-gradient(135deg, #0f1e29 0%, #0a1520 100%)',
                border: '1px solid rgba(206,212,129,0.15)',
                borderRadius: 10,
                padding: 'clamp(1.5rem,3vw,2.25rem) clamp(1.5rem,4vw,2.75rem)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '1.5rem', position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: -80, right: -80, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(206,212,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div style={{ width: 14, height: 1, background: '#CED481', opacity: 0.7 }} />
                  <span style={{ fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(206,212,129,0.8)' }}>
                    Estimated Interior Cost
                  </span>
                </div>
                <motion.div
                  key={displayCost}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}
                >
                  <span style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 200, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    ₹{displayCost.toLocaleString('en-IN')}
                  </span>
                  {discountApplied && (
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', fontWeight: 300 }}>
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  )}
                </motion.div>
                {discountApplied && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', background: 'rgba(206,212,129,0.12)', border: '1px solid rgba(206,212,129,0.25)', borderRadius: 4, padding: '0.25rem 0.6rem' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', color: '#CED481' }}>20% OFF APPLIED</span>
                  </div>
                )}
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.55rem' }}>
                  {selectedFinish.label} finish &nbsp;·&nbsp; {rooms.length} room{rooms.length !== 1 ? 's' : ''}
                </div>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.16)', marginTop: '0.7rem', lineHeight: 1.6, maxWidth: 380 }}>
                  * False Ceiling costs are for standard gypsum ceiling. Electrical wiring and lighting fixtures will be charged as per actuals.
                </p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.16)', marginTop: '0.4rem', lineHeight: 1.6, maxWidth: 380 }}>
                  Preliminary estimate only. Actual pricing varies based on design complexity, material selection, and site conditions. Final quote confirmed after a complimentary site visit.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: 185 }}>
                <a
                  href="#contact"
                  style={{
                    display: 'block', textAlign: 'center', padding: '0.9rem 1.75rem',
                    background: '#CED481', color: '#060d15', fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
                    borderRadius: 4, fontFamily: FONT, transition: 'opacity 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.87'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Book Free Consultation
                </a>
                <button
                  onClick={() => setDiscount(p => !p)}
                  style={{
                    display: 'block', textAlign: 'center', padding: '0.75rem 1.75rem',
                    background: discountApplied ? 'rgba(206,212,129,0.15)' : 'transparent',
                    color: discountApplied ? '#CED481' : 'rgba(206,212,129,0.6)',
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em',
                    border: discountApplied ? '1px solid rgba(206,212,129,0.4)' : '1px dashed rgba(206,212,129,0.3)',
                    borderRadius: 4, cursor: 'pointer', fontFamily: FONT,
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                  }}
                >
                  {discountApplied ? '✓ 20% Discount Applied' : 'Apply 20% Discount'}
                </button>
                <button
                  onClick={() => { setRooms([]); setAddingRoom(false); setDiscount(false) }}
                  style={{
                    display: 'block', textAlign: 'center', padding: '0.65rem 1.75rem',
                    background: 'transparent', color: 'rgba(255,255,255,0.35)',
                    fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.1em',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4,
                    cursor: 'pointer', fontFamily: FONT, transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ border: '1px dashed rgba(15,30,41,0.1)', borderRadius: 10, padding: '2.25rem', textAlign: 'center' }}
            >
              <p style={{ color: 'rgba(15,30,41,0.3)', fontSize: '0.78rem', letterSpacing: '0.08em' }}>
                Add rooms and enter dimensions above to see your estimate
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        #estimate-calc input[type=number]::-webkit-inner-spin-button,
        #estimate-calc input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        #estimate-calc input[type=number] { -moz-appearance: textfield; }
        #estimate-calc input:focus, #estimate-calc select:focus { border-color: rgba(107,112,10,0.5) !important; }
        #estimate-calc select option { background: #fff; color: #0f1e29; }
        @media (max-width: 700px) {
          .wall-row-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
