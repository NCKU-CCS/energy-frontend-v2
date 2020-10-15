import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface content {
  text: string;
  index: number;
  nowindex: number;
}

const TrainBox: React.FC<content> = ({ text, index, nowindex }) => {
  const { t } = useTranslation();

  let outline = '';
  if (index <= nowindex)
    outline = classnames(
      'status-train-trainBox-outline',
      'status-train-trainBox-outline-orange',
    );
  else
    outline = classnames(
      'status-train-trainBox-outline',
      'status-train-trainBox-outline-white',
    );
  let i18nText = '';
  if (text === '投標中') i18nText = t('statuspage.bidding');
  else if (text === '已投標') i18nText = t('statuspage.finish');
  else if (text === '執行中') i18nText = t('statuspage.executing');
  else if (text === '結算中') i18nText = t('statuspage.settling');
  else if (text === '已結算') i18nText = t('statuspage.end');

  const Text = () => {
    if (text !== '得標或未得標') {
      return (
        <div className={outline}>
          <div className={classnames('status-train-trainBox-content')}>
            {i18nText}
          </div>
        </div>
      );
    }

    return (
      <div className={outline}>
        <div className={classnames('status-train-trainBox-content')}>
          {t('statuspage.win')}
          <br />
          {t('statuspage.or')}
          <br />
          {t('statuspage.fail')}
        </div>
      </div>
    );
  };
  return <Text />;
};

export default TrainBox;
