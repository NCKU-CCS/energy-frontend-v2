import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  changeState: (state: boolean) => void;
  index: number;
  id: string;
  name: string;
}

const InfoBox: React.FC<IProps> = ({ changeState, index, id, name }) => {
  const { t } = useTranslation();

  return (
    <div className={classnames('setting-right-background')}>
      <div className={classnames('setting-right-infoBoxContainer')}>
        <button
          type="button"
          className={classnames('setting-right-fork')}
          onClick={() => changeState(false)}
        >
          ✕
        </button>
        <div className={classnames('setting-right-infoUp')}>
          <div className={classnames('setting-right-infoIndex')}>
            {t('settingpage.number')}: {index}
          </div>
          <div className={classnames('setting-right-infoNameContainer')}>
            <div className={classnames('setting-right-infoNameTitle')}>
              {t('settingpage.name')}:
            </div>
            <div className={classnames('setting-right-infoNameContent')}>
              {name}
            </div>
          </div>
        </div>
        <div className={classnames('setting-right-infoCodeTitle')}>
          {t('settingpage.code')}:
        </div>
        <div className={classnames('setting-right-infoCodeContent')}>{id}</div>
      </div>
    </div>
  );
};

export default InfoBox;
