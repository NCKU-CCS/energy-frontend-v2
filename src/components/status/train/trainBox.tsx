import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface content {
  text: string;
  index: number;
  nowindex: number;
}

const TrainBox: React.FC<content> = ({ text, index, nowindex }) => {
  const { t } = useTranslation();
  const [outline, setOutline] = useState<string>('');
  const [i18nText, setI18nText] = useState<string>('');

  useEffect(() => {
    let indexColor = nowindex;
    if (indexColor === 6) indexColor = 2;
    if (index <= indexColor)
      setOutline(
        nowindex !== 6 || (nowindex === 6 && index < 2)
          ? classnames(
            'status-train-trainBox-outline',
            'status-train-trainBox-outline-orange',
          )
          : classnames(
            'status-train-trainBox-outline',
            'status-train-trainBox-outline-red',
          ),
      );
    else
      setOutline(
        classnames(
          'status-train-trainBox-outline',
          'status-train-trainBox-outline-white',
        ),
      );
  }, [index, nowindex]);

  useEffect(() => {
    if (text === '投標中') setI18nText(t('statuspage.bidding'));
    else if (text === '已投標') setI18nText(t('statuspage.finish'));
    else if (text === '執行中') setI18nText(t('statuspage.executing'));
    else if (text === '結算中') setI18nText(t('statuspage.settling'));
    else if (text === '已結算') setI18nText(t('statuspage.end'));
  }, [text]);

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
