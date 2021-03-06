import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TrainBox from './trainBox';

interface ITrainInfo {
  bids: {
    price: number;
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  id: string;
  status: string;
  upload: string;
  wins: {
    price: number;
    value: number;
  };
}

interface IInfo {
  bidsPrice: string;
  bidsValue: string;
  counterpartAddress: string;
  counterpartName: string;
  id: string;
  upload: string;
  winsPrice: string;
  winsValue: string;
  status: string;
}

interface IInput {
  input: ITrainInfo[];
  index: number;
}

const Train: React.FC<IInput> = ({ input, index }) => {
  const { t } = useTranslation();

  const Chain = () => <div className={classnames('status-train-chain')} />;

  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [allInfo, setAllInfo] = useState<IInfo>({
    bidsPrice: '-----',
    bidsValue: '-----',
    counterpartAddress: '-----',
    counterpartName: '-----',
    id: '-----',
    upload: '-----',
    winsPrice: '-----',
    winsValue: '-----',
    status: '-',
  });

  useEffect(() => {
    if (index !== -1 && input.length > 0) {
      if (input[index].status) {
        const dataStatus = input[index].status;
        if (dataStatus === '投標中') setNowIndex(0);
        if (dataStatus === '已投標') setNowIndex(1);
        if (dataStatus === '已得標') setNowIndex(2);
        if (dataStatus === '執行中') setNowIndex(3);
        if (dataStatus === '結算中') setNowIndex(4);
        if (dataStatus === '已結算') setNowIndex(5);
        if (dataStatus === '未得標') setNowIndex(6);
      }

      let dataCounterpartAddress = '-----';
      let dataCounterpartName = '-----';
      let dataBidsValue = '-----';
      let dataBidsPrice = '-----';
      let dataWinsValue = '-----';
      let dataWinsPrice = '-----';
      const upload = input[index].upload.split(' ');
      if (input[index].counterpart.address)
        dataCounterpartAddress = input[index].counterpart.address.toString();
      if (input[index].counterpart.name)
        dataCounterpartName = input[index].counterpart.name.toString();
      if (input[index].bids.value)
        dataBidsValue = input[index].bids.value.toString();
      if (input[index].bids.price)
        dataBidsPrice = input[index].bids.price.toString();
      if (input[index].wins.value)
        dataWinsValue = input[index].wins.value.toString();
      if (input[index].wins.price)
        dataWinsPrice = input[index].wins.price.toString();
      setAllInfo({
        bidsPrice: dataBidsPrice,
        bidsValue: dataBidsValue,
        counterpartAddress: dataCounterpartAddress,
        counterpartName: dataCounterpartName,
        id: input[index].id,
        upload: upload[4],
        winsPrice: dataWinsPrice,
        winsValue: dataWinsValue,
        status: input[index].status,
      });
    }
  }, [index]);

  return (
    <div className={classnames('status-train')}>
      <div className={classnames('status-train-train')}>
        <TrainBox text="投標中" index={0} nowindex={nowIndex} />
        <Chain />
        <TrainBox text="已投標" index={1} nowindex={nowIndex} />
        <Chain />
        <TrainBox text="得標或未得標" index={2} nowindex={nowIndex} />
        <Chain />
        <TrainBox text="執行中" index={3} nowindex={nowIndex} />
        <Chain />
        <TrainBox text="結算中" index={4} nowindex={nowIndex} />
        <Chain />
        <TrainBox text="已結算" index={5} nowindex={nowIndex} />
      </div>
      <div className={classnames('status-train-info')}>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-code')}>
            {t('statuspage.id')}：{allInfo.id}
          </div>
          <div className={classnames('status-train-time')}>
            {t('statuspage.uploadTime')}：{allInfo.upload}
          </div>
        </div>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-object')}>
            {t('statuspage.target')}：{allInfo.counterpartName}
          </div>
          <div className={classnames('status-train-address')}>
            {t('statuspage.address')}：{allInfo.counterpartAddress}
          </div>
        </div>
        <div className={classnames('status-train-infoBox')}>
          <div className={classnames('status-train-number')}>
            {t('statuspage.bidsValue')}：{allInfo.bidsValue}kWh
          </div>
          <div className={classnames('status-train-getNumber')}>
            {t('statuspage.winsValue')}：{allInfo.winsValue}kWh
          </div>
          <div className={classnames('status-train-price')}>
            {t('statuspage.bidsPrice')}：＄{allInfo.bidsPrice}
          </div>
          <div className={classnames('status-train-getPrice')}>
            {t('statuspage.winsPrice')}：${allInfo.winsPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
