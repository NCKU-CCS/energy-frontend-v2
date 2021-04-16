import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Dialog from './dialog';

interface IContent {
  index: number;
  nowIndex: number;
  changeIndex: (display: number) => void;
  bidType: string;
  status: string;
  date: string;
  time: string;
  hash: string;
  id: string;
  upload: string;
  name: string;
  address: string;
  bidsValue: number;
  bidsPrice: number;
  winsValue: number;
  winsPrice: number;
  achievement: number;
  isDR: boolean;
  mode: number;
  realVolume: number;
  cbl: number;
}

const Content: React.FC<IContent> = ({
  index,
  nowIndex,
  changeIndex,
  bidType,
  status,
  date,
  time,
  hash,
  id,
  upload,
  name,
  address,
  bidsValue,
  bidsPrice,
  winsValue,
  winsPrice,
  achievement,
  isDR,
  mode,
  cbl,
  realVolume,
}) => {
  const { t } = useTranslation();

  // change button color and pass state
  const button = classnames('status-list-content-button');
  const buttonClick = classnames(
    'status-list-content-button',
    'status-list-content-button--click',
  );
  const [buttonClass, setbuttonClass] = useState<string>(button);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);

  const handleOpen = () => {
    if (window.innerWidth > 320) {
      setView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleOpen);
    handleOpen();
    return () => {
      window.removeEventListener('resize', handleOpen);
    };
  }, []);

  useEffect(() => {
    setbuttonClass(isSelected ? buttonClick : button);
  }, [isSelected]);

  useEffect(() => {
    if (nowIndex !== index) {
      setIsSelected(false);
    }
  }, [nowIndex]);

  const infoOnClick = () => {
    setIsSelected(true);
    changeIndex(index);
  };

  // bidType text
  const bidTypeSell = classnames(
    'status-list-content-bidTypeSell',
    'status-list-content-bidType',
  );
  const bidTypeBuy = classnames(
    'status-list-content-bidTypeBuy',
    'status-list-content-bidType',
  );
  const bidTypeNeed = classnames(
    'status-list-content-bidTypeNeed',
    'status-list-content-bidType',
  );
  const bidTypeNow = classnames(
    'status-list-content-bidTypeNow',
    'status-list-content-bidType',
  );
  const bidTypeDayAhead = classnames(
    'status-list-content-bidTypeDayAhead',
    'status-list-content-bidType',
  );
  let bidTypeClass = '';
  let bidTypeText = '';
  if (bidType === 'buy') {
    bidTypeClass = bidTypeBuy;
    bidTypeText = t('statuspage.buy');
  } else if (bidType === 'sell') {
    bidTypeClass = bidTypeSell;
    bidTypeText = t('statuspage.sell');
  } else if (bidType === 'dr') {
    bidTypeClass = bidTypeNeed;
    bidTypeText = t('statuspage.need');
  } else if (bidType === '日前') {
    bidTypeClass = bidTypeDayAhead;
    bidTypeText = t('statuspage.before');
  } else if (bidType === '即時') {
    bidTypeClass = bidTypeNow;
    bidTypeText = t('statuspage.now');
  }

  // status box
  const statusBoxGreen = classnames(
    'status-list-content-statusBox-green',
    'status-list-content-statusBox',
  );
  const statusBoxGrey = classnames(
    'status-list-content-statusBox-grey',
    'status-list-content-statusBox',
  );
  const statusBoxWhite = classnames(
    'status-list-content-statusBox-white',
    'status-list-content-statusBox',
  );
  const StatusBox = () => {
    let list = [];
    enum block {
      default,
      投標中,
      已投標,
      已得標,
      執行中,
      結算中,
      已結算,
    }
    let blockNumber = block.default;
    if (status === '投標中') blockNumber = block.投標中;
    else if (status === '已投標') blockNumber = block.已投標;
    else if (status === '已得標') blockNumber = block.已得標;
    else if (status === '執行中') blockNumber = block.執行中;
    else if (status === '結算中') blockNumber = block.結算中;
    else if (status === '已結算') blockNumber = block.已結算;
    for (let i = blockNumber; i > 0; i -= 1)
      list.push(<div className={statusBoxGreen} />);
    for (let i = 6 - blockNumber; i > 0; i -= 1)
      list.push(<div className={statusBoxGrey} />);
    if (status === '未得標') {
      list = [];
      for (let i = 0; i < 6; i += 1)
        list.push(<div className={statusBoxWhite} />);
    }
    return (
      <div className={classnames('status-list-content-statusBox-Container')}>
        {list}
      </div>
    );
  };

  let i18nStatus = '';
  if (status === '投標中') i18nStatus = t('statuspage.bidding');
  else if (status === '已投標') i18nStatus = t('statuspage.finish');
  else if (status === '已得標') i18nStatus = t('statuspage.win');
  else if (status === '未得標') i18nStatus = t('statuspage.fail');
  else if (status === '執行中') i18nStatus = t('statuspage.executing');
  else if (status === '結算中') i18nStatus = t('statuspage.settling');
  else if (status === '已結算') i18nStatus = t('statuspage.end');

  let href = 'https://ropsten.etherscan.io/tx/';
  if (hash !== null)
    href = hash.substring(0, 5) === 'https:' ? hash : href + hash;

  return (
    <div className={classnames('status-list-content-contentContainer')}>
      <button
        type="button"
        className={buttonClass}
        onClick={infoOnClick}
        aria-labelledby="onClick info"
      />
      <div className={bidTypeClass}>{bidTypeText}</div>
      {isDR && (
        <div className={classnames('status-list-content-mode')}>{mode}</div>
      )}
      <div className={classnames('status-list-content-status')}>
        {i18nStatus}
      </div>
      <StatusBox />
      <div className={classnames('status-list-content-date')}>{date}</div>
      <div className={classnames('status-list-content-time')}>{time}</div>
      <div className={classnames('status-list-content-price')}>
        ${winsPrice}/度
      </div>
      <a
        className={classnames('status-list-content-URL')}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        &lt; URL &gt;
      </a>
      <button
        type="button"
        className={classnames('status-list-content-view')}
        onClick={() => setView(true)}
      >
        {t('statuspage.view')}
      </button>
      {view && (
        <Dialog
          status={status}
          id={id}
          upload={upload}
          name={name}
          address={address}
          bidsValue={bidsValue}
          bidsPrice={bidsPrice}
          winsValue={winsValue}
          winsPrice={winsPrice}
          achievement={achievement}
          setView={setView}
          isDR={isDR}
          cbl={cbl}
          realVolume={realVolume}
        />
      )}
    </div>
  );
};

export default Content;
