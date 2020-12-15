import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  changeMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ changeMode }) => {
  // i18n
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(true);

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
        className={classNames(
          'powerinfo-mode-button',
          'powerinfo-mode-button-load',
        )}
        type="button"
        onClick={() => onClickLoad()}
        disabled={disabled}
      >
        {t('powerinfopage.netLoad')}
      </button>
      <button
        className={classNames(
          'powerinfo-mode-button',
          'powerinfo-mode-button-equip',
        )}
        type="button"
        onClick={() => onClickEquip()}
        disabled={!disabled}
      >
        {t('powerinfopage.equipment')}
      </button>
    </div>
  );
};

export default ModeButton;
