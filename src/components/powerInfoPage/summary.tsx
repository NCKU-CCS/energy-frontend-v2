import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import * as d3 from 'd3';
import classNames from 'classnames';

interface IProps {
  mode: string;
  date: Date;
}

interface IApiData {
  Consume: number;
  Demand: number;
  ESS: number;
  EV: number;
  PV: number;
  WT: number;
}

const Summary: React.FC<IProps> = ({ mode, date }) => {
  const container = useRef(null);

  // check whether the date is after today
  const correctDate = date.getTime() > new Date().getTime() ? new Date() : date;

  // api data array
  const [apiData, setApiData] = useState<IApiData>({
    Consume: 0,
    Demand: 0,
    ESS: 0,
    EV: 0,
    PV: 0,
    WT: 0,
  });

  // fetch api data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${
        process.env.REACT_APP_BACKEND_ENDPOINT
      }/power_info?summary_date=${dayjs(correctDate).format('YYYY/MM/DD')}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );

    // get response successfully or not
    if (response.status === 200) {
      const tmp = await response.json();
      setApiData(tmp);
    }
  };

  // array of positive data
  let posData: string[] = [];

  // array of negative data
  let negData: string[] = [];

  // array of sorted(pos / neg) data
  let sortedData: string[] = [];

  // svg props
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(279);
  const [titleTextSize, setTitleTextSize] = useState('');
  const [contentTextSize, setContentTextSize] = useState('');
  const [unitTextSize, setUnitTextSize] = useState('');

  // React-Hook: useEffect -> render content
  useEffect(() => {
    const svg: any = d3.select(container.current);

    // first time determine sizes
    setWidth(svg.node().getBoundingClientRect().width);
    setHeight(svg.node().getBoundingClientRect().height);
    if (window.innerWidth >= 1920) {
      setTitleTextSize('22px');
      setContentTextSize('20px');
      setUnitTextSize('14px');
    } else if (window.innerWidth >= 1280) {
      setTitleTextSize('16px');
      setContentTextSize('16px');
      setUnitTextSize('10px');
    } else if (window.innerWidth >= 720) {
      setTitleTextSize('14px');
      setContentTextSize('14px');
      setUnitTextSize('8px');
    } else {
      setTitleTextSize('12px');
      setContentTextSize('12px');
      setUnitTextSize('6px');
    }

    // determine sizes when window resized
    const handleResize = () => {
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
      if (window.innerWidth >= 1920) {
        setTitleTextSize('22px');
        setContentTextSize('20px');
        setUnitTextSize('14px');
      } else if (window.innerWidth >= 1280) {
        setTitleTextSize('16px');
        setContentTextSize('16px');
        setUnitTextSize('10px');
      } else if (window.innerWidth >= 720) {
        setTitleTextSize('14px');
        setContentTextSize('14px');
        setUnitTextSize('8px');
      } else {
        setTitleTextSize('12px');
        setContentTextSize('12px');
        setUnitTextSize('6px');
      }
    };

    window.addEventListener('resize', handleResize);

    // svg
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white');

    // append date title
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height * 0.142)
      .attr('fill', '#707070')
      .attr('font-size', titleTextSize)
      .attr('font-weight', 'bold')
      .text(dayjs(correctDate).format('YYYY/MM/DD'));

    // append title-mode
    const titleMode = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height * 0.227)
      .attr('fill', '#707070')
      .attr('font-weight', 'bold')
      .attr('font-size', titleTextSize);

    // append divide line
    const divideLine = svg
      .append('line')
      .attr('x1', width * 0.077)
      .attr('y1', height * 0.767)
      .attr('x2', width - width * 0.077)
      .attr('y2', height * 0.767)
      .attr('stroke', '#707070')
      .attr('stroke-width', '0.5px');

    // mode: 淨負載
    // append title-consume
    const titleConsume = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('font-size', contentTextSize)
      .text('正常用電');

    // append title-ESS
    const titleESS = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('font-size', contentTextSize)
      .text('儲能系統');

    // append title-EV
    const titleEV = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('font-size', contentTextSize)
      .text('充電樁');

    // append title-WT
    const titleWT = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('font-size', contentTextSize)
      .text('風能');

    // append title-consume
    const titlePV = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('font-size', contentTextSize)
      .text('太陽能');

    // append title-demand
    const titleDemand = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width * 0.154)
      .attr('y', height * 0.852)
      .attr('fill', '#707070')
      .attr('font-size', contentTextSize)
      .attr('font-weight', 'bold')
      .text('總淨負載');

    // append data-consume
    const dataConsume = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('font-size', contentTextSize)
      .attr('fill', '#707070')
      .text(Math.abs(apiData.Consume));

    // append data-ESS
    const dataESS = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('font-size', contentTextSize)
      .attr('fill', '#707070')
      .text(Math.abs(apiData.ESS));

    // append data-EV
    const dataEV = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('font-size', contentTextSize)
      .attr('fill', '#707070')
      .text(Math.abs(apiData.EV));

    // append data-WT
    const dataWT = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('font-size', contentTextSize)
      .attr('fill', '#707070')
      .text(Math.abs(apiData.WT));

    // append data-PV
    const dataPV = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('font-size', contentTextSize)
      .attr('fill', '#707070')
      .text(Math.abs(apiData.PV));

    // append data-demand
    const dataDemand = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - width * 0.154)
      .attr('y', height * 0.852)
      .attr('fill', '#707070')
      .attr('font-size', contentTextSize)
      .text(apiData.Demand);

    // append unit
    const unit = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - width * 0.143)
      .attr('y', height * 0.852)
      .attr('fill', '#707070')
      .attr('font-size', unitTextSize)
      .text('kWh');

    // append positive circle
    const posCircle = svg
      .append('circle')
      .attr('cx', width * 0.116)
      .attr('r', 4)
      .attr('fill', '#d32f2f');

    // append negative circle
    const negCircle = svg
      .append('circle')
      .attr('cx', width * 0.116)
      .attr('r', 4)
      .attr('fill', '#2e7d32');

    // 產能設備模式
    // scale
    const scale = d3
      .scaleLinear()
      .domain([0, 40])
      .range([0, height * 0.227]);

    // append rect-PV
    const rectPV = svg
      .append('rect')
      .attr('x', width * 0.193)
      .attr('y', apiData.PV >= 0 ? height * 0.849 : height * 0.849 - scale(40))
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.PV)))
      .attr('fill', '#f7be16');

    // append rect-WT
    const rectWT = svg
      .append('rect')
      .attr('x', width * 0.347)
      .attr('y', apiData.WT >= 0 ? height * 0.849 : height * 0.849 - scale(40))
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.WT)))
      .attr('fill', '#2d3361');

    // append rect-ESS
    const rectESS = svg
      .append('rect')
      .attr('x', width * 0.502)
      .attr('y', apiData.ESS >= 0 ? height * 0.849 : height * 0.849 - scale(40))
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.ESS)))
      .attr('fill', '#696464');

    // append rect-EV
    const rectEV = svg
      .append('rect')
      .attr('x', width * 0.656)
      .attr('y', apiData.EV >= 0 ? height * 0.849 : height * 0.849 - scale(40))
      .attr('width', width * 0.154)
      .attr('height', scale(Math.abs(apiData.EV)))
      .attr('fill', '#ab50ce');

    // 淨負載模式
    if (mode === '淨負載') {
      // positive or negative
      if (apiData.Consume >= 0) posData.push('Consume');
      else negData.push('Consume');

      if (apiData.ESS >= 0) posData.push('ESS');
      else negData.push('ESS');

      if (apiData.EV >= 0) posData.push('EV');
      else negData.push('EV');

      if (apiData.PV >= 0) posData.push('PV');
      else negData.push('PV');

      if (apiData.WT >= 0) posData.push('WT');
      else negData.push('WT');

      sortedData = posData.concat(negData);

      // title-mode
      titleMode.text('淨負載統計(用電-產電)');

      // title-consume
      titleConsume
        .attr(
          'y',
          height * 0.369 + sortedData.indexOf('Consume') * height * 0.085,
        )
        .attr('fill', apiData.Consume >= 0 ? '#d32f2f' : '#2e7d32');

      // title-ESS
      titleESS
        .attr('y', height * 0.369 + sortedData.indexOf('ESS') * height * 0.085)
        .attr('fill', apiData.ESS >= 0 ? '#d32f2f' : '#2e7d32');

      // title-EV
      titleEV
        .attr('y', height * 0.369 + sortedData.indexOf('EV') * height * 0.085)
        .attr('fill', apiData.EV >= 0 ? '#d32f2f' : '#2e7d32');

      // title-WT
      titleWT
        .attr('y', height * 0.369 + sortedData.indexOf('WT') * height * 0.085)
        .attr('fill', apiData.WT >= 0 ? '#d32f2f' : '#2e7d32');

      // title-PV
      titlePV
        .attr('y', height * 0.369 + sortedData.indexOf('PV') * height * 0.085)
        .attr('fill', apiData.PV >= 0 ? '#d32f2f' : '#2e7d32');

      // data-consume
      dataConsume.attr(
        'y',
        height * 0.369 + sortedData.indexOf('Consume') * height * 0.085,
      );

      // data-ESS
      dataESS.attr(
        'y',
        height * 0.369 + sortedData.indexOf('ESS') * height * 0.085,
      );

      // data-EV
      dataEV.attr(
        'y',
        height * 0.369 + sortedData.indexOf('EV') * height * 0.085,
      );

      // data-WT
      dataWT.attr(
        'y',
        height * 0.369 + sortedData.indexOf('WT') * height * 0.085,
      );

      // data-PV
      dataPV.attr(
        'y',
        height * 0.369 + sortedData.indexOf('PV') * height * 0.085,
      );

      // positive circle
      posCircle
        .attr('cy', height * 0.349)
        .style('display', posData.length === 0 ? 'none' : 'block');

      // negative circle
      negCircle
        .attr('cy', height * 0.349 + posData.length * height * 0.085)
        .style('display', negData.length === 0 ? 'none' : 'block');

      // display none of mode: 產能設備
      // rect-PV
      rectPV.style('display', 'none');

      // rect-WT
      rectWT.style('display', 'none');

      // rect-ESS
      rectESS.style('display', 'none');

      // rect-EV
      rectEV.style('display', 'none');
    } else {
      // divide-line
      divideLine.attr('y1', height * 0.625).attr('y2', height * 0.625);

      // rect-PV
      rectPV.style('display', 'block');

      // rect-WT
      rectWT.style('display', 'block');

      // rect-ESS
      rectESS.style('display', 'block');

      // rect-EV
      rectEV.style('display', 'block');

      // display none of mode: 淨負載
      // title-mode
      titleMode.text('產電總量統計(kWh)');

      // title-consume
      titleConsume.style('display', 'none');

      // title-ESS
      titleESS.style('display', 'none');

      // title-EV
      titleEV.style('display', 'none');

      // title-WT
      titleWT.style('display', 'none');

      // title-PV
      titlePV.style('display', 'none');

      // title-demand
      titleDemand.style('display', 'none');

      // data-consume
      dataConsume.style('display', 'none');

      // data-ESS
      dataESS.style('display', 'none');

      // data-EV
      dataEV.style('display', 'none');

      // data-WT
      dataWT.style('display', 'none');

      // data-PV
      dataPV.style('display', 'none');

      // data-demand
      dataDemand.style('display', 'none');

      // unit
      unit.style('display', 'none');

      // positive circle
      posCircle.style('display', 'none');

      // negative circle
      negCircle.style('display', 'none');
    }

    // clear effect
    return () => {
      svg.selectAll('*').remove();
      posData = [];
      negData = [];
      window.removeEventListener('resize', handleResize);
    };
  });

  // React-Hook: useEffect -> fetch api data when parameters are changed
  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [correctDate]);

  useEffect(() => {}, [apiData]);

  return (
    <div className={classNames('powerinfo-summary-container')}>
      <svg ref={container} className={classNames('powerinfo-summary-svg')} />
    </div>
  );
};

export default Summary;
