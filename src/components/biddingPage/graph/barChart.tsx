import React, { useRef } from 'react';
import classNames from 'classnames';

const BarChart: React.FC = () => {
  // ref
  const svgRef = useRef(null);
  return (
    <div className={classNames('bidding-graph-barchart-container')}>
      <svg className={classNames('bidding-graph-barchart-svg')} ref={svgRef} />
    </div>
  );
};

export default BarChart;
