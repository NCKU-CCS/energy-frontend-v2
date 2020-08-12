import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import InfoBox from './infoBox';

interface IAmis {
  index: number;
  id: string;
  name: string;
  description?: string;
}

interface IAmisArray {
  IAmisList: IAmis[];
}

const RightContainer: React.FC<IAmisArray> = ({ IAmisList }) => {
  const { t } = useTranslation();

  const [infoBoxState, setInfoBox] = useState<boolean>(false);

  const listItems = IAmisList.map((content) => {
    const code = `${content.id.substr(0, 32)}...`;

    return (
      <div className={classnames('setting-right--contentlistcontainer')}>
        <div
          className={classnames(
            'setting-right--number',
            'setting-right--content',
          )}
        >
          {content.index}
        </div>
        <div
          className={classnames(
            'setting-right-code--generalWidth',
            'setting-right--content',
          )}
        >
          {code}
        </div>
        <div
          className={classnames(
            'setting-right--name',
            'setting-right--content',
          )}
        >
          {content.name}
        </div>
        <div className={classnames('setting-right-viewButtonContainer')}>
          <button
            type="button"
            className={classnames('setting-right-viewButton')}
            onClick={() => setInfoBox(true)}
          >
            {t('settingpage.view')}
          </button>
        </div>
        {infoBoxState && (
          <InfoBox
            changeState={setInfoBox}
            index={content.index}
            id={content.id}
            name={content.name}
          />
        )}
      </div>
    );
  });

  return (
    <div className={classnames('setting-right--container')}>
      <div className={classnames('setting-right--title')}>
        {t('settingpage.energyMeter')}
      </div>
      <div className={classnames('setting-right--listTitleContainer')}>
        <div className={classnames('setting-right--number')}>
          {t('settingpage.number')}
        </div>
        <div className={classnames('setting-right-code--generalWidth')}>
          {t('settingpage.code')}
        </div>
        <div className={classnames('setting-right--name')}>
          {t('settingpage.name')}
        </div>
        <div className={classnames('setting-right-code--width450')}>
          {t('settingpage.code')}
        </div>
      </div>
      <div className={classnames('setting-right--contentcontainer')}>
        {listItems}
      </div>
    </div>
  );
};

export default RightContainer;
