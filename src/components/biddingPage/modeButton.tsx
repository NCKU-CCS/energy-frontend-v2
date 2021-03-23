import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  setMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ setMode }) => {
  // i18n
  const { t } = useTranslation();

  // disable
  const [disabled, setDisabled] = useState(true);

  // handle click 綠能交易
  const handleClickGreen = () => {
    setDisabled(true);
    setMode('綠能交易');
  };

  // handle click 需量反應
  const handleClickNeed = () => {
    setDisabled(false);
    setMode('需量反應');
  };

  return (
    <div className={classNames('bidding-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-modebutton-button',
          'bidding-modebutton-button-green',
        )}
        disabled={disabled}
        onClick={() => handleClickGreen()}
      >
        {t('biddingpage.modeGreen')}
      </button>
      <button
        type="button"
        className={classNames(
          'bidding-modebutton-button',
          'bidding-modebutton-button-need',
        )}
        disabled={!disabled}
        onClick={() => handleClickNeed()}
      >
        {t('biddingpage.modeDemand')}
      </button>
    </div>
  );
};

export default ModeButton;
