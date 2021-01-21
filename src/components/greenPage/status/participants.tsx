import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  userType: string;
  participants: number;
}

const Participants: React.FC<IProps> = ({ userType, participants }) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('bidding-status-participants-container-in')}>
      <div
        className={classNames('bidding-status-participants-image-container')}
      >
        <img
          className={classNames('bidding-status-participants-image-img')}
          alt=""
          src={`${process.env.PUBLIC_URL}/greenPage/people-${userType}.png`}
        />
      </div>
      <div className={classNames('bidding-status-participants-text-container')}>
        <div className={classNames('bidding-status-participants-text-value')}>
          {participants}
        </div>
        <div className={classNames('bidding-status-participants-text-title')}>
          {t('greenpage.currParticipants')}
        </div>
      </div>
    </div>
  );
};

export default Participants;
