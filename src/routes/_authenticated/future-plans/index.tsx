import { createFileRoute } from '@tanstack/react-router'
import { FuturePlansPage } from '@/features/future-plans-page'

export const Route = createFileRoute('/_authenticated/future-plans/')({
  component: FuturePlansPage,
})
