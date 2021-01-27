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
    <div className={classNames('drbid-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'drbid-submit-modebutton-button',
          'drbid-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => handleClickBuy()}
      >
        {t('drbidpage.dayAhead')}
      </button>
      <button
        type="button"
        className={classNames(
          'drbid-submit-modebutton-button',
          'drbid-submit-modebutton-button-sell',
        )}
        disabled={!disabled}
        onClick={() => handleClickSell()}
      >
        {t('drbidpage.realTime')}
      </button>
    </div>
  );
};

export default TypeButton;
