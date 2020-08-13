import React from 'react';

interface IProps {
  changeDate(date: string): void;
}

const DatePicker: React.FC<IProps> = ({ changeDate }) => {
  return (
    <div>
      <input type="date" onChange={(event) => changeDate(event.target.value)} />
    </div>
  );
};

export default DatePicker;
