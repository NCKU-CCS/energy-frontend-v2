import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  setDataType(type: string): void;
}

const TypeButton: React.FC<IProps> = ({ setDataType }) => {
  // i18n
  const { t } = useTranslation();

  // disabled
  const [disabled, setDisabled] = useState(true);

  // click buy button
  const handleClickBuy = () => {
    setDataType('buy');
    setDisabled(true);
  };

  // click sell button
  const handleClickSell = () => {
    setDataType('sell');
    setDisabled(false);
  };

  return (
    <div className={classNames('draccept-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'draccept-submit-modebutton-button',
          'draccept-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => handleClickBuy()}
      >
        {t('dracceptpage.dayAhead')}
      </button>
      <button
        type="button"
        className={classNames(
          'draccept-submit-modebutton-button',
          'draccept-submit-modebutton-button-sell',
        )}
        disabled={!disabled}
        onClick={() => handleClickSell()}
      >
        {t('dracceptpage.realTime')}
      </button>
    </div>
  );
};

export default TypeButton;
