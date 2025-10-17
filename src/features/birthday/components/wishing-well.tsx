import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins } from 'lucide-react'

const WISHES = [
  "Wishing for endless love and happiness!",
  "May our baby girl be healthy and happy!",
  "Wishing you the best birthday ever!",
  "Here's to many more years together!",
  "Wishing for beautiful family memories!",
]

interface FallingCoin {
  id: number
  wish: string
}

export function WishingWell() {
  const [coins, setCoins] = useState<FallingCoin[]>([])
  const [wishCount, setWishCount] = useState(0)
  const [lastWish, setLastWish] = useState<string>('')

  const dropCoin = () => {
    const wish = WISHES[Math.floor(Math.random() * WISHES.length)]
    const newCoin: FallingCoin = {
      id: Date.now(),
      wish,
    }

    setCoins((prev) => [...prev, newCoin])
    setWishCount((prev) => prev + 1)
    setLastWish(wish)

    // Remove coin after animation
    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => c.id !== newCoin.id))
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Coins className="w-5 h-5 text-primary" />
          Wishing Well
        </CardTitle>
        <CardDescription>
          {wishCount === 0 ? 'Tap to make a wish!' : `${wishCount} wishes made!`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 bg-gradient-to-b from-slate-700 to-slate-900 rounded-lg overflow-hidden touch-manipulation">
          {/* Well structure */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-stone-600 to-stone-800 rounded-t-lg border-4 border-stone-700" />

          {/* Well opening */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 bg-black/80 rounded-t-full" />

          {/* Water */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-12 bg-blue-900/50 rounded-t-full" />

          {/* Drop coin button area */}
          <button
            onClick={dropCoin}
            className="absolute inset-0 w-full h-full flex items-center justify-center hover:bg-white/5 transition-colors"
            aria-label="Drop coin"
          >
            <span className="text-white/60 text-sm">Tap to drop a coin</span>
          </button>

          {/* Falling coins */}
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="absolute left-1/2 top-0 -translate-x-1/2"
              style={{
                animation: 'dropCoin 2s ease-in forwards',
              }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-lg flex items-center justify-center text-xs">
                💫
              </div>
            </div>
          ))}

          {/* Ripple effect */}
          {coins.length > 0 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <div className="w-16 h-2 bg-blue-400/30 rounded-full animate-ping" />
            </div>
          )}
        </div>

        {lastWish && (
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground italic">"{lastWish}"</p>
          </div>
        )}

        <style>{`
          @keyframes dropCoin {
            0% {
              transform: translate(-50%, 0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, 180px) scale(0.5);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
