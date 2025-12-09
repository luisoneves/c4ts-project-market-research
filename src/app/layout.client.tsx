// src/app/layout.client.tsx
"use client";

import Sidebar from '@/components/Sidebar';
import { Inter } from 'next/font/google'; // Importe Inter aqui também se for usar no body class

const inter = Inter({ subsets: ['latin'] }); // Necessário se você usa a classe do Inter no body

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  return (
    <>
      <Sidebar />
      <main className="ml-80 w-[calc(100%-20rem)] min-h-screen">
        {children}
      </main>
    </>
  );
}
