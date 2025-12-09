// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Sidebar from '@/components/Sidebar';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

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

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-V3HNTBMVQE';
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || 'GTM-KXCGXCNF';
const YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '105756046';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'uix2492he4';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        {/* Scripts de Telemetria */}
        <Script
          id="gtm-script-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />

        <Script
          id="ga4-script"
          strategy="afterInteractive"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}');
            `,
          }}
        />

        <Script
          id="yandex-metrica-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

              ym(${YANDEX_METRICA_ID}, 'init', {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  trackHash:true
              });
            `,
          }}
        />
        <noscript>
            <div><img src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_ID}`} style={{position:'absolute', left:'-9999px'}} alt="" /></div>
        </noscript>

        <Sidebar />
        <main className="ml-80 w-[calc(100%-20rem)] min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
