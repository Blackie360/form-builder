import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import DesignerContextProvider from '@/components/context/DesignerContext'
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'formify📝',
  description: ' Craft forms that captivate, whether its designing surveys, registrations, or feedback forms🌟, 🚀 Drag-and-Drop Magic,📊 Data Insights.Its time to turn your forms into captivating masterpieces.   ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
    <head>
        <link rel='icon' href='/app/form.ico'/>
      </head>
      <body className={inter.className}>
        <NextTopLoader/>
      <DesignerContextProvider>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        
              {children}
              <Analytics />
              <Toaster />
            </ThemeProvider>
      </DesignerContextProvider>
          </body>
    </html>
    </ClerkProvider>
  )
}
