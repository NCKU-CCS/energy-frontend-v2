import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Time: React.FC = () => {
  const [currTime, setCurrTime] = useState<string>('');

  const getCurrTime = () => {
    setCurrTime(dayjs().format('YYYY/MM/DD HH:mm'));
  };

  useEffect(() => {
    setInterval(getCurrTime, 1000);
  }, []);

  return <div className="navbar-time">{currTime}</div>;
};

export default Time;
