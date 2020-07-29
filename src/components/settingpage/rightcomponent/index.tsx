import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './test.json';

const RightContainer: React.FC = () => {
  const { t } = useTranslation();

  const listcontainer = classnames('setting-right--listcontainer');
  const number = classnames('setting-right--number');
  const code = classnames('setting-right--code');
  const name = classnames('setting-right--name');
  const contentlistcontainer = classnames(
    'setting-right--contentlistcontainer',
  );
  const contentcontainer = classnames('setting-right--contentcontainer');
  const contentnumber = classnames(
    'setting-right--number',
    'setting-right--content',
  );
  const contentcode = classnames(
    'setting-right--code',
    'setting-right--content',
  );
  const contentname = classnames(
    'setting-right--name',
    'setting-right--content',
  );

  const listItems = data.map((content) => {
    return (
      <div className={contentlistcontainer}>
        <div className={contentnumber}>{content.number}</div>
        <div className={contentcode}>{content.code}</div>
        <div className={contentname}>{content.name}</div>
      </div>
    );
  });

  return (
    <div className={classnames('setting-right--container')}>
      <div className={classnames('setting-right--title')}>
        {t('settingpage.energyMeter')}
      </div>
      <div className={listcontainer}>
        <div className={number}>{t('settingpage.number')}</div>
        <div className={code}>{t('settingpage.code')}</div>
        <div className={name}>{t('settingpage.name')}</div>
      </div>
      <div className={contentcontainer}>{listItems}</div>
    </div>
  );
};

export default RightContainer;
