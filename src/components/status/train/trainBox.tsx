import React from 'react';
import classnames from 'classnames';

interface content {
  text: string;
}

const TrainBox: React.FC<content> = ({ text }) => {
  const Text = () => {
    if (text !== '得標或未得標') {
      return (
        <div className={classnames('status-train-trainBox-outline')}>
          <div className={classnames('status-train-trainBox-content')}>
            {text}
          </div>
        </div>
      );
    }

    return (
      <div className={classnames('status-train-trainBox-outline')}>
        <div className={classnames('status-train-trainBox-content')}>
          得標
          <br />
          或<br />
          未得標
        </div>
      </div>
    );
  };

  return <Text />;
};

export default TrainBox;
