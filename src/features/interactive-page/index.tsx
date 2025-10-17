import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfettiEffect } from '@/features/birthday/components/confetti-effect'
import { InteractiveBalloons } from '@/features/birthday/components/interactive-balloons'
import { BirthdayCandles } from '@/features/birthday/components/birthday-candles'
import { FloatingHearts } from '@/features/birthday/components/floating-hearts'
import { GiftBox } from '@/features/birthday/components/gift-box'
import { FireworksButton } from '@/features/birthday/components/fireworks-button'
import { FlipCards } from '@/features/birthday/components/flip-cards'
import { ScratchCard } from '@/features/birthday/components/scratch-card'
import { MessageBottle } from '@/features/birthday/components/message-bottle'
import { FortuneCookie } from '@/features/birthday/components/fortune-cookie'
import { WishingWell } from '@/features/birthday/components/wishing-well'
import { Sparkler } from '@/features/birthday/components/sparkler'
import { StarShower } from '@/features/birthday/components/star-shower'
import { BuildACake } from '@/features/birthday/components/build-a-cake'
import { BubblePop } from '@/features/birthday/components/bubble-pop'
import { MemoryTimeline } from '@/features/birthday/components/memory-timeline'
import { PuzzleReveal } from '@/features/birthday/components/puzzle-reveal'
import { LoveMeter } from '@/features/birthday/components/love-meter'
import { BabyCountdown } from '@/features/birthday/components/baby-countdown'
import { DigitalScrapbook } from '@/features/birthday/components/digital-scrapbook'
import { TypewriterLetter } from '@/features/birthday/components/typewriter-letter'
import { BalloonRelease } from '@/features/birthday/components/balloon-release'
import { SpinningWheel } from '@/features/birthday/components/spinning-wheel'
import { WishJar } from '@/features/birthday/components/wish-jar'
import { SnowGlobe } from '@/features/birthday/components/snow-globe'

export function InteractivePage() {
  return (
    <>
      <ConfettiEffect />

      <Header>
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Interactive Fun
          </h1>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='space-y-6 pb-8'>
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              Tap, pop, and play with all the birthday magic! 🎉
            </p>
          </div>

          {/* Original Interactive Components */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InteractiveBalloons />
            <BirthdayCandles />
            <FloatingHearts />
            <GiftBox />
            <FireworksButton />
            <FlipCards />
          </div>

          {/* New Interactive Components - Set 1 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <ScratchCard />
            <MessageBottle />
            <FortuneCookie />
            <WishingWell />
            <Sparkler />
            <StarShower />
          </div>

          {/* New Interactive Components - Set 2 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <BuildACake />
            <BubblePop />
            <MemoryTimeline />
            <PuzzleReveal />
            <LoveMeter />
            <BabyCountdown />
          </div>

          {/* New Interactive Components - Set 3 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <DigitalScrapbook />
            <TypewriterLetter />
            <BalloonRelease />
            <SpinningWheel />
            <WishJar />
            <SnowGlobe />
          </div>
        </div>
      </Main>
    </>
  )
}
