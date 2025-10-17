import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrapbookPage {
  id: number
  emoji: string
  title: string
  memory: string
  date: string
  stickers: string[]
}

const PAGES: ScrapbookPage[] = [
  {
    id: 1,
    emoji: '💑',
    title: 'Our Beginning',
    memory: 'From the moment we met, I knew you were special. Every day with you is a gift.',
    date: 'The Start of Forever',
    stickers: ['💕', '✨', '💖'],
  },
  {
    id: 2,
    emoji: '🏡',
    title: 'Building Our Home',
    memory: 'Creating a life together, one memory at a time. Our home is wherever we are together.',
    date: 'Home Sweet Home',
    stickers: ['🔑', '💗', '🌟'],
  },
  {
    id: 3,
    emoji: '👶',
    title: 'Baby on the Way',
    memory: 'The day we found out about our baby girl changed everything. Our family is growing!',
    date: 'Best News Ever',
    stickers: ['🍼', '💕', '🎀'],
  },
  {
    id: 4,
    emoji: '🎂',
    title: 'Today',
    memory: 'Happy Birthday, Katelyn! You make every single day brighter. Here\'s to you!',
    date: 'October 19, 2025',
    stickers: ['🎉', '💖', '🎈'],
  },
]

export function DigitalScrapbook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [flipping, setFlipping] = useState(false)

  const nextPage = () => {
    if (currentPage < PAGES.length - 1 && !flipping) {
      setFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setFlipping(false)
      }, 300)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !flipping) {
      setFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setFlipping(false)
      }, 300)
    }
  }

  const page = PAGES[currentPage]

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          Digital Scrapbook
        </CardTitle>
        <CardDescription>
          Page {currentPage + 1} of {PAGES.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Scrapbook page */}
          <div
            className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border-4 border-amber-200 shadow-xl min-h-[320px] transition-all duration-300 ${
              flipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
          >
            {/* Page content */}
            <div className="space-y-4">
              {/* Emoji header */}
              <div className="text-center">
                <div className="text-6xl mb-2 animate-in zoom-in duration-500">
                  {page.emoji}
                </div>
                <h3 className="text-xl font-bold text-primary">{page.title}</h3>
                <p className="text-xs text-muted-foreground italic mt-1">{page.date}</p>
              </div>

              {/* Memory text */}
              <div className="bg-white/50 rounded-lg p-4 border-2 border-dashed border-amber-300">
                <p className="text-sm text-center leading-relaxed">
                  {page.memory}
                </p>
              </div>

              {/* Decorative stickers */}
              <div className="flex justify-around text-3xl">
                {page.stickers.map((sticker, index) => (
                  <span
                    key={index}
                    className="animate-in zoom-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: `rotate(${(index - 1) * 15}deg)`,
                    }}
                  >
                    {sticker}
                  </span>
                ))}
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-2xl opacity-20">📎</div>
              <div className="absolute top-4 right-4 text-2xl opacity-20">📎</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-20">⭐</div>
              <div className="absolute bottom-4 right-4 text-2xl opacity-20">⭐</div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4 gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || flipping}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === PAGES.length - 1 || flipping}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {PAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!flipping) {
                    setFlipping(true)
                    setTimeout(() => {
                      setCurrentPage(index)
                      setFlipping(false)
                    }, 300)
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                  index === currentPage
                    ? 'bg-primary w-6'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
