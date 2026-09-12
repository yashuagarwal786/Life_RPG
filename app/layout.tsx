import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Life RPG — Turn Your Life Into an Epic Adventure',
  description:
    'Level up your real life. Transform daily tasks into epic quests, earn XP and gold, grow your character attributes, and build powerful streaks. Life RPG gamifies productivity.',
  keywords: ['life RPG', 'gamification', 'productivity', 'habit tracker', 'quest', 'XP', 'leveling', 'self improvement'],
  openGraph: {
    title: 'Life RPG — Turn Your Life Into an Epic Adventure',
    description: 'Transform daily tasks into epic quests. Earn XP, level up, and build your character — in real life.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Life RPG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life RPG — Turn Your Life Into an Epic Adventure',
    description: 'Transform daily tasks into epic quests. Earn XP, level up, and build your character — in real life.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-inter bg-obsidian-950 text-purple-100 antialiased">
        {children}
      </body>
    </html>
  )
}
