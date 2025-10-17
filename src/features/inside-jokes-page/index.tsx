import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { InsideJokes } from '@/features/birthday/components/inside-jokes'

export function InsideJokesPage() {
  return (
    <>
      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Inside Jokes
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-8'>
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              The moments that make us laugh, only we understand
            </p>
          </div>

          <InsideJokes />
        </div>
      </Main>
    </>
  )
}
