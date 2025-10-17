import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

const MESSAGES = [
  "You make every day magical, Katelyn! ✨",
  "Can't wait for our baby girl to meet her amazing mom! 👶",
  "You're my everything! 💕",
  "Date night soon? Just the two of us! 🌙",
  "You're going to be the best mama ever! 🌟",
]

export function ScratchCard() {
  const [isScratched, setIsScratched] = useState(false)
  const [message, setMessage] = useState(MESSAGES[0])
  const [scratching, setScratching] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scratchProgress, setScratchProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw scratch surface
    ctx.fillStyle = '#94a3b8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch here!', canvas.width / 2, canvas.height / 2)
  }, [isScratched])

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || isScratched) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    // Check if scratched enough
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++
    }
    const progress = (transparent / (imageData.data.length / 4)) * 100
    setScratchProgress(progress)

    if (progress > 50) {
      setIsScratched(true)
    }
  }

  const reset = () => {
    setIsScratched(false)
    setScratchProgress(0)
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#94a3b8'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = '14px sans-serif'
        ctx.fillStyle = '#64748b'
        ctx.textAlign = 'center'
        ctx.fillText('Scratch here!', canvas.width / 2, canvas.height / 2)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Scratch Card
        </CardTitle>
        <CardDescription>
          {isScratched ? 'Tap card to get a new one!' : 'Scratch to reveal a surprise!'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden touch-manipulation"
          onClick={isScratched ? reset : undefined}
        >
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="text-lg font-semibold text-primary">{message}</p>
          </div>
          {!isScratched && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer"
              onMouseMove={(e) => scratching && scratch(e)}
              onMouseDown={() => setScratching(true)}
              onMouseUp={() => setScratching(false)}
              onMouseLeave={() => setScratching(false)}
              onTouchMove={scratch}
            />
          )}
        </div>
        {!isScratched && scratchProgress > 0 && (
          <p className="text-xs text-center mt-2 text-muted-foreground">
            {Math.floor(scratchProgress)}% revealed
          </p>
        )}
      </CardContent>
    </Card>
  )
}
