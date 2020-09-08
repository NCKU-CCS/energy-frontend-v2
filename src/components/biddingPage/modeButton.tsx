import React, { useState } from 'react';
import classNames from 'classnames';

const ModeButton: React.FC = () => {
  // disable
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={classNames('bidding-modebutton-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-modebutton-button',
          'bidding-modebutton-button-green',
        )}
        disabled={disabled}
        onClick={() => setDisabled(true)}
      >
        綠能交易
      </button>
      <button
        type="button"
        className={classNames(
          'bidding-modebutton-button',
          'bidding-modebutton-button-need',
        )}
        disabled={!disabled}
        onClick={() => setDisabled(false)}
      >
        需能反應
      </button>
    </div>
  );
};

export default ModeButton;
