import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

const GIFTS = [
  { title: 'Infinite Love', emoji: '💕', message: 'My love for you has no limits!' },
  { title: 'Forever Together', emoji: '💑', message: 'You, me, and our baby girl!' },
  { title: 'Best Mom Ever', emoji: '👶', message: 'You\'re going to be an amazing mama!' },
  { title: 'Beautiful Soul', emoji: '✨', message: 'Katelyn, you light up my world!' },
  { title: 'Happy Birthday', emoji: '🎂', message: 'Wishing you the best day ever!' },
]

export function GiftBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentGift, setCurrentGift] = useState(GIFTS[0])

  const openGift = () => {
    if (isOpen) {
      // Reset
      setIsOpen(false)
      setTimeout(() => {
        const randomGift = GIFTS[Math.floor(Math.random() * GIFTS.length)]
        setCurrentGift(randomGift)
      }, 300)
    } else {
      // Open and trigger confetti
      setIsOpen(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#14b8a6', '#f59e0b', '#ec4899'],
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Mystery Gift
        </CardTitle>
        <CardDescription>
          {isOpen ? 'Tap again for another surprise!' : 'Tap the gift to unwrap!'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <button
          onClick={openGift}
          className="relative group touch-manipulation transition-transform hover:scale-105 active:scale-95"
          aria-label="Open gift"
        >
          <div
            className={`
              w-32 h-32 rounded-lg bg-gradient-to-br from-accent to-primary
              flex items-center justify-center
              transition-all duration-500
              ${isOpen ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
              shadow-lg hover:shadow-xl
            `}
          >
            {!isOpen ? (
              <>
                <Gift className="w-16 h-16 text-white" />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-accent rounded-sm" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-accent" />
              </>
            ) : (
              <Sparkles className="w-16 h-16 text-white animate-spin" />
            )}
          </div>
        </button>

        <div
          className={`
            transition-all duration-500 text-center space-y-2
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-6xl">{currentGift.emoji}</div>
          <h3 className="text-xl font-bold text-primary">{currentGift.title}</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {currentGift.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
