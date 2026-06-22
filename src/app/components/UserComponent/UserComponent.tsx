import styles from './UserComponent.module.css';

const userData = {
  name: 'Joe Smith',
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

export default function UserComponent() {
  return (
    <div className={styles.userContainer}>
      <div className={styles.avatar} aria-hidden="true">
        {getInitials(userData.name)}
      </div>

      <div className={styles.userInfo}>
        <p className={styles.label}>Signed in as</p>
        <p className={styles.userName}>{userData.name}</p>
      </div>
    </div>
  );
}