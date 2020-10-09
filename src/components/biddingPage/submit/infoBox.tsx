import React, { useState } from 'react';
import classNames from 'classnames';

const InfoBox: React.FC = () => {
  const [openInfoBox, setOpenInfoBox] = useState(false);

  return (
    <div className={classNames('bidding-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('bidding-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('bidding-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/biddingPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div>j</div>
      )}
    </div>
  );
};

export default InfoBox;
