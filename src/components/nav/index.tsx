import React from 'react';
import Content from './content';
import Title from './title';
import Time from './time';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Title />
    <Content />
    <Time />
  </nav>
);

export default Navbar;
