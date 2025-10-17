import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { MusicPlaylist } from '@/features/birthday/components/music-playlist'

export function PlaylistPage() {
  return (
    <>
      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Playlist
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-8'>
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              Songs that remind us of each other and our journey
            </p>
          </div>

          <MusicPlaylist />
        </div>
      </Main>
    </>
  )
}
