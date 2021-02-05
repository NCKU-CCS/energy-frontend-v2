import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import taipower from './taipower.json';

interface IButtonStatus {
  isGreen: boolean;
  isDR: boolean;
  isDRBid: boolean;
  isDRAccept: boolean;
  setIsGreen: (display: boolean) => void;
  setIsDR: (display: boolean) => void;
  setIsDRBid: (display: boolean) => void;
  setIsDRAccept: (display: boolean) => void;
}

const Mode: React.FC<IButtonStatus> = ({
  isGreen,
  isDR,
  isDRBid,
  isDRAccept,
  setIsGreen,
  setIsDR,
  setIsDRBid,
  setIsDRAccept,
}) => {
  const { t } = useTranslation();
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  const GreenOnClick = () => {
    setIsGreen(true);
    setIsDR(false);
    setIsDRBid(true);
    setIsDRAccept(false);
  };

  const DROnClick = () => {
    setIsDR(true);
    setIsGreen(false);
  };

  const DRBidOnClick = () => {
    setIsDRBid(true);
    setIsDRAccept(false);
  };

  const DRAcceptOnClick = () => {
    setIsDRAccept(true);
    setIsDRBid(false);
  };

  return (
    <div className={classnames('status-changeMode')}>
      {taipower.isTaipower && (
        <div className={classnames('status-changeMode-taipower')}>
          {t('statuspage.drAccept')}
        </div>
      )}
      {!taipower.isTaipower && (
        <button
          type="button"
          className={classnames(
            'status-changeMode-buttonGreen',
            isGreen
              ? 'status-changeMode-button--click'
              : 'status-changeMode-button',
          )}
          onClick={GreenOnClick}
        >
          {t('statuspage.green')}
        </button>
      )}
      {!taipower.isTaipower && (
        <button
          type="button"
          className={classnames(
            'status-changeMode-buttonDR',
            isDR
              ? 'status-changeMode-button--click'
              : 'status-changeMode-button',
          )}
          onClick={DROnClick}
        >
          {user.is_aggregator ? t('statuspage.dr') : t('statuspage.drBid')}
        </button>
      )}
      {user.is_aggregator && isDR && (
        <button
          type="button"
          className={classnames(
            'status-changeMode-buttonDRBid',
            isDRBid
              ? 'status-changeMode-button--click'
              : 'status-changeMode-button',
          )}
          onClick={DRBidOnClick}
        >
          {t('statuspage.Bid')}
        </button>
      )}
      {user.is_aggregator && isDR && (
        <button
          type="button"
          className={classnames(
            'status-changeMode-buttonDRAccept',
            isDRAccept
              ? 'status-changeMode-button--click'
              : 'status-changeMode-button',
          )}
          onClick={DRAcceptOnClick}
        >
          {t('statuspage.accept')}
        </button>
      )}
    </div>
  );
};

export default Mode;
