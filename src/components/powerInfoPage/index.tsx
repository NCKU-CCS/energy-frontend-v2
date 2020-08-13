import React, { useState } from 'react';
import Chart from './chart';
import ModeButton from './modeButton';
import TestApi from './TestApi';
import Calendar from './calendar';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('產能設備');
  const [date, setDate] = useState<string>('');

  return (
    <div>
      <ModeButton changeMode={setMode} />
      <Chart mode={mode} date={date} />
      <TestApi />
      <Calendar changeDate={setDate} />
    </div>
  );
};

export default PowerInfoPageContainer;
