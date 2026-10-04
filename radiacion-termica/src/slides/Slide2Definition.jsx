import { motion } from 'framer-motion'
import ThermalWave from '../components/ThermalWave'

const fadeUp = (delay = 0) => ({
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.6, ease: 'easeOut' },
})

export default function Slide2Definition() {
  return (
    <div className="slide" style={{
      background: 'radial-gradient(ellipse at 30% 50%, #0d1f3c 0%, #050505 65%)',
      display: 'flex',
      gap: 60,
      alignItems: 'center',
    }}>
      {/* LEFT */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <motion.p className="slide-label" {...fadeUp(0.1)}>
          Conceptos Fundamentales
        </motion.p>
        <motion.h2 className="slide-title" {...fadeUp(0.2)}>
          ¿Qué es la<br />Radiación Térmica?
        </motion.h2>

        <motion.div className="glow-line" {...fadeUp(0.35)} />

        <motion.blockquote className="definition-quote" {...fadeUp(0.4)}>
          La radiación térmica es la{' '}
          <span className="highlight-text">transferencia de energía</span> mediante
          ondas electromagnéticas producida por la{' '}
          <span className="highlight-text">temperatura</span> de los cuerpos.
        </motion.blockquote>

        <motion.div {...fadeUp(0.55)} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '1rem' }}>
          {[
            { icon: '🌡️', text: 'Todo cuerpo con temperatura mayor al cero absoluto emite radiación electromagnética' },
            { icon: '⚡', text: 'La energía viaja como onda electromagnética a la velocidad de la luz' },
            { icon: '🚀', text: 'No requiere contacto ni medio material entre los cuerpos' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              fontSize: '0.83rem',
              color: 'rgba(240,244,255,0.8)',
              lineHeight: 1.5,
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
              {text}
            </div>
          ))}
        </motion.div>

        <motion.div className="no-medium-badge" {...fadeUp(0.7)}>
          <span>✦</span> No necesita un medio material
        </motion.div>
      </div>

      {/* RIGHT */}
      <motion.div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="glass-card glow-card-orange" style={{ padding: '28px 32px' }}>
          <ThermalWave width={360} height={180} color="#ff7b00" intensity={0.75} />
        </div>

        {/* Vacuum label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 20px',
          border: '1px dashed rgba(139,92,246,0.4)',
          borderRadius: 30,
          fontSize: '0.78rem',
          color: 'rgba(167,139,250,0.8)',
        }}>
          <span>◌</span> La energía viaja incluso a través del vacío
        </div>

        {/* Concept cards */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Mecanismo', val: 'Ondas EM', color: '#ff7b00' },
            { label: 'Origen', val: 'Temperatura', color: '#a78bfa' },
            { label: 'Ley', val: 'P ∝ T⁴', color: '#06b6d4' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{
              padding: '8px 16px',
              background: `${color}0d`,
              border: `1px solid ${color}33`,
              borderRadius: 10,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', color, fontWeight: 700, fontSize: '0.9rem', marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
