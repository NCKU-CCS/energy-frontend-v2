import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
  if (text === 1) buttonText = t('statuspage.all');
  else if (text === 2) buttonText = t('statuspage.bid');
  else if (text === 3) buttonText = t('statuspage.handle');
  else if (text === 4) buttonText = t('statuspage.settle');

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
