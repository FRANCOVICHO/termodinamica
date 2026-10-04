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
            delay: (i / Math.max(waves, 1)) * 2.5,
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
        position: 'relative',
      }}>
        <span style={{ fontSize: '2rem' }}>{emissivity > 0.6 ? '⬛' : '⬜'}</span>
      </div>
    </div>
  )
}

const MATERIALS = [
  { name: 'Cuerpo Negro (ideal)',     eps: 1.00, color: '#ff7b00', note: 'Emisor y absorbedor perfecto — modelo ideal' },
  { name: 'Carbono / Negro de humo',  eps: 0.96, color: '#ff9933', note: 'Comportamiento muy cercano al cuerpo negro' },
  { name: 'Superficie pintada negra', eps: 0.91, color: '#ffaa44', note: 'Alta capacidad de emisión de radiación' },
  { name: 'Ladrillo / Hormigón',      eps: 0.75, color: '#aaa',    note: 'Emisividad media — materiales de construcción' },
  { name: 'Aluminio pulido',          eps: 0.05, color: '#66ccff', note: 'Muy baja emisividad — alta reflectividad' },
  { name: 'Plata pulida',             eps: 0.02, color: '#88ddff', note: 'Emisividad muy baja — reflector casi perfecto' },
]

export default function Slide7BlackBody() {
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

        <p className="slide-body" style={{ marginBottom: '0.8rem' }}>
          Un <span className="highlight-text">cuerpo negro</span> es un modelo ideal que absorbe y emite
          la máxima cantidad posible de radiación para una temperatura dada.
        </p>
        <p className="slide-body" style={{ marginBottom: '1.2rem', fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)' }}>
          La <span className="highlight-violet">emisividad (ε)</span> indica qué tan cerca está
          un cuerpo real del comportamiento del cuerpo negro. Ningún material real alcanza ε = 1.
        </p>

        {/* Material list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {MATERIALS.map((m, i) => (
            <motion.button
              key={m.name}
              onClick={() => setSelected(i)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: selected === i ? `rgba(255,123,0,0.1)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected === i ? 'rgba(255,123,0,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 10,
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                textAlign: 'left',
                color: 'white',
              }}
            >
              <div style={{ width: 48, height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <div style={{
                  height: '100%', width: `${m.eps * 100}%`,
                  background: m.color, borderRadius: 4, transition: 'width 0.3s',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{m.note}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: m.color, fontWeight: 700 }}>
                ε = {m.eps.toFixed(2)}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <EmitterObject emissivity={eps} size={100} />

        <motion.div
          key={selected}
          className="glass-card"
          style={{ maxWidth: 285, textAlign: 'center', borderColor: `${MATERIALS[selected].color}44` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', color: MATERIALS[selected].color, fontWeight: 800, marginBottom: 6 }}>
            ε = {eps.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(240,244,255,0.7)', lineHeight: 1.6, marginBottom: 10 }}>
            {MATERIALS[selected].note}
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.28)', marginBottom: 4, letterSpacing: '0.1em' }}>
              CAPACIDAD DE EMISIÓN RELATIVA
            </div>
            <div style={{ height: 9, background: 'rgba(255,255,255,0.07)', borderRadius: 5 }}>
              <motion.div
                style={{ height: '100%', background: MATERIALS[selected].color, borderRadius: 5 }}
                animate={{ width: `${eps * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>
              <span>0 — reflector ideal</span>
              <span>1 — cuerpo negro</span>
            </div>
          </div>
        </motion.div>

        <div style={{
          padding: '10px 16px',
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: 10,
          fontSize: '0.76rem',
          color: '#a78bfa',
          maxWidth: 285,
          textAlign: 'center',
          lineHeight: 1.65,
        }}>
          <strong>Ley de Kirchhoff:</strong> para cualquier cuerpo en equilibrio térmico, la absortividad es igual a la emisividad (α = ε).
        </div>
      </motion.div>
    </div>
  )
}
