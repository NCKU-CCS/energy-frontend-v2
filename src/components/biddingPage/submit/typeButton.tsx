import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  setType(type: string): void;
}

const TypeButton: React.FC<IProps> = ({ setType }) => {
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

export default TypeButton;
