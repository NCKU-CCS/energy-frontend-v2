import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  setMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ setMode }) => {
  // disabled
  const [disabled, setDisabled] = useState(true);

  // click buy button
  const handleClickBuy = () => {
    setMode('buy');
    setDisabled(true);
  };

  // click sell button
  const handleClickSell = () => {
    setMode('sell');
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
        買
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
        賣
      </button>
    </div>
  );
};

export default ModeButton;
