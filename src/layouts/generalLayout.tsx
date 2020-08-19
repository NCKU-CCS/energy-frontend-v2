import React from 'react';
import classnames from 'classnames';
import Navbar from '../components/nav';

interface IProps {
  children: React.ReactNode;
  title: string;
}

const GeneralLayout: React.FC<IProps> = ({ children, title }) => {
  return (
    <main className={classnames('general-layout')}>
      <Navbar />
      <div className={classnames('general-container')}>
        <div className={classnames('general-title')}>{title}</div>
        {children}
      </div>
    </main>
  );
};

export default GeneralLayout;
