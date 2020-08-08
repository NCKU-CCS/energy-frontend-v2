import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IAmis {
  index: number;
  id?: string;
  name: string;
  description?: string;
}

interface IAmisArray {
  IAmisList: IAmis[];
}

const RightContainer: React.FC<IAmisArray> = ({ IAmisList }) => {
  const { t } = useTranslation();

  const listItems = IAmisList.map((content) => {
    // const code =content.code.substr(0,32)+'...';

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
            'setting-right--code',
            'setting-right--content',
          )}
        >
          H2s0Zqv4CLpHQ83il
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
