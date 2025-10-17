import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Sparkles } from 'lucide-react'

export function MessagePage() {
  return (
    <>
      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Special Message
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-8'>
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <CardHeader className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Heart className="w-8 h-8 text-accent fill-accent animate-pulse" />
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <CardTitle className="text-3xl font-bold">
                A Special Message for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center max-w-2xl mx-auto">
              <p className="text-lg leading-relaxed">
                Happy Birthday, Katelyn! On this special day, I want you to know how much you mean to me.
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                Every moment with you has been a gift. Your smile lights up my world,
                your laughter makes everything better, and your presence in my life
                is the greatest blessing I could ask for. Watching you grow our baby girl
                and seeing you prepare to become a mother has made me fall even more in love with you.
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                This year is going to be incredible. Not only do we get to celebrate you today,
                but in just a few months, we'll be welcoming our daughter into the world.
                I can't wait to see you as a mom - I know you're going to be absolutely amazing.
              </p>

              <div className="pt-6 border-t border-primary/20 mt-6">
                <p className="text-xl font-semibold text-primary">
                  Happy Birthday, my beautiful Katelyn!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Here's to another year of love, laughter, and building our family together.
                  I love you and our baby girl so much! 💕👶
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
