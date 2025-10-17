import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import confetti from 'canvas-confetti'

const LOVE_LEVELS = [
  { threshold: 0, message: 'Tap to measure our love! 💕', color: 'text-muted-foreground' },
  { threshold: 20, message: 'Getting warmer... 💗', color: 'text-pink-400' },
  { threshold: 40, message: 'Love is growing! 💖', color: 'text-pink-500' },
  { threshold: 60, message: 'So much love! 💕', color: 'text-rose-500' },
  { threshold: 80, message: 'Almost maxed out! 💗', color: 'text-red-500' },
  { threshold: 100, message: 'INFINITE LOVE! 💖✨', color: 'text-primary' },
]

export function LoveMeter() {
  const [loveLevel, setLoveLevel] = useState(0)
  const [isCharging, setIsCharging] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState<number[]>([])

  const getCurrentLevel = () => {
    return [...LOVE_LEVELS].reverse().find(level => loveLevel >= level.threshold) || LOVE_LEVELS[0]
  }

  const chargeLove = () => {
    if (loveLevel >= 100) {
      // Reset if already at max
      setLoveLevel(0)
      return
    }

    setIsCharging(true)
    const newLevel = Math.min(loveLevel + 20, 100)
    setLoveLevel(newLevel)

    // Create floating heart
    const heartId = Date.now()
    setFloatingHearts(prev => [...prev, heartId])
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(id => id !== heartId))
    }, 2000)

    // Confetti at max
    if (newLevel === 100) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f43f5e', '#fb7185'],
        })
      }, 200)
    }

    setTimeout(() => setIsCharging(false), 500)
  }

  const currentLevel = getCurrentLevel()

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Love Meter
        </CardTitle>
        <CardDescription>
          Tap to charge the love meter!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          {/* Meter container */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 space-y-6">
            {/* Large heart display */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <Heart
                  className={`w-32 h-32 transition-all duration-500 ${
                    loveLevel > 0 ? 'text-primary fill-primary' : 'text-muted-foreground'
                  }`}
                  style={{
                    filter: loveLevel > 0 ? `drop-shadow(0 0 ${loveLevel / 5}px rgba(236, 72, 153, 0.8))` : 'none',
                    transform: isCharging ? 'scale(1.1)' : 'scale(1)',
                  }}
                />

                {/* Percentage overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    {loveLevel}%
                  </span>
                </div>
              </div>

              {/* Floating hearts */}
              {floatingHearts.map((id) => (
                <div
                  key={id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    animation: 'floatHeart 2s ease-out forwards',
                  }}
                >
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <Progress value={loveLevel} className="h-4" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Empty</span>
                <span>Full</span>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <p className={`text-lg font-semibold ${currentLevel.color} animate-in fade-in duration-300`}>
                {currentLevel.message}
              </p>
            </div>
          </div>
        </div>

        {/* Charge button */}
        <button
          onClick={chargeLove}
          disabled={isCharging}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-70 transition-all touch-manipulation font-semibold shadow-lg"
        >
          {loveLevel >= 100 ? 'Reset Love Meter' : 'Charge Love (+20%)'}
        </button>

        <style>{`
          @keyframes floatHeart {
            0% {
              transform: translate(-50%, -50%) translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) translateY(-100px) scale(0.5);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
