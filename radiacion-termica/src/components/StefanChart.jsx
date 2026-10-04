import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

const SIGMA = 5.67e-8
const EPS = 0.9

function generateData(steps = 20) {
  const data = []
  for (let i = 0; i <= steps; i++) {
    const T = 200 + (i / steps) * 1400
    const P = EPS * SIGMA * Math.pow(T, 4)
    data.push({
      T: Math.round(T),
      P: parseFloat((P / 1000).toFixed(2)), // kW/m²
    })
  }
  return data
}

const data = generateData()

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(8,27,51,0.95)',
        border: '1px solid rgba(255,123,0,0.3)',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <div style={{ color: '#ff7b00', marginBottom: 4 }}>T = {label} K</div>
        <div style={{ color: '#f472b6' }}>P = {payload[0].value} kW/m²</div>
      </div>
    )
  }
  return null
}

export default function StefanChart({ highlightT }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="stefanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="50%"  stopColor="#ff7b00" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f472b6" stopOpacity={1}   />
          </linearGradient>
          <linearGradient id="stefanFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ff7b00" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#ff7b00" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="T"
          stroke="rgba(255,255,255,0.2)"
          tick={{ fill: '#8892a4', fontSize: 10 }}
          label={{ value: 'T (K)', position: 'insideBottomRight', fill: '#8892a4', fontSize: 10 }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.2)"
          tick={{ fill: '#8892a4', fontSize: 10 }}
          label={{ value: 'P (kW/m²)', angle: -90, position: 'insideLeft', fill: '#8892a4', fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {highlightT && (
          <ReferenceLine
            x={highlightT}
            stroke="#ff7b00"
            strokeDasharray="4 3"
            label={{ value: `${highlightT}K`, fill: '#ff7b00', fontSize: 10 }}
          />
        )}
        <Area
          type="monotone"
          dataKey="P"
          stroke="url(#stefanGrad)"
          strokeWidth={2.5}
          fill="url(#stefanFill)"
          dot={false}
          activeDot={{ r: 5, fill: '#ff7b00', stroke: '#fff', strokeWidth: 1 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
