import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import PageButton from './pageButton';
import Content from './content';

interface IListInfo {
  bid_type: string;
  status: string;
  date: string;
  time: string;
  bids: {
    price: number;
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  wins: {
    price: number;
    value: number;
  };
  transaction_hash: string;
  id: string;
  upload: string;
  achievement: number;
  mode: number;
}

interface IAListInfo {
  listInfo: IListInfo[];
  setNowIndex: (display: number) => void;
  isDR: boolean;
  setPagesize: (display: number) => void;
  setCurrentPage: (display: number) => void;
  maxPage: number;
  currentPage: number;
  pageSize: number;
  nowIndex: number;
}

const List: React.FC<IAListInfo> = ({
  listInfo,
  setNowIndex,
  isDR,
  setPagesize,
  maxPage,
  currentPage,
  setCurrentPage,
  pageSize,
  nowIndex,
}) => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);

  const listItem = listInfo.map((content, index) => {
    const info = (
      <Content
        index={index}
        nowIndex={nowIndex}
        changeIndex={setNowIndex}
        bidType={content.bid_type}
        status={content.status}
        date={content.date}
        time={content.time}
        hash={content.transaction_hash}
        id={content.id}
        upload={content.upload}
        name={content.counterpart.name}
        address={content.counterpart.address}
        bidsValue={content.bids.value}
        bidsPrice={content.bids.price}
        winsValue={content.wins.value}
        winsPrice={content.wins.price}
        achievement={content.achievement}
        isDR={isDR}
        mode={content.mode}
      />
    );
    if (page === 1) return info;
    if (page === 2) {
      if (content.status === '投標中' || content.status === '已投標')
        return info;
      return null;
    }
    if (page === 3) {
      if (
        content.status === '未得標' ||
        content.status === '已得標' ||
        content.status === '執行中'
      )
        return info;
      return null;
    }
    if (page === 4) {
      if (content.status === '結算中' || content.status === '已結算')
        return info;
      return null;
    }
    return null;
  });

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPage(parseInt(e.target.value, 10));

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = 10 + parseInt(e.target.value, 10) * 5;
    if (currentPage * newPageSize > maxPage * pageSize)
      setCurrentPage((maxPage * pageSize) / newPageSize);
    setPagesize(newPageSize);
  };

  const changePageOnClick = (mode: number) => {
    if (currentPage - 10 >= 1 && mode === 1) setCurrentPage(currentPage - 10);
    else if (currentPage - 1 >= 1 && mode === 2)
      setCurrentPage(currentPage - 1);
    else if (currentPage + 1 <= maxPage && mode === 3)
      setCurrentPage(currentPage + 1);
    else if (currentPage + 10 <= maxPage && mode === 4)
      setCurrentPage(currentPage + 10);
  };

  return (
    <div className={classnames('status-list')}>
      <select
        id="page"
        onChange={(e) => handlePageChange(e)}
        className={classnames('status-list-select')}
      >
        <option selected value="1">
          {t('statuspage.all')}
        </option>
        <option value="2">{t('statuspage.bid')}</option>
        <option value="3">{t('statuspage.handle')}</option>
        <option value="4">{t('statuspage.settle')}</option>
      </select>
      <div className={classnames('status-list-buttonContainer')}>
        <PageButton
          text="statuspage.all"
          pageIndex={1}
          setPage={setPage}
          isSelected={page === 1}
        />
        <PageButton
          text="statuspage.bid"
          pageIndex={2}
          setPage={setPage}
          isSelected={page === 2}
        />
        <PageButton
          text="statuspage.handle"
          pageIndex={3}
          setPage={setPage}
          isSelected={page === 3}
        />
        <PageButton
          text="statuspage.settle"
          pageIndex={4}
          setPage={setPage}
          isSelected={page === 4}
        />
      </div>
      <div className={classnames('status-list-titleContainer')}>
        <div className={classnames('status-list-titleType320')}>
          {t('statuspage.type320')}
        </div>
        <div className={classnames('status-list-titleType')}>
          {t('statuspage.type')}
        </div>
        {isDR && (
          <div className={classnames('status-list-titleMode')}>
            {t('statuspage.mode')}
          </div>
        )}
        <div className={classnames('status-list-titleStatus')}>
          {t('statuspage.state')}
        </div>
        <div className={classnames('status-list-titleSchedule')}>
          {t('statuspage.progress')}
        </div>
        <div className={classnames('status-list-titleDate')}>
          {t('statuspage.date')}
        </div>
        <div className={classnames('status-list-titleTime')}>
          {t('statuspage.time')}
        </div>
        <div className={classnames('status-list-titlePrice')}>
          {t('statuspage.averagePrice')}
        </div>
        <div className={classnames('status-list-titleURL')}>
          {t('statuspage.url')}
        </div>
      </div>
      <div className={classnames('status-list-contentContainer')}>
        {listItem}
        {isDR && (
          <div className={classnames('status-list-nextPageContainer')}>
            <select
              id="page"
              onChange={(e) => handleChangePageSize(e)}
              className={classnames('status-list-rowSelector')}
            >
              <option selected value="1">
                15 rows
              </option>
              <option value="2">20 rows</option>
              <option value="3">25 rows</option>
              <option value="4">30 rows</option>
            </select>
            <button
              type="button"
              className={classnames('status-list-nextPageButton')}
              onClick={() => changePageOnClick(1)}
            >
              &Iota;&#60;
            </button>
            <button
              type="button"
              className={classnames('status-list-nextPageButton')}
              onClick={() => changePageOnClick(2)}
            >
              &#60;
            </button>
            <div className={classnames('status-list-nextPageText')}>
              {currentPage}/{maxPage}
            </div>
            <button
              type="button"
              className={classnames('status-list-nextPageButton')}
              onClick={() => changePageOnClick(3)}
            >
              &#62;
            </button>
            <button
              type="button"
              className={classnames('status-list-nextPageButton')}
              onClick={() => changePageOnClick(4)}
            >
              &#62;&Iota;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
