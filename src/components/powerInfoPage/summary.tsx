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
  const width = 259;
  const height = 352;

  // React-Hook: useEffect -> render content
  useEffect(() => {
    const svg = d3.select(container.current);

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
      .attr('y', 50)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text(dayjs(correctDate).format('YYYY/MM/DD'));

    // append title-mode
    const titleMode = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', 80)
      .attr('fill', '#707070')
      .attr('font-weight', 'bold')
      .attr('font-size', '20px');

    // append divide line
    const divideLine = svg
      .append('line')
      .attr('x1', 20)
      .attr('y1', 270)
      .attr('x2', width - 20)
      .attr('y2', 270)
      .attr('stroke', '#707070')
      .attr('stroke-width', '0.5px');

    // mode: 淨負載
    // append title-consume
    const titleConsume = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('font-size', '20px')
      .text('正常用電');

    // append title-ESS
    const titleESS = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('font-size', '20px')
      .text('儲能系統');

    // append title-EV
    const titleEV = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('font-size', '20px')
      .text('充電樁');

    // append title-WT
    const titleWT = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('font-size', '20px')
      .text('風能');

    // append title-consume
    const titlePV = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('font-size', '20px')
      .text('太陽能');

    // append title-demand
    const titleDemand = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 40)
      .attr('y', 300)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text('總淨負載');

    // append data-consume
    const dataConsume = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('font-size', '20px')
      .attr('fill', '#707070')
      .text(Math.abs(apiData.Consume));

    // append data-ESS
    const dataESS = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('font-size', '20px')
      .attr('fill', '#707070')
      .text(Math.abs(apiData.ESS));

    // append data-EV
    const dataEV = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('font-size', '20px')
      .attr('fill', '#707070')
      .text(Math.abs(apiData.EV));

    // append data-WT
    const dataWT = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('font-size', '20px')
      .attr('fill', '#707070')
      .text(Math.abs(apiData.WT));

    // append data-PV
    const dataPV = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('font-size', '20px')
      .attr('fill', '#707070')
      .text(Math.abs(apiData.PV));

    // append data-demand
    const dataDemand = svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - 40)
      .attr('y', 300)
      .attr('fill', '#707070')
      .attr('font-size', '20px')
      .text(apiData.Demand);

    // append unit
    const unit = svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - 37)
      .attr('y', 300)
      .attr('fill', '#707070')
      .attr('font-size', '14px')
      .text('kWh');

    // append positive circle
    const posCircle = svg
      .append('circle')
      .attr('cx', 30)
      .attr('r', 4)
      .attr('fill', '#d32f2f');

    // append negative circle
    const negCircle = svg
      .append('circle')
      .attr('cx', 30)
      .attr('r', 4)
      .attr('fill', '#2e7d32');

    // 產能設備模式
    // scale
    const scale = d3.scaleLinear().domain([0, 40]).range([0, 80]);

    // append rect-PV
    const rectPV = svg
      .append('rect')
      .attr('x', 50)
      .attr('y', apiData.PV >= 0 ? 220 : 220 - scale(40))
      .attr('width', 40)
      .attr('height', scale(Math.abs(apiData.PV)))
      .attr('fill', '#f7be16');

    // append rect-WT
    const rectWT = svg
      .append('rect')
      .attr('x', 90)
      .attr('y', apiData.WT >= 0 ? 220 : 220 - scale(40))
      .attr('width', 40)
      .attr('height', scale(Math.abs(apiData.WT)))
      .attr('fill', '#2d3361');

    // append rect-ESS
    const rectESS = svg
      .append('rect')
      .attr('x', 130)
      .attr('y', apiData.ESS >= 0 ? 220 : 220 - scale(40))
      .attr('width', 40)
      .attr('height', scale(Math.abs(apiData.ESS)))
      .attr('fill', '#696464');

    // append rect-EV
    const rectEV = svg
      .append('rect')
      .attr('x', 170)
      .attr('y', apiData.EV >= 0 ? 220 : 220 - scale(40))
      .attr('width', 40)
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
        .attr('y', 130 + sortedData.indexOf('Consume') * 30)
        .attr('fill', apiData.Consume >= 0 ? '#d32f2f' : '#2e7d32');

      // title-ESS
      titleESS
        .attr('y', 130 + sortedData.indexOf('ESS') * 30)
        .attr('fill', apiData.ESS >= 0 ? '#d32f2f' : '#2e7d32');

      // title-EV
      titleEV
        .attr('y', 130 + sortedData.indexOf('EV') * 30)
        .attr('fill', apiData.EV >= 0 ? '#d32f2f' : '#2e7d32');

      // title-WT
      titleWT
        .attr('y', 130 + sortedData.indexOf('WT') * 30)
        .attr('fill', apiData.WT >= 0 ? '#d32f2f' : '#2e7d32');

      // title-PV
      titlePV
        .attr('y', 130 + sortedData.indexOf('PV') * 30)
        .attr('fill', apiData.PV >= 0 ? '#d32f2f' : '#2e7d32');

      // data-consume
      dataConsume.attr('y', 130 + sortedData.indexOf('Consume') * 30);

      // data-ESS
      dataESS.attr('y', 130 + sortedData.indexOf('ESS') * 30);

      // data-EV
      dataEV.attr('y', 130 + sortedData.indexOf('EV') * 30);

      // data-WT
      dataWT.attr('y', 130 + sortedData.indexOf('WT') * 30);

      // data-PV
      dataPV.attr('y', 130 + sortedData.indexOf('PV') * 30);

      // positive circle
      posCircle
        .attr('cy', 123)
        .style('display', posData.length === 0 ? 'none' : 'block');

      // negative circle
      negCircle
        .attr('cy', 123 + posData.length * 30)
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
      divideLine.attr('y1', 220).attr('y2', 220);

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
    };
  });

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [correctDate]);

  useEffect(() => {}, [apiData]);

  return (
    <div className={classNames('powerinfo-summary-container')}>
      <svg
        ref={container}
        className={classNames('powerinfo-summary-svg')}
        viewBox="0 0 259 352"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default Summary;
