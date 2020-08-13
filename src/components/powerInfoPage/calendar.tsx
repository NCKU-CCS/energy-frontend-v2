import React from 'react';

interface IProps {
  changeDate(date: string): void;
}

const Calendar: React.FC<IProps> = ({ changeDate }) => {
  return (
    <div>
      <input type="date" onChange={(event) => changeDate(event.target.value)} />
    </div>
  );
};

export default Calendar;
