import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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
  isDR: boolean;
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
  isDR,
}) => {
  const { t } = useTranslation();

  const [time, setTime] = useState<string>('');
  const [percent, setPercent] = useState<string>('—');
  useEffect(() => {
    setPercent(achievement === null ? '—' : (achievement * 100).toString());
  }, [achievement]);
  useEffect(() => {
    const uploadTime = dayjs(upload);
    setTime(uploadTime.format('HH:mm'));
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
            {t('statuspage.bidsValue')}：{bidsValue}度
          </div>
          <div className={classnames('status-percentage-dialog-winsValue')}>
            {t('statuspage.winsValue')}：{winsValue}度
          </div>
        </div>
        <div className={classnames('status-percentage-dialog-price')}>
          <div className={classnames('status-percentage-dialog-bidsPrice')}>
            {t('statuspage.bidsPrice')}：
            {isDR
              ? (bidsPrice * bidsValue).toFixed(2)
              : (winsPrice * winsValue).toFixed(1)}
          </div>
          <div className={classnames('status-percentage-dialog-winsPrice')}>
            {t('statuspage.winsPrice')}：
            {(winsPrice * winsValue * achievement).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
