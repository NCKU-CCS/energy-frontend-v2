import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PageButton from './pageButton';
import Content from './content';

interface IListInfo {
  bid_type: string;
  status: string;
  date: string;
  time: string;
  bids: {
    price: number;
  };
}

interface IAListInfo {
  listInfo: IListInfo[];
  changeIndex: (display: number) => void;
}

const List: React.FC<IAListInfo> = ({ listInfo, changeIndex }) => {
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

  return (
    <div className={classnames('status-list')}>
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
        <div className={classnames('status-list-titleType')}>交易類型</div>
        <div className={classnames('status-list-titleStatus')}>狀態</div>
        <div className={classnames('status-list-titleSchedule')}>進度</div>
        <div className={classnames('status-list-titleDate')}>日期</div>
        <div className={classnames('status-list-titleTime')}>投標時段</div>
        <div className={classnames('status-list-titlePrice')}>平均單價</div>
        <div className={classnames('status-list-titleURL')}>連結</div>
      </div>
      <div className={classnames('status-list-contentContainer')}>
        {listItem}
      </div>
    </div>
  );
};

export default List;
