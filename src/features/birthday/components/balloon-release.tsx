import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wind } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Balloon {
  id: number
  x: number
  color: string
  message: string
  delay: number
}

const BALLOON_COLORS = [
  'from-red-400 to-red-500',
  'from-pink-400 to-pink-500',
  'from-purple-400 to-purple-500',
  'from-blue-400 to-blue-500',
  'from-cyan-400 to-cyan-500',
  'from-teal-400 to-teal-500',
]

const MESSAGES = [
  'Happy Birthday! 🎂',
  'You are loved! 💕',
  'Best mom-to-be! 👶',
  'Forever together! 💖',
  'You complete me! 💗',
  'My everything! ✨',
]

export function BalloonRelease() {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [releasedCount, setReleasedCount] = useState(0)

  const releaseBalloon = () => {
    const newBalloon: Balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * 70 + 15,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
      delay: 0,
    }

    setBalloons(prev => [...prev, newBalloon])
    setReleasedCount(prev => prev + 1)

    // Small confetti
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x: newBalloon.x / 100, y: 0.8 },
      colors: ['#ec4899', '#f43f5e', '#8b5cf6'],
      startVelocity: 15,
    })

    // Remove balloon after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== newBalloon.id))
    }, 5000)
  }

  const releaseMany = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => releaseBalloon(), i * 200)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Wind className="w-5 h-5 text-primary" />
          Balloon Release
        </CardTitle>
        <CardDescription>
          {releasedCount === 0
            ? 'Release balloons with wishes!'
            : `${releasedCount} balloons released!`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 bg-gradient-to-b from-blue-100 to-sky-200 rounded-lg overflow-hidden">
          {/* Clouds */}
          <div className="absolute top-4 left-8 w-16 h-8 bg-white/60 rounded-full blur-sm" />
          <div className="absolute top-8 right-12 w-20 h-8 bg-white/50 rounded-full blur-sm" />

          {/* Floating balloons */}
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="absolute"
              style={{
                left: `${balloon.x}%`,
                bottom: '-80px',
                animation: `floatBalloon 5s ease-out forwards`,
                animationDelay: `${balloon.delay}s`,
              }}
            >
              {/* Balloon */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-12 h-14 rounded-full bg-gradient-to-br ${balloon.color} shadow-lg relative`}
                  style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  }}
                >
                  {/* Shine */}
                  <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm" />
                </div>

                {/* String */}
                <div className="w-0.5 h-8 bg-slate-400" />

                {/* Message tag */}
                <div className="bg-white rounded-md px-2 py-1 text-xs font-medium shadow-md whitespace-nowrap">
                  {balloon.message}
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {balloons.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Tap below to release balloons!</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={releaseBalloon}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
          >
            Release One
          </button>
          <button
            onClick={releaseMany}
            className="py-2 px-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors touch-manipulation"
          >
            Release Many
          </button>
        </div>

        <style>{`
          @keyframes floatBalloon {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-350px) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 20 - 10}deg);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
