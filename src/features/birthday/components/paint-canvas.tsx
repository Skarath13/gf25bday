import { useRef, useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Paintbrush } from 'lucide-react'

const COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Black', value: '#1f2937' },
]

export function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState(COLORS[0].value)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add prompt text
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.textAlign = 'center'
    ctx.fillText('Draw something for Katelyn! 💕', canvas.width / 2, canvas.height / 2)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasDrawn(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return

    const canvas = canvasRef.current
    if (!canvas) return

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

    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Re-add prompt text
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.textAlign = 'center'
    ctx.fillText('Draw something for Katelyn! 💕', canvas.width / 2, canvas.height / 2)

    setHasDrawn(false)
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create download link
    const link = document.createElement('a')
    link.download = 'birthday-drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Paintbrush className="w-5 h-5 text-primary" />
          Paint Canvas
        </CardTitle>
        <CardDescription>Draw something special!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Color palette */}
        <div className="flex justify-center gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setCurrentColor(color.value)}
              className={`w-8 h-8 rounded-full transition-all touch-manipulation ${
                currentColor === color.value
                  ? 'ring-2 ring-primary ring-offset-2 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name}`}
            />
          ))}
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-lg shadow-inner border-2 border-slate-200">
          <canvas
            ref={canvasRef}
            className="w-full h-64 cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={clearCanvas}
            className="py-2 px-4 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors touch-manipulation font-medium"
          >
            Clear
          </button>
          <button
            onClick={saveDrawing}
            disabled={!hasDrawn}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation font-medium"
          >
            Save
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground italic">
          Create a masterpiece with your finger! 🎨
        </p>
      </CardContent>
    </Card>
  )
}
