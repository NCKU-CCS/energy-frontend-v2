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
  const [buttonColor, setButtonColor] = useState<string>(button);
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    if (page !== text) setColor(false);
  }, [page]);

  useEffect(() => {
    setButtonColor(color === false ? button : buttonClick);
  }, [color]);

  useEffect(() => {
    if (text === 1) setButtonText(t('statuspage.all'));
    else if (text === 2) setButtonText(t('statuspage.bid'));
    else if (text === 3) setButtonText(t('statuspage.handle'));
    else if (text === 4) setButtonText(t('statuspage.settle'));
  }, [text]);

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
