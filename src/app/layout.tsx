
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'C4TS — Laboratório de Soluções Digitais',
  description: 'Soluções de tecnologia e dados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <Sidebar />
        <main className="ml-80 w-[calc(100%-20rem)] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
