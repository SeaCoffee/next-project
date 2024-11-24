import React from 'react';
import Link from 'next/link';
import styles from './MenuComponent.module.css';

const MenuComponent = () => {
    return (
        <nav className={styles.menuContainer}>
            <Link href={'/movies-search'} className={styles.menuLink}>
                Search Movies
            </Link>
            <Link href={'/genre-list'} className={styles.menuLink}>
                Movies by Genres
            </Link>
            <Link href={'/movies-home'} className={styles.menuLink}>
                Movie List
            </Link>
            <Link href={'/custom-recommend'} className={styles.menuLink}>
                Recommended Movies
            </Link>
        </nav>
    );
};

export default MenuComponent;

