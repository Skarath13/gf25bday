import { createFileRoute } from '@tanstack/react-router'
import { MessagePage } from '@/features/message-page'

export const Route = createFileRoute('/_authenticated/message/')({
  component: MessagePage,
})
