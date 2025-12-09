// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | C4TS — Laboratório de Soluções Digitais',
    default: 'C4TS — Laboratório de Soluções Digitais',
  },
  description:
    'Validamos ideias com dados reais: landing pages, MVPs em 2 semanas, automação de processos. Sem achismo — só resultados.',
  keywords: [
    'validação de ideias',
    'MVP rápido',
    'prototipagem digital',
    'automação de processos',
    'landing page conversão',
    'C4TS',
    'Luis Otavio Neves',
  ],
  authors: [{ name: 'Luis Otavio Neves Faustino', url: 'https://github.com/luisoneves' }],
  creator: 'Luis Otavio Neves Faustino',
  publisher: 'C4TS',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://c4ts-project-market-research.vercel.app/',
    siteName: 'C4TS',
    title: 'C4TS — Laboratório de Soluções Digitais',
    description:
      'Construímos soluções com dados, não com achismo. Validamos ideias em até 48h.',
    images: [
      {
        url: 'https://c4ts-project-market-research.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'C4TS — Validamos ideias reais com dados',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@luistech',
    creator: '@luistech',
    title: 'C4TS — Laboratório de Soluções Digitais',
    description:
      'Validamos ideias com dados reais — sem achismo. MVP em 2 semanas.',
    images: ['https://c4ts-project-market-research.vercel.app/og-image.jpg'],
  },

  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'C4TS — Laboratório de Soluções Digitais',
      url: 'https://c4ts-project-market-research.vercel.app/',
      logo: 'https://c4ts-project-market-research.vercel.app/logo/logo-512.png',
      description:
        'Laboratório especializado em validação de ideias com dados reais, prototipagem rápida e automação de processos.',
      founder: {
        '@type': 'Person',
        name: 'Luis Otavio Neves Faustino',
      },
      sameAs: [
        'https://github.com/luisoneves',
        'https://www.linkedin.com/in/luis-otavio-neves/',
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        {/* ✅ Microsoft Clarity — script assíncrono */}
        <script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uix2492he4");
            `,
          }}
        />
        
        <Sidebar />
        <main className="ml-80 w-[calc(100%-20rem)] min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}