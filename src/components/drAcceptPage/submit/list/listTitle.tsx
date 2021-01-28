import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import AddBidBtn from '../addBidBtn';

interface IProps {
  userType: string;
}

const ListTitle: React.FC<IProps> = ({ userType }) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('draccept-submit-list-title-container')}>
      <div className={classNames('draccept-submit-list-title-mode')}>
        {t('dracceptpage.mode')}
      </div>
      <div className={classNames('draccept-submit-list-title-user')}>
        {userType === 'taipower'
          ? t('dracceptpage.aggregator')
          : t('dracceptpage.executor')}
      </div>
      <div className={classNames('draccept-submit-list-title-interval')}>
        {t('dracceptpage.interval')}
      </div>
      <div className={classNames('draccept-submit-list-title-volume')}>
        {t('dracceptpage.volume')}
      </div>
      <div className={classNames('draccept-submit-list-title-price')}>
        {t('dracceptpage.price')}
      </div>
      <div className={classNames('draccept-submit-list-title-totalprice')}>
        {t('dracceptpage.total')}
      </div>
      <div className={classNames('draccept-submit-list-title-button')}>
        <AddBidBtn />
      </div>
    </div>
  );
};

export default ListTitle;
