import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfettiEffect } from './components/confetti-effect'
import { HeroWelcome } from './components/hero-welcome'
import { CountdownTimer } from './components/countdown-timer'
import { InteractiveBalloons } from './components/interactive-balloons'
import { BirthdayCandles } from './components/birthday-candles'
import { LoveNotes } from './components/love-notes'
import { FloatingHearts } from './components/floating-hearts'
import { GiftBox } from './components/gift-box'
import { FireworksButton } from './components/fireworks-button'
import { FlipCards } from './components/flip-cards'

export function BirthdayDashboard() {
  return (
    <>
      <ConfettiEffect />

      {/* ===== Top Heading ===== */}
      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Birthday Dashboard
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='space-y-6 pb-8'>
          {/* Hero Section */}
          <HeroWelcome />

          {/* Countdown */}
          <CountdownTimer />

          {/* Interactive Fun Section - Row 1 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InteractiveBalloons />
            <BirthdayCandles />
          </div>

          {/* Interactive Fun Section - Row 2 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FloatingHearts />
            <GiftBox />
          </div>

          {/* Interactive Fun Section - Row 3 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FireworksButton />
            <FlipCards />
          </div>

          {/* Love Notes */}
          <LoveNotes />
        </div>
      </Main>
    </>
  )
}
