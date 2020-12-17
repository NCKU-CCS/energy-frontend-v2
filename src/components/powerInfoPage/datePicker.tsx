import React from 'react';
import classNames from 'classnames';
// import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface IProps {
  setDate(date: Date): void;
  currDate: Date;
}

const DatePicker: React.FC<IProps> = ({ setDate, currDate }) => {
  // const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // to prevent user from choosing invalid date cause a api can't fetch problem
  //   const lastDate =
  //     new Date(event.target.value).getTime() > new Date().getTime()
  //       ? new Date()
  //       : new Date(event.target.value);
  //   setDate(lastDate);
  // };

  return (
    <div className={classNames('powerinfo-datepicker-container')}>
      {/* <input
        className={classNames('powerinfo-datepicker-input')}
        type="date"
        value={dayjs(currDate).format('YYYY-MM-DD')}
        onChange={(event) => onChangeDate(event)}
      /> */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          value={currDate}
          onChange={() => setDate(new Date())}
          format="yyyy/MM/dd"
          disableFuture
          allowKeyboardControl
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
