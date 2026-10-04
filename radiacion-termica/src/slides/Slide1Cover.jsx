import { motion } from 'framer-motion'

export default function Slide1Cover() {
  return (
    <div className="slide cover-slide">
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,123,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,123,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Sun with waves */}
      <motion.div
        className="sun-container"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
      >
        <div className="wave-ring" />
        <div className="wave-ring" />
        <div className="wave-ring" />
        <div className="sun-core" />

        {/* Floating sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#ffaa44' : '#8b5cf6',
              top: '50%',
              left: '50%',
              boxShadow: `0 0 6px ${i % 2 === 0 ? '#ffaa44' : '#8b5cf6'}`,
            }}
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2) * (80 + Math.random() * 30),
              y: Math.sin((i / 8) * Math.PI * 2) * (80 + Math.random() * 30),
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Titles */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.h1
          className="cover-main-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Radiación Térmica
        </motion.h1>

        <motion.p
          className="cover-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          Transferencia de energía mediante ondas electromagnéticas
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="cover-badge">Termodinámica Física</span>
          <span className="cover-badge" style={{ borderColor: 'rgba(255,123,0,0.4)', color: '#ffaa44' }}>
            Ley de Stefan-Boltzmann
          </span>
        </motion.div>
      </motion.div>

      {/* Hint */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 50,
          fontSize: '0.7rem',
          color: '#2a3545',
          letterSpacing: '0.15em',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Presiona → para continuar
      </motion.div>
    </div>
  )
}
