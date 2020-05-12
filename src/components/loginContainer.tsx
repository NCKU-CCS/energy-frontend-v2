import React from 'react';
import classnames from 'classnames';

interface IProps {
  children?: React.ReactNode;
  type: 'left' | 'right';
}

const LoginContainer: React.FC<IProps> = ({ children, type }) => {
  const className = classnames(
    'login-container',
    { 'login-container--right': type === 'right' },
    { 'login-container--left': type === 'left' },
  );

  return <div className={className}>{children}</div>;
};

export default LoginContainer;
