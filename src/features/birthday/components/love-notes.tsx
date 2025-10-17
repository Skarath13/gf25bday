import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Heart, Smile, Star, Sparkles } from 'lucide-react'

export function LoveNotes() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent fill-accent" />
          Love Notes
        </CardTitle>
        <CardDescription>Messages from the heart</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="why" className="w-full">
          <TabsList className="grid w-full grid-cols-3 touch-manipulation">
            <TabsTrigger value="why">Why I Love You</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
            <TabsTrigger value="future">Our Future</TabsTrigger>
          </TabsList>

          <TabsContent value="why" className="space-y-4 mt-4">
            <NoteCard
              icon={<Heart className="w-4 h-4" />}
              title="Your Beautiful Spirit"
              content="Katelyn, your smile lights up my entire world and makes every day brighter."
              badge="Always"
            />
            <NoteCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Amazing Mother-to-Be"
              content="Watching you prepare to be a mom to our daughter fills my heart with so much love and excitement."
              badge="Inspiring"
            />
            <NoteCard
              icon={<Star className="w-4 h-4" />}
              title="Your Strength"
              content="You're the strongest person I know, and I'm so grateful to share this journey with you."
              badge="Amazing"
            />
          </TabsContent>

          <TabsContent value="memories" className="space-y-4 mt-4">
            <NoteCard
              icon={<Smile className="w-4 h-4" />}
              title="Our Story"
              content="Every moment we've shared together has been a blessing I treasure deeply."
              badge="Special"
            />
            <NoteCard
              icon={<Heart className="w-4 h-4" />}
              title="The Big News"
              content="Finding out we're having a baby girl was one of the best moments of my life."
              badge="Unforgettable"
            />
            <NoteCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Our Adventures"
              content="From silly moments to serious talks, every memory with you means everything to me."
              badge="Cherished"
            />
          </TabsContent>

          <TabsContent value="future" className="space-y-4 mt-4">
            <NoteCard
              icon={<Star className="w-4 h-4" />}
              title="Our Growing Family"
              content="January 2026 will be the start of our greatest adventure - becoming parents together."
              badge="Soon"
            />
            <NoteCard
              icon={<Heart className="w-4 h-4" />}
              title="Building Our Future"
              content="I can't wait to build our life together and watch our daughter grow with the best mom she could ask for."
              badge="Exciting"
            />
            <NoteCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Forever With You"
              content="Every birthday, every milestone, every moment - I want to spend them all with you and our little girl."
              badge="Always"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function NoteCard({
  icon,
  title,
  content,
  badge,
}: {
  icon: React.ReactNode
  title: string
  content: string
  badge: string
}) {
  return (
    <div className="p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors touch-manipulation">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <h4 className="font-semibold">{title}</h4>
        </div>
        <Badge variant="secondary" className="text-xs">
          {badge}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  )
}
