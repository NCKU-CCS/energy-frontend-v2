import React from 'react';
import classNames from 'classnames';
// import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import dayjs from 'dayjs';

interface IProps {
  setDate(date: Date): void;
  currDate: Date;
}

const DatePicker: React.FC<IProps> = ({ setDate, currDate }) => {
  return (
    <div className={classNames('powerinfo-datepicker-container')}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          value={currDate}
          onChange={(d) =>
            setDate(new Date(dayjs(d?.toDateString()).format('YYYY-MM-DD')))
          }
          format="yyyy/MM/dd"
          disableFuture
          allowKeyboardControl
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
