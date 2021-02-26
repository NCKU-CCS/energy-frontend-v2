import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3';

interface IApiData {
  Consume: number;
  Demand: number;
  ESS: number;
  EV: number;
  PV: number;
  WT: number;
}

interface IProps {
  date: string;
  apiData: IApiData;
}

const BarChart: React.FC<IProps> = ({ date, apiData }) => {
  // i18n
  const { t } = useTranslation();

  // ref
  const svgRef = useRef(null);

  // set svg's width and height
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // React-Hook: useEffect -> render chart
  useEffect(() => {
    // svg
    const svg: any = d3.select(svgRef.current);

    // first time determine sizes
    setWidth(svg.node().getBoundingClientRect().width);
    setHeight(svg.node().getBoundingClientRect().height);

    // determine sizes when window resized
    const handleResize = () => {
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
    };
    window.addEventListener('resize', handleResize);

    // set width and height
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white');

    // append divide line
    svg
      .append('line')
      .attr('x1', width * 0.077)
      .attr('y1', height * 0.625)
      .attr('x2', width - width * 0.077)
      .attr('y2', height * 0.625)
      .attr('stroke', '#707070')
      .attr('stroke-width', '0.5px');

    // scale
    const scale = d3
      .scaleLinear()
      .domain([0, 40])
      .range([0, height * 0.227]);

    // append rect-PV
    svg
      .append('rect')
      .attr('x', width * 0.193)
      .attr(
        'y',
        apiData.PV >= 0
          ? height * 0.849
          : height * 0.849 -
              Number(scale(40)) -
              Number(scale(Math.abs(apiData.PV))),
      )
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.PV)))
      .attr('fill', '#f7be16');

    // append rect-WT
    svg
      .append('rect')
      .attr('x', width * 0.347)
      .attr(
        'y',
        apiData.WT >= 0
          ? height * 0.849
          : height * 0.849 -
              Number(scale(40)) -
              Number(scale(Math.abs(apiData.WT))),
      )
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.WT)))
      .attr('fill', '#2d3361');

    // append rect-ESS
    svg
      .append('rect')
      .attr('x', width * 0.502)
      .attr(
        'y',
        apiData.ESS >= 0
          ? height * 0.849
          : height * 0.849 -
              Number(scale(40)) -
              Number(scale(Math.abs(apiData.ESS))),
      )
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.ESS)))
      .attr('fill', '#696464');

    // append rect-EV
    svg
      .append('rect')
      .attr('x', width * 0.656)
      .attr(
        'y',
        apiData.EV >= 0
          ? height * 0.849
          : height * 0.849 -
              Number(scale(40)) -
              Number(scale(Math.abs(apiData.EV))),
      )
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.EV)))
      .attr('fill', '#ab50ce');

    // return function -> clear effect
    return () => {
      svg.selectAll('*').remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [date, apiData, width, height]);

  return (
    <div className={classNames('powerinfo-summary-barchart-container')}>
      <div className={classNames('powerinfo-summary-barchart-date')}>
        {date}
      </div>
      <div className={classNames('powerinfo-summary-barchart-mode')}>
        {t('powerinfopage.equipmentSummary')}
      </div>
      <svg
        ref={svgRef}
        className={classNames('powerinfo-summary-barchart-svg')}
      />
    </div>
  );
};

export default BarChart;
