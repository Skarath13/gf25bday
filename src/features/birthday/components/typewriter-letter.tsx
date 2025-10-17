import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

const LETTER = `Dear Katelyn,

Happy Birthday to the most amazing woman in the world!

Every day with you feels like a gift. Your smile lights up my world, and your love makes everything better.

Watching you prepare to become a mother to our baby girl has shown me just how incredible you truly are. You're going to be the best mom ever.

Thank you for being my partner, my best friend, and the love of my life.

Here's to another year of adventures, laughter, and endless love together.

Forever yours,
With all my love 💕`

export function TypewriterLetter() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const startTyping = () => {
    setIsTyping(true)
    setIsComplete(false)
    setDisplayedText('')
    setCurrentIndex(0)
  }

  const skipToEnd = () => {
    setDisplayedText(LETTER)
    setIsTyping(false)
    setIsComplete(true)
    setCurrentIndex(LETTER.length)
  }

  const reset = () => {
    setDisplayedText('')
    setIsTyping(false)
    setIsComplete(false)
    setCurrentIndex(0)
  }

  useEffect(() => {
    if (!isTyping || currentIndex >= LETTER.length) {
      if (currentIndex >= LETTER.length && isTyping) {
        setIsTyping(false)
        setIsComplete(true)
      }
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + LETTER[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, 50) // Typing speed

    return () => clearTimeout(timeout)
  }, [isTyping, currentIndex])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Love Letter
        </CardTitle>
        <CardDescription>
          {isTyping ? 'Typing...' : isComplete ? 'Letter complete' : 'Tap to read your letter'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Letter paper */}
        <div className="relative bg-gradient-to-b from-amber-50 to-yellow-50 rounded-lg p-6 shadow-lg border border-amber-200 min-h-[400px]">
          {/* Paper texture lines */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="border-b border-gray-400"
                style={{ marginTop: `${i * 24}px` }}
              />
            ))}
          </div>

          {/* Letter content */}
          <div className="relative z-10">
            {!isTyping && !isComplete ? (
              <div className="flex flex-col items-center justify-center h-[352px] space-y-4">
                <div className="text-6xl">✉️</div>
                <p className="text-muted-foreground text-sm">Tap below to open your letter</p>
              </div>
            ) : (
              <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse">|</span>
                )}
              </div>
            )}
          </div>

          {/* Stamp */}
          {(isTyping || isComplete) && (
            <div className="absolute top-4 right-4 w-12 h-12 border-4 border-primary rounded-sm flex items-center justify-center rotate-12 opacity-80">
              <span className="text-2xl">💕</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isTyping && !isComplete ? (
            <button
              onClick={startTyping}
              className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
            >
              Read Letter
            </button>
          ) : isTyping ? (
            <button
              onClick={skipToEnd}
              className="flex-1 py-2 px-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors touch-manipulation"
            >
              Skip to End
            </button>
          ) : (
            <button
              onClick={reset}
              className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
            >
              Read Again
            </button>
          )}
        </div>

        {/* Progress indicator */}
        {isTyping && (
          <div className="text-center text-xs text-muted-foreground">
            {Math.round((currentIndex / LETTER.length) * 100)}% complete
          </div>
        )}
      </CardContent>
    </Card>
  )
}
