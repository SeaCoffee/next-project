import Link from 'next/link';

import MenuComponent from '@/app/components/MenuComponent/MenuComponent';
import UserComponent from '@/app/components/UserComponent/UserComponent';

import styles from './HeaderComponent.module.css';

export default function HeaderComponent() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/movies-home" className={styles.logoLink}>
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>Movies Platform</span>
        </Link>

        <div className={styles.menuContainer}>
          <MenuComponent />
        </div>

        <div className={styles.userContainer}>
          <UserComponent />
        </div>
      </div>
    </header>
  );
}