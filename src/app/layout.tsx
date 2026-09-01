import localFont from 'next/font/local'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { BootGuard } from '@/features/boot/components/boot-guard'
import './globals.css'

/**
 * Display voice: a contemporary display serif, self-hosted rather than pulled
 * from a font CDN. Its stroke contrast is the reason it is here — the WebGL
 * layer splits colour where the surface bends, and thin strokes make that
 * separation legible in a way a uniform grotesque never does.
 *
 * Licensed under the ITF Free Font License; the terms ship beside the files.
 */
const zodiak = localFont({
  src: [
    { path: './fonts/Zodiak-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/Zodiak-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-serif', 'Georgia', 'serif'],
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      suppressHydrationWarning
      className={`${zodiak.variable} ${instrument.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <BootGuard />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
