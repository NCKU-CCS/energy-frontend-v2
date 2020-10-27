import React, { useState, useEffect } from 'react';
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
  setView,
}) => {
  const [time, setTime] = useState<string>('');
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
        <div className={classnames('status-percentage-dialog-txt')}>達成率</div>
        <div className={classnames('status-percentage-dialog-percentage')}>
          20%
        </div>
        <div className={classnames('status-percentage-dialog-idTitle')}>
          交易編號：
        </div>
        <div className={classnames('status-percentage-dialog-id')}>{id}</div>
        <div className={classnames('status-percentage-dialog-upload')}>
          上鏈時間：{time}
        </div>
        <div className={classnames('status-percentage-dialog-name')}>
          對象：{name}
        </div>
        <div className={classnames('status-percentage-dialog-address')}>
          地址：{address}
        </div>
        <div className={classnames('status-percentage-dialog-value')}>
          <div className={classnames('status-percentage-dialog-bidsValue')}>
            投標度數：{bidsValue}
          </div>
          <div className={classnames('status-percentage-dialog-winsValue')}>
            得標度數：{winsValue}
          </div>
        </div>
        <div className={classnames('status-percentage-dialog-price')}>
          <div className={classnames('status-percentage-dialog-bidsPrice')}>
            總金額：{bidsPrice}
          </div>
          <div className={classnames('status-percentage-dialog-winsPrice')}>
            結算金額：{winsPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
