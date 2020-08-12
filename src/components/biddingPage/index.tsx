import React, { useState } from 'react';
import Chart from './chart';
import ModeButton from './modeButton';

const BiddingPageContainer: React.FC = () => {
  const [mode, setMode] = useState('需量反應');
  return (
    <div>
      <ModeButton changeMode={setMode} />
      <Chart mode={mode} />
    </div>
  );
};

export default BiddingPageContainer;
