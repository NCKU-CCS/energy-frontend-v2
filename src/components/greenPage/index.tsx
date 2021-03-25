import React, { useState } from 'react';
import classNames from 'classnames';
import Status from './status';
import Submit from './submit';
import Graph from './graph';

const GreenPageContainer: React.FC = () => {
  // mode -> buy or sell
  const [type, setType] = useState('buy');

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(user.role);

  return (
    <div className={classNames('green-container')}>
      <div className={classNames('green-top')}>{}</div>
      <div className={classNames('green-left')}>
        <div className={classNames('green-left-top')}>
          <Status userType={userType} />
        </div>
        <div className={classNames('green-left-bottom')}>
          <Graph dataType={type} />
        </div>
      </div>
      <div className={classNames('green-right')}>
        <Submit type={type} setType={setType} />
      </div>
    </div>
  );
};

export default GreenPageContainer;
