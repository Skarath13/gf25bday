import {
  LayoutDashboard,
  Heart,
  Image,
  Laugh,
  Music2,
  Target,
  Mail,
  Cake,
  Sparkles,
  Palette,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Katelyn',
    email: 'happy.birthday@2025.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Katelyn\'s Birthday',
      logo: Cake,
      plan: 'Oct 19, 2025',
    },
  ],
  navGroups: [
    {
      title: 'Celebration',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Love Notes',
          url: '/love-notes',
          icon: Heart,
        },
        {
          title: 'Interactive Fun',
          url: '/interactive',
          icon: Sparkles,
        },
      ],
    },
    {
      title: 'Our Story',
      items: [
        {
          title: 'Special Message',
          url: '/message',
          icon: Mail,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Appearance',
          url: '/settings/appearance',
          icon: Palette,
        },
      ],
    },
  ],
}
