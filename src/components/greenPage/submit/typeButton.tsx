import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  setType(type: string): void;
}

const TypeButton: React.FC<IProps> = ({ setType }) => {
  // i18n
  const { t } = useTranslation();

  // disabled
  const [disabled, setDisabled] = useState(true);

  // click buy button
  const handleClickBuy = () => {
    setType('buy');
    setDisabled(true);
  };

  // click sell button
  const handleClickSell = () => {
    setType('sell');
    setDisabled(false);
  };

  return (
    <div className={classNames('green-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'green-submit-modebutton-button',
          'green-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => handleClickBuy()}
      >
        {t('greenpage.buy')}
      </button>
      <button
        type="button"
        className={classNames(
          'green-submit-modebutton-button',
          'green-submit-modebutton-button-sell',
        )}
        disabled={!disabled}
        onClick={() => handleClickSell()}
      >
        {t('greenpage.sell')}
      </button>
    </div>
  );
};

export default TypeButton;
