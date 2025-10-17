import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Disc3 } from 'lucide-react'
import confetti from 'canvas-confetti'

const PRIZES = [
  { label: 'Date Night', emoji: '🌙', color: 'from-purple-400 to-purple-500' },
  { label: 'Massage', emoji: '💆', color: 'from-pink-400 to-pink-500' },
  { label: 'Movie Night', emoji: '🎬', color: 'from-blue-400 to-blue-500' },
  { label: 'Home Cooked Meal', emoji: '🍽️', color: 'from-teal-400 to-teal-500' },
  { label: 'Breakfast in Bed', emoji: '☕', color: 'from-amber-400 to-amber-500' },
  { label: 'Surprise Gift', emoji: '🎁', color: 'from-rose-400 to-rose-500' },
]

export function SpinningWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<typeof PRIZES[0] | null>(null)
  const [spinCount, setSpinCount] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)
    setSpinCount(prev => prev + 1)

    // Random number of full rotations + random position
    const spins = 5 + Math.random() * 3
    const randomDegree = Math.random() * 360
    const totalRotation = rotation + spins * 360 + randomDegree

    setRotation(totalRotation)

    // Determine which prize was landed on
    setTimeout(() => {
      const normalizedRotation = totalRotation % 360
      const segmentSize = 360 / PRIZES.length
      const prizeIndex = Math.floor((360 - normalizedRotation) / segmentSize) % PRIZES.length
      setResult(PRIZES[prizeIndex])
      setIsSpinning(false)

      // Confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6'],
      })
    }, 4000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Disc3 className="w-5 h-5 text-primary" />
          Spinning Wheel
        </CardTitle>
        <CardDescription>
          {isSpinning ? 'Spinning...' : spinCount === 0 ? 'Spin for a prize!' : 'Spin again!'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative flex items-center justify-center p-4">
          {/* Pointer/Arrow */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-primary drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <div className="relative w-64 h-64">
            <svg
              className="absolute inset-0 w-full h-full rounded-full shadow-2xl transition-transform"
              viewBox="0 0 200 200"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '4s' : '0s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <defs>
                {PRIZES.map((prize, index) => (
                  <linearGradient key={`grad-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={`var(--gradient-${index}-from)`} />
                    <stop offset="100%" stopColor={`var(--gradient-${index}-to)`} />
                  </linearGradient>
                ))}
              </defs>

              {/* Wheel segments */}
              {PRIZES.map((prize, index) => {
                const segmentAngle = 360 / PRIZES.length
                const startAngle = index * segmentAngle - 90 // Start from top
                const endAngle = startAngle + segmentAngle

                // Convert to radians
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180

                // Calculate arc points
                const x1 = 100 + 100 * Math.cos(startRad)
                const y1 = 100 + 100 * Math.sin(startRad)
                const x2 = 100 + 100 * Math.cos(endRad)
                const y2 = 100 + 100 * Math.sin(endRad)

                // Large arc flag for segments > 180 degrees
                const largeArc = segmentAngle > 180 ? 1 : 0

                return (
                  <g key={index}>
                    {/* Segment */}
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={`url(#gradient-${index})`}
                      stroke="white"
                      strokeWidth="1"
                    />

                    {/* Text and emoji */}
                    <g transform={`rotate(${startAngle + segmentAngle / 2 + 90} 100 100)`}>
                      <text
                        x="100"
                        y="48"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="bold"
                        fill="white"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                      >
                        {prize.label}
                      </text>
                      <text
                        x="100"
                        y="70"
                        textAnchor="middle"
                        fontSize="24"
                        fill="white"
                      >
                        {prize.emoji}
                      </text>
                    </g>
                  </g>
                )
              })}

              {/* Center circle */}
              <circle cx="100" cy="100" r="15" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
            </svg>

            {/* Center icon (overlaid on SVG) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Disc3 className="w-8 h-8 text-primary" />
            </div>

            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-8 border-primary/20 pointer-events-none" />
          </div>

          {/* CSS variables for gradients */}
          <style>{`
            :root {
              --gradient-0-from: rgb(192, 132, 252);
              --gradient-0-to: rgb(168, 85, 247);
              --gradient-1-from: rgb(244, 114, 182);
              --gradient-1-to: rgb(236, 72, 153);
              --gradient-2-from: rgb(96, 165, 250);
              --gradient-2-to: rgb(59, 130, 246);
              --gradient-3-from: rgb(45, 212, 191);
              --gradient-3-to: rgb(20, 184, 166);
              --gradient-4-from: rgb(251, 191, 36);
              --gradient-4-to: rgb(245, 158, 11);
              --gradient-5-from: rgb(251, 113, 133);
              --gradient-5-to: rgb(244, 63, 94);
            }
          `}</style>
        </div>

        {/* Result */}
        {result && !isSpinning && (
          <div className="text-center space-y-2 animate-in zoom-in duration-500">
            <div className="text-5xl">{result.emoji}</div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-primary">You won:</p>
              <p className="text-lg font-semibold">{result.label}</p>
            </div>
          </div>
        )}

        {/* Spin button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation font-semibold shadow-lg"
        >
          {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
        </button>

        {spinCount > 0 && !isSpinning && (
          <p className="text-center text-xs text-muted-foreground">
            Spins: {spinCount}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
