import { motion } from 'framer-motion'

const FLOWS = [
  {
    from: { icon: '☀️', label: 'Sol', sub: '~5778 K', color: '#ffcc44' },
    to:   { icon: '🌍', label: 'Tierra', sub: '~288 K', color: '#4ade80' },
    arrow: '→',
    desc: 'Radiación solar viaja 150 Mkm por vacío',
  },
  {
    from: { icon: '💻', label: 'CPU', sub: '~350 K', color: '#ff7b00' },
    to:   { icon: '🌀', label: 'Disipador', sub: '+ convección', color: '#06b6d4' },
    arrow: '→',
    desc: 'Flujo de calor combinado',
  },
  {
    from: { icon: '🚀', label: 'Satélite', sub: 'calor interno', color: '#a78bfa' },
    to:   { icon: '🌌', label: 'Espacio', sub: '~3 K', color: '#3366ff' },
    arrow: '→',
    desc: 'Solo radiación en el vacío espacial',
  },
]

export default function Slide9Importance() {
  return (
    <div className="slide" style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 28,
      background: 'radial-gradient(ellipse at 50% 40%, #0d1f3c 0%, #050505 70%)',
    }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: 700 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label">Síntesis</p>
        <h2 className="slide-title">
          Importancia de la<br />Radiación Térmica
        </h2>
        <div className="glow-line" />
        <p style={{ fontSize: '0.9rem', color: 'rgba(240,244,255,0.6)', lineHeight: 1.7, marginTop: 12 }}>
          La radiación térmica permite estudiar cómo los sistemas intercambian energía
          {' '}<span className="highlight-text">sin contacto ni fluido intermediario</span>.
          Es la única forma de transferencia que funciona en el vacío.
        </p>
      </motion.div>

      {/* Flow diagrams */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 750 }}>
        {FLOWS.map((flow, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 24px',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
          >
            {/* From */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
              <span style={{ fontSize: '2rem' }}>{flow.from.icon}</span>
              <span style={{ color: flow.from.color, fontWeight: 700, fontSize: '0.8rem' }}>{flow.from.label}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>{flow.from.sub}</span>
            </div>

            {/* Arrow + desc */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 160 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%' }}>
                <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, rgba(255,123,0,0.3), rgba(255,123,0,0.8))' }} />
                <motion.span
                  style={{ color: '#ff7b00', fontSize: '1.2rem', margin: '0 4px' }}
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ▶
                </motion.span>
                <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, rgba(255,123,0,0.8), rgba(255,123,0,0.3))' }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                {flow.desc}
              </span>
            </div>

            {/* To */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
              <span style={{ fontSize: '2rem' }}>{flow.to.icon}</span>
              <span style={{ color: flow.to.color, fontWeight: 700, fontSize: '0.8rem' }}>{flow.to.label}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>{flow.to.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key points */}
      <motion.div
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { text: 'Funciona en el vacío', color: '#ff7b00' },
          { text: 'Velocidad de la luz', color: '#06b6d4' },
          { text: 'Depende de T⁴', color: '#f472b6' },
          { text: 'No necesita contacto', color: '#a78bfa' },
        ].map(({ text, color }) => (
          <div key={text} style={{
            padding: '7px 16px',
            background: `${color}11`,
            border: `1px solid ${color}33`,
            borderRadius: 20,
            fontSize: '0.78rem',
            color,
            fontWeight: 600,
          }}>
            ✦ {text}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
