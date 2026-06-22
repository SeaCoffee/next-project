import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import styles from './movies-layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'Movies App',
    template: '%s | Movies App',
  },
  description: 'Explore movies, genres, search results and recommendations.',
};

type MoviesLayoutProps = {
  children: ReactNode;
};

export default function MoviesLayout({ children }: MoviesLayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}