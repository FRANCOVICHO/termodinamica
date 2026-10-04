import { useState } from 'react'
import { motion } from 'framer-motion'

function EmitterObject({ emissivity, size = 100 }) {
  const waves = Math.round(emissivity * 5)
  const color = emissivity > 0.6 ? '#ff7b00' : '#888'
  const bg = emissivity > 0.6
    ? `radial-gradient(circle, #332200 30%, #220000 100%)`
    : `radial-gradient(circle, #444 30%, #222 100%)`

  return (
    <div style={{ position: 'relative', width: size + 80, height: size + 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[...Array(waves)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: `1.5px solid ${color}`,
            opacity: 0,
          }}
          animate={{
            width: [size, size + 120],
            height: [size, size + 120],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: (i / waves) * 2.5,
            ease: 'easeOut',
          }}
        />
      ))}
      <div style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: bg,
        border: `2px solid ${color}55`,
        boxShadow: emissivity > 0.6
          ? `0 0 30px rgba(255,123,0,0.4), inset 0 0 20px rgba(255,80,0,0.2)`
          : `0 0 10px rgba(150,150,150,0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        flexDirection: 'column',
        gap: 4,
        position: 'relative',
      }}>
        <span style={{ fontSize: '2rem' }}>{emissivity > 0.6 ? '⬛' : '⬜'}</span>
      </div>
    </div>
  )
}

const MATERIALS = [
  { name: 'Cuerpo Negro (ideal)', eps: 1.00, color: '#ff7b00', note: 'Emisor/absorbedor perfecto' },
  { name: 'Carbono / Negro de humo', eps: 0.96, color: '#ff9933', note: 'Muy alta emisividad' },
  { name: 'Madera pintada (negro)', eps: 0.91, color: '#ffaa44', note: 'Alta emisividad' },
  { name: 'Ladrillo', eps: 0.75, color: '#aaa', note: 'Emisividad media' },
  { name: 'Aluminio pulido', eps: 0.05, color: '#66ccff', note: 'Muy baja emisividad — reflector' },
  { name: 'Plata pulida', eps: 0.02, color: '#88ddff', note: 'Emisor muy pobre — alta reflectividad' },
]

export default function Slide6BlackBody() {
  const [selected, setSelected] = useState(0)

  const eps = MATERIALS[selected].eps

  return (
    <div className="slide" style={{
      gap: 40,
      alignItems: 'center',
      background: 'radial-gradient(ellipse at 50% 50%, #0d1f3c 0%, #050505 65%)',
    }}>
      {/* LEFT */}
      <motion.div
        style={{ flex: 1 }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="slide-label">Propiedades de Emisión</p>
        <h2 className="slide-title">
          Cuerpo Negro<br />y Emisividad
        </h2>
        <div className="glow-line" />

        <p className="slide-body" style={{ marginBottom: '1.2rem' }}>
          La <span className="highlight-text">emisividad (ε)</span> determina qué tan bien
          emite radiación un cuerpo comparado con un emisor ideal.
        </p>

        {/* Material list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MATERIALS.map((m, i) => (
            <motion.button
              key={m.name}
              onClick={() => setSelected(i)}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: selected === i ? `rgba(255,123,0,0.1)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected === i ? 'rgba(255,123,0,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 10,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                textAlign: 'left',
                color: 'white',
              }}
            >
              {/* Emissivity bar */}
              <div style={{ width: 50, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <div style={{
                  height: '100%',
                  width: `${m.eps * 100}%`,
                  background: m.color,
                  borderRadius: 4,
                  transition: 'width 0.3s',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{m.note}</div>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: m.color,
                fontWeight: 700,
              }}>
                ε = {m.eps.toFixed(2)}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* RIGHT — Visual */}
      <motion.div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <EmitterObject emissivity={eps} size={100} />

        {/* Info card */}
        <motion.div
          key={selected}
          className="glass-card"
          style={{ maxWidth: 280, textAlign: 'center', borderColor: `${MATERIALS[selected].color}44` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', color: MATERIALS[selected].color, fontWeight: 800, marginBottom: 8 }}>
            ε = {eps.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(240,244,255,0.7)', lineHeight: 1.6, marginBottom: 8 }}>
            {MATERIALS[selected].note}
          </div>
          {/* Visual bar */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: 4, letterSpacing: '0.1em' }}>
              CAPACIDAD DE EMISIÓN
            </div>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.07)', borderRadius: 5 }}>
              <motion.div
                style={{ height: '100%', background: MATERIALS[selected].color, borderRadius: 5 }}
                animate={{ width: `${eps * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
              <span>0 (espejo)</span>
              <span>1 (cuerpo negro)</span>
            </div>
          </div>
        </motion.div>

        <div style={{
          padding: '10px 18px',
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: 10,
          fontSize: '0.78rem',
          color: '#a78bfa',
          maxWidth: 280,
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          Un buen emisor también es un buen absorbedor de radiación (Ley de Kirchhoff).
        </div>
      </motion.div>
    </div>
  )
}
