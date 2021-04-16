import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IContent {
  text: string;
  setPage: (display: number) => void;
  pageIndex: number;
  isSelected: boolean;
  setCurrentPage: (display: number) => void;
  setNowIndex: (display: number) => void;
}

const PageButton: React.FC<IContent> = ({
  text,
  setPage,
  pageIndex,
  isSelected,
  setCurrentPage,
  setNowIndex,
}) => {
  const { t } = useTranslation();

  const button = classnames('status-list-pageButton-button');
  const buttonClick = classnames(
    'status-list-pageButton-button',
    'status-list-pageButton-button--click',
  );

  const [buttonClass, setButtonClass] = useState<string>(button);

  useEffect(() => {
    setButtonClass(isSelected ? buttonClick : button);
  }, [isSelected]);

  const pageOnClick = () => {
    setPage(pageIndex);
    setCurrentPage(1);
    setNowIndex(-1);
  };

  return (
    <button className={buttonClass} type="button" onClick={pageOnClick}>
      {t(text)}
    </button>
  );
};

export default PageButton;
