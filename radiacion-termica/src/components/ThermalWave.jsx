import { useEffect, useRef } from 'react'

/**
 * Animated SVG thermal waves radiating outward from a heat source.
 * Props:
 *   width, height  – canvas dimensions
 *   color          – wave stroke color (default orange)
 *   intensity      – 0..1, controls number of waves & opacity
 */
export default function ThermalWave({ width = 300, height = 200, color = '#ff7b00', intensity = 0.7 }) {
  const svgRef = useRef(null)

  const waveCount = Math.max(2, Math.round(intensity * 6))
  const waves = Array.from({ length: waveCount }, (_, i) => i)

  const cx = width * 0.2
  const cy = height * 0.5

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="thermal-wave-svg"
      aria-label="Ondas de calor radiante"
      style={{ overflow: 'visible' }}
    >
      {/* Heat source */}
      <circle cx={cx} cy={cy} r={18} fill={color} opacity={0.9}>
        <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={28} fill="none" stroke={color} strokeWidth={1.5} opacity={0.4}>
        <animate attributeName="r" values="20;34;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Radiating waves */}
      {waves.map((i) => {
        const delay = (i / waveCount) * 2.5
        const amp = 12 + i * 4
        const startX = cx + 24
        const spacing = (width - startX - 20) / (waveCount + 1)
        const x0 = startX + spacing * i

        return (
          <g key={i}>
            <path
              d={`M ${x0} ${cy - amp} Q ${x0 + spacing * 0.5} ${cy} ${x0} ${cy + amp}`}
              className="wave-path"
              stroke={color}
              strokeWidth={2}
              opacity={0.7 - i * 0.08}
            >
              <animate
                attributeName="d"
                values={`
                  M ${x0} ${cy - amp} Q ${x0 + spacing * 0.4} ${cy} ${x0} ${cy + amp};
                  M ${x0} ${cy - amp * 1.15} Q ${x0 + spacing * 0.55} ${cy} ${x0} ${cy + amp * 1.15};
                  M ${x0} ${cy - amp} Q ${x0 + spacing * 0.4} ${cy} ${x0} ${cy + amp}
                `}
                dur={`${1.8 + i * 0.15}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`0;${0.8 - i * 0.1};0`}
                dur={`${1.8 + i * 0.15}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        )
      })}

      {/* Receiver body */}
      <rect
        x={width - 36}
        y={cy - 22}
        width={28}
        height={44}
        rx={6}
        fill="rgba(139,92,246,0.3)"
        stroke="#8b5cf6"
        strokeWidth={1.5}
      />
      <text x={width - 22} y={cy + 5} textAnchor="middle" fill="#a78bfa" fontSize="10">
        Receptor
      </text>

      {/* Label */}
      <text x={cx} y={cy + 40} textAnchor="middle" fill={color} fontSize="10" opacity={0.8}>
        Fuente caliente
      </text>

      {/* No-medium label */}
      <text x={width / 2} y={18} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" letterSpacing="1">
        ── sin medio material ──
      </text>
    </svg>
  )
}
