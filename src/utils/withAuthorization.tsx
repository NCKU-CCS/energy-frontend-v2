/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthorization = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> => {
  const AuthHOC = ({ ...props }: P) => {
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    return JSON.stringify(user) === '{}' ? (
      <Redirect to="/login" />
    ) : (
      <Component {...props} />
    );
  };
  return AuthHOC;
};

export default withAuthorization;
