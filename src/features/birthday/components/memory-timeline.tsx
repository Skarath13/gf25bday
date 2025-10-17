import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Heart } from 'lucide-react'

interface Memory {
  id: number
  date: string
  title: string
  description: string
  icon: string
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    date: 'Our First Date',
    title: 'Where It All Began',
    description: 'The moment I knew you were special 💕',
    icon: '💖',
  },
  {
    id: 2,
    date: 'First "I Love You"',
    title: 'Three Magic Words',
    description: 'When we knew this was forever ✨',
    icon: '💗',
  },
  {
    id: 3,
    date: 'Moving In Together',
    title: 'Our First Home',
    description: 'Building our life together 🏡',
    icon: '🔑',
  },
  {
    id: 4,
    date: 'Baby Announcement',
    title: 'We\'re Having A Baby!',
    description: 'The day that changed everything 👶',
    icon: '🍼',
  },
  {
    id: 5,
    date: 'Gender Reveal',
    title: "It's A Girl!",
    description: 'Our baby girl is on the way! 💕',
    icon: '🎀',
  },
  {
    id: 6,
    date: 'Today',
    title: 'Your Special Day',
    description: "Celebrating you and all we've built together! 🎉",
    icon: '🎂',
  },
]

export function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Memory Timeline
        </CardTitle>
        <CardDescription>Tap a memory to relive the moment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30" />

          {/* Memories */}
          <div className="space-y-6">
            {MEMORIES.map((memory) => (
              <button
                key={memory.id}
                onClick={() => setSelectedMemory(memory)}
                className="relative w-full flex gap-4 items-start text-left touch-manipulation group"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  {memory.icon}
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-background to-muted/20 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">
                    {memory.date}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{memory.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {memory.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected memory modal */}
        {selectedMemory && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedMemory(null)}
          >
            <div
              className="bg-background rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">{selectedMemory.icon}</div>
                <div>
                  <div className="text-xs text-primary font-medium mb-2">
                    {selectedMemory.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{selectedMemory.title}</h3>
                  <p className="text-muted-foreground">{selectedMemory.description}</p>
                </div>
                <Heart className="w-6 h-6 text-primary mx-auto animate-pulse" />
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
