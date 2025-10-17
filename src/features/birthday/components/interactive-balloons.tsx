import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import confetti from 'canvas-confetti'

const BALLOON_COLORS = [
  'from-blue-400 to-blue-600',
  'from-cyan-400 to-cyan-600',
  'from-teal-400 to-teal-600',
  'from-sky-400 to-sky-600',
  'from-blue-300 to-blue-500',
]

export function InteractiveBalloons() {
  const [balloons, setBalloons] = useState([
    { id: 1, popped: false, color: BALLOON_COLORS[0] },
    { id: 2, popped: false, color: BALLOON_COLORS[1] },
    { id: 3, popped: false, color: BALLOON_COLORS[2] },
    { id: 4, popped: false, color: BALLOON_COLORS[3] },
    { id: 5, popped: false, color: BALLOON_COLORS[4] },
  ])

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    )

    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#06b6d4', '#14b8a6'],
    })

    // Reset after 2 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      )
    }, 2000)
  }

  const poppedCount = balloons.filter((b) => b.popped).length
  const allPopped = poppedCount === balloons.length

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Pop the Balloons!</CardTitle>
        <CardDescription>
          {allPopped
            ? '🎉 All popped! They will reset soon...'
            : 'Tap each balloon to pop it'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-end gap-4 min-h-[200px] pb-4">
          {balloons.map((balloon) => (
            <Balloon
              key={balloon.id}
              color={balloon.color}
              popped={balloon.popped}
              onPop={() => popBalloon(balloon.id)}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Popped: {poppedCount} / {balloons.length}
        </p>
      </CardContent>
    </Card>
  )
}

function Balloon({
  color,
  popped,
  onPop,
}: {
  color: string
  popped: boolean
  onPop: () => void
}) {
  return (
    <button
      onClick={onPop}
      disabled={popped}
      className={`
        relative transition-all duration-300 touch-manipulation
        ${popped ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        hover:scale-110 active:scale-95
        disabled:cursor-not-allowed
      `}
      aria-label="Pop balloon"
    >
      <div
        className={`
          w-12 h-16 rounded-full bg-gradient-to-br ${color}
          shadow-lg
          relative
          animate-float
          before:content-[''] before:absolute before:bottom-0 before:left-1/2
          before:-translate-x-1/2 before:translate-y-full before:w-px before:h-8
          before:bg-gradient-to-b before:from-gray-400 before:to-transparent
        `}
        style={{
          animationDelay: `${Math.random() * 2}s`,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* Shine effect */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm" />
      </div>
    </button>
  )
}
