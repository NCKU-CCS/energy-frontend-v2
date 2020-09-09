import React, { useEffect } from 'react';
import classNames from 'classnames';

interface IProps {
  totalCount: number;
  page: number;
  setPage(i: number): void;
  perPage: number;
  setPerPage(i: number): void;
}

const PageControl: React.FC<IProps> = ({
  totalCount,
  page,
  setPage,
  perPage,
  setPerPage,
}) => {
  const handleClickFirstPage = () => {
    setPage(1);
  };

  const handleClickPrevPage = () => {
    if (page > 1) setPage(page - 1);
    else setPage(1);
  };

  const handleClickNextPage = () => {
    if (totalCount === 0) setPage(1);
    else {
      const lastPage =
        totalCount % perPage === 0
          ? totalCount / perPage
          : Math.floor(totalCount / perPage) + 1;
      if (page < lastPage) setPage(page + 1);
      else setPage(lastPage);
    }
  };

  const handleClickLastPage = () => {
    if (totalCount === 0) setPage(1);
    else {
      const lastPage =
        totalCount % perPage === 0
          ? totalCount / perPage
          : Math.floor(totalCount / perPage) + 1;
      setPage(lastPage);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(page);
  }, [page]);

  return (
    <div className={classNames('bidding-submit-pagecontrol-container-in')}>
      <select
        className={classNames('bidding-submit-pagecontrol-select')}
        onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
      >
        <option value="5">5 rows</option>
        <option value="10">10 rows</option>
        <option value="15">15 rows</option>
      </select>
      <button
        className={classNames('bidding-submit-pagecontrol-first')}
        type="button"
        title="First Page"
        onClick={() => handleClickFirstPage()}
      >
        &Iota;&#60;
      </button>
      <button
        className={classNames('bidding-submit-pagecontrol-prev')}
        type="button"
        title="Previous Page"
        onClick={() => handleClickPrevPage()}
      >
        &#60;
      </button>
      <button
        className={classNames('bidding-submit-pagecontrol-next')}
        type="button"
        title="Next Page"
        onClick={() => handleClickNextPage()}
      >
        &#62;
      </button>
      <button
        className={classNames('bidding-submit-pagecontrol-last')}
        type="button"
        title="Last Page"
        onClick={() => handleClickLastPage()}
      >
        &#62;&Iota;
      </button>
    </div>
  );
};

export default PageControl;
