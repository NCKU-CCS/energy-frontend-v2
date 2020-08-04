import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import data1 from './test1.json';
import data2 from './test2.json';

const Chart: React.FC = () => {
  const chartContainer = useRef(null);
  const [data, setData] = useState(data1);

  // variables
  const width = 800;
  const height = 500;
  const barWidth = 30;
  const padding = {
    top: 100,
    bottom: 50,
    left: 50,
    right: 75,
  };

  // scales
  const scaleX = d3
    .scaleLinear()
    .range([0, width - 1 * barWidth - padding.left - padding.right])
    .domain([7, 19]);

  const scaleY = d3
    .scaleLinear()
    .range([0, height - padding.top - padding.bottom])
    .domain([0, 10]);

  const scaleAxisY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([0, 10]);

  // axis
  const axisX = d3
    .axisBottom(scaleX)
    .tickValues([7, 9, 11, 13, 15, 17, 19])
    .tickSize(0)
    .tickPadding(15);

  const axisY = d3
    .axisLeft(scaleAxisY)
    .tickValues([2, 4, 6, 8, 10])
    .tickSize(0)
    .tickPadding(15);

  useEffect(() => {
    // append svg
    const svg = d3.select(chartContainer.current);
    svg
      .attr('width', width)
      .attr('height', height)
      .style('border-radius', '10px')
      .style('background-color', 'white');

    // append bar
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => scaleX(d.time) + padding.left)
      .attr('y', (d) => height - scaleY(d.DR) - padding.bottom)
      .attr('width', barWidth)
      .attr('height', (d) => scaleY(d.DR))
      .attr('fill', (d) => {
        if (d.time > 12) return '#2d3161';
        return '#d8d8d8';
      });

    // append axis
    svg
      .append('g')
      .call(axisX)
      .call((g) => g.select('.domain').attr('stroke', '#f1f2f1'))
      .attr('font-size', '15px')
      .attr('color', '#707070')
      .attr(
        'transform',
        `translate(${barWidth / 2 + padding.left},${height - padding.bottom})`,
      );
    svg
      .append('g')
      .call(axisY)
      .call((g) => g.select('.domain').remove())
      .attr('font-size', '15px')
      .attr('color', '#707070')
      .attr('transform', `translate(${padding.left},${padding.top})`);

    // append axis title
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 3.5)
      .attr('y', height - padding.bottom / 2)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('時間');
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', padding.left * 1.1)
      .attr('y', padding.top / 2)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text('DR量');
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 1.5)
      .attr('y', padding.top / 2)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text('每小時DR量預覽');

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

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
