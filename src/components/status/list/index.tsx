import React, { useState } from 'react';
import classnames from 'classnames';
import PageButton from './pageButton';
import Content from './content';

const List: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  console.log(index);

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
        <Content index={1} nowIndex={index} changeIndex={setIndex} />
        <Content index={2} nowIndex={index} changeIndex={setIndex} />
        <Content index={3} nowIndex={index} changeIndex={setIndex} />
        <Content index={4} nowIndex={index} changeIndex={setIndex} />
        <Content index={5} nowIndex={index} changeIndex={setIndex} />
        <Content index={6} nowIndex={index} changeIndex={setIndex} />
        <Content index={7} nowIndex={index} changeIndex={setIndex} />
        <Content index={8} nowIndex={index} changeIndex={setIndex} />
        <Content index={9} nowIndex={index} changeIndex={setIndex} />
        <Content index={10} nowIndex={index} changeIndex={setIndex} />
      </div>
    </div>
  );
};

export default List;
