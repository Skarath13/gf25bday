import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Wish {
  id: number
  text: string
  color: string
  x: number
  y: number
  rotation: number
}

const WISHES = [
  'Health & happiness for our family 💕',
  'A smooth & safe delivery for baby girl 👶',
  'Many more years together 💖',
  'Endless laughter & joy 😄',
  'Sweet dreams & peaceful nights 🌙',
  'Adventures & new memories 🌟',
  'Love that grows stronger every day 💗',
  'A lifetime of beautiful moments ✨',
]

const COLORS = [
  'from-pink-100 to-pink-200',
  'from-purple-100 to-purple-200',
  'from-blue-100 to-blue-200',
  'from-teal-100 to-teal-200',
  'from-yellow-100 to-yellow-200',
]

export function WishJar() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)

  const addWish = () => {
    if (wishes.length >= 8) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#3b82f6'],
      })
      return
    }

    const wishText = WISHES[wishes.length % WISHES.length]
    const newWish: Wish = {
      id: Date.now(),
      text: wishText,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: Math.random() * 60 + 20,
      y: Math.random() * 40 + (wishes.length * 8),
      rotation: Math.random() * 30 - 15,
    }

    setWishes(prev => [...prev, newWish])

    // Small confetti
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#fb923c'],
    })
  }

  const openWish = (wish: Wish) => {
    setSelectedWish(wish)
  }

  const closeWish = () => {
    setSelectedWish(null)
  }

  const reset = () => {
    setWishes([])
    setSelectedWish(null)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Wish Jar
        </CardTitle>
        <CardDescription>
          {wishes.length === 0
            ? 'Add wishes to the jar!'
            : wishes.length >= 8
            ? 'Jar is full! ✨'
            : `${wishes.length}/8 wishes collected`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Jar */}
        <div className="relative w-full h-64 flex items-end justify-center">
          {/* Jar body */}
          <div className="relative w-48 h-56 bg-gradient-to-b from-cyan-100/40 to-cyan-200/60 rounded-b-3xl border-4 border-cyan-300/50 shadow-xl overflow-hidden">
            {/* Jar shine effect */}
            <div className="absolute top-0 left-4 w-8 h-full bg-white/20 blur-sm" />

            {/* Wishes inside jar */}
            <div className="relative w-full h-full p-2">
              {wishes.map((wish) => (
                <button
                  key={wish.id}
                  onClick={() => openWish(wish)}
                  className="absolute w-12 h-10 touch-manipulation transition-transform hover:scale-110 active:scale-95 animate-in fade-in zoom-in duration-300"
                  style={{
                    left: `${wish.x}%`,
                    bottom: `${wish.y}%`,
                    transform: `rotate(${wish.rotation}deg)`,
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${wish.color} rounded shadow-md border border-white/50`} />
                </button>
              ))}
            </div>
          </div>

          {/* Jar lid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg border-2 border-amber-600 shadow-lg">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-gradient-to-b from-amber-600 to-amber-700 rounded-sm" />
          </div>

          {/* Empty state */}
          {wishes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-muted-foreground text-sm">Empty jar</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addWish}
            disabled={wishes.length >= 8}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            {wishes.length >= 8 ? 'Jar Full' : 'Add Wish'}
          </button>
          <button
            onClick={reset}
            disabled={wishes.length === 0}
            className="py-2 px-4 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            Empty Jar
          </button>
        </div>

        {/* Selected wish modal */}
        {selectedWish && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={closeWish}
          >
            <div
              className={`bg-gradient-to-br ${selectedWish.color} rounded-xl p-6 max-w-xs w-full shadow-2xl border-2 border-white/50 animate-in zoom-in duration-200`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl">⭐</div>
                <p className="text-base font-medium text-slate-800">
                  {selectedWish.text}
                </p>
                <button
                  onClick={closeWish}
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
