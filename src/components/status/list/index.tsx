import React, { useState } from 'react';
import classnames from 'classnames';
import PageButton from './pageButton';

const List: React.FC = () => {
  const [page, setPage] = useState<number>(1);

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
    </div>
  );
};

export default List;
