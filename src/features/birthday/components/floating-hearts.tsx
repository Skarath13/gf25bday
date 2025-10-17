import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'

interface FloatingHeart {
  id: number
  x: number
  y: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [hasTouchSupport, setHasTouchSupport] = useState(false)

  const createHeart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Prevent double firing on devices with both touch and mouse
    if ('touches' in e) {
      setHasTouchSupport(true)
    } else if (hasTouchSupport) {
      return // Skip mouse events if touch was detected
    }

    const rect = e.currentTarget.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setHearts((prev) => [...prev, newHeart])

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 3000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-accent fill-accent" />
          Floating Hearts
        </CardTitle>
        <CardDescription>Tap anywhere to create floating hearts!</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="relative w-full h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden cursor-pointer touch-manipulation"
          onClick={createHeart}
          onTouchStart={createHeart}
        >
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Tap me! 💕
          </div>

          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute pointer-events-none"
              style={{
                left: heart.x,
                top: heart.y,
                animation: 'floatUp 3s ease-out forwards',
              }}
            >
              <Heart className="w-8 h-8 text-accent fill-accent animate-pulse" />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes floatUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-300px) scale(0.5);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
