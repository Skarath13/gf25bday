import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame } from 'lucide-react'

interface Spark {
  id: number
  x: number
  y: number
}

export function Sparkler() {
  const [isLit, setIsLit] = useState(false)
  const [sparks, setSparks] = useState<Spark[]>([])
  const [trailPoints, setTrailPoints] = useState<{x: number, y: number}[]>([])
  const timerRef = useRef<NodeJS.Timeout>()

  const light = () => {
    setIsLit(true)
    // Burn out after 10 seconds
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsLit(false)
      setSparks([])
      setTrailPoints([])
    }, 10000)
  }

  const createSparks = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isLit) return

    const rect = e.currentTarget.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    // Add trail point
    setTrailPoints(prev => [...prev.slice(-20), { x, y }])

    // Create sparks
    const newSparks: Spark[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x,
      y,
    }))

    setSparks(prev => [...prev, ...newSparks])

    // Remove sparks after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.find(ns => ns.id === s.id)))
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          Sparkler
        </CardTitle>
        <CardDescription>
          {isLit ? 'Wave it around!' : 'Tap to light it up!'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isLit ? (
          <button
            onClick={light}
            className="w-full h-48 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-slate-700 transition-colors touch-manipulation"
          >
            <div className="text-6xl">✨</div>
            <p className="text-white/80">Tap to Light!</p>
          </button>
        ) : (
          <div
            className="relative w-full h-48 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden cursor-move touch-manipulation"
            onMouseMove={createSparks}
            onTouchMove={createSparks}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
              Move your finger to create sparks!
            </div>

            {/* Trail */}
            {trailPoints.map((point, index) => (
              <div
                key={index}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
                style={{
                  left: point.x,
                  top: point.y,
                  opacity: (index / trailPoints.length) * 0.8,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Sparks */}
            {sparks.map((spark) => (
              <div
                key={spark.id}
                className="absolute pointer-events-none"
                style={{
                  left: spark.x,
                  top: spark.y,
                  animation: 'sparkFall 1s ease-out forwards',
                }}
              >
                <div className="w-1 h-1 bg-yellow-300 rounded-full shadow-lg shadow-yellow-400" />
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes sparkFall {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 60 + 20}px) scale(0);
              opacity: 0;
            }
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
