import React, { useState } from 'react';
import classNames from 'classnames';

const ModeButton: React.FC = () => {
  // disabled
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={classNames('bidding-submit-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-submit-modebutton-button',
          'bidding-submit-modebutton-button-buy',
        )}
        disabled={disabled}
        onClick={() => setDisabled(true)}
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
        onClick={() => setDisabled(false)}
      >
        賣
      </button>
    </div>
  );
};

export default ModeButton;
