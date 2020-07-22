import React from 'react';
import classnames from 'classnames';
import Img from './img';
import Content from './content';

const LeftContainer: React.FC = () => {
  return (
    <div className={classnames('setting-left--container')}>
      <Img />
      <Content />
    </div>
  );
};

export default LeftContainer;
