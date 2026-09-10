"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"

export interface FirefliesBackgroundProps {
  className?: string
  children?: React.ReactNode
  /** Number of fireflies */
  count?: number
  /** Firefly color */
  color?: string
  /** Animation speed multiplier */
  speed?: number
  /** Glow intensity */
  glowIntensity?: number
}

interface Firefly {
  x: number
  y: number
  size: number
  phase: number
  pulseSpeed: number
  noiseOffsetX: number
  noiseOffsetY: number
  noiseSpeed: number
  depth: number
}

export function FirefliesBackground({
  className,
  children,
  count = 40,
  color = "rgba(255, 255, 150, 1)",
  speed = 1,
  glowIntensity = 1,
}: FirefliesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height
    canvas.width = width
    canvas.height = height

    let animationId: number
    let tick = 0

    // Simple noise function for organic movement
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.01 + t) * 0.5 +
        Math.sin(y * 0.013 + t * 1.1) * 0.5 +
        Math.sin((x + y) * 0.007 + t * 0.9) * 0.3
      )
    }

    // Create fireflies
    const createFirefly = (): Firefly => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
      noiseSpeed: 0.3 + Math.random() * 0.4,
      depth: 0.3 + Math.random() * 0.7, // 0.3 = far, 1 = close
    })

    const fireflies: Firefly[] = Array.from({ length: count }, createFirefly)

    // Parse color for variations
    const parseColor = (c: string) => {
      const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (match) {
        return {
          r: Number.parseInt(match[1]),
          g: Number.parseInt(match[2]),
          b: Number.parseInt(match[3]),
        }
      }
      return { r: 255, g: 255, b: 150 }
    }

    const rgb = parseColor(color)

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // Animation
    const animate = () => {
      tick += speed

      // Clear with slight trail
      ctx.fillStyle = "rgba(5, 10, 20, 0.15)"
      ctx.fillRect(0, 0, width, height)

      for (const firefly of fireflies) {
        // Organic movement using noise
        const noiseX = noise(
          firefly.noiseOffsetX,
          firefly.noiseOffsetY,
          tick * 0.01 * firefly.noiseSpeed,
        )
        const noiseY = noise(
          firefly.noiseOffsetY,
          firefly.noiseOffsetX,
          tick * 0.01 * firefly.noiseSpeed + 100,
        )

        firefly.x += noiseX * firefly.depth * speed * 0.5
        firefly.y += noiseY * firefly.depth * speed * 0.5

        // Wrap around edges smoothly
        if (firefly.x < -20) firefly.x = width + 20
        if (firefly.x > width + 20) firefly.x = -20
        if (firefly.y < -20) firefly.y = height + 20
        if (firefly.y > height + 20) firefly.y = -20

        // Pulse - fireflies fade in and out
        const pulse = Math.sin(tick * firefly.pulseSpeed * speed + firefly.phase)
        // Transform sine wave to have longer off periods
        const brightness = Math.max(0, pulse * 1.5 - 0.3)

        if (brightness <= 0) continue // Skip drawing if completely off

        const currentSize = firefly.size * firefly.depth * (0.8 + brightness * 0.2)
        const alpha = brightness * firefly.depth

        // Glow effect
        const glowRadius = currentSize * (4 + brightness * 4) * glowIntensity
        const gradient = ctx.createRadialGradient(
          firefly.x,
          firefly.y,
          0,
          firefly.x,
          firefly.y,
          glowRadius,
        )

        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.9})`)
        gradient.addColorStop(0.1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`)
        gradient.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.2})`)
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, currentSize * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    // Initial fill
    ctx.fillStyle = "#050a14"
    ctx.fillRect(0, 0, width, height)

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [count, color, speed, glowIntensity])

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden", className)}
      style={{
        background: "linear-gradient(to bottom, #050a14 0%, #0a1428 50%, #051020 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle ambient glow spots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(100, 150, 80, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 80% 30%, rgba(80, 120, 100, 0.06) 0%, transparent 40%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,5,10,0.9) 100%)",
        }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default function FirefliesBackgroundDemo() {
  return <FirefliesBackground />
}
