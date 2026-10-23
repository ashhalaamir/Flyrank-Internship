'use client';

import { useEffect, type ReactNode } from 'react';

let workerStartPromise: Promise<unknown> | undefined;

export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled' || typeof window === 'undefined') {
      return;
    }

    const startPromise = (workerStartPromise ??= import('@/mocks/browser').then(({ worker }) =>
      worker.start({ onUnhandledRequest: 'bypass' }),
    ));

    void startPromise.catch((error: unknown) => {
      workerStartPromise = undefined;
      console.error('Failed to start the MSW worker:', error);
    });
  }, []);

  return <>{children}</>;
}
