import { NavLink } from 'react-router-dom';
import styles from './ProfileNavigation.module.css';

export default function ProfileNavigation() {
  return (
    <nav className={styles.profileNav}>
      <NavLink
        to="/profile/favorites"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Saved Flowers
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Orders History
      </NavLink>
    </nav>
  );
}
