import { createFileRoute } from '@tanstack/react-router'
import { InsideJokesPage } from '@/features/inside-jokes-page'

export const Route = createFileRoute('/_authenticated/inside-jokes/')({
  component: InsideJokesPage,
})
