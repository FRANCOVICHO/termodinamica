import { motion } from 'framer-motion'

export default function Slide10Conclusion({ onRestart }) {
  return (
    <div className="slide conclusion-slide" style={{
      background: 'radial-gradient(ellipse at 50% 50%, #0d1f3c 0%, #050505 70%)',
    }}>
      {/* Decorative orbit rings */}
      {[300, 500, 700].map((size, i) => (
        <motion.div
          key={size}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(255,123,0,${0.06 - i * 0.015})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label" style={{ textAlign: 'center' }}>Conclusión</p>
        <h2 className="slide-title" style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          marginBottom: '1.5rem',
        }}>
          Síntesis Final
        </h2>
      </motion.div>

      <motion.div
        className="conclusion-quote"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        La energía térmica puede viajar incluso en el{' '}
        <span className="highlight-text">vacío</span> mediante{' '}
        <span className="highlight-violet">ondas electromagnéticas</span>.
        La termodinámica describe este fenómeno con la{' '}
        <span className="highlight-text">Ley de Stefan-Boltzmann</span>:
        la potencia emitida crece con la{' '}
        <span style={{ color: '#f472b6', fontWeight: 700 }}>cuarta potencia</span>{' '}
        de la temperatura absoluta.
      </motion.div>

      {/* Key equations strip */}
      <motion.div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { eq: 'P = εσAT⁴', label: 'Stefan-Boltzmann', color: '#ff7b00' },
          { eq: 'λₘₐₓ·T = b', label: 'Ley de Wien', color: '#a78bfa' },
          { eq: 'E = hf', label: 'Planck', color: '#06b6d4' },
        ].map(({ eq, label, color }) => (
          <div key={eq} style={{
            padding: '10px 20px',
            background: `${color}0d`,
            border: `1px solid ${color}33`,
            borderRadius: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', color, fontSize: '1rem', fontWeight: 700 }}>{eq}</div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', marginTop: 3, letterSpacing: '0.1em' }}>{label}</div>
          </div>
        ))}
      </motion.div>

      <motion.button
        className="restart-button"
        onClick={onRestart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,123,0,0.5)' }}
        whileTap={{ scale: 0.97 }}
      >
        ↩ Reiniciar presentación
      </motion.button>
    </div>
  )
}
