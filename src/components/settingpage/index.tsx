import React from 'react';
import classnames from 'classnames';
import LeftContainer from './leftcomponent';
import RightContainer from './rightcomponent';

const SettingContainer: React.FC = () => {
  return (
    <div className={classnames('setting-container')}>
      <LeftContainer />
      <RightContainer />
    </div>
  );
};

export default SettingContainer;
