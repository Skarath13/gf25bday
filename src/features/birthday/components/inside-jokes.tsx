import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Laugh, MessageCircle } from 'lucide-react'

const jokes = [
  {
    id: 1,
    joke: 'Remember that time we... 😂',
    description: 'Add your favorite inside jokes here!',
  },
  {
    id: 2,
    joke: 'That thing you always say...',
    description: 'Replace with real inside jokes that make you both laugh',
  },
  {
    id: 3,
    joke: 'Our secret code word 🤫',
    description: 'Those special moments only you two understand',
  },
]

export function InsideJokes() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Laugh className="w-5 h-5 text-primary" />
          Inside Jokes & Memories
        </CardTitle>
        <CardDescription>The moments that make us laugh</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {jokes.map((item, index) => (
          <div key={item.id}>
            {index > 0 && <Separator className="my-3" />}
            <Alert className="border-primary/20 touch-manipulation hover:bg-accent/5 transition-colors">
              <MessageCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="space-y-1">
                <p className="font-semibold text-base">{item.joke}</p>
                <p className="text-sm text-muted-foreground italic">
                  {item.description}
                </p>
              </AlertDescription>
            </Alert>
          </div>
        ))}

        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Customize these with your real inside jokes
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
