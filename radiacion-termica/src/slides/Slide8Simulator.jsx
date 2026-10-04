import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const SIGMA = 5.67e-8

function objectColor(T) {
  if (T < 400)  return { core: '#1a2a6c', glow: '#2244cc' }
  if (T < 600)  return { core: '#6c2d1b', glow: '#cc5533' }
  if (T < 750)  return { core: '#aa4400', glow: '#ff7700' }
  if (T < 900)  return { core: '#cc6600', glow: '#ffaa00' }
  if (T < 1100) return { core: '#dd8800', glow: '#ffcc00' }
  return { core: '#eebb00', glow: '#ffffff' }
}

function formatPower(P) {
  if (P >= 1e6) return `${(P / 1e6).toFixed(2)} MW`
  if (P >= 1e3) return `${(P / 1e3).toFixed(2)} kW`
  return `${P.toFixed(1)} W`
}

function SliderControl({ label, unit, min, max, step, value, onChange, color }) {
  return (
    <div className="control-row">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="control-label">{label}</span>
        <span className="control-value" style={{ color }}>{value} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          WebkitAppearance: 'none',
          width: '100%',
          height: 6,
          borderRadius: 3,
          outline: 'none',
          cursor: 'pointer',
          background: `linear-gradient(90deg, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 0%)`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

export default function Slide8Simulator() {
  const [T, setT]    = useState(600)
  const [A, setA]    = useState(1.0)
  const [eps, setEps] = useState(0.8)

  const power = useMemo(() => eps * SIGMA * A * Math.pow(T, 4), [T, A, eps])
  const { core, glow } = objectColor(T)
  const waves = Math.max(2, Math.round((T / 1500) * 6))

  return (
    <div className="slide" style={{
      gap: 40,
      alignItems: 'center',
      background: 'radial-gradient(ellipse at 60% 50%, #0d1f3c 0%, #050505 70%)',
    }}>
      {/* LEFT — Controls */}
      <motion.div
        style={{ flex: 1 }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="slide-label">Experimento Virtual</p>
        <h2 className="slide-title" style={{ fontSize: 'clamp(1.5rem,3.5vw,2.4rem)' }}>
          Simulador<br />Stefan-Boltzmann
        </h2>
        <div className="glow-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 16 }}>
          <SliderControl
            label="Temperatura" unit="K"
            min={200} max={1500} step={10}
            value={T} onChange={setT}
            color="#ff7b00"
          />
          <SliderControl
            label="Área superficial" unit="m²"
            min={0.1} max={10} step={0.1}
            value={A} onChange={setA}
            color="#06b6d4"
          />
          <SliderControl
            label="Emisividad ε" unit=""
            min={0.01} max={1} step={0.01}
            value={eps} onChange={setEps}
            color="#a78bfa"
          />
        </div>
      </motion.div>

      {/* RIGHT — Visual + Result */}
      <motion.div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Radiating object */}
        <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                width: [90, 240],
                height: [90, 240],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: (i / waves) * 2.2,
                ease: 'easeOut',
              }}
            />
          ))}
          <motion.div
            animate={{
              background: `radial-gradient(circle, ${glow}88 0%, ${core} 60%)`,
              boxShadow: `0 0 ${20 + waves * 8}px ${glow}, 0 0 ${50 + waves * 15}px ${glow}55`,
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              zIndex: 2,
              position: 'relative',
            }}
          />
        </div>

        {/* Formula display */}
        <div className="glass-card glow-card-orange" style={{ width: '100%', maxWidth: 300, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            P = ε · σ · A · T⁴
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            {eps.toFixed(2)} × 5.67×10⁻⁸ × {A.toFixed(1)} × {T}⁴
          </div>
          <motion.div
            key={power.toFixed(0)}
            className="sim-result"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatPower(power)}
          </motion.div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
            Potencia emitida
          </div>
        </div>

        {/* Quick facts */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 300 }}>
          {[
            { label: 'T', val: `${T} K`, color: '#ff7b00' },
            { label: 'A', val: `${A.toFixed(1)} m²`, color: '#06b6d4' },
            { label: 'ε', val: eps.toFixed(2), color: '#a78bfa' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{
              padding: '6px 14px',
              background: `${color}11`,
              border: `1px solid ${color}33`,
              borderRadius: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color,
            }}>
              {label} = {val}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
