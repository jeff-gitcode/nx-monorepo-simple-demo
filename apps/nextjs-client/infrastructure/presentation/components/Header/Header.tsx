import { useRouter } from 'next/router';
import { FC } from 'react';

import useAuth from '../../../../infrastructure/adapter/hooks/auth.hooks';
import NavLink from '../NavLink/NavLink';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeaderProps = {};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { isLogin, useLogout: logout, useRefresh: refresh } = useAuth();
  const router = useRouter();

  function onLogout() {
    logout();
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      {isLogin && (
        <div className="navbar-nav">
          <NavLink href="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink href="/users" className="nav-item nav-link">
            Users
          </NavLink>
          <NavLink href="/about" className="nav-item nav-link">
            About
          </NavLink>
          <nav className="nav-item nav-link">
            <a href="/login" onClick={onLogout} className="nav-item nav-link">
              Logout
            </a>
          </nav>
        </div>
      )}
      {!isLogin && (
        <div className="navbar-nav">
          <a href="/login" className="nav-item nav-link">
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;
