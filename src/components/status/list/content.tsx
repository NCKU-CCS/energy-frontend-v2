import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

interface IContent {
  index: number;
  nowIndex: number;
  changeIndex: (display: number) => void;
}

const Content: React.FC<IContent> = ({ index, nowIndex, changeIndex }) => {
  const button = classnames('status-list-content-button');
  const buttonClick = classnames(
    'status-list-content-button',
    'status-list-content-button--click',
  );
  const [color, setColor] = useState<boolean>(false);
  let buttonColor = button;
  if (color === false) buttonColor = button;
  else buttonColor = buttonClick;

  useEffect(() => {
    if (nowIndex !== index) setColor(false);
  }, [nowIndex]);

  const infoOnClick = () => {
    setColor(true);
    changeIndex(index);
  };

  return (
    <div className={classnames('status-list-content-contentContainer')}>
      <button
        type="button"
        className={buttonColor}
        onClick={infoOnClick}
        aria-labelledby="onClick info"
      />
    </div>
  );
};

export default Content;
