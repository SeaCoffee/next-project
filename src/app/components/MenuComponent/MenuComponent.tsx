'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './MenuComponent.module.css';

const menuItems = [
  {
    href: '/movies-search',
    label: 'Search',
  },
  {
    href: '/genre-list',
    label: 'Genres',
  },
  {
    href: '/movies-home',
    label: 'Movies',
  },
  {
    href: '/custom-recommend',
    label: 'Recommended',
  },
];

export default function MenuComponent() {
  const pathname = usePathname();

  return (
    <nav className={styles.menu} aria-label="Main navigation">
      {menuItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.menuLink} ${isActive ? styles.activeLink : ''}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}