import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface IProps {
  changeDate(date: Date): void;
  currDate: Date;
}

const DatePicker: React.FC<IProps> = ({ changeDate, currDate }) => {
  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    // to prevent user from choosing invalid date cause a api can't fetch problem
    const lastDate =
      new Date(event.target.value).getTime() > new Date().getTime()
        ? new Date()
        : new Date(event.target.value);
    changeDate(lastDate);
  };

  return (
    <div className={classNames('powerinfo-datepicker-container')}>
      <input
        className={classNames('powerinfo-datepicker-input')}
        type="date"
        value={dayjs(currDate).format('YYYY-MM-DD')}
        onChange={(event) => onChangeDate(event)}
      />
    </div>
  );
};

export default DatePicker;
