import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import * as d3 from 'd3';

interface IData {
  bid_type: string;
  date: string;
  end_time: string;
  id: string;
  price: number;
  start_time: string;
  time: number;
  total_price: number;
  upload_time: string;
  volume: number;
}

interface IProps {
  dataBuy: IData[];
  dataSell: IData[];
}

const LineChart: React.FC<IProps> = ({ dataBuy, dataSell }) => {
  // ref
  const svgRef = useRef(null);

  // width: 590, height: 360
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // React Hook: useEffect -> render chart
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // handle resize
    const handleResize = () => {
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
    };

    // add resize event
    window.addEventListener('resize', handleResize);

    // first time handle resize
    handleResize();

    // svg styles
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white');

    svg
      .append('rect')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', width - 40)
      .attr('height', height - 40)
      .attr('fill', '#d1d2d1');

    // clear effect
    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    console.log(dataBuy, dataSell);
  }, [dataBuy, dataSell]);

  return (
    <div className={classNames('bidding-graph-linechart-container')}>
      <svg className={classNames('bidding-graph-linechart-svg')} ref={svgRef} />
    </div>
  );
};

export default LineChart;
