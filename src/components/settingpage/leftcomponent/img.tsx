import React from 'react';
import classnames from 'classnames';

const Img: React.FC = () => {
  return (
    <div className={classnames('setting-left--imgcontainer')}>
      <div className={classnames('setting-left--img')} />
      <div className={classnames('setting-left--imgtext')}>一期建物BEMS</div>
    </div>
  );
};

export default Img;
