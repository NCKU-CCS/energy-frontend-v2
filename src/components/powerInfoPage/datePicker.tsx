import React, { useState } from 'react';
import dayjs from 'dayjs';

interface IProps {
  changeDate(date: Date): void;
}

const DatePicker: React.FC<IProps> = ({ changeDate }) => {
  const [dateText, setDateText] = useState('');

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lastDate = new Date(event.target.value);
    const firstDate = new Date(lastDate.getTime() - 6 * 24 * 60 * 60 * 1000);
    changeDate(lastDate);
    setDateText(
      `${dayjs(firstDate).format('YYYY/MM/DD')} - ${dayjs(lastDate).format(
        'YYYY/MM/DD',
      )}`,
    );
  };

  return (
    <div>
      <input type="date" onChange={(event) => onChangeDate(event)} />
      {dateText}
    </div>
  );
};

export default DatePicker;
