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

  // click day ahead btn
  const handleClickDayAhead = () => {
    setDataType('日前');
    setDisabled(true);
  };

  // click real time btn
  const handleClickRealTime = () => {
    setDataType('即時');
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
        onClick={() => handleClickDayAhead()}
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
        onClick={() => handleClickRealTime()}
      >
        {t('dracceptpage.realTime')}
      </button>
    </div>
  );
};

export default TypeButton;
