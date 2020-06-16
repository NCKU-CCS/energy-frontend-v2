import React from 'react';
import classnames from 'classnames';
import Navbar from '../components/nav';

interface IProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<IProps> = ({ children }) => {
  const className = classnames('general-layout');
  return (
    <main className={className}>
      <Navbar />
      {children}
    </main>
  );
};

export default GeneralLayout;
