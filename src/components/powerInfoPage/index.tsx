import React, { useState } from 'react';
import Chart from './chart';
import ModeButton from './modeButton';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('產能設備');

  return (
    <div>
      <ModeButton changeMode={setMode} />
      <Chart mode={mode} />
    </div>
  );
};

export default PowerInfoPageContainer;
