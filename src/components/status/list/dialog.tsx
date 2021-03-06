import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

interface IDialog {
  status: string;
  id: string;
  upload: string;
  name: string;
  address: string;
  bidsValue: number;
  bidsPrice: number;
  winsValue: number;
  winsPrice: number;
  achievement: number;
  setView: (state: boolean) => void;
}

const Dialog: React.FC<IDialog> = ({
  id,
  upload,
  name,
  address,
  bidsValue,
  bidsPrice,
  winsValue,
  winsPrice,
  achievement,
  setView,
}) => {
  const { t } = useTranslation();

  const [time, setTime] = useState<string>('');
  const [percent, setPercent] = useState<string>('—');
  useEffect(() => {
    setPercent(achievement === null ? '—' : (achievement * 100).toString());
  }, [achievement]);
  useEffect(() => {
    const timeSplit = upload.split(' ');
    setTime(timeSplit[4]);
  }, [upload]);

  return (
    <div className={classnames('status-list-dialog-background')}>
      <div className={classnames('status-list-dialog')}>
        <button
          className={classnames('status-list-dialog-fork')}
          onClick={() => setView(false)}
          type="button"
        >
          ✕
        </button>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/status/box_orange.png`}
          className={classnames('status-percentage-dialog-img')}
        />
        <div className={classnames('status-percentage-dialog-txt')}>
          {t('statuspage.achievementRate')}
        </div>
        <div className={classnames('status-percentage-dialog-percentage')}>
          {percent}%
        </div>
        <div className={classnames('status-percentage-dialog-idTitle')}>
          {t('statuspage.id')}：
        </div>
        <div className={classnames('status-percentage-dialog-id')}>{id}</div>
        <div className={classnames('status-percentage-dialog-upload')}>
          {t('statuspage.uploadTime')}：{time}
        </div>
        <div className={classnames('status-percentage-dialog-name')}>
          {t('statuspage.target')}：{name}
        </div>
        <div className={classnames('status-percentage-dialog-address')}>
          {t('statuspage.address')}：{address}
        </div>
        <div className={classnames('status-percentage-dialog-value')}>
          <div className={classnames('status-percentage-dialog-bidsValue')}>
            {t('statuspage.bidsValue')}：{bidsValue}
          </div>
          <div className={classnames('status-percentage-dialog-winsValue')}>
            {t('statuspage.winsValue')}：{winsValue}
          </div>
        </div>
        <div className={classnames('status-percentage-dialog-price')}>
          <div className={classnames('status-percentage-dialog-bidsPrice')}>
            {t('statuspage.bidsPrice')}：{bidsPrice}
          </div>
          <div className={classnames('status-percentage-dialog-winsPrice')}>
            {t('statuspage.winsPrice')}：{winsPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
