import { createFileRoute } from '@tanstack/react-router'
import { MemoriesPage } from '@/features/memories-page'

export const Route = createFileRoute('/_authenticated/memories/')({
  component: MemoriesPage,
})
