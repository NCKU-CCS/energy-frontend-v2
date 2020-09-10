import React, { useEffect } from 'react';
import classNames from 'classnames';

interface IProps {
  mode: string;
}

const AddBid: React.FC<IProps> = ({ mode }) => {
  // create an array from '0:00 - 1:00' to '23:00 - 24:00'
  const intervalArr: string[] = [
    '0:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
    '4:00 - 5:00',
    '5:00 - 6:00',
    '6:00 - 7:00',
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 24:00',
  ];

  // map the array and return options
  const createOptions = intervalArr.map((str, i) => {
    return <option value={i}>{str}</option>;
  });

  useEffect(() => {}, [mode]);

  return (
    <div className={classNames('bidding-submit-addbid-container-in')}>
      <form className={classNames('bidding-submit-addbid-form')}>
        <input
          type="date"
          className={classNames('bidding-submit-addbid-form-date')}
        />
        <select
          className={classNames('bidding-submit-addbid-form-select')}
          onChange={(e) => console.log(e.target.value)}
        >
          {createOptions}
        </select>
        <input
          className={classNames('bidding-submit-addbid-form-number')}
          type="number"
          min="0"
        />
        <input
          className={classNames('bidding-submit-addbid-form-number')}
          type="number"
          min="0"
        />
        <input
          className={classNames('bidding-submit-addbid-form-submit')}
          type="submit"
          value="V"
        />
        <input
          className={classNames('bidding-submit-addbid-form-reset')}
          type="reset"
          value="X"
        />
      </form>
    </div>
  );
};

export default AddBid;
