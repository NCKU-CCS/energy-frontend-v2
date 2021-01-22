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
    <div className={classNames('bidding-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-submit-modebutton-button',
          'bidding-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => handleClickBuy()}
      >
        {t('drbidpage.buy')}
      </button>
      <button
        type="button"
        className={classNames(
          'bidding-submit-modebutton-button',
          'bidding-submit-modebutton-button-sell',
        )}
        disabled={!disabled}
        onClick={() => handleClickSell()}
      >
        {t('drbidpage.sell')}
      </button>
    </div>
  );
};

export default TypeButton;
