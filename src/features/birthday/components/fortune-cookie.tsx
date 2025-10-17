import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cookie } from 'lucide-react'
import confetti from 'canvas-confetti'

const FORTUNES = [
  "Your future holds endless love and baby giggles! 👶💕",
  "A beautiful journey awaits you and your growing family! 🌟",
  "Love and laughter will fill your days ahead! 😄",
  "January will bring the greatest joy you've ever known! 🎉",
  "Your strength and beauty inspire everyone around you! ✨",
  "The best mom-to-be will become the best mom ever! 👑",
]

export function FortuneCookie() {
  const [isCracked, setIsCracked] = useState(false)
  const [fortune, setFortune] = useState(FORTUNES[0])

  const crackCookie = () => {
    if (isCracked) {
      // Reset
      setIsCracked(false)
      setTimeout(() => {
        setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)])
      }, 300)
    } else {
      setIsCracked(true)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fb923c'],
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Cookie className="w-5 h-5 text-primary" />
          Fortune Cookie
        </CardTitle>
        <CardDescription>
          {isCracked ? 'Tap for another fortune!' : 'Tap to crack it open!'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <button
          onClick={crackCookie}
          className="relative touch-manipulation transition-transform hover:scale-105 active:scale-95"
          aria-label="Crack fortune cookie"
        >
          <div className={`transition-all duration-500 ${isCracked ? 'scale-75' : 'scale-100'}`}>
            {!isCracked ? (
              <div className="relative">
                <div className="w-32 h-24 bg-gradient-to-br from-amber-200 to-amber-400 rounded-t-full shadow-lg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-16 h-2 bg-amber-500 rounded-full" />
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="w-14 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-l-full shadow-lg transform -rotate-12" />
                <div className="w-14 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-r-full shadow-lg transform rotate-12" />
              </div>
            )}
          </div>
        </button>

        <div
          className={`transition-all duration-500 ${
            isCracked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {isCracked && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 max-w-xs">
              <div className="text-center space-y-2">
                <div className="text-3xl">🥠</div>
                <p className="text-sm font-medium text-amber-900 italic">
                  "{fortune}"
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
