import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
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
  // i18n
  const { t } = useTranslation();

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
  const [displayAll, setDisplayAll] = useState<IData[]>([]);

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
    const tmpAllArr: IData[] = [];
    const now = new Date();
    const validTime = now.getHours() + 1 === 24 ? 0 : now.getHours() + 1;
    const dateStr: string = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    ).toString()}/${now.getDate().toString()}`;
    dataBuy.map((d) => {
      if (
        new Date(d.date).getTime() === new Date(dateStr).getTime() &&
        d.time === validTime &&
        validTime !== 0
      ) {
        tmpBuyArr.push(d);
        tmpAllArr.push(d);
      }
      return null;
    });
    setDisplayBuy(tmpBuyArr);
    dataSell.map((d) => {
      if (
        new Date(d.date).getTime() === new Date(dateStr).getTime() &&
        d.time === validTime &&
        validTime !== 0
      ) {
        tmpSellArr.push(d);
        tmpAllArr.push(d);
      }
      return null;
    });
    setDisplaySell(tmpSellArr);
    setDisplayAll(tmpAllArr);
  }, [dataBuy, dataSell]);

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

    // append circle of buy
    const circles = svg
      .selectAll('circle')
      .data(displayAll)
      .enter()
      .append('circle')
      .attr('cx', (d: IData) => padding.left + Number(scaleX(d.volume)))
      .attr('cy', (d: IData) => padding.top + Number(scaleY(d.price)))
      .attr('r', 3.3)
      .attr('fill', (d: IData) =>
        d.bid_type === 'buy' ? '#d32f2f' : '#2e7e32',
      )
      .style('cursor', 'pointer')
      .append('title')
      .text(
        (d: IData) =>
          `【${d.bid_type === 'buy' ? '買' : '賣'}】\n度數 : ${
            d.volume
          } kWh\n單價 : $ ${d.price} / kWh`,
      );

    // test
    circles
      .on('mouseover', (d: IData) => {
        // eslint-disable-next-line no-console
        console.log('in', d.bid_type);
        circles.style('cursor', 'pointer');
      })
      .on('mouseout', (d: IData) => {
        // eslint-disable-next-line no-console
        console.log('out', d.bid_type);
      });

    // append unit text 單價
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', padding.left / 3)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.price')}`);

    // append unit text 量
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 3)
      .attr('y', height - padding.bottom / 2)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.volume')}`);

    // append legend text 買
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width - padding.right * 3)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.buy')}`);

    // append legend text 賣
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width - padding.right * 1.1)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.sell')}`);

    // append legend circle red
    svg
      .append('circle')
      .attr('fill', '#d32f2f')
      .attr('r', 5)
      .attr('cx', width - padding.right * 3.7)
      .attr('cy', padding.top / 1.8);

    // append legend circle green
    svg
      .append('circle')
      .attr('fill', '#2e7e32')
      .attr('r', 5)
      .attr('cx', width - padding.right * 1.8)
      .attr('cy', padding.top / 1.8);

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
      top: height * 0.13,
      bottom: height * 0.13,
      left: width * 0.09,
      right: width * 0.07,
    });
  }, [width, height]);

  useEffect(() => {}, [maxVolume]);

  return (
    <div className={classNames('green-graph-linechart-container')}>
      <svg className={classNames('green-graph-linechart-svg')} ref={svgRef} />
    </div>
  );
};

export default LineChart;
