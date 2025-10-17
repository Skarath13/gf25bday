import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { PhotoCarousel } from '@/features/birthday/components/photo-carousel'

export function MemoriesPage() {
  return (
    <>
      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Memories
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-8'>
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              A collection of our favorite moments together
            </p>
          </div>

          <PhotoCarousel />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              Every photo tells a story, and every story is ours.
            </p>
          </div>
        </div>
      </Main>
    </>
  )
}
