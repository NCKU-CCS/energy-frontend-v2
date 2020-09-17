import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
// import * as d3 from 'd3';

interface IProps {
  mode: string;
}

const Graph: React.FC<IProps> = ({ mode }) => {
  // ref
  const svgContainer = useRef(null);

  // React Hook: useEffect -> Render chart
  useEffect(() => {
    // svg
    // const svg = d3.select(svgContainer.current);

    // mode: 綠能交易
    if (mode === '綠能交易') {
      // eslint-disable-next-line no-console
      console.log('綠能交易');
    } else {
      // eslint-disable-next-line no-console
      console.log('需量反應');
    }
  });

  return (
    <div className={classNames('bidding-graph-container-in')}>
      <svg className={classNames('bidding-graph-svg')} ref={svgContainer} />
    </div>
  );
};

export default Graph;
