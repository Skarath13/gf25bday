import { createFileRoute } from '@tanstack/react-router'
import { PlaylistPage } from '@/features/playlist-page'

export const Route = createFileRoute('/_authenticated/playlist/')({
  component: PlaylistPage,
})
