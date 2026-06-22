import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import HeaderComponent from '@/app/components/HeaderComponent/HeaderComponent';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Movies Platform',
    template: '%s | Movies Platform',
  },
  description: 'A movie discovery platform with search, genres, ratings and recommendations.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <HeaderComponent />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}