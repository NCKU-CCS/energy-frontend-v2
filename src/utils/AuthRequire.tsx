/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/login';

const AuthRequire = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> => {
  const AuthHOC = ({ ...props }: P) => {
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    return JSON.stringify(user) === '{}' ? (
      <Route component={LoginPage} />
    ) : (
      <Component {...props} />
    );
  };
  return AuthHOC;
};

export default AuthRequire;
