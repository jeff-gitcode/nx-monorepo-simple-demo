import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export type NavLinkProps = {
  href: string;
  exact?: any;
  className: string;
  children: React.ReactNode;
};

const NavLink: FC<NavLinkProps> = (props: NavLinkProps) => {
  const { exact, href, children } = props;
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  let className = props.className;
  if (isActive) {
    className += ' active';
  }

  return (
    <nav className={className}>
      <Link {...props}></Link>
    </nav>
  );
};

export default NavLink;
