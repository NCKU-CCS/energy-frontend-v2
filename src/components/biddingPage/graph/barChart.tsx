import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import classNames from 'classnames';
// import data from './test.json';
import dayjs from 'dayjs';
import weekData from './newTest.json';

interface IProps {
  date: string;
}
interface IPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface IData {
  time: number;
  dr: number;
}

const BarChart: React.FC<IProps> = ({ date }) => {
  // day
  const [day, setDay] = useState<number>(new Date(date).getDay());

  // new data
  const [data, setData] = useState<IData[]>([]);

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

  // bar width
  const [barWidth, setBarWidth] = useState(0);

  // max of data
  const [maxDr, setMaxDr] = useState(0);

  // d3 scale x (time)
  const scaleX = d3
    .scaleLinear()
    .domain([0, 23])
    .range([0, width - (padding.left + padding.right)]);

  // d3 scale y (dr)
  const scaleY = d3
    .scaleLinear()
    .domain([0, maxDr + 1])
    .range([0, height - (padding.top + padding.bottom)]);

  // d3 scale y (dr)
  const axisScaleY = d3
    .scaleLinear()
    .domain([0, maxDr + 1])
    .range([height - (padding.top + padding.bottom), 0]);

  // axis x
  const axisX = d3
    .axisBottom(scaleX)
    .ticks(10)
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

  // set day
  useEffect(() => {
    setDay(new Date(date).getDay());
  }, [date]);

  // set the data to display depends on day
  useEffect(() => {
    weekData.map((d) => {
      if (d.day === day + 1) setData(d.data);
      return null;
    });
    // alert(day);
  }, [day]);

  // React Hook: useEffect -> render chart
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // handle resize
    const handleResize = () => {
      // set svg's width and height
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
        `translate(${padding.left}, ${height - padding.bottom})`,
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
      // .call((g: any) =>
      //   g.select(':nth-child(3)').select('line').attr('stroke-width', '2px'),
      // )
      .attr('fill', 'none')
      .attr('font-size', 10)
      .attr(
        'transform',
        `translate(${width - padding.right + barWidth / 2}, ${padding.top})`,
      );

    // append bar
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: IData) => {
        return padding.left + Number(scaleX(d.time)) - barWidth / 2;
      })
      .attr('y', (d: IData) => height - padding.bottom - Number(scaleY(d.dr)))
      .attr('width', barWidth)
      .attr('height', (d: IData) => scaleY(d.dr))
      .attr('fill', (d: IData) => {
        if (
          (d.time > new Date().getHours() &&
            dayjs(new Date()).format('YYYY-MM-DD') ===
              dayjs(date).format('YYYY-MM-DD')) ||
          new Date(date).getTime() > new Date().getTime()
        )
          return '#2d3161';
        return '#d8d8d8';
      });

    // append unit text DR量
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', padding.left / 3.5)
      .attr('y', padding.top / 2)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text('DR量');

    // append unit text DR量
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 3)
      .attr('y', height - padding.bottom / 4)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text('時間');

    // append graph title text 每小時DR量預覽
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top / 2)
      .attr('fill', '#707070')
      .attr('font-size', '1.7vh')
      .attr('font-weight', 'bold')
      .text('每小時DR量預覽');

    // return function
    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', handleResize);
    };
  });

  // get max of data
  useEffect(() => {
    let tmpMaxDr = 0;
    data.map((d) => {
      if (d.dr > tmpMaxDr) tmpMaxDr = d.dr;
      return null;
    });
    setMaxDr(tmpMaxDr);
  }, [data]);

  useEffect(() => {
    // set padding
    setPadding({
      top: height * 0.15,
      bottom: height * 0.15,
      left: width * 0.1,
      right: width * 0.07,
    });

    // set bar width
    setBarWidth(width * 0.025);
  }, [width, height]);

  return (
    <div className={classNames('bidding-graph-barchart-container')}>
      <svg className={classNames('bidding-graph-barchart-svg')} ref={svgRef} />
    </div>
  );
};

export default BarChart;
