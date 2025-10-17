import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Expand } from 'lucide-react'

const photos = [
  {
    id: 1,
    title: 'Our First Photo',
    description: 'Add your favorite photos here',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 2,
    title: 'Special Moment',
    description: 'Replace with real photos of you two',
    color: 'from-cyan-400 to-teal-500',
  },
  {
    id: 3,
    title: 'Beautiful Memory',
    description: 'Swipe through your memories',
    color: 'from-teal-400 to-blue-500',
  },
  {
    id: 4,
    title: 'Happy Times',
    description: 'All the moments together',
    color: 'from-sky-400 to-cyan-500',
  },
]

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const currentPhoto = photos[currentIndex]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          Our Memories
        </CardTitle>
        <CardDescription>
          {currentIndex + 1} of {photos.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative group">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br ${currentPhoto.color} touch-manipulation hover:scale-[1.02] active:scale-[0.98] transition-transform">
                {/* Placeholder photo */}
                <div
                  className={`w-full h-full bg-gradient-to-br ${currentPhoto.color} flex items-center justify-center`}
                >
                  <div className="text-center text-white space-y-2 p-6">
                    <ImageIcon className="w-16 h-16 mx-auto opacity-80" />
                    <p className="font-semibold text-lg">{currentPhoto.title}</p>
                    <p className="text-sm opacity-90">{currentPhoto.description}</p>
                  </div>
                </div>

                {/* Expand button */}
                <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4 text-white" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div
                className={`w-full aspect-[4/3] bg-gradient-to-br ${currentPhoto.color} rounded-lg flex items-center justify-center`}
              >
                <div className="text-center text-white space-y-3 p-8">
                  <ImageIcon className="w-24 h-24 mx-auto opacity-80" />
                  <p className="font-bold text-2xl">{currentPhoto.title}</p>
                  <p className="text-lg opacity-90">{currentPhoto.description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPhoto}
            className="touch-manipulation h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-2 rounded-full transition-all touch-manipulation
                  ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }
                `}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPhoto}
            className="touch-manipulation h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          💡 Replace placeholder with real photos of you two
        </p>
      </CardContent>
    </Card>
  )
}
