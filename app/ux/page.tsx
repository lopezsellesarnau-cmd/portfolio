import type { Metadata } from 'next'
import { UxPage } from '@/components/ux'

export const metadata: Metadata = {
  title: 'Arnau Lopez | Product & UX Design',
  description:
    'Selected product and UX/UI design work by Arnau Lopez, a design engineer who takes products from Figma to production.',
  alternates: { canonical: '/ux' },
}

export default function Page() {
  return <UxPage />
}
