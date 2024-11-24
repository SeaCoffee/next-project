import React from 'react';
import styles from './UserComponent.module.css'

const UserComponent: React.FC = () => {
    const userData = {
        name: 'Jane Smith',
        avatarColor: '#4CAF50',
    };

    return (
        <div className={styles.userContainer}>
            <div
                className={styles.avatar}
                style={{ backgroundColor: userData.avatarColor }}
            ></div>
            <h2 className={styles.userName}>{userData.name}</h2>
        </div>
    );
};

export default UserComponent;
