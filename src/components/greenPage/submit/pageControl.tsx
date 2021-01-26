import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface IProps {
  type: string;
  totalCount: number;
  page: number;
  setPage(i: number): void;
  perPage: number;
  setPerPage(i: number): void;
}

const PageControl: React.FC<IProps> = ({
  type,
  totalCount,
  page,
  setPage,
  perPage,
  setPerPage,
}) => {
  const lastPage = () => {
    if (totalCount === 0) return 1;
    return totalCount % perPage === 0
      ? totalCount / perPage
      : Math.floor(totalCount / perPage) + 1;
  };

  const handleClickFirstPage = () => {
    setPage(1);
  };

  const handleClickPrevPage = () => {
    if (page > 1) setPage(page - 1);
    else setPage(1);
  };

  const handleClickNextPage = () => {
    // if (totalCount === 0) setPage(1);
    // else {
    //   const lastPage =
    //     totalCount % perPage === 0
    //       ? totalCount / perPage
    //       : Math.floor(totalCount / perPage) + 1;
    if (page < lastPage()) setPage(page + 1);
    else setPage(lastPage());
    // }
  };

  const handleClickLastPage = () => {
    // if (totalCount === 0) setPage(1);
    // else {
    //   const lastPage =
    //     totalCount % perPage === 0
    //       ? totalCount / perPage
    //       : Math.floor(totalCount / perPage) + 1;
    setPage(lastPage());
    // }
  };

  // set btn disabled
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (page === 1 && lastPage() === 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    } else if (page === 1) {
      setPrevDisabled(true);
      setNextDisabled(false);
    } else if (page === lastPage()) {
      setPrevDisabled(false);
      setNextDisabled(true);
    } else {
      setPrevDisabled(false);
      setNextDisabled(false);
    }
  }, [page, lastPage]);

  useEffect(() => {
    setPage(1);
  }, [type, perPage]);

  return (
    <div className={classNames('green-submit-pagecontrol-container-in')}>
      <select
        className={classNames('green-submit-pagecontrol-select')}
        onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
      >
        <option value="5">5 rows</option>
        <option value="10">10 rows</option>
        <option value="15">15 rows</option>
      </select>
      <button
        className={classNames(
          'green-submit-pagecontrol-first',
          'green-submit-pagecontrol-btn',
        )}
        type="button"
        title="First Page"
        onClick={() => handleClickFirstPage()}
        disabled={prevDisabled}
      >
        &Iota;&#60;
      </button>
      <button
        className={classNames(
          'green-submit-pagecontrol-prev',
          'green-submit-pagecontrol-btn',
        )}
        type="button"
        title="Previous Page"
        onClick={() => handleClickPrevPage()}
        disabled={prevDisabled}
      >
        &#60;
      </button>
      <div className={classNames('green-submit-pagecontrol-text')}>
        {page} / {lastPage()}
      </div>
      <button
        className={classNames(
          'green-submit-pagecontrol-next',
          'green-submit-pagecontrol-btn',
        )}
        type="button"
        title="Next Page"
        onClick={() => handleClickNextPage()}
        disabled={nextDisabled}
      >
        &#62;
      </button>
      <button
        className={classNames(
          'green-submit-pagecontrol-last',
          'green-submit-pagecontrol-btn',
        )}
        type="button"
        title="Last Page"
        onClick={() => handleClickLastPage()}
        disabled={nextDisabled}
      >
        &#62;&Iota;
      </button>
    </div>
  );
};

export default PageControl;
