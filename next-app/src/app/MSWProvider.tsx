'use client';

import { useEffect, type ReactNode } from 'react';

export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled' || typeof window === 'undefined') {
      return;
    }

    void (async () => {
      const { worker } = await import('@/mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass' });
    })();
  }, []);

  return <>{children}</>;
}
