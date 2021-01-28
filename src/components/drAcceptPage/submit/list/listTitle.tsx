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
        {t('drbidpage.mode')}
      </div>
      <div className={classNames('draccept-submit-list-title-user')}>
        {userType === 'taipower' ? '提報者' : '執行者'}
      </div>
      <div className={classNames('draccept-submit-list-title-interval')}>
        時段
      </div>
      <div className={classNames('draccept-submit-list-title-volume')}>
        {t('drbidpage.volume')}
      </div>
      <div className={classNames('draccept-submit-list-title-price')}>
        {t('drbidpage.price')}
      </div>
      <div className={classNames('draccept-submit-list-title-totalprice')}>
        {t('drbidpage.total')}
      </div>
      <div className={classNames('draccept-submit-list-title-button')}>
        <AddBidBtn />
      </div>
    </div>
  );
};

export default ListTitle;
