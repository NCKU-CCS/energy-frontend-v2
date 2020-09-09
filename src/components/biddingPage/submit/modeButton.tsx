import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  changeMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ changeMode }) => {
  // disabled
  const [disabled, setDisabled] = useState(true);

  // click buy button
  const handleClickBuy = () => {
    changeMode('buy');
    setDisabled(true);
  };

  // click sell button
  const handleClickSell = () => {
    changeMode('sell');
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
