import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Music2, Play } from 'lucide-react'

const songs = [
  { id: 1, title: 'Your Favorite Song', artist: 'Artist Name', duration: '3:45' },
  { id: 2, title: 'Our Song', artist: 'Special Artist', duration: '4:12' },
  { id: 3, title: 'That Song You Love', artist: 'Another Artist', duration: '3:28' },
  { id: 4, title: 'Dance Together', artist: 'Feel Good Band', duration: '3:56' },
  { id: 5, title: 'Memories', artist: 'Nostalgic Vibes', duration: '4:03' },
]

export function MusicPlaylist() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="w-5 h-5 text-primary" />
          Our Playlist
        </CardTitle>
        <CardDescription>Songs that remind me of you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12"></TableHead>
                <TableHead>Song</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song, index) => (
                <TableRow
                  key={song.id}
                  className="touch-manipulation hover:bg-accent/5 transition-colors"
                >
                  <TableCell>
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-accent">
                      <AvatarFallback className="bg-transparent text-white text-xs font-semibold">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-sm leading-none">
                        {song.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {song.artist}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {song.duration}
                      </span>
                      <Play className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Replace with your actual favorite songs together
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
