import React, { useState } from 'react';
import classNames from 'classnames';
import Chart from './chart';
import ModeButton from './modeButton';
import DatePicker from './datePicker';
import Summary from './summary';
import Table from './table';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('淨負載');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className={classNames('powerinfo-container')}>
      <div className={classNames('c', 'c1')}>
        <DatePicker changeDate={setDate} />
      </div>
      <div className={classNames('c', 'c2')}>
        <ModeButton changeMode={setMode} />
      </div>
      <div className={classNames('c', 'c3')}>
        <Chart mode={mode} date={date} />
      </div>
      <div className={classNames('c', 'c4')}>
        <Summary mode={mode} date={date} />
      </div>
      <div className={classNames('c', 'c5')}>
        <Table date={date} />
      </div>
    </div>
  );
};

export default PowerInfoPageContainer;
