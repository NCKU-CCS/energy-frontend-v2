import React from 'react';
import dayjs from 'dayjs';

const getCurrentTime = () => dayjs().format('YYYY/MM/DD HH:mm');

const Time: React.FC = () => (
  <div className="navbar-time">{getCurrentTime()}</div>
);

export default Time;
