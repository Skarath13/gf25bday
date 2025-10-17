import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Baby, Home, Star } from 'lucide-react'

const CARDS = [
  {
    id: 1,
    icon: Heart,
    front: 'My Love',
    back: 'Katelyn, you mean everything to me!',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 2,
    icon: Baby,
    front: 'Baby Girl',
    back: 'Can\'t wait to meet our daughter!',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 3,
    icon: Home,
    front: 'Our Home',
    back: 'Building our life together! 🏡',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 4,
    icon: Star,
    front: 'Forever',
    back: 'You, me, and our baby - always! ✨',
    color: 'from-amber-400 to-orange-500',
  },
]

export function FlipCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggleFlip = (id: number) => {
    setFlipped((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Flip the Cards</CardTitle>
        <CardDescription>Tap each card to reveal the message</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {CARDS.map((card) => {
            const Icon = card.icon
            const isFlipped = flipped.has(card.id)

            return (
              <button
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="relative h-32 touch-manipulation perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`
                    relative w-full h-full transition-transform duration-600 preserve-3d
                    ${isFlipped ? 'rotate-y-180' : ''}
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <div
                    className={`
                      absolute w-full h-full rounded-lg bg-gradient-to-br ${card.color}
                      flex flex-col items-center justify-center text-white
                      shadow-lg backface-hidden
                    `}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <span className="font-bold text-sm">{card.front}</span>
                  </div>

                  {/* Back */}
                  <div
                    className={`
                      absolute w-full h-full rounded-lg bg-gradient-to-br ${card.color}
                      flex items-center justify-center text-white p-4 text-center
                      shadow-lg backface-hidden
                    `}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <span className="text-xs font-medium leading-relaxed">
                      {card.back}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <style>{`
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
