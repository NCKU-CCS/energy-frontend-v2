/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface IData {
  price: number;
  volume: number;
}

interface IProps {
  dataType: string;
  data: IData[];
}

const BarChart: React.FC<IProps> = ({ dataType, data }) => {
  // extract data
  const prices = data.map((d) => d.price);
  const volumes = data.map((d) => d.volume);

  // i18n
  const { t } = useTranslation();

  // ref
  const svgRef = useRef(null);

  // width for chart
  const [width, setWidth] = useState<number>(0);

  // height for chart
  const [height, setHeight] = useState<number>(0);

  // padding for chart
  const [padding, setPadding] = useState<IPadding>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  // bar width
  const [barWidth, setBarWidth] = useState<number>(0);

  // d3 scale x: 1 ~ data length
  const scaleX = d3
    .scaleLinear()
    .domain([1, data.length])
    .range([0, width - (padding.left + padding.right)]);

  // d3 scale y
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...volumes) || 5])
    .range([0, height - (padding.top + padding.bottom)]);

  // d3 axis scale y
  const axisScaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...volumes) || 5])
    .range([height - (padding.top + padding.bottom), 0]);

  // axis x
  const axisX = d3
    .axisBottom(scaleX)
    .ticks(prices.length)
    .tickPadding(5)
    .tickFormat((i) => {
      // console.log(i);
      return Number.isInteger(i.valueOf())
        ? prices[i.valueOf() - 1].toString()
        : '';
      // return `${i}`;
    })
    .tickSize(0);

  // axis y
  const axisY = d3
    .axisLeft(axisScaleY)
    .ticks(5)
    .tickPadding(10)
    .tickFormat(null)
    .tickSize(width - (padding.left + padding.right) + barWidth);

  // handle window resize
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // width height setup function
    const setup = () => {
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
    };

    // first time setup
    setup();

    // resize event listener
    window.addEventListener('resize', setup);

    // remove listener
    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', setup);
    };
  });

  // set others based on width and height
  useEffect(() => {
    // set padding
    setPadding({
      top: height * 0.2,
      bottom: height * 0.1,
      left: width * 0.2,
      right: width * 0.2,
    });

    // set bar width
    setBarWidth((width * 0.7) / (data.length * 1.5));
  }, [width, height, data]);

  // render chart
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // svg styles
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white');

    // append axis x
    svg
      .append('g')
      .call(axisX)
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.selectAll('.tick').attr('color', '#707070'))
      .attr('stroke-width', '0.5px')
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr(
        'transform',
        `translate(${padding.left}, ${height - padding.bottom + 5})`,
      );

    // append axis y
    svg
      .append('g')
      .call(axisY)
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.selectAll('.tick').attr('color', '#d8d8d8'))
      .call((g: any) => g.selectAll('text').attr('color', '#707070'))
      .call((g: any) => g.select(':nth-child(1)').select('text').remove())
      .attr('stroke-width', '0.5px')
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr(
        'transform',
        `translate(${width - padding.right + barWidth / 2}, ${padding.top})`,
      );

    // transition
    const transition = d3.transition().duration(500);

    // append bar
    svg
      .selectAll('rect')
      .data(volumes)
      .enter()
      .append('rect')
      .attr('rx', 4)
      .attr('ry', 4)
      .attr(
        'x',
        (_: number, i: number) =>
          padding.left + Number(scaleX(i + 1)) - barWidth / 2,
      )
      .attr('y', () => height - padding.bottom)
      .call(
        (enter: {
          transition: (
            arg0: d3.Transition<HTMLElement, unknown, null, undefined>,
          ) => any;
        }) =>
          enter
            .transition(transition)
            .attr(
              'y',
              (d: number) => height - padding.bottom - Number(scaleY(d)),
            ),
      )
      .attr('width', barWidth)
      .call(
        (enter: {
          transition: (
            arg0: d3.Transition<HTMLElement, unknown, null, undefined>,
          ) => any;
        }) =>
          enter.transition(transition).attr('height', (d: number) => scaleY(d)),
      )
      .attr('fill', '#bbb')
      .style('cursor', 'pointer')
      .append('title')
      .text((d: number) => d.toFixed(1));

    // append legend text 買
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', padding.top / 2)
      .attr('fill', dataType === 'buy' ? '#D32F2F' : '#2E7E32')
      .attr('font-size', data.length !== 0 ? '2vh' : 0)
      .attr('font-weight', 'bold')
      .text(`${dataType === 'buy' ? t('greenpage.buy') : t('greenpage.sell')}`);

    // append legend text 單價
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 2.5)
      .attr('y', height - padding.bottom / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', data.length !== 0 ? '1.7vh' : 0)
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.price')}`);

    // append legend text 度數
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', padding.right / 2.5)
      .attr('y', padding.bottom / 1)
      .attr('fill', '#707070')
      .attr('font-size', data.length !== 0 ? '1.7vh' : 0)
      .attr('font-weight', 'bold')
      .text(`${t('greenpage.volume')}`);

    // append text 沒有資料
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('fill', '#707070')
      .attr('font-size', data.length === 0 ? '2vh' : '0')
      .attr('font-weight', 'bold')
      .text('暫時沒有資料');

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  });

  return (
    <div className={classNames('green-graph-linechart-container')}>
      <svg className={classNames('green-graph-linechart-svg')} ref={svgRef} />
    </div>
  );
};

export default BarChart;
