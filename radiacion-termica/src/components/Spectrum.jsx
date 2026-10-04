import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REGIONS = [
  {
    name: 'Radio',
    lambda: '> 1 m',
    freq: '< 3×10⁸ Hz',
    textColor: '#d080ff',
    energy: 'Muy baja energía',
    desc: 'Ondas electromagnéticas de mayor longitud de onda y menor frecuencia del espectro. Utilizadas en telecomunicaciones y radioastronomía.',
  },
  {
    name: 'Microondas',
    lambda: '1 mm – 1 m',
    freq: '3×10⁸ – 3×10¹¹ Hz',
    textColor: '#9966ff',
    energy: 'Energía baja',
    desc: 'Ondas electromagnéticas de frecuencia intermedia entre las ondas de radio y el infrarrojo. Presentan menor frecuencia que la radiación infrarroja.',
  },
  {
    name: 'Infrarrojo',
    lambda: '700 nm – 1 mm',
    freq: '3×10¹¹ – 4×10¹⁴ Hz',
    textColor: '#ff8844',
    energy: 'Energía moderada',
    desc: 'Región principal de la transferencia térmica cotidiana. Todo cuerpo con temperatura superior al cero absoluto emite radiación predominantemente en este rango.',
    highlight: true,
  },
  {
    name: 'Visible',
    lambda: '380 – 700 nm',
    freq: '4×10¹⁴ – 7.5×10¹⁴ Hz',
    textColor: '#88ff44',
    energy: 'Energía media',
    desc: 'Rango perceptible por el ojo humano. Los cuerpos a temperaturas muy elevadas (≥ 1000 K) comienzan a emitir en esta región del espectro.',
  },
  {
    name: 'Ultravioleta',
    lambda: '10 – 380 nm',
    freq: '7.5×10¹⁴ – 3×10¹⁶ Hz',
    textColor: '#44aaff',
    energy: 'Energía alta',
    desc: 'Emitido por fuentes a temperaturas muy elevadas (T > 10 000 K). Presenta alta energía por fotón según la relación E = hf.',
  },
  {
    name: 'Rayos X',
    lambda: '0.01 – 10 nm',
    freq: '3×10¹⁶ – 3×10¹⁹ Hz',
    textColor: '#0088ff',
    energy: 'Energía muy alta',
    desc: 'Radiación de alta frecuencia emitida por plasma a temperaturas del orden de millones de Kelvin. Presente en fenómenos astrofísicos extremos.',
  },
  {
    name: 'Rayos γ',
    lambda: '< 0.01 nm',
    freq: '> 3×10¹⁹ Hz',
    textColor: '#0044aa',
    energy: 'Energía extrema',
    desc: 'Región de mayor frecuencia y energía del espectro electromagnético. Se originan en procesos de alta energía como los presentes en estrellas de neutrones.',
  },
]

export default function Spectrum() {
  const [active, setActive] = useState(2) // Infrarrojo por defecto

  return (
    <div className="spectrum-bar-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Gradient bar */}
      <div className="spectrum-gradient-bar" />

      {/* Region tabs */}
      <div className="spectrum-regions">
        {REGIONS.map((r, i) => (
          <motion.div
            key={r.name}
            className={`spectrum-region${active === i ? ' active' : ''}`}
            style={{ color: r.textColor }}
            onClick={() => setActive(i)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.68rem' }}>{r.name}</span>
            {r.highlight && (
              <span style={{
                display: 'block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#ff8844',
                margin: '4px auto 0',
                boxShadow: '0 0 6px #ff8844',
              }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Info panel */}
      <div className="spectrum-info-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="glass-card"
            style={{
              borderColor: `${REGIONS[active].textColor}44`,
              boxShadow: `0 0 20px ${REGIONS[active].textColor}22`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ minWidth: 140 }}>
                <div style={{ color: REGIONS[active].textColor, fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
                  {REGIONS[active].highlight && '⭐ '}{REGIONS[active].name}
                </div>
                <div style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                  λ = {REGIONS[active].lambda}
                </div>
                <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  f = {REGIONS[active].freq}
                </div>
                <div style={{ color: REGIONS[active].textColor, fontSize: '0.72rem', fontWeight: 600 }}>
                  {REGIONS[active].energy}
                </div>
              </div>
              <div style={{ flex: 1, fontSize: '0.82rem', color: 'rgba(240,244,255,0.75)', lineHeight: 1.6, minWidth: 200 }}>
                {REGIONS[active].desc}
                {REGIONS[active].highlight && (
                  <div style={{
                    marginTop: 8,
                    padding: '6px 12px',
                    background: 'rgba(255,136,68,0.1)',
                    borderRadius: 8,
                    border: '1px solid rgba(255,136,68,0.3)',
                    color: '#ff8844',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}>
                    ★ Principal región de transferencia de energía térmica por radiación
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
