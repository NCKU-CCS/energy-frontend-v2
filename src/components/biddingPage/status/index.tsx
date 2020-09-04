import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Participants from './participants';
import Average from './average';

interface IApiData {
  average_price: number;
  average_volume: number;
  participants: number;
}

const BiddingStatus: React.FC = () => {
  // api data
  const [apiData, setApiData] = useState<IApiData>({
    average_price: 0,
    average_volume: 0,
    participants: 0,
  });

  // fetch api data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidstatus`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      const tmp = await response.json();
      setApiData(tmp);
    } else {
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  useEffect(() => {
    (async () => {
      fetchApiData();
    })();
  }, []);

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  return (
    <div className={classNames('bidding-status-container')}>
      <div className={classNames('bidding-status-participants-container-out')}>
        <Participants participants={apiData.participants} />
      </div>
      <div className={classNames('bidding-status-average-container-out')}>
        <Average
          averagePrice={apiData.average_price}
          averageVolume={apiData.average_volume}
        />
      </div>
    </div>
  );
};

export default BiddingStatus;
