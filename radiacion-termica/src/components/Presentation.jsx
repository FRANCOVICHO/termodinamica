import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Slide1Cover               from '../slides/Slide1Cover'
import Slide2Definition          from '../slides/Slide2Definition'
import Slide3Spectrum            from '../slides/Slide3Spectrum'
import Slide4Temperature         from '../slides/Slide4Temperature'
import Slide5EmissionAbsorption  from '../slides/Slide5EmissionAbsorption'
import Slide6Stefan              from '../slides/Slide6Stefan'
import Slide7BlackBody           from '../slides/Slide7BlackBody'
import Slide8Applications        from '../slides/Slide8Applications'
import Slide9Simulator           from '../slides/Slide9Simulator'
import Slide10Importance         from '../slides/Slide10Importance'
import Slide11Conclusion         from '../slides/Slide11Conclusion'

const SLIDES = [
  Slide1Cover,
  Slide2Definition,
  Slide3Spectrum,
  Slide4Temperature,
  Slide5EmissionAbsorption,
  Slide6Stefan,
  Slide7BlackBody,
  Slide8Applications,
  Slide9Simulator,
  Slide10Importance,
  Slide11Conclusion,
]

const SLIDE_TITLES = [
  'Portada',
  '¿Qué es la Radiación Térmica?',
  'El Espectro Electromagnético',
  'Temperatura y Emisión',
  'Emisión y Absorción',
  'Ley de Stefan-Boltzmann',
  'Cuerpo Negro y Emisividad',
  'Aplicaciones',
  'Simulador',
  'Importancia',
  'Conclusión',
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function Presentation({ onRestart }) {
  const [index, setIndex]         = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = useCallback(() => {
    if (index < SLIDES.length - 1) {
      setDirection(1)
      setIndex(i => i + 1)
    }
  }, [index])

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1)
      setIndex(i => i - 1)
    }
  }, [index])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const CurrentSlide = SLIDES[index]
  const progress     = ((index + 1) / SLIDES.length) * 100

  return (
    <div className="presentation">
      {/* Slide area */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <CurrentSlide onRestart={onRestart} />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Slide title tooltip above counter */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 100,
        textAlign: 'right', pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.05em', marginBottom: 2,
        }}>
          {SLIDE_TITLES[index]}
        </div>
        <div className="slide-counter" style={{ position: 'static' }}>
          {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>
      </div>

      {/* Nav arrows */}
      <div className="nav-arrows">
        <button className="nav-btn" onClick={goPrev} disabled={index === 0} aria-label="Diapositiva anterior">←</button>
        <button className="nav-btn" onClick={goNext} disabled={index === SLIDES.length - 1} aria-label="Siguiente diapositiva">→</button>
      </div>

      {/* Keyboard hint */}
      <div className="keyboard-hint">
        <span className="kbd">←</span>
        <span className="kbd">→</span>
        <span style={{ marginLeft: 4 }}>navegar</span>
      </div>
    </div>
  )
}
