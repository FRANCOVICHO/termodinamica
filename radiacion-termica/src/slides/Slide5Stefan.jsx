import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StefanChart from '../components/StefanChart'

const VARS = [
  {
    key: 'P',
    symbol: 'P',
    label: 'Potencia emitida',
    unit: 'W (Vatios)',
    color: '#ff7b00',
    desc: 'Energía emitida por unidad de tiempo. A mayor T, crece de forma muy rápida.',
  },
  {
    key: 'eq',
    symbol: '=',
    isOp: true,
  },
  {
    key: 'eps',
    symbol: 'ε',
    label: 'Emisividad',
    unit: 'adimensional (0 a 1)',
    color: '#a78bfa',
    desc: 'Fracción de radiación emitida respecto a un cuerpo negro ideal. ε = 1 es el emisor perfecto.',
  },
  {
    key: 'sig',
    symbol: 'σ',
    label: 'Constante de Stefan-Boltzmann',
    unit: '5.67 × 10⁻⁸ W/m²K⁴',
    color: '#06b6d4',
    desc: 'Constante fundamental de la física. Relaciona potencia emitida con la cuarta potencia de la temperatura.',
  },
  {
    key: 'A',
    symbol: 'A',
    label: 'Área superficial',
    unit: 'm² (metros cuadrados)',
    color: '#22d3ee',
    desc: 'Mayor superficie = más área que emite radiación. La potencia total es proporcional a A.',
  },
  {
    key: 'T4',
    symbol: 'T⁴',
    label: 'Temperatura (a la 4ª)',
    unit: 'K⁴ (Kelvin a la cuarta)',
    color: '#f472b6',
    desc: '¡La clave! Duplicar T multiplica la potencia por 16 (2⁴). El crecimiento es explosivo.',
  },
]

export default function Slide5Stefan() {
  const [active, setActive] = useState(null)

  return (
    <div className="slide" style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      background: 'radial-gradient(ellipse at 50% 40%, #0d1f3c 0%, #050505 70%)',
      paddingBottom: 40,
    }}>
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label">Ley Fundamental</p>
        <h2 className="slide-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
          Ley de Stefan-Boltzmann
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
          Haz clic en cada variable para ver su significado
        </p>
      </motion.div>

      {/* Formula */}
      <motion.div
        className="formula-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ gap: 6, flexWrap: 'wrap' }}
      >
        {VARS.map((v) =>
          v.isOp ? (
            <span key={v.key} className={`formula-var eq`}>{v.symbol}</span>
          ) : (
            <div key={v.key} style={{ position: 'relative' }}>
              <motion.button
                className={`formula-var ${v.key}`}
                onClick={() => setActive(active === v.key ? null : v.key)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Ver significado de ${v.symbol}`}
              >
                {v.symbol}
              </motion.button>
              <AnimatePresence>
                {active === v.key && (
                  <motion.div
                    className="var-tooltip"
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ color: v.color, fontWeight: 700, marginBottom: 4 }}>{v.label}</div>
                    <div style={{ color: '#06b6d4', fontSize: '0.7rem', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                      {v.unit}
                    </div>
                    <div style={{ color: 'rgba(240,244,255,0.75)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                      {v.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </motion.div>

      {/* Chart + insight */}
      <div style={{ display: 'flex', gap: 24, width: '100%', maxWidth: 900, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <motion.div
          style={{ flex: 2, minWidth: 280 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <StefanChart />
        </motion.div>

        <motion.div
          style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 10 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="glass-card glow-card-orange" style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(240,244,255,0.75)' }}>
            <div style={{ color: '#ff7b00', fontWeight: 700, marginBottom: 8 }}>⚡ El poder de T⁴</div>
            Si la temperatura <span className="highlight-text">se duplica</span>, la potencia emitida
            se multiplica por <span className="highlight-text">16</span>.
          </div>
          <div className="glass-card glow-card-violet" style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(240,244,255,0.75)' }}>
            <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 8 }}>🌡️ Ejemplo real</div>
            El Sol (5778 K) emite ~6.3 × 10⁷ <span className="highlight-violet">W/m²</span>.
            La Tierra (288 K) emite ~390 <span className="highlight-violet">W/m²</span>.
          </div>
          <div style={{
            padding: '10px 14px',
            background: 'rgba(244,114,182,0.07)',
            border: '1px solid rgba(244,114,182,0.25)',
            borderRadius: 10,
            fontSize: '0.75rem',
            color: 'rgba(240,244,255,0.6)',
            lineHeight: 1.6,
          }}>
            σ = 5.67 × 10⁻⁸ W/m²·K⁴<br />
            <span style={{ color: '#f472b6' }}>Constante de Stefan-Boltzmann</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
