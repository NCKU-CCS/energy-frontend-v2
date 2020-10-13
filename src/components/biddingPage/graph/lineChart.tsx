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

interface IPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const LineChart: React.FC<IProps> = ({ dataBuy, dataSell }) => {
  // ref
  const svgRef = useRef(null);

  // width: 590, height: 360
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // padding
  const [padding, setPadding] = useState<IPadding>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  // max of data
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxVolume, setMaxVolume] = useState(0);

  // display data
  const [displayBuy, setDisplayBuy] = useState<IData[]>([]);
  const [displaySell, setDisplaySell] = useState<IData[]>([]);

  // d3 scale x (volume)
  const scaleX = d3
    .scaleLinear()
    .domain([0, maxVolume])
    .range([0, width - (padding.left + padding.right)]);

  // d3 scale y (price)
  const scaleY = d3
    .scaleLinear()
    .domain([0, maxPrice + 2])
    .range([height - (padding.top + padding.bottom), 0]);

  // axis x
  const axisX = d3
    .axisBottom(scaleX)
    .ticks(5)
    .tickPadding(5)
    .tickFormat(null)
    .tickSize(0);

  // axis y
  const axisY = d3
    .axisLeft(scaleY)
    .ticks(4)
    .tickPadding(5)
    .tickFormat(null)
    .tickSize(width - (padding.left + padding.right));

  // line
  const line = d3
    .line<IData>()
    .x((d) => Number(scaleX(d.volume)))
    .y((d) => Number(scaleY(d.price)))
    .curve(d3.curveCatmullRom);

  // get data to display on chart
  useEffect(() => {
    const tmpBuyArr: IData[] = [];
    const tmpSellArr: IData[] = [];
    const now = new Date();
    const validTime = now.getHours() + 1 === 24 ? 0 : now.getHours() + 1;
    const dateStr: string = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    ).toString()}/${now.getDate().toString()}`;
    dataBuy.map((d) => {
      if (d.date === dateStr && d.time === validTime && validTime !== 0) {
        tmpBuyArr.push(d);
        // console.log('push', tmpBuyArr);
      }
      return null;
    });
    setDisplayBuy(tmpBuyArr);
    dataSell.map((d) => {
      if (d.date === dateStr && d.time === validTime && validTime !== 0) {
        tmpSellArr.push(d);
        // console.log('push', tmpSellArr);
      }
      return null;
    });
    setDisplaySell(tmpSellArr);
  }, [dataBuy, dataSell]);

  useEffect(() => {}, [displayBuy, displaySell]);

  // React Hook: useEffect -> render chart
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // handle resize
    const handleResize = () => {
      // set svg's width and height
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
      // console.log('resize');
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

    // append axis x
    svg
      .append('g')
      .call(axisX)
      // .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.selectAll('.tick').attr('color', 'gray'))
      .attr('stroke-width', '0.5px')
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr(
        'transform',
        `translate(${padding.left}, ${height - padding.bottom})`,
      );

    // append axis y
    svg
      .append('g')
      .call(axisY)
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.selectAll('.tick').attr('color', 'gray'))
      .call((g: any) => g.select(':nth-child(1)').select('text').remove())
      .attr('stroke-width', '0.5px')
      // .call((g: any) =>
      //   g.select(':nth-child(3)').select('line').attr('stroke-width', '2px'),
      // )
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr('transform', `translate(${width - padding.right}, ${padding.top})`);

    // append line of buy
    svg
      .append('path')
      .datum(
        displayBuy.sort((a, b) => {
          if (a.volume > b.volume) return 1;
          if (a.volume < b.volume) return -1;
          return 0;
        }),
      )
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#d32f2f')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr('transform', `translate(${padding.left}, ${padding.top})`);

    // append line of sell
    svg
      .append('path')
      .datum(
        displaySell.sort((a, b) => {
          if (a.volume > b.volume) return 1;
          if (a.volume < b.volume) return -1;
          return 0;
        }),
      )
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#2e7e32')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr('transform', `translate(${padding.left}, ${padding.top})`);

    // append unit text 單價
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', padding.left / 3)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold')
      .text('單價');

    // append unit text 量
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 3)
      .attr('y', height - padding.bottom / 2)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold')
      .text('量');

    // append legend text 買
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width - padding.right * 3)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold')
      .text('買');

    // append legend text 賣
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width - padding.right * 1.1)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold')
      .text('賣');

    // append legend circle red
    svg
      .append('circle')
      .attr('fill', '#d32f2f')
      .attr('r', 5)
      .attr('cx', width - padding.right * 3.5)
      .attr('cy', padding.top / 1.9);

    // append legend circle red
    svg
      .append('circle')
      .attr('fill', '#2e7e32')
      .attr('r', 5)
      .attr('cx', width - padding.right * 1.6)
      .attr('cy', padding.top / 1.9);

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
    displayBuy.map((d) => {
      if (d.price > tmpMaxPrice) tmpMaxPrice = d.price;
      if (d.volume > tmpMaxVolume) tmpMaxVolume = d.volume;
      return null;
    });
    displaySell.map((d) => {
      if (d.price > tmpMaxPrice) tmpMaxPrice = d.price;
      if (d.volume > tmpMaxVolume) tmpMaxVolume = d.volume;
      return null;
    });
    setMaxPrice(tmpMaxPrice);
    setMaxVolume(tmpMaxVolume);
  }, [displayBuy, displaySell]);

  // set padding
  useEffect(() => {
    setPadding({
      top: height * 0.1,
      bottom: height * 0.1,
      left: width * 0.07,
      right: width * 0.07,
    });
  }, [width, height]);

  useEffect(() => {}, [maxVolume]);

  return (
    <div className={classNames('bidding-graph-linechart-container')}>
      <svg className={classNames('bidding-graph-linechart-svg')} ref={svgRef} />
    </div>
  );
};

export default LineChart;
