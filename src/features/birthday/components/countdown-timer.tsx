import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilBirthday())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilBirthday())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getTimeUntilBirthday() {
    const now = new Date()
    const birthday = new Date('2025-10-19T00:00:00')

    const diff = birthday.getTime() - now.getTime()

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds: Math.floor(diff / 1000),
    }
  }

  const isBirthday = timeLeft.totalSeconds <= 0
  const progress = isBirthday ? 100 : Math.max(0, 100 - (timeLeft.days / 365) * 100)

  return (
    <Card className="w-full select-none bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 backdrop-blur-sm">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {isBirthday ? '🎉 Happy Birthday! 🎉' : 'Countdown to Your Special Day'}
        </CardTitle>
        <CardDescription className="text-lg">
          {isBirthday ? "It's finally here!" : 'October 19, 2025'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isBirthday && (
          <>
            <div className="grid grid-cols-4 gap-3 touch-manipulation">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-3 bg-secondary/30" />
              <p className="text-center text-xs text-muted-foreground">
                {timeLeft.days} days until the celebration!
              </p>
            </div>
          </>
        )}
        {isBirthday && (
          <div className="text-center py-8">
            <p className="text-6xl animate-bounce">🎂</p>
            <p className="text-2xl font-bold mt-4 text-primary">
              Today is your day!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-card border-2 border-primary/20 rounded-lg p-3 shadow-lg hover:scale-105 active:scale-95 transition-transform touch-manipulation">
      <div className="text-3xl font-bold text-primary tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs text-muted-foreground mt-1 font-medium">
        {label}
      </div>
    </div>
  )
}
