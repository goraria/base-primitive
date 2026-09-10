"use client"

import { motion } from "motion/react"
import { cn } from "cn"

export interface ThreeDMarqueeProps {
  images?: string[]
  colors?: string[]
  className?: string
  reverse?: boolean
}

export const ThreeDMarquee = ({
  images,
  colors,
  className,
  reverse = false,
}: ThreeDMarqueeProps) => {
  const items = colors || images || []
  const useColors = !!colors

  // Split into 4 columns
  const columns: string[][] = [[], [], [], []]
  items.forEach((item, i) => {
    columns[i % 4].push(item)
  })

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Perspective container - centered with large overflow */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          perspective: "1000px",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* 3D transformed grid - made very large to cover after rotation */}
        <div
          className="grid grid-cols-4 gap-6"
          style={{
            transform: `rotateX(60deg) rotateZ(${reverse ? "45deg" : "-45deg"})`,
            transformStyle: "preserve-3d",
            width: "300vmax",
            height: "300vmax",
          }}
        >
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex flex-col gap-6"
              animate={{
                y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
              }}
              transition={{
                duration: colIndex % 2 === 0 ? 20 : 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {/* Triple items for seamless loop */}
              {[...column, ...column, ...column].map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl shadow-xl"
                  style={{
                    backgroundColor: useColors ? item : undefined,
                    minHeight: "20vmax",
                  }}
                  whileHover={{
                    y: -20,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  {!useColors && <img src={item} alt="" className="size-full object-cover" />}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  )
}

// Demo
const demoColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#a855f7",
  "#f43f5e",
  "#10b981",
  "#6366f1",
  "#d946ef",
  "#0ea5e9",
]

export function Demo() {
  return (
    <div className="fixed inset-0 bg-background">
      <ThreeDMarquee colors={demoColors} />
    </div>
  )
}
