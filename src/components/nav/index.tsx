import React from 'react';
import Content from './content';
import Title from './title';
import Time from './time';
import User from './user';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Title />
    <User />
    <Content />
    <Time />
  </nav>
);

export default Navbar;
