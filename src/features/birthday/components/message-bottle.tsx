import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves } from 'lucide-react'
import confetti from 'canvas-confetti'

const BOTTLES = [
  { id: 1, color: 'from-blue-400 to-blue-600', message: 'Every moment with you is a treasure, Katelyn! 💎' },
  { id: 2, color: 'from-cyan-400 to-cyan-600', message: 'Our love story is just beginning! 💕' },
  { id: 3, color: 'from-teal-400 to-teal-600', message: 'You + Me + Baby Girl = Perfect Family! 👨‍👩‍👧' },
  { id: 4, color: 'from-sky-400 to-sky-600', message: 'January 2026 will be our best adventure yet! 🌟' },
]

export function MessageBottle() {
  const [openedBottle, setOpenedBottle] = useState<number | null>(null)
  const [floatingBottles] = useState(BOTTLES)

  const openBottle = (id: number) => {
    setOpenedBottle(id)
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#06b6d4', '#14b8a6'],
    })

    setTimeout(() => {
      setOpenedBottle(null)
    }, 3000)
  }

  const currentBottle = floatingBottles.find(b => b.id === openedBottle)

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Waves className="w-5 h-5 text-primary" />
          Message in a Bottle
        </CardTitle>
        <CardDescription>Tap a bottle to read the message!</CardDescription>
      </CardHeader>
      <CardContent>
        {openedBottle ? (
          <div className="h-48 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
            <div className="text-5xl">📜</div>
            <p className="text-center text-base font-medium text-primary px-4">
              {currentBottle?.message}
            </p>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-b from-cyan-100 to-blue-200 rounded-lg overflow-hidden">
            {/* Waves */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-300/30 animate-pulse" />

            {/* Floating bottles */}
            <div className="absolute inset-0 flex items-center justify-around p-4">
              {floatingBottles.map((bottle, index) => (
                <button
                  key={bottle.id}
                  onClick={() => openBottle(bottle.id)}
                  className="relative transform hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                  style={{
                    animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  <div className={`w-8 h-12 rounded-full bg-gradient-to-b ${bottle.color} shadow-lg relative`}>
                    {/* Cork */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-800 rounded-t-sm" />
                    {/* Shine */}
                    <div className="absolute top-2 left-1 w-2 h-4 bg-white/30 rounded-full blur-[1px]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
