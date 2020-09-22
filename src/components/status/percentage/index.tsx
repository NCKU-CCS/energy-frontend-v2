import React from 'react';
import classnames from 'classnames';

const Percentage: React.FC = () => {
  return (
    <div className={classnames('status-percentage')}>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/status/box_orange.png`}
        className={classnames('status-percentage-img')}
      />
      <div className={classnames('status-percentage-title')}>達成率</div>
      <div className={classnames('status-percentage-percentage')}>20%</div>
    </div>
  );
};

export default Percentage;
