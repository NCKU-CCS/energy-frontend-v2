import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

interface IContent {
  text: number;
  page: number;
  firstColor: boolean;
  changePage: (display: number) => void;
}

const PageButton: React.FC<IContent> = ({
  text,
  changePage,
  page,
  firstColor,
}) => {
  const button = classnames('status-list-pageButton-button');
  const buttonClick = classnames(
    'status-list-pageButton-button',
    'status-list-pageButton-button--click',
  );

  const [color, setColor] = useState<boolean>(firstColor);
  let buttonColor = button;
  if (color === false) buttonColor = button;
  else buttonColor = buttonClick;

  let buttonText = '';
  if (text === 1) buttonText = '全部';
  else if (text === 2) buttonText = '競標';
  else if (text === 3) buttonText = '執標中';
  else if (text === 4) buttonText = '結算';

  useEffect(() => {
    if (page !== text) setColor(false);
  }, [page]);

  const pageOnClick = () => {
    setColor(true);
    changePage(text);
  };
  return (
    <button className={buttonColor} type="button" onClick={pageOnClick}>
      {buttonText}
    </button>
  );
};

export default PageButton;
