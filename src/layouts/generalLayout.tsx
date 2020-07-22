import React from 'react';
import classnames from 'classnames';
import Navbar from '../components/nav';

interface IProps {
  children: React.ReactNode;
  title: string;
}

const GeneralLayout: React.FC<IProps> = ({ children, title }) => {
  const className = classnames('general-layout');
  const titleClass = classnames('general-title');
  const rightContainer = classnames('general-container');
  return (
    <main className={className}>
      <Navbar />
      <div className={rightContainer}>
        <div className={titleClass}>{title}</div>
        {children}
      </div>
    </main>
  );
};

export default GeneralLayout;
