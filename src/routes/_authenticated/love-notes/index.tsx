import { createFileRoute } from '@tanstack/react-router'
import { LoveNotesPage } from '@/features/love-notes-page'

export const Route = createFileRoute('/_authenticated/love-notes/')({
  component: LoveNotesPage,
})
