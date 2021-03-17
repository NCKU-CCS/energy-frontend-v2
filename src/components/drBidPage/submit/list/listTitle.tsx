import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import AddBidBtn from '../addBidBtn';

const ListTitle: React.FC = () => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('drbid-submit-list-title-container')}>
      <div className={classNames('drbid-submit-list-title-date')}>
        {t('drbidpage.date')}
      </div>
      <div className={classNames('drbid-submit-list-title-interval')}>
        {t('drbidpage.interval')}
      </div>
      <div className={classNames('drbid-submit-list-title-mode')}>
        {t('drbidpage.mode')}
      </div>
      <div className={classNames('drbid-submit-list-title-volume')}>
        {t('drbidpage.volume')}
      </div>
      <div className={classNames('drbid-submit-list-title-price')}>
        {t('drbidpage.price')}
      </div>
      <div className={classNames('drbid-submit-list-title-totalprice')}>
        {t('drbidpage.total')}
      </div>
      <div className={classNames('drbid-submit-list-title-button')}>
        <AddBidBtn />
      </div>
    </div>
  );
};

export default ListTitle;
