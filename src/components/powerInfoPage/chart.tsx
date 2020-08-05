import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import data1 from './test1.json';
import data2 from './test2.json';

interface IData {
  date: string;
  value: number;
}

const Chart: React.FC = () => {
  const chartContainer = useRef(null);
  const [data, setData] = useState(data1);

  // variables
  const width = 1300;
  const height = 400;
  const padding = {
    top: 100,
    bottom: 50,
    left: 50,
    right: 150,
    axisX: 100,
  };

  // scales
  const scaleX = d3
    .scaleTime()
    .range([0, width - padding.left - padding.right - 2 * padding.axisX])
    .domain([new Date('2018/08/25'), new Date('2018/08/31')]);

  const scaleY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([-40, 40]);

  // axis
  const axisX = d3
    .axisBottom(scaleX)
    .ticks(7)
    .tickSize(0)
    .tickPadding(20)
    .tickFormat(
      d3.timeFormat('%Y/%m/%d') as (
        value: Date | { valueOf(): number },
        i: number,
      ) => string,
    );

  // grid
  const grid = d3
    .axisLeft(scaleY)
    .ticks(4)
    .tickPadding(15)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  // line
  const line = d3
    .line<IData>()
    .x((d: IData) => scaleX(new Date(d.date)))
    .y((d: IData) => scaleY(d.value))
    .curve(d3.curveBasis);

  useEffect(() => {
    // append svg
    const svg = d3.select(chartContainer.current);
    svg
      .attr('width', width)
      .attr('height', height)
      .style('border-radius', '10px')
      .style('background-color', 'white');

    // append line of dataSolar
    svg
      .append('path')
      .datum(data.dataSolar)
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#f7c015')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr(
        'transform',
        `translate(${padding.axisX + padding.left}, ${padding.top})`,
      );

    // append line of dataCharge
    svg
      .append('path')
      .datum(data.dataCharge)
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#a243c9')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr(
        'transform',
        `translate(${padding.axisX + padding.left}, ${padding.top})`,
      );

    // append line of dataStorage
    svg
      .append('path')
      .datum(data.dataStorage)
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#696464')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr(
        'transform',
        `translate(${padding.axisX + padding.left}, ${padding.top})`,
      );

    // append line of dataWind
    svg
      .append('path')
      .datum(data.dataWind)
      .attr('d', line)
      .attr('y', 0)
      .attr('stroke', '#2d3361')
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr(
        'transform',
        `translate(${padding.axisX + padding.left}, ${padding.top})`,
      );

    // append axis
    svg
      .append('g')
      .call(axisX)
      .call((g) => g.select('.domain').remove())
      .attr('color', '#707070')
      .attr('font-size', '15px')
      .attr(
        'transform',
        `translate(${padding.axisX + padding.left}, ${
          height - padding.bottom
        })`,
      );

    // append grid
    svg
      .append('g')
      .call(grid)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick').attr('color', 'gray'))
      .call((g) => g.select(':nth-child(3) line').attr('stroke-dasharray', '3'))
      .attr('stroke-width', '0.5px')
      .call((g) => g.select(':nth-child(3) line').attr('stroke-width', '2px'))
      .attr('fill', 'none')
      .attr('font-size', '15px')
      .attr('transform', `translate(${padding.left}, ${padding.top})`);

    // append axis title
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', padding.left / 1.1)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('kW');

    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right)
      .attr('y', height - padding.bottom / 2.7)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('日期');

    // append legend(圖例)
    svg
      .append('circle')
      .attr('cx', width - padding.right / 1.3)
      .attr('cy', padding.top * 1.3)
      .attr('r', 7)
      .attr('fill', '#f7c015');

    svg
      .append('circle')
      .attr('cx', width - padding.right / 1.3)
      .attr('cy', padding.top * 1.9)
      .attr('r', 7)
      .attr('fill', '#2d3361');

    svg
      .append('circle')
      .attr('cx', width - padding.right / 1.3)
      .attr('cy', padding.top * 2.5)
      .attr('r', 7)
      .attr('fill', '#696464');

    svg
      .append('circle')
      .attr('cx', width - padding.right / 1.3)
      .attr('cy', padding.top * 3.1)
      .attr('r', 7)
      .attr('fill', '#a243c9');

    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top * 1.35)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('太陽能');
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top * 1.95)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('風能');
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top * 2.55)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('儲能系統');
    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top * 3.15)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('充電樁');

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  });

  return (
    <div>
      <svg className="chart" ref={chartContainer} />
      <button
        type="button"
        onClick={() => (data === data1 ? setData(data2) : setData(data1))}
      >
        Change Data
      </button>
    </div>
  );
};

export default Chart;
