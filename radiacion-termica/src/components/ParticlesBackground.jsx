import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    const count = 35

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 3 + 1
      const colors = ['#ff7b00', '#ff4400', '#8b5cf6', '#06b6d4', '#ffaa44']
      const color = colors[Math.floor(Math.random() * colors.length)]
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${color};
        box-shadow: 0 0 ${size * 3}px ${color};
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return <div className="particles-container" ref={containerRef} />
}
