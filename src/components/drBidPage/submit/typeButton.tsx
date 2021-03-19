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
    <div className={classNames('drbid-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'drbid-submit-modebutton-button',
          'drbid-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => handleClickDayAhead()}
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
        onClick={() => handleClickRealTime()}
      >
        {t('drbidpage.realTime')}
      </button>
    </div>
  );
};

export default TypeButton;
