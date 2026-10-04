import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Presentation from './components/Presentation'
import ParticlesBackground from './components/ParticlesBackground'

export default function App() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) {
      document.title = 'Radiación Térmica — Presentación'
    }
  }, [started])

  return (
    <>
      <ParticlesBackground />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="landing"
            className="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Decorative rings */}
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              border: '1px solid rgba(255,123,0,0.06)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              width: '900px',
              height: '900px',
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.05)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />

            <motion.p
              className="landing-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Termodinámica Física
            </motion.p>

            <motion.p
              className="landing-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Radiación Térmica · Transferencia de Energía Electromagnética
            </motion.p>

            <motion.button
              className="present-button"
              onClick={() => setStarted(true)}
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.7, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              ▶ PRESENTAR
            </motion.button>

            <motion.p
              style={{ marginTop: '2rem', fontSize: '0.7rem', color: '#2a3545', letterSpacing: '0.15em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              10 DIAPOSITIVAS · SIMULACIONES INTERACTIVAS
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="presentation"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'fixed', inset: 0 }}
          >
            <Presentation onRestart={() => setStarted(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
