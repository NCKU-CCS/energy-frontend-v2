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
  price: number;
  hash: string;
  id: string;
  upload: string;
  name: string;
  address: string;
  bidsValue: number;
  bidsPrice: number;
  winsValue: number;
  winsPrice: number;
}

const Content: React.FC<IContent> = ({
  index,
  nowIndex,
  changeIndex,
  bidType,
  status,
  date,
  time,
  price,
  hash,
  id,
  upload,
  name,
  address,
  bidsValue,
  bidsPrice,
  winsValue,
  winsPrice,
}) => {
  const { t } = useTranslation();

  // change button color and pass state
  const button = classnames('status-list-content-button');
  const buttonClick = classnames(
    'status-list-content-button',
    'status-list-content-button--click',
  );
  const [buttonColor, setButtonColor] = useState<string>(button);
  const [color, setColor] = useState<boolean>(false);
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
    setButtonColor(color === false ? button : buttonClick);
  }, [color]);

  useEffect(() => {
    if (nowIndex !== index) setColor(false);
  }, [nowIndex]);

  const infoOnClick = () => {
    setColor(true);
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
    let count = 0;
    if (status === '投標中') count = 1;
    else if (status === '已投標') count = 2;
    else if (status === '已得標') count = 3;
    else if (status === '執行中') count = 4;
    else if (status === '結算中') count = 5;
    else if (status === '已結算') count = 6;
    for (let i = count; i > 0; i -= 1)
      list.push(<div className={statusBoxGreen} />);
    for (let i = 6 - count; i > 0; i -= 1)
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

  const href = 'https://ropsten.etherscan.io/tx/'.concat(hash);

  return (
    <div className={classnames('status-list-content-contentContainer')}>
      <button
        type="button"
        className={buttonColor}
        onClick={infoOnClick}
        aria-labelledby="onClick info"
      />
      <div className={bidTypeClass}>{bidTypeText}</div>
      <div className={classnames('status-list-content-status')}>
        {i18nStatus}
      </div>
      <StatusBox />
      <div className={classnames('status-list-content-date')}>{date}</div>
      <div className={classnames('status-list-content-time')}>{time}</div>
      <div className={classnames('status-list-content-price')}>
        ${price}/kWh
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
          setView={setView}
        />
      )}
    </div>
  );
};

export default Content;
