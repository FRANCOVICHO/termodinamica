import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    id: 0,
    label: 'Cuerpo caliente',
    icon: '🔥',
    color: '#ff7b00',
    desc: 'Un cuerpo a temperatura T₁ posee energía interna. Su temperatura determina la intensidad y distribución espectral de la radiación que emite.',
  },
  {
    id: 1,
    label: 'Emisión de radiación',
    icon: '〰️',
    color: '#ffaa44',
    desc: 'El cuerpo emite ondas electromagnéticas en todas las direcciones. La potencia total emitida depende de su temperatura, área y emisividad: P = εσAT⁴.',
  },
  {
    id: 2,
    label: 'Propagación',
    icon: '↔️',
    color: '#a78bfa',
    desc: 'Las ondas electromagnéticas se propagan a la velocidad de la luz (c = 3×10⁸ m/s). No requieren ningún medio material para desplazarse.',
  },
  {
    id: 3,
    label: 'Absorción de energía',
    icon: '🧲',
    color: '#06b6d4',
    desc: 'Un segundo cuerpo a temperatura T₂ < T₁ absorbe parte de la radiación incidente. La fracción absorbida depende de su absortividad (α).',
  },
]

function WaveGroup({ color, count = 4, offsetX = 0 }) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const x = offsetX + i * 38
        const amp = 10 + i * 2
        return (
          <path
            key={i}
            d={`M ${x} 60 Q ${x + 10} ${60 - amp} ${x + 19} 60 Q ${x + 28} ${60 + amp} ${x + 38} 60`}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.8 - i * 0.1}
          >
            <animate
              attributeName="opacity"
              values={`0;${0.8 - i * 0.1};0`}
              dur={`${1.6 + i * 0.2}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 4,0; 0,0"
              dur={`${1.6 + i * 0.2}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </path>
        )
      })}
    </g>
  )
}

export default function Slide5EmissionAbsorption() {
  const [activeStep, setActiveStep] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length)
    }, 2200)
    return () => clearInterval(t)
  }, [auto])

  const step = STEPS[activeStep]

  return (
    <div className="slide" style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22,
      background: 'radial-gradient(ellipse at 50% 40%, #0d1f3c 0%, #050505 70%)',
    }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label">Mecanismo Físico</p>
        <h2 className="slide-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
          Emisión y Absorción<br />de Radiación
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,244,255,0.4)', marginTop: 6 }}>
          La transferencia radiativa ocurre cuando la energía electromagnética emitida por un cuerpo es absorbida por otro.
        </p>
      </motion.div>

      {/* Main animation area */}
      <motion.div
        style={{ width: '100%', maxWidth: 860, display: 'flex', flexDirection: 'column', gap: 16 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {/* SVG diagram */}
        <div className="glass-card glow-card-orange" style={{ padding: '20px 28px' }}>
          <svg viewBox="0 0 520 120" width="100%" style={{ overflow: 'visible' }}>
            {/* Hot body */}
            <rect x="10" y="30" width="70" height="60" rx="10"
              fill="rgba(255,80,0,0.15)" stroke="#ff7b00" strokeWidth="1.5" />
            <text x="45" y="58" textAnchor="middle" fill="#ff7b00" fontSize="18">🔥</text>
            <text x="45" y="82" textAnchor="middle" fill="#ffaa44" fontSize="9" fontWeight="700">T₁ (caliente)</text>

            {/* Waves travelling */}
            <WaveGroup color="#ff9933" count={5} offsetX={88} />

            {/* Absorbing body */}
            <rect x="430" y="30" width="80" height="60" rx="10"
              fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="470" y="58" textAnchor="middle" fill="#06b6d4" fontSize="18">🌡️</text>
            <text x="470" y="82" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="700">T₂ (receptor)</text>

            {/* Reflected fraction */}
            <path d="M 430 55 Q 390 30 370 20" fill="none" stroke="#a78bfa"
              strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
            <text x="356" y="16" textAnchor="middle" fill="#a78bfa" fontSize="8" opacity="0.6">ρ (reflejado)</text>

            {/* Arrows label center */}
            <text x="260" y="110" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" letterSpacing="1">
              propagación en el vacío — c = 3×10⁸ m/s
            </text>

            {/* Active step highlight */}
            <AnimatePresence>
              {activeStep === 0 && (
                <motion.rect
                  key="hs" x="8" y="28" width="74" height="64" rx="11"
                  fill="none" stroke="#ff7b00" strokeWidth="2.5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                />
              )}
              {activeStep === 3 && (
                <motion.rect
                  key="cs" x="428" y="28" width="84" height="64" rx="11"
                  fill="none" stroke="#06b6d4" strokeWidth="2.5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(i); setAuto(false) }}
              style={{
                flex: 1,
                maxWidth: 190,
                padding: '9px 10px',
                background: activeStep === i ? `${s.color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeStep === i ? s.color + '66' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 10,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s',
              }}
            >
              <div style={{ fontSize: '1.1rem', marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: '0.68rem', color: activeStep === i ? s.color : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                {s.label}
              </div>
            </button>
          ))}
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="glass-card"
            style={{
              borderColor: `${step.color}44`,
              boxShadow: `0 0 20px ${step.color}18`,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: `${step.color}18`, border: `1px solid ${step.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
            }}>
              {step.icon}
            </div>
            <div>
              <div style={{ color: step.color, fontWeight: 700, fontSize: '0.9rem', marginBottom: 5 }}>
                {String(step.id + 1).padStart(2, '0')}. {step.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(240,244,255,0.75)', lineHeight: 1.65 }}>
                {step.desc}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Balance radiativo */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { sym: 'α', name: 'Absortividad', desc: 'fracción absorbida', color: '#06b6d4' },
            { sym: 'ρ', name: 'Reflectividad', desc: 'fracción reflejada', color: '#a78bfa' },
            { sym: 'τ', name: 'Transmisividad', desc: 'fracción transmitida', color: '#22d3ee' },
            { sym: 'α+ρ+τ=1', name: 'Balance radiativo', desc: 'conservación de energía', color: '#ff7b00' },
          ].map(({ sym, name, desc, color }) => (
            <div key={sym} style={{
              padding: '7px 14px',
              background: `${color}0d`,
              border: `1px solid ${color}33`,
              borderRadius: 10,
              textAlign: 'center',
              minWidth: 100,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', color, fontWeight: 700, fontSize: '0.9rem' }}>{sym}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{name}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
