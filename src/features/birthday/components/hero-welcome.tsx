import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Heart, Baby } from 'lucide-react'

export function HeroWelcome() {
  return (
    <Card className="w-full overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <CardContent className="p-8 text-center space-y-4">
        <div className="flex justify-center gap-2 animate-pulse">
          <Sparkles className="w-8 h-8 text-primary" />
          <Heart className="w-8 h-8 text-accent fill-accent" />
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          Happy Birthday, Katelyn!
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          To my amazing girlfriend and soon-to-be mama
        </p>

        <div className="pt-4 text-sm text-muted-foreground max-w-md mx-auto space-y-2">
          <p className="leading-relaxed">
            This special dashboard was created just for you, celebrating another year
            of your wonderful life and the incredible journey ahead.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Baby className="w-5 h-5 text-primary" />
            <p className="text-xs font-semibold text-primary">
              Our baby girl arrives January 2026
            </p>
            <Baby className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="flex justify-center gap-2 pt-2">
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>
            🎂
          </span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '150ms' }}>
            🎉
          </span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '300ms' }}>
            👶
          </span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '450ms' }}>
            💕
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
