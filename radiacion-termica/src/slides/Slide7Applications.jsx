import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const APPS = [
  {
    icon: '☀️',
    name: 'Sol y energía solar',
    color: '#ffcc44',
    desc: 'El Sol emite ~3.8 × 10²⁶ W. La energía viaja 150 millones de km por radiación electromagnética hasta alcanzar la Tierra sin necesitar ningún medio material.',
  },
  {
    icon: '📷',
    name: 'Cámaras térmicas',
    color: '#ff7b00',
    desc: 'Detectan la radiación infrarroja emitida por objetos (incluso en total oscuridad). Usadas en medicina, rescate, análisis estructural y militar.',
  },
  {
    icon: '🚀',
    name: 'Satélites y naves',
    color: '#a78bfa',
    desc: 'En el espacio no hay conducción ni convección. El intercambio de calor ocurre exclusivamente por radiación. Los paneles térmicos controlan la temperatura.',
  },
  {
    icon: '💻',
    name: 'Electrónica',
    color: '#06b6d4',
    desc: 'Los procesadores emiten radiación infrarroja. El análisis térmico permite diseñar disipadores, pastas térmicas y soluciones de enfriamiento.',
  },
  {
    icon: '🏠',
    name: 'Construcción',
    color: '#22d3ee',
    desc: 'Las ventanas de baja emisividad (Low-E) bloquean la radiación infrarroja. El aislamiento térmico reduce la transferencia radiante hacia el exterior.',
  },
  {
    icon: '🌍',
    name: 'Efecto invernadero',
    color: '#4ade80',
    desc: 'La atmósfera absorbe radiación infrarroja emitida por la Tierra y reemite parte hacia abajo, elevando la temperatura superficial media del planeta.',
  },
]

export default function Slide7Applications() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="slide" style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      background: 'radial-gradient(ellipse at 50% 30%, #0d1f3c 0%, #050505 70%)',
    }}>
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="slide-label">Aplicaciones Reales</p>
        <h2 className="slide-title" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}>
          La Radiación en el Mundo Real
        </h2>
      </motion.div>

      <div className="apps-grid" style={{ maxWidth: 950 }}>
        {APPS.map((app, i) => (
          <motion.div
            key={app.name}
            className="app-card"
            style={{ borderColor: hovered === i ? `${app.color}55` : 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -8, boxShadow: `0 16px 40px ${app.color}22` }}
          >
            <motion.div
              className="app-icon"
              animate={hovered === i ? { scale: 1.2, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              {app.icon}
            </motion.div>
            <div className="app-name" style={{ color: hovered === i ? app.color : 'white' }}>
              {app.name}
            </div>
            <div className="app-desc">
              {app.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
