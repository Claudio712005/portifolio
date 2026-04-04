import type { Metadata } from 'next'
import { MouseTrail } from '@/components/ui/MouseTrail'
import { ThemeProvider } from '@/components/layout/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cláudio | Backend Developer',
  description:
    'Backend developer focused on Java, Spring Boot and scalable REST APIs. Open to new opportunities.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MouseTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
