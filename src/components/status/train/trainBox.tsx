import React from 'react';
import classnames from 'classnames';

interface content {
  text: string;
  index: number;
  nowindex: number;
}

const TrainBox: React.FC<content> = ({ text, index, nowindex }) => {
  let outline = '';
  if (index <= nowindex)
    outline = classnames(
      'status-train-trainBox-outline',
      'status-train-trainBox-outline-orange',
    );
  else
    outline = classnames(
      'status-train-trainBox-outline',
      'status-train-trainBox-outline-white',
    );

  const Text = () => {
    if (text !== '得標或未得標') {
      return (
        <div className={outline}>
          <div className={classnames('status-train-trainBox-content')}>
            {text}
          </div>
        </div>
      );
    }

    return (
      <div className={outline}>
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
