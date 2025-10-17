import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FallingStar {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

export function StarShower() {
  const [stars, setStars] = useState<FallingStar[]>([])
  const [isActive, setIsActive] = useState(false)
  const [starCount, setStarCount] = useState(0)

  const createStar = (x?: number) => {
    const newStar: FallingStar = {
      id: Date.now() + Math.random(),
      x: x ?? Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 2 + 2,
      delay: 0,
    }

    setStars(prev => [...prev, newStar])
    setStarCount(prev => prev + 1)

    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== newStar.id))
    }, newStar.duration * 1000)
  }

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    let x

    if ('touches' in e) {
      x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
    } else {
      x = ((e.clientX - rect.left) / rect.width) * 100
    }

    createStar(x)

    // Small confetti burst
    confetti({
      particleCount: 15,
      spread: 40,
      origin: {
        x: x / 100,
        y: 0.3
      },
      colors: ['#fbbf24', '#f59e0b', '#fef3c7'],
      startVelocity: 20,
      gravity: 0.8,
    })
  }

  const startShower = () => {
    setIsActive(true)

    // Create initial burst
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createStar(), i * 100)
    }

    // Stop after 5 seconds
    setTimeout(() => {
      setIsActive(false)
    }, 5000)
  }

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      createStar()
    }, 300)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Star Shower
        </CardTitle>
        <CardDescription>
          {starCount === 0
            ? 'Tap anywhere to create stars!'
            : `${starCount} stars created!`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="relative w-full h-48 bg-gradient-to-b from-indigo-950 to-slate-900 rounded-lg overflow-hidden touch-manipulation cursor-pointer"
          onClick={handleTap}
          onTouchStart={handleTap}
        >
          {/* Background stars */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}
          </div>

          {/* Falling stars */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute pointer-events-none"
              style={{
                left: `${star.x}%`,
                top: '-20px',
                animation: `fallStar ${star.duration}s linear forwards`,
                animationDelay: `${star.delay}s`,
              }}
            >
              <div
                className="text-yellow-300"
                style={{
                  fontSize: `${star.size}px`,
                  filter: 'drop-shadow(0 0 6px rgba(253, 224, 71, 0.8))',
                }}
              >
                ⭐
              </div>
            </div>
          ))}

          {!isActive && stars.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
              Tap anywhere or start a shower!
            </div>
          )}
        </div>

        <button
          onClick={startShower}
          disabled={isActive}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
        >
          {isActive ? 'Shower in Progress...' : 'Start Star Shower'}
        </button>

        <style>{`
          @keyframes fallStar {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(240px) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
