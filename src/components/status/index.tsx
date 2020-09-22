import React from 'react';
import classnames from 'classnames';
import List from './list';
import Percentage from './percentage';
import Train from './train';

const Status: React.FC = () => {
  return (
    <div className={classnames('status')}>
      <div className={classnames('status-upContainer')}>
        <Percentage />
        <Train />
      </div>
      <List />
    </div>
  );
};

export default Status;
