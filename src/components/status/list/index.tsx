import React, { useState, useEffect } from 'react';
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
}

interface IAListInfo {
  listInfo: IListInfo[];
  changeIndex: (display: number) => void;
}

const List: React.FC<IAListInfo> = ({ listInfo, changeIndex }) => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);
  const [nowIndex, setNowIndex] = useState<number>(-1);

  useEffect(() => {
    changeIndex(nowIndex);
  }, [nowIndex]);

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
        price={content.bids.price}
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
        <PageButton text={1} changePage={setPage} page={page} firstColor />
        <PageButton
          text={2}
          changePage={setPage}
          page={page}
          firstColor={false}
        />
        <PageButton
          text={3}
          changePage={setPage}
          page={page}
          firstColor={false}
        />
        <PageButton
          text={4}
          changePage={setPage}
          page={page}
          firstColor={false}
        />
      </div>
      <div className={classnames('status-list-titleContainer')}>
        <div className={classnames('status-list-titleType320')}>
          {t('statuspage.type320')}
        </div>
        <div className={classnames('status-list-titleType')}>
          {t('statuspage.type')}
        </div>
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
      </div>
    </div>
  );
};

export default List;
