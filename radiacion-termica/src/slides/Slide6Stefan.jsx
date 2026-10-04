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
    desc: 'Energía emitida por unidad de tiempo. Representa la tasa de transferencia de energía por radiación. A mayor temperatura, crece de forma muy pronunciada.',
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
    desc: 'Indica qué tan cerca está el comportamiento radiativo de un cuerpo real respecto al cuerpo negro ideal. ε = 1 corresponde al emisor perfecto.',
  },
  {
    key: 'sig',
    symbol: 'σ',
    label: 'Constante de Stefan-Boltzmann',
    unit: '5.67 × 10⁻⁸ W/m²·K⁴',
    color: '#06b6d4',
    desc: 'Constante física fundamental. Vincula la temperatura absoluta de un cuerpo con la potencia total de radiación que emite por unidad de área.',
  },
  {
    key: 'A',
    symbol: 'A',
    label: 'Área superficial',
    unit: 'm² (metros cuadrados)',
    color: '#22d3ee',
    desc: 'Superficie total del cuerpo que emite radiación. La potencia total emitida es proporcional al área: a mayor superficie, mayor radiación total.',
  },
  {
    key: 'T4',
    symbol: 'T⁴',
    label: 'Temperatura absoluta (a la 4ª)',
    unit: 'K⁴ (Kelvin a la cuarta potencia)',
    color: '#f472b6',
    desc: 'Factor dominante de la ley. Duplicar la temperatura absoluta multiplica la potencia emitida por 16 (2⁴). Pequeños incrementos de T generan grandes aumentos en la radiación.',
  },
]

export default function Slide6Stefan() {
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
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 4, maxWidth: 560, margin: '4px auto 0' }}>
          Permite calcular la potencia total emitida por un cuerpo a partir de su temperatura.
          Haz clic en cada variable para ver su significado físico.
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
            <span key={v.key} className="formula-var eq">{v.symbol}</span>
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
                    <div style={{ color: 'rgba(240,244,255,0.8)', fontSize: '0.75rem', lineHeight: 1.55 }}>
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
          <div className="glass-card glow-card-orange" style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'rgba(240,244,255,0.8)' }}>
            <div style={{ color: '#ff7b00', fontWeight: 700, marginBottom: 8 }}>⚡ El término T⁴</div>
            Pequeños aumentos de temperatura producen{' '}
            <span className="highlight-text">grandes aumentos</span> en la radiación emitida.
            Si T se duplica, P se multiplica por{' '}
            <span className="highlight-text">16</span>.
          </div>
          <div className="glass-card glow-card-violet" style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'rgba(240,244,255,0.8)' }}>
            <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 8 }}>🌡️ Ejemplo físico</div>
            El Sol (T ≈ 5778 K) emite ~6.3 × 10⁷{' '}
            <span className="highlight-violet">W/m²</span>.
            La Tierra (T ≈ 288 K) emite ~390{' '}
            <span className="highlight-violet">W/m²</span>.
          </div>
          <div style={{
            padding: '10px 14px',
            background: 'rgba(244,114,182,0.07)',
            border: '1px solid rgba(244,114,182,0.25)',
            borderRadius: 10,
            fontSize: '0.74rem',
            color: 'rgba(240,244,255,0.6)',
            lineHeight: 1.65,
          }}>
            σ = 5.67 × 10⁻⁸ W/m²·K⁴<br />
            <span style={{ color: '#f472b6' }}>Constante de Stefan-Boltzmann</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
