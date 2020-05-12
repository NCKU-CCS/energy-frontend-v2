import React from 'react';
import classnames from 'classnames';

interface IProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<IProps> = ({ children }) => {
  const className = classnames('login-layout');

  return <main className={className}>{children}</main>;
};

export default LoginLayout;
