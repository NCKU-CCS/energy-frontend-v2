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

interface IProps {
  date: string;
  values: number[];
}

const Graph: React.FC<IProps> = ({ date, values }) => {
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

  // d3 scale x: 1 ~ 4
  const scaleX = d3
    .scaleLinear()
    .domain([1, 4])
    .range([0, width - (padding.left + padding.right)]);

  // d3 scale y
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...values)])
    .range([0, height - (padding.top + padding.bottom)]);

  // d3 axis scale y
  const axisScaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...values)])
    .range([height - (padding.top + padding.bottom), 0]);

  // axis x
  const axisX = d3
    .axisBottom(scaleX)
    .ticks(4)
    .tickPadding(5)
    .tickFormat(null)
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
    setPadding({
      top: height * 0.1,
      bottom: height * 0.15,
      left: width * 0.25,
      right: width * 0.25,
    });
    setBarWidth(width * 0.12);
  }, [width, height]);

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
      .data(values)
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
          enter
            .transition(transition)
            .attr('height', (d: number) => scaleY(d + 0.5)),
      )
      .attr('fill', (_: number, i: number) => {
        switch (i + 1) {
          case 1:
            return '#F7BE16';
          case 2:
            return '#705341';
          case 3:
            return '#696464';
          case 4:
            return '#123456';
          default:
            return '#fff';
        }
      })
      .style('cursor', 'pointer')
      .append('title')
      .text((d: number) => d);

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  });

  return (
    <div className={classNames('draccept-graph-container')}>
      <div className={classNames('draccept-graph-title')}>
        <div className={classNames('draccept-graph-title-date')}>{date}</div>
        <div className={classNames('draccept-graph-title-sub')}>
          {t('dracceptpage.businessModelDrSummary')}
        </div>
      </div>
      <svg className={classNames('draccept-graph-svg')} ref={svgRef} />
      <div className={classNames('draccept-graph-bottom')}>
        {t('dracceptpage.transactionMode')}
      </div>
    </div>
  );
};

export default Graph;
