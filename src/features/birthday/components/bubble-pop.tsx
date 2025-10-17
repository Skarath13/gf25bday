import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleDot } from 'lucide-react'

interface Bubble {
  id: number
  x: number
  size: number
  duration: number
  message: string
  color: string
}

const MESSAGES = [
  { text: 'I love you! 💕', color: 'from-pink-400/80 to-pink-500/80' },
  { text: "You're amazing! ✨", color: 'from-purple-400/80 to-purple-500/80' },
  { text: 'Best mom-to-be! 👶', color: 'from-blue-400/80 to-blue-500/80' },
  { text: 'Forever yours! 💖', color: 'from-rose-400/80 to-rose-500/80' },
  { text: 'Happy Birthday! 🎉', color: 'from-amber-400/80 to-amber-500/80' },
  { text: 'You complete me! 💗', color: 'from-cyan-400/80 to-cyan-500/80' },
]

export function BubblePop() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [lastMessage, setLastMessage] = useState<string>('')
  const [isActive, setIsActive] = useState(false)

  const createBubble = () => {
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      size: Math.random() * 30 + 40,
      duration: Math.random() * 3 + 4,
      message: message.text,
      color: message.color,
    }

    setBubbles(prev => [...prev, newBubble])

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
    }, newBubble.duration * 1000)
  }

  const popBubble = (bubble: Bubble, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    setBubbles(prev => prev.filter(b => b.id !== bubble.id))
    setPoppedCount(prev => prev + 1)
    setLastMessage(bubble.message)
  }

  const startBubbles = () => {
    setIsActive(true)
    setPoppedCount(0)
    setLastMessage('')

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBubble(), i * 200)
    }

    // Stop after 10 seconds
    setTimeout(() => {
      setIsActive(false)
    }, 10000)
  }

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      if (bubbles.length < 8) {
        createBubble()
      }
    }, 800)

    return () => clearInterval(interval)
  }, [isActive, bubbles.length])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <CircleDot className="w-5 h-5 text-primary" />
          Bubble Pop
        </CardTitle>
        <CardDescription>
          {poppedCount === 0
            ? 'Start the bubbles and pop them!'
            : `${poppedCount} bubbles popped!`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 bg-gradient-to-b from-sky-100 to-blue-200 rounded-lg overflow-hidden">
          {/* Water effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-300/20 to-transparent" />

          {/* Bubbles */}
          {bubbles.map((bubble) => (
            <button
              key={bubble.id}
              onClick={(e) => popBubble(bubble, e)}
              onTouchStart={(e) => popBubble(bubble, e)}
              className="absolute touch-manipulation transition-transform active:scale-90"
              style={{
                left: `${bubble.x}%`,
                bottom: '-60px',
                animation: `riseBubble ${bubble.duration}s ease-in forwards`,
              }}
            >
              <div
                className={`rounded-full bg-gradient-to-br ${bubble.color} backdrop-blur-sm border-2 border-white/50 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-white/20 blur-sm" />
              </div>
            </button>
          ))}

          {/* Empty state */}
          {!isActive && bubbles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Press start to create bubbles!</p>
            </div>
          )}
        </div>

        <button
          onClick={startBubbles}
          disabled={isActive}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
        >
          {isActive ? 'Bubbles Active...' : 'Start Bubbles'}
        </button>

        {lastMessage && (
          <div className="text-center animate-in fade-in duration-300">
            <p className="text-sm font-medium text-primary">{lastMessage}</p>
          </div>
        )}

        <style>{`
          @keyframes riseBubble {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-160px) translateX(${Math.random() * 20 - 10}px);
              opacity: 1;
            }
            100% {
              transform: translateY(-320px) translateX(${Math.random() * 30 - 15}px);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
