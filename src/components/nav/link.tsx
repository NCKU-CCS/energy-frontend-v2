import React from 'react';
import classnames from 'classnames';

interface IProps {
  name: string;
  imgName: string;
  pathname?: string;
  onLogout?: (event: React.SyntheticEvent) => void;
}

const NavLink: React.FC<IProps> = ({ pathname, name, imgName, onLogout }) => (
  <div className={classnames('navbar-link')}>
    <div>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/nav/${
          window.location.pathname === pathname ? 'orange_icon' : 'white_icon'
        }/${imgName}.png`}
      />
    </div>
    <a
      href={pathname}
      onClick={onLogout}
      className={
        window.location.pathname === pathname
          ? classnames('navbar-link-fontColor', 'navbar-link-fontColor--active')
          : classnames('navbar-link-fontColor')
      }
    >
      {name}
    </a>
  </div>
);

export default NavLink;
