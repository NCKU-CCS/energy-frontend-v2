import React, { useState } from 'react';
import classNames from 'classnames';
import Chart from './chart';
import ModeButton from './modeButton';
import DatePicker from './datePicker';
import Summary from './summary';
import Table from './table';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('產能設備');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className={classNames('powerinfo-container')}>
      <div className={classNames('powerinfo-up-container')}>
        <DatePicker changeDate={setDate} />
        <ModeButton changeMode={setMode} />
      </div>
      <div className={classNames('powerinfo-mid-container')}>
        <Chart mode={mode} date={date} />
      </div>
      <div className={classNames('powerinfo-down-container')}>
        <Summary mode={mode} date={date} />
        <Table date={date} />
      </div>
    </div>
  );
};

export default PowerInfoPageContainer;
