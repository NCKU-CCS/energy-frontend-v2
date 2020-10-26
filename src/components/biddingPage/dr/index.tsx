import React from 'react';
import classNames from 'classnames';
import List from './list';
import PageControl from './pageControl';

const Dr: React.FC = () => {
  return (
    <div className={classNames('bidding-dr-container-in')}>
      <div className={classNames('bidding-dr-title-container')}>
        需量反應競標
      </div>
      <div className={classNames('bidding-dr-list-container-out')}>
        <List />
      </div>
      <div className={classNames('bidding-dr-pagecontrol-container-out')}>
        <PageControl />
      </div>
    </div>
  );
};

export default Dr;
