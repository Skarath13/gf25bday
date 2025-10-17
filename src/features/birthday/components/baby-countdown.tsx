import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Baby } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function BabyCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  // Baby's due date - January 28, 2026
  const babyDueDate = new Date('2026-01-28T00:00:00')

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = babyDueDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Baby className="w-5 h-5 text-primary" />
            Baby Girl Countdown
          </CardTitle>
          <CardDescription>Until we meet our little one</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isArrived = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Baby className="w-5 h-5 text-primary" />
          Baby Girl Countdown
        </CardTitle>
        <CardDescription>Until we meet our little one 💕</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 space-y-6">
          {/* Baby icon */}
          <div className="text-center">
            <div className="inline-block text-7xl animate-bounce">
              👶
            </div>
            <p className="text-sm font-medium text-primary mt-2">Our Baby Girl</p>
          </div>

          {/* Countdown display */}
          {isArrived ? (
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary animate-pulse">
                She's Here! 🎉
              </p>
              <p className="text-muted-foreground">Welcome to the world, baby girl!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm text-center"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-primary">
                  January 28, 2026
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Can't wait to meet you, little one! 💕
                </p>
              </div>
            </>
          )}

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 text-2xl">
            {['💗', '🍼', '💕', '👶', '💖'].map((emoji, i) => (
              <span
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
