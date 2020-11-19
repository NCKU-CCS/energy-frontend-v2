import React from 'react';
import classNames from 'classnames';

const PageControl: React.FC = () => {
  return (
    <div className={classNames('bidding-dr-pagecontrol-container-in')}>
      <select className={classNames('bidding-dr-pagecontrol-select')} disabled>
        <option value="0">Display all</option>
        {/* <option value="5">5 rows</option>
        <option value="10">10 rows</option>
        <option value="15">15 rows</option> */}
      </select>
      <button
        type="button"
        title="First Page"
        className={classNames(
          'bidding-dr-pagecontrol-btn',
          'bidding-dr-pagecontrol-first',
        )}
        disabled
      >
        &Iota;&#60;
      </button>
      <button
        type="button"
        title="Previous Page"
        className={classNames(
          'bidding-dr-pagecontrol-btn',
          'bidding-dr-pagecontrol-prev',
        )}
        disabled
      >
        &#60;
      </button>
      <div>1/1</div>
      <button
        type="button"
        title="Next Page"
        className={classNames(
          'bidding-dr-pagecontrol-btn',
          'bidding-dr-pagecontrol-next',
        )}
        disabled
      >
        &#62;
      </button>
      <button
        type="button"
        title="Last Page"
        className={classNames(
          'bidding-dr-pagecontrol-btn',
          'bidding-dr-pagecontrol-last',
        )}
        disabled
      >
        &#62;&Iota;
      </button>
    </div>
  );
};

export default PageControl;
