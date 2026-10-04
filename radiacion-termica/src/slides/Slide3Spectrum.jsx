import { motion } from 'framer-motion'
import Spectrum from '../components/Spectrum'

export default function Slide3Spectrum() {
  return (
    <div className="slide" style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      background: 'radial-gradient(ellipse at 50% 20%, #0d1f3c 0%, #050505 65%)',
      paddingTop: 50,
    }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: 750 }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label">Ondas Electromagnéticas</p>
        <h2 className="slide-title" style={{ marginBottom: '0.5rem' }}>
          El Espectro Electromagnético
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(240,244,255,0.5)', lineHeight: 1.7 }}>
          La radiación infrarroja es la región del espectro más relacionada con la{' '}
          <span className="highlight-text">transferencia térmica cotidiana</span>.
          Haz clic en cada región para explorarla.
        </p>
      </motion.div>

      <motion.div
        style={{ width: '100%', maxWidth: 950 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <Spectrum />
      </motion.div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { label: 'Velocidad en vacío', value: 'c = 3×10⁸ m/s', color: '#06b6d4' },
          { label: 'Energía por fotón', value: 'E = h·f', color: '#a78bfa' },
          { label: 'Ley de Wien', value: 'λₘₐₓ · T = 2.898×10⁻³ m·K', color: '#ff7b00' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 18px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${color}33`,
            borderRadius: 10,
          }}>
            <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {label}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', color, fontSize: '0.85rem', marginTop: 4 }}>
              {value}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
