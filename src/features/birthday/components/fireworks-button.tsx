import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

export function FireworksButton() {
  const [count, setCount] = useState(0)

  const launchFireworks = () => {
    setCount((prev) => prev + 1)

    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#3b82f6', '#06b6d4', '#14b8a6'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6'],
      })
    }, 250)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Fireworks Show
        </CardTitle>
        <CardDescription>Light up the celebration!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Button
            onClick={launchFireworks}
            size="lg"
            className="touch-manipulation bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Launch Fireworks!
          </Button>
        </div>

        {count > 0 && (
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Fireworks launched: <span className="font-bold text-primary">{count}</span> times! 🎆
            </p>
            {count >= 5 && (
              <p className="text-xs text-accent font-semibold animate-pulse">
                You're making this birthday extra special! ✨
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
