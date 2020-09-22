import React from 'react';
import classnames from 'classnames';
import TrainBox from './trainBox';

const Train: React.FC = () => {
  const Chain = () => <div className={classnames('status-train-chain')} />;
  return (
    <div className={classnames('status-train')}>
      <div className={classnames('status-train-train')}>
        <TrainBox text="投標中" />
        <Chain />
        <TrainBox text="已投標" />
        <Chain />
        <TrainBox text="得標或未得標" />
        <Chain />
        <TrainBox text="執行中" />
        <Chain />
        <TrainBox text="結算中" />
        <Chain />
        <TrainBox text="已結算" />
      </div>
      <div className={classnames('status-train-info')}>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-code')}>
            交易編號：e0d123e5f316bef78bfdf5a008837577
          </div>
          <div className={classnames('status-train-time')}>上鏈時間：13:55</div>
        </div>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-object')}>
            對象：國立成功大學
          </div>
          <div className={classnames('status-train-address')}>
            地址：701台南市東區大學路1號
          </div>
        </div>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-number')}>
            投標度數：100kWh
          </div>
          <div className={classnames('status-train-getNumber')}>
            得標度數：90kWh
          </div>
          <div className={classnames('status-train-price')}>總金額：＄40</div>
          <div className={classnames('status-train-getPrice')}>
            結算金額：$—
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
