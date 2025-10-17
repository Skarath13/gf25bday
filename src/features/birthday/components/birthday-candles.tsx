import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'

const CANDLE_COUNT = 5

export function BirthdayCandles() {
  const [litCandles, setLitCandles] = useState<Set<number>>(new Set())

  const toggleCandle = (id: number) => {
    setLitCandles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
        // Small sparkle when lighting
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#fbbf24', '#f59e0b', '#fb923c'],
          scalar: 0.8,
        })
      }
      return newSet
    })
  }

  const blowOutAll = () => {
    if (litCandles.size === CANDLE_COUNT) {
      // Big celebration confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#14b8a6', '#fbbf24'],
      })
    }
    setLitCandles(new Set())
  }

  const lightAll = () => {
    const allLit = new Set(Array.from({ length: CANDLE_COUNT }, (_, i) => i))
    setLitCandles(allLit)
  }

  const allLit = litCandles.size === CANDLE_COUNT

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Birthday Candles</CardTitle>
        <CardDescription>
          {allLit ? 'All candles are lit! Make a wish! 🌟' : 'Tap to light each candle'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center items-end gap-4 min-h-[180px]">
          {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
            <Candle
              key={i}
              lit={litCandles.has(i)}
              onToggle={() => toggleCandle(i)}
            />
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={lightAll}
            variant="outline"
            size="sm"
            className="touch-manipulation"
          >
            Light All
          </Button>
          <Button
            onClick={blowOutAll}
            variant="outline"
            size="sm"
            className="touch-manipulation"
            disabled={litCandles.size === 0}
          >
            {allLit ? 'Make a Wish!' : 'Blow Out All'}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {litCandles.size} / {CANDLE_COUNT} candles lit
        </p>
      </CardContent>
    </Card>
  )
}

function Candle({ lit, onToggle }: { lit: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative group touch-manipulation hover:scale-105 active:scale-95 transition-transform"
      aria-label={lit ? 'Blow out candle' : 'Light candle'}
    >
      {/* Flame */}
      {lit && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-flicker">
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 w-6 h-8 bg-orange-400/30 blur-lg rounded-full" />
            {/* Flame */}
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              className="relative z-10"
            >
              <path
                d="M12 0C12 0 4 8 4 16C4 22 7 28 12 28C17 28 20 22 20 16C20 8 12 0 12 0Z"
                fill="url(#flameGradient)"
              />
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
            </svg>
            {/* Inner bright spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-4 bg-yellow-200 rounded-full blur-sm" />
          </div>
        </div>
      )}

      {/* Wick */}
      <div
        className={`
          absolute -top-4 left-1/2 -translate-x-1/2
          w-0.5 h-4
          ${lit ? 'bg-gray-800' : 'bg-gray-700'}
          transition-colors
        `}
      />

      {/* Candle body */}
      <div
        className={`
          w-8 h-20 rounded-t-sm
          bg-gradient-to-br from-cyan-400 to-blue-500
          shadow-lg
          relative overflow-hidden
          transition-all
          ${lit ? 'shadow-cyan-300/50' : 'shadow-cyan-500/30'}
        `}
      >
        {/* Shine effect */}
        <div className="absolute top-2 left-1 w-2 h-12 bg-white/30 rounded-full blur-[2px]" />
        {/* Wax drip effect */}
        {lit && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-300/50 rounded-full" />
        )}
      </div>

      {/* Base shadow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 rounded-full blur-sm" />
    </button>
  )
}
