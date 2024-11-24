import React from 'react';
import UserComponent from "@/app/components/UserComponent/UserComponent";
import MenuComponent from '@/app/components/MenuComponent/MenuComponent';
import styles from './HeaderComponent.module.css';


const HeaderComponent = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.menuContainer}>
                <MenuComponent />
            </div>
            <div className={styles.userContainer}>
                <UserComponent />
            </div>
        </header>
    );
};

export default HeaderComponent;
