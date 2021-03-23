import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IResult {
  status: string;
  time: string;
  date: string;
  price: number;
  value: number;
}

const ListContent: React.FC<IResult> = ({
  status,
  time,
  date,
  price,
  value,
}) => {
  const { t } = useTranslation();

  const [boxState, setBox] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('▶');
  const [sellState, setSellState] = useState<string>('');

  const showInfo = () => {
    if (boxState === false) setBox(true);
    else setBox(false);
    if (boxState === false) setIcon('▼');
    else setIcon('▶');
  };

  useEffect(() => {
    if (status === '已得標') setSellState(t('indexpage.sellSuccess'));
    else if (status === '未得標') setSellState(t('indexpage.sellFail'));
  }, [status]);

  const handleOpen = () => {
    if (
      !(
        (window.innerWidth > 720 && window.innerWidth <= 1100) ||
        window.innerWidth < 460
      )
    ) {
      setBox(false);
      setIcon('▶');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleOpen);
    handleOpen();
    return () => {
      window.removeEventListener('resize', handleOpen);
    };
  }, []);

  return (
    <div className={classnames('home-bid-info-listContainer')}>
      <button
        type="button"
        className={classnames('home-bid-info-listContent-button')}
        onClick={showInfo}
      >
        {icon}
      </button>
      <div className={classnames('home-bid-info-listContent-date')}>{date}</div>
      <div className={classnames('home-bid-info-listContent-time')}>{time}</div>
      <div
        className={
          status === '已得標'
            ? classnames('home-bid-info-listContent-success')
            : classnames('home-bid-info-listContent-failed')
        }
      >
        {sellState}
      </div>
      <div className={classnames('home-bid-info-listContent-number')}>
        {t('indexpage.biddingNumber')}:{value}kWh
      </div>
      <div className={classnames('home-bid-info-listContent-price')}>
        {t('indexpage.biddingPrice')}:${price}/kWh
      </div>
      {boxState && (
        <div
          className={classnames('home-bid-info-listContent-number-nextline')}
        >
          {t('indexpage.biddingNumber')}:{value}kWh
        </div>
      )}
      {boxState && (
        <div className={classnames('home-bid-info-listContent-price-nextline')}>
          {t('indexpage.biddingPrice')}:${price}/kWh
        </div>
      )}
    </div>
  );
};

export default ListContent;
