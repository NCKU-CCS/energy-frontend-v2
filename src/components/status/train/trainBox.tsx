import React from 'react';
import classnames from 'classnames';

interface content {
  text: string;
}

const TrainBox: React.FC<content> = ({ text }) => {
  return (
    <div className={classnames('status-train-trainBox-outline')}>
      <div className={classnames('status-train-trainBox-content')}>{text}</div>
    </div>
  );
};

export default TrainBox;
