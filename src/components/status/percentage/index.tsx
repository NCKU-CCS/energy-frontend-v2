import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IStatus {
  status: string;
  achievement: number;
}

interface IInput {
  input: IStatus[];
  nowIndex: number;
}

const Percentage: React.FC<IInput> = ({ input, nowIndex }) => {
  const { t } = useTranslation();

  const [imgSrc, setImgSrc] = useState<string>(
    `${process.env.PUBLIC_URL}/status/box_grey.png`,
  );
  const [percent, setPercent] = useState<string>('—');
  useEffect(() => {
    if (input.length > 0) {
      if (nowIndex > -1) {
        setImgSrc(`${process.env.PUBLIC_URL}/status/box_orange.png`);
        setPercent(
          input[nowIndex].achievement === null
            ? '—'
            : (input[nowIndex].achievement * 100).toString(),
        );
      } else {
        setImgSrc(`${process.env.PUBLIC_URL}/status/box_grey.png`);
        setPercent('—');
      }
    }
  }, [nowIndex]);
  return (
    <div className={classnames('status-percentage')}>
      <img
        alt=""
        src={imgSrc}
        className={classnames('status-percentage-img')}
      />
      <div className={classnames('status-percentage-title')}>
        {t('statuspage.achievementRate')}
      </div>
      <div className={classnames('status-percentage-percentage')}>
        {percent !== '—' ? Math.round(parseInt(percent, 10)) : '—'}%
      </div>
    </div>
  );
};

export default Percentage;
