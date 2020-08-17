import React, { useState } from 'react';
import Chart from './chart';
import ModeButton from './modeButton';
import TestApi from './TestApi';
import DatePicker from './datePicker';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('產能設備');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <DatePicker changeDate={setDate} />
      <ModeButton changeMode={setMode} />
      <Chart mode={mode} date={date} />
      <TestApi />
    </div>
  );
};

export default PowerInfoPageContainer;
