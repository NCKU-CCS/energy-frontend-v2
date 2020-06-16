import React from 'react';

interface IProps {
  name: string;
  imgName: string;
  pathname?: string;
  onLogout?: (event: React.SyntheticEvent) => void;
}

const NavLink: React.FC<IProps> = ({ pathname, name, imgName, onLogout }) => (
  <div className="navbar-link">
    <div>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/nav/${
          window.location.pathname === pathname ? 'orange_icon' : 'white_icon'
        }/${imgName}.png`}
      />
    </div>
    <a href={pathname} onClick={onLogout}>
      {name}
    </a>
  </div>
);

export default NavLink;
