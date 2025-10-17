import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cake } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CakeLayer {
  id: number
  color: string
  flavor: string
}

const FLAVORS = [
  { color: 'from-pink-300 to-pink-400', name: 'Strawberry' },
  { color: 'from-amber-300 to-amber-400', name: 'Vanilla' },
  { color: 'from-orange-300 to-orange-400', name: 'Chocolate' },
  { color: 'from-purple-300 to-purple-400', name: 'Blueberry' },
  { color: 'from-yellow-300 to-yellow-400', name: 'Lemon' },
  { color: 'from-red-300 to-red-400', name: 'Red Velvet' },
]

export function BuildACake() {
  const [layers, setLayers] = useState<CakeLayer[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const addLayer = () => {
    if (layers.length >= 5) {
      setIsComplete(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#fb923c', '#ec4899', '#a855f7'],
      })
      return
    }

    const flavor = FLAVORS[layers.length % FLAVORS.length]
    const newLayer: CakeLayer = {
      id: Date.now(),
      color: flavor.color,
      flavor: flavor.name,
    }

    setLayers(prev => [newLayer, ...prev])
  }

  const reset = () => {
    setLayers([])
    setIsComplete(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Cake className="w-5 h-5 text-primary" />
          Build-a-Cake
        </CardTitle>
        <CardDescription>
          {isComplete
            ? 'Beautiful cake! Tap to start over'
            : `${layers.length}/5 layers • Tap to add more!`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden flex flex-col items-center justify-end p-4">
          {/* Cake layers */}
          <div className="relative flex flex-col-reverse items-center gap-1">
            {layers.map((layer, index) => (
              <div
                key={layer.id}
                className={`bg-gradient-to-r ${layer.color} rounded-lg shadow-lg transition-all duration-300 animate-in slide-in-from-top`}
                style={{
                  width: `${140 - index * 15}px`,
                  height: '35px',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white/80">
                    {layer.flavor}
                  </span>
                </div>
              </div>
            ))}

            {/* Candles on top layer */}
            {isComplete && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2 animate-in zoom-in duration-500">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative">
                    <div className="w-2 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded-sm" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse">
                      <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plate */}
          {layers.length > 0 && (
            <div className="w-48 h-3 bg-gradient-to-b from-slate-300 to-slate-400 rounded-full shadow-md" />
          )}

          {/* Empty state */}
          {layers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Tap below to start building!</p>
            </div>
          )}
        </div>

        <button
          onClick={isComplete ? reset : addLayer}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
        >
          {isComplete ? 'Start New Cake' : 'Add Layer'}
        </button>

        {isComplete && (
          <div className="text-center animate-in fade-in duration-500">
            <p className="text-sm font-medium text-primary">
              Perfect cake for Katelyn's birthday! 🎂
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
