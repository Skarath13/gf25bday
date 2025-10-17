import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Snowflake } from 'lucide-react'

interface SnowParticle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

export function SnowGlobe() {
  const [snowParticles, setSnowParticles] = useState<SnowParticle[]>([])
  const [isShaking, setIsShaking] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)

  const createSnowParticle = () => {
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 0.5,
    }
  }

  const shake = () => {
    if (isShaking) return

    setIsShaking(true)
    setShakeCount(prev => prev + 1)

    // Create burst of snow
    const newParticles = Array.from({ length: 30 }, () => createSnowParticle())
    setSnowParticles(prev => [...prev, ...newParticles])

    // Remove particles after their duration
    newParticles.forEach(particle => {
      setTimeout(() => {
        setSnowParticles(prev => prev.filter(p => p.id !== particle.id))
      }, (particle.duration + particle.delay) * 1000)
    })

    setTimeout(() => setIsShaking(false), 500)
  }

  // Gentle continuous snow
  useEffect(() => {
    const interval = setInterval(() => {
      if (snowParticles.length < 15) {
        const newParticle = createSnowParticle()
        setSnowParticles(prev => [...prev, newParticle])

        setTimeout(() => {
          setSnowParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, (newParticle.duration + newParticle.delay) * 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [snowParticles.length])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Snowflake className="w-5 h-5 text-primary" />
          Snow Globe
        </CardTitle>
        <CardDescription>
          {shakeCount === 0 ? 'Tap to shake!' : `Shaken ${shakeCount} times`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Globe container */}
        <div className="relative w-full flex justify-center">
          <button
            onClick={shake}
            disabled={isShaking}
            className={`relative w-64 h-64 bg-gradient-to-b from-cyan-100 to-blue-100 rounded-full border-8 border-slate-300 shadow-2xl overflow-hidden touch-manipulation transition-transform ${
              isShaking ? 'animate-shake' : 'hover:scale-105'
            }`}
          >
            {/* Glass shine effect */}
            <div className="absolute top-8 left-8 w-16 h-32 bg-white/30 rounded-full blur-xl transform -rotate-12" />

            {/* Scene inside globe */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
              {/* Message */}
              <div className="text-center mb-4 z-10">
                <p className="text-2xl font-bold text-primary drop-shadow-lg">
                  Love You
                </p>
                <p className="text-xl font-bold text-primary drop-shadow-lg">
                  Katelyn
                </p>
              </div>

              {/* Decorative elements */}
              <div className="text-4xl mb-2 z-10">💕</div>

              {/* Ground/Base inside globe */}
              <div className="absolute bottom-0 w-full h-8 bg-white/80 rounded-b-full" />
            </div>

            {/* Snow particles */}
            {snowParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute top-0 pointer-events-none"
                style={{
                  left: `${particle.x}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animation: `fallSnow ${particle.duration}s linear forwards`,
                  animationDelay: `${particle.delay}s`,
                }}
              >
                <div className="w-full h-full bg-white rounded-full shadow-sm" />
              </div>
            ))}
          </button>

          {/* Base of globe */}
          <div className="absolute -bottom-4 w-48 h-8 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-xl shadow-lg border-t-4 border-amber-700" />
        </div>

        {/* Instruction */}
        <p className="text-center mt-6 text-sm text-muted-foreground italic">
          Shake to create a winter wonderland! ❄️
        </p>

        <style>{`
          @keyframes fallSnow {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(250px) translateX(${Math.random() * 40 - 20}px) rotate(360deg);
              opacity: 0.3;
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) rotate(-2deg); }
            20%, 40%, 60%, 80% { transform: translateX(4px) rotate(2deg); }
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
