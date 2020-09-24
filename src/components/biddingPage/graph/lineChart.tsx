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

  // padding
  // const padding = {
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0
  // };

  // max of data
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxVolume, setMaxVolume] = useState(0);

  // d3 scale x (volume)
  // const scaleX = d3
  //   .scaleLinear()
  //   .domain([0, maxVolume])
  //   .range([0, width - 40]);

  // d3 scale y (price)
  const scaleY = d3
    .scaleLinear()
    .domain([0, maxPrice])
    .range([height - 50, 0]);

  // axis x

  // axis y
  const axisY = d3
    .axisLeft(scaleY)
    .ticks(4)
    .tickPadding(0)
    .tickFormat(null)
    .tickSize(width - 40);

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

    // test
    // svg
    //   .append('rect')
    //   .attr('x', 20)
    //   .attr('y', 20)
    //   .attr('width', width - 40)
    //   .attr('height', height - 40)
    //   .attr('fill', '#d1d2d1');

    // append axis y
    svg
      .append('g')
      .call(axisY)
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.selectAll('.tick').attr('color', 'gray'))
      // .call((g: any) =>
      //   g
      //     .select(':nth-child(3)')
      //     .select('line')
      //     .attr('stroke-dasharray', '3'),
      // )
      .attr('stroke-width', '0.5px')
      // .call((g: any) =>
      //   g.select(':nth-child(3)').select('line').attr('stroke-width', '2px'),
      // )
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr('transform', `translate(${width - 20}, ${20})`);

    // clear effect
    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    // set max of data, in order to use d3 scale
    let tmpMaxPrice = 0;
    let tmpMaxVolume = 0;
    dataBuy.map((d) => {
      if (d.price > tmpMaxPrice) tmpMaxPrice = d.price;
      if (d.volume > tmpMaxVolume) tmpMaxVolume = d.volume;
      return null;
    });
    setMaxPrice(tmpMaxPrice);
    setMaxVolume(tmpMaxVolume);
  }, [dataBuy, dataSell]);

  useEffect(() => {}, [maxPrice, maxVolume]);

  return (
    <div className={classNames('bidding-graph-linechart-container')}>
      <svg className={classNames('bidding-graph-linechart-svg')} ref={svgRef} />
    </div>
  );
};

export default LineChart;
