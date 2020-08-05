import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './test.json';

const RightContainer: React.FC = () => {
  const { t } = useTranslation();

  const listItems = data.map((content) => {
    return (
      <div className={classnames('setting-right--contentlistcontainer')}>
        <div
          className={classnames(
            'setting-right--number',
            'setting-right--content',
          )}
        >
          {content.number}
        </div>
        <div
          className={classnames(
            'setting-right--code',
            'setting-right--content',
          )}
        >
          <div className={classnames('setting-right--codeChild')}>
            {content.code}
          </div>
        </div>
        <div
          className={classnames(
            'setting-right--name',
            'setting-right--content',
          )}
        >
          {content.name}
        </div>
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
        <div className={classnames('setting-right--code')}>
          {t('settingpage.code')}
        </div>
        <div className={classnames('setting-right--name')}>
          {t('settingpage.name')}
        </div>
      </div>
      <div className={classnames('setting-right--contentcontainer')}>
        {listItems}
      </div>
    </div>
  );
};

export default RightContainer;
