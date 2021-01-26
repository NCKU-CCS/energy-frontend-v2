import React, { useState } from 'react';
import classNames from 'classnames';
import Status from './status';
import Submit from './submit';
import Graph from './graph';

const GreenPageContainer: React.FC = () => {
  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(
    user.is_aggregator ? 'aggregator' : 'user',
  );

  return (
    <div className={classNames('green-container')}>
      <div className={classNames('green-top')}>{}</div>
      <div className={classNames('green-left')}>
        <div className={classNames('green-left-top')}>
          <Status userType={userType} />
        </div>
        <div className={classNames('green-left-bottom')}>
          <Graph />
        </div>
      </div>
      <div className={classNames('green-right')}>
        <Submit />
      </div>
    </div>
  );
};

export default GreenPageContainer;
