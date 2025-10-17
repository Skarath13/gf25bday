import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'

interface MusicNote {
  id: number
  x: number
  note: string
  delay: number
}

const NOTES = ['♪', '♫', '♬', '♩', '♭', '♮', '♯']

export function MusicBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [notes, setNotes] = useState<MusicNote[]>([])
  const [rotation, setRotation] = useState(0)

  const toggleBox = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)

    if (newIsOpen) {
      setIsPlaying(true)
      // Play for 10 seconds
      setTimeout(() => {
        setIsPlaying(false)
      }, 10000)
    } else {
      setIsPlaying(false)
      setNotes([])
    }
  }

  useEffect(() => {
    if (!isPlaying) return

    const createNote = () => {
      const newNote: MusicNote = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        note: NOTES[Math.floor(Math.random() * NOTES.length)],
        delay: 0,
      }

      setNotes(prev => [...prev, newNote])

      setTimeout(() => {
        setNotes(prev => prev.filter(n => n.id !== newNote.id))
      }, 3000)
    }

    // Create notes periodically
    const interval = setInterval(createNote, 400)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Rotate ballerina when playing
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setRotation(prev => (prev + 6) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          Music Box
        </CardTitle>
        <CardDescription>
          {isOpen ? (isPlaying ? 'Playing...' : 'Tap to close') : 'Tap to open and play'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Music Box */}
          <button
            onClick={toggleBox}
            className="relative w-full h-64 bg-gradient-to-br from-amber-800 to-amber-950 rounded-lg shadow-2xl overflow-hidden touch-manipulation transition-all hover:scale-[1.02]"
          >
            {/* Box base */}
            <div className="absolute inset-0 border-4 border-amber-700/50 rounded-lg" />

            {/* Decorative pattern */}
            <div className="absolute inset-4 border-2 border-amber-600/30 rounded-lg" />

            {/* Box lid (opens upward) */}
            <div
              className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-amber-700 to-amber-900 border-4 border-amber-700/50 rounded-t-lg transition-all duration-700 origin-bottom ${
                isOpen ? '-translate-y-full rotate-x-90 opacity-70' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <div className="absolute inset-2 border border-amber-600/30 rounded-t-lg" />
            </div>

            {/* Inside of box (visible when open) */}
            {isOpen && (
              <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-red-950/80 flex items-center justify-center animate-in fade-in duration-500">
                {/* Ballerina/Dancer */}
                <div
                  className="text-6xl transition-transform"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  💃
                </div>

                {/* Floating notes */}
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="absolute text-3xl text-primary font-bold pointer-events-none"
                    style={{
                      left: `${note.x}%`,
                      bottom: '20%',
                      animation: `floatNote 3s ease-out forwards`,
                      animationDelay: `${note.delay}s`,
                    }}
                  >
                    {note.note}
                  </div>
                ))}
              </div>
            )}

            {/* Closed state decoration */}
            {!isOpen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Music className="w-16 h-16 text-amber-400 mx-auto opacity-60" />
                  <p className="text-amber-200 text-sm font-medium">Tap to Open</p>
                </div>
              </div>
            )}
          </button>

          {/* Message */}
          {isOpen && (
            <div className="mt-4 text-center animate-in fade-in duration-500">
              <p className="text-sm font-medium text-primary italic">
                "A love song just for you, Katelyn 💕"
              </p>
            </div>
          )}

          <style>{`
            @keyframes floatNote {
              0% {
                transform: translateY(0) scale(1);
                opacity: 1;
              }
              100% {
                transform: translateY(-200px) scale(1.5);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </CardContent>
    </Card>
  )
}
