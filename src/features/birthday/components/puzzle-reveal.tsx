import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Puzzle } from 'lucide-react'
import confetti from 'canvas-confetti'

interface PuzzlePiece {
  id: number
  revealed: boolean
  letter: string
}

const MESSAGE = 'I LOVE YOU KATELYN'

export function PuzzleReveal() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(
    MESSAGE.split('').map((letter, index) => ({
      id: index,
      revealed: false,
      letter: letter === ' ' ? ' ' : letter,
    }))
  )
  const [isComplete, setIsComplete] = useState(false)

  const revealPiece = (id: number) => {
    if (isComplete) return

    setPieces(prev => {
      const updated = prev.map(p =>
        p.id === id ? { ...p, revealed: true } : p
      )

      // Check if all pieces are revealed
      const allRevealed = updated.every(p => p.letter === ' ' || p.revealed)
      if (allRevealed && !isComplete) {
        setIsComplete(true)
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f43f5e', '#fb923c'],
          })
        }, 300)
      }

      return updated
    })
  }

  const reset = () => {
    setPieces(
      MESSAGE.split('').map((letter, index) => ({
        id: index,
        revealed: false,
        letter: letter === ' ' ? ' ' : letter,
      }))
    )
    setIsComplete(false)
  }

  const revealedCount = pieces.filter(p => p.revealed && p.letter !== ' ').length
  const totalPieces = pieces.filter(p => p.letter !== ' ').length

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Puzzle className="w-5 h-5 text-primary" />
          Puzzle Reveal
        </CardTitle>
        <CardDescription>
          {isComplete
            ? 'Message revealed! 💕'
            : `Tap pieces to reveal the message (${revealedCount}/${totalPieces})`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {pieces.map((piece) => (
              <button
                key={piece.id}
                onClick={() => revealPiece(piece.id)}
                disabled={piece.revealed || piece.letter === ' '}
                className={`
                  relative w-10 h-12 rounded-lg font-bold text-lg transition-all duration-300 touch-manipulation
                  ${piece.letter === ' '
                    ? 'w-3 cursor-default'
                    : piece.revealed
                    ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg scale-100'
                    : 'bg-gradient-to-br from-slate-300 to-slate-400 text-transparent hover:scale-105 active:scale-95 shadow-md'
                  }
                `}
                style={{
                  perspective: '1000px',
                }}
              >
                {piece.letter !== ' ' && (
                  <>
                    {/* Front (hidden) */}
                    {!piece.revealed && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg">
                        <Puzzle className="w-5 h-5 text-white/60" />
                      </div>
                    )}

                    {/* Back (revealed) */}
                    {piece.revealed && (
                      <div className="absolute inset-0 flex items-center justify-center animate-in flip-in-x duration-500">
                        {piece.letter}
                      </div>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {isComplete && (
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <p className="text-2xl font-bold text-primary animate-pulse">
              {MESSAGE}
            </p>
            <button
              onClick={reset}
              className="py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
            >
              Play Again
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
