import type { ReactNode } from 'react';
import './globals.css';
import { AuthProvider } from './providers';
import { MSWProvider } from './MSWProvider';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <AuthProvider>{children}</AuthProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
