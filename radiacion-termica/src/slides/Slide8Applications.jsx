import { useState } from 'react'
import { motion } from 'framer-motion'

const APPS = [
  {
    icon: '☀️',
    name: 'Sol y energía solar',
    color: '#ffcc44',
    desc: 'El Sol emite ~3.8 × 10²⁶ W como radiación electromagnética. Esta energía recorre 150 millones de km por el vacío hasta alcanzar la Tierra, sin necesitar ningún medio material.',
  },
  {
    icon: '📷',
    name: 'Cámaras térmicas',
    color: '#ff7b00',
    desc: 'Detectan la radiación infrarroja emitida por cualquier cuerpo a temperatura superior al cero absoluto. Aplicadas en ingeniería, medicina, rescate y análisis estructural.',
  },
  {
    icon: '🚀',
    name: 'Satélites y naves espaciales',
    color: '#a78bfa',
    desc: 'Entre cuerpos separados en el vacío espacial no existe transferencia por conducción o convección. La radiación es el mecanismo dominante para el control térmico de satélites.',
  },
  {
    icon: '💻',
    name: 'Electrónica y disipación',
    color: '#06b6d4',
    desc: 'Los componentes electrónicos emiten radiación infrarroja proporcional a su temperatura. El análisis térmico por radiación guía el diseño de disipadores y sistemas de enfriamiento.',
  },
  {
    icon: '🏠',
    name: 'Aislamiento térmico',
    color: '#22d3ee',
    desc: 'Las superficies de baja emisividad (ε pequeño) reducen la transferencia radiante hacia el exterior. Aplicado en ventanas de alta eficiencia energética y envolventes de edificios.',
  },
  {
    icon: '⚙️',
    name: 'Ingeniería térmica',
    color: '#4ade80',
    desc: 'El intercambio radiativo entre superficies es fundamental en hornos industriales, intercambiadores de calor y diseño de equipos donde la transferencia por radiación es dominante.',
  },
]

export default function Slide8Applications() {
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
        <p className="slide-label">Aplicaciones en Física e Ingeniería</p>
        <h2 className="slide-title" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}>
          La Radiación Térmica en la Práctica
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
