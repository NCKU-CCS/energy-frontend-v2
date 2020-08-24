import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  changeMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ changeMode }) => {
  const [disabled, setDisabled] = useState(false);

  const onClickLoad = () => {
    changeMode('淨負載');
    setDisabled(true);
  };

  const onClickEquip = () => {
    changeMode('產能設備');
    setDisabled(false);
  };

  return (
    <div className={classNames('powerinfo-mode-container')}>
      <button
        className={classNames('powerinfo-mode-button-load')}
        type="button"
        onClick={() => onClickLoad()}
        disabled={disabled}
      >
        淨負載
      </button>
      <button
        className={classNames('powerinfo-mode-button-equip')}
        type="button"
        onClick={() => onClickEquip()}
        disabled={!disabled}
      >
        產能設備
      </button>
    </div>
  );
};

export default ModeButton;
