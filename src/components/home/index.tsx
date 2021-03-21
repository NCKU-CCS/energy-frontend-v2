import React from 'react';
import classnames from 'classnames';
// components
import TimeInfo from './timeInfo';
import BidInfo from './bidInfo';
import GraphContainer from './graphContainer';

const IndexPage: React.FC = () => {
  return (
    <div className={classnames('home')}>
      <TimeInfo />
      <BidInfo />
      <GraphContainer />
    </div>
  );
};

export default IndexPage;
