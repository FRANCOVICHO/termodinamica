import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

function tempToColor(T) {
  if (T < 350) return { bg: '#1a2a6c', glow: '#3355cc', text: '#6688ff' }
  if (T < 450) return { bg: '#2d1b6c', glow: '#5533cc', text: '#9966ff' }
  if (T < 550) return { bg: '#6c2d1b', glow: '#cc5533', text: '#ff8855' }
  if (T < 650) return { bg: '#8c3d10', glow: '#dd6622', text: '#ffaa44' }
  if (T < 750) return { bg: '#aa4400', glow: '#ff7700', text: '#ffcc44' }
  if (T < 850) return { bg: '#cc5500', glow: '#ff9900', text: '#ffee55' }
  return { bg: '#dd6600', glow: '#ffbb00', text: '#ffffff' }
}

function tempToWaves(T) {
  return Math.floor(((T - 200) / 800) * 5) + 1
}

function tempToSize(T) {
  return 80 + ((T - 200) / 800) * 50
}

export default function Slide4Temperature() {
  const [temp, setTemp] = useState(500)
  const { bg, glow, text } = useMemo(() => tempToColor(temp), [temp])
  const waves = tempToWaves(temp)
  const size = tempToSize(temp)

  const SIGMA = 5.67e-8
  const power = (0.9 * SIGMA * Math.pow(temp, 4)).toFixed(0)

  // Etiquetas estrictamente físicas, sin química
  const getLabel = (T) => {
    if (T < 350) return 'Emisión infrarroja de baja intensidad'
    if (T < 550) return 'Emisión infrarroja apreciable — mayor potencia radiada'
    if (T < 700) return 'Alta potencia radiada — distribución espectral desplazada'
    if (T < 850) return 'Muy alta potencia radiada — cuerpo en alta emisión térmica'
    return 'Emisión en rango visible — cuerpo incandescente'
  }

  return (
    <div className="slide" style={{
      gap: 50,
      alignItems: 'center',
      background: 'radial-gradient(ellipse at 60% 50%, #0d1f3c 0%, #050505 65%)',
    }}>
      {/* LEFT */}
      <motion.div
        style={{ flex: 1 }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="slide-label">Simulación Interactiva</p>
        <h2 className="slide-title">
          Temperatura<br />y Emisión
        </h2>

        <div className="glow-line" />

        <p className="slide-body" style={{ marginBottom: '1rem' }}>
          Todo cuerpo con temperatura superior al{' '}
          <span className="highlight-text">cero absoluto</span> emite radiación
          electromagnética. A mayor temperatura, mayor es la energía emitida y la
          distribución espectral se desplaza hacia frecuencias más altas.
        </p>

        <p className="slide-body" style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'rgba(240,244,255,0.5)' }}>
          Desplaza el control para variar la temperatura del cuerpo.
        </p>

        {/* Slider */}
        <div className="temp-left">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            <span>200 K</span>
            <span style={{ color: text, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem' }}>
              {temp} K
            </span>
            <span>1000 K</span>
          </div>
          <input
            type="range"
            min="200"
            max="1000"
            step="10"
            value={temp}
            onChange={e => setTemp(Number(e.target.value))}
            className="temp-slider"
            aria-label="Control de temperatura"
          />
          <div style={{ marginTop: 8, fontSize: '0.78rem', color: text, textAlign: 'center', minHeight: 20 }}>
            {getLabel(temp)}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Temperatura', val: `${temp} K`, color: text },
            { label: 'Potencia (ε=0.9)', val: `${(power/1000).toFixed(1)} kW/m²`, color: '#f472b6' },
            { label: 'Ondas relativas', val: `${waves} / 6`, color: '#06b6d4' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{
              flex: 1,
              minWidth: 110,
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${color}33`,
              borderRadius: 10,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', color, fontWeight: 700, marginTop: 4, fontSize: '0.9rem' }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[...Array(waves)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                border: `1.5px solid ${glow}`,
                opacity: 0,
              }}
              animate={{
                width: [size, size + 160],
                height: [size, size + 160],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: (i / waves) * 2.5,
                ease: 'easeOut',
              }}
            />
          ))}
          <motion.div
            animate={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${text} 0%, ${bg} 60%)`,
              boxShadow: `0 0 ${30 + waves * 10}px ${glow}, 0 0 ${60 + waves * 20}px ${glow}55`,
            }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: '50%', position: 'relative', zIndex: 2 }}
          />
        </div>

        {/* Concept cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
          <motion.div
            key={`cap-${temp}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${glow}33`,
              borderRadius: 12,
            }}
          >
            <div style={{ color: text, fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>
              Mayor temperatura → mayor energía emitida
            </div>
            <div style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.72rem', lineHeight: 1.5 }}>
              La potencia radiada crece con T⁴ y la distribución espectral se desplaza hacia longitudes de onda menores
            </div>
          </motion.div>

          <div style={{
            padding: '8px 14px',
            background: 'rgba(6,182,212,0.07)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 10,
            textAlign: 'center',
            fontSize: '0.72rem',
            color: '#06b6d4',
            fontFamily: 'var(--font-mono)',
          }}>
            Ley de Wien: λₘₐₓ = b / T
          </div>
        </div>
      </motion.div>
    </div>
  )
}
