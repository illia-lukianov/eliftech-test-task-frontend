import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import UserInfo from '../UserInfo/UserInfo';
import { FaCartArrowDown } from "react-icons/fa";

export default function Navigation({
  isLoggedIn = false,
  closeMenu = () => {},
  userName = '',
  onLogout = () => {},
  isMobile = false,
}) {
  return (
    <div className="container">
      <nav className={css.navGroup}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${css.link} ${css.recipes} ${isActive ? css.active : ''}`
          }
          onClick={closeMenu}
        >
          Flowers
        </NavLink>

        {!isLoggedIn ? (
          <>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `${css.link} ${css.login} ${isActive ? css.active : ''}`
              }
              onClick={closeMenu}
            >
              Log in
            </NavLink>

            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                `brown-btn ${css.linkBtn} ${css.register} ${
                  isActive ? css.active : ''
                }`
              }
              onClick={closeMenu}
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile/favorites"
              className={({ isActive }) =>
                `${css.link} ${css.profile} ${isActive ? css.active : ''}`
              }
              onClick={closeMenu}
            >
              My Profile
            </NavLink>

            <NavLink
               to="/cart"
               className={({ isActive }) =>
                `brown-btn ${css.linkBtn} ${css.addRecipe} ${
                  isActive ? css.active : ''
                }`
              }
              onClick={closeMenu}
            >
              <FaCartArrowDown />
            </NavLink>

            <div className={css.userInfo}>
              <UserInfo
                userName={userName}
                onLogout={onLogout}
                isMobile={isMobile}
                closeMenu={closeMenu}
              />
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
