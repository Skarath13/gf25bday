import { createFileRoute } from '@tanstack/react-router'
import { InteractivePage } from '@/features/interactive-page'

export const Route = createFileRoute('/_authenticated/interactive/')({
  component: InteractivePage,
})
