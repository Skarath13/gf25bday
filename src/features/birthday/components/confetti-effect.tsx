import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export function ConfettiEffect() {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Trigger confetti on page load
    setIsActive(true)
    const timeout = setTimeout(() => setIsActive(false), 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {isActive && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={200}
          colors={['#3b82f6', '#06b6d4', '#14b8a6', '#0ea5e9', '#22d3ee']}
          gravity={0.3}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        />
      )}
    </>
  )
}

export function useConfetti() {
  const [show, setShow] = useState(false)

  const trigger = () => {
    setShow(true)
    setTimeout(() => setShow(false), 3000)
  }

  const ConfettiComponent = () => {
    const { width, height } = useWindowSize()

    if (!show) return null

    return (
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        colors={['#3b82f6', '#06b6d4', '#14b8a6', '#0ea5e9', '#22d3ee']}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      />
    )
  }

  return { trigger, ConfettiComponent }
}
