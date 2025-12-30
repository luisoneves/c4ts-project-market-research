'use client';

import { useEffect } from 'react';
import { StorageService } from '@/lib/storage';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ✅ Inicializar dados mockados no localStorage na primeira visita
    StorageService.initData();
  }, []);

  return <>{children}</>;
}
