import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface IApiData {
  Consume: number;
  Date: string;
  Demand: number;
  ESS: number;
  EV: number;
  Generate: number;
  PV: number;
  WT: number;
}

interface IProps {
  mode: string;
  date: Date;
}

const Chart: React.FC<IProps> = ({ mode, date }) => {
  const chartContainer = useRef(null);

  // check whether lastDate is after today or not
  const lastDate = date.getTime() > new Date().getTime() ? new Date() : date;

  // time format
  const timeFormat = d3.timeFormat('%Y/%m/%d');

  // bisector
  const bisectDate = d3.bisector((d: IApiData) => d.Date).left;

  // calculate first of the chart
  const firstDate = new Date(lastDate.getTime() - 6 * 24 * 60 * 60 * 1000);

  // Api Data Array
  const [apiDataArr, setApiDataArr] = useState<IApiData[]>([]);

  // fetch Api Data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/power_info?chart_date=${dayjs(
        lastDate,
      ).format('YYYY/MM/DD')}`,
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
      setApiDataArr(tmp);
    }
  };

  // props
  const width = 1020;
  const height = 220;
  const padding = {
    top: 50,
    bottom: 40,
    left: 5,
    right: 75,
    axisX: 50,
  };

  // scales
  const scaleX = d3
    .scaleTime()
    .range([0, width - padding.left - padding.right - 2 * padding.axisX])
    .domain([
      new Date(dayjs(firstDate).format('YYYY/MM/DD')),
      new Date(dayjs(lastDate).format('YYYY/MM/DD')),
    ]);

  const equipScaleY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([-40, 40]);

  const loadScaleY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([-10, 10]);

  // axisX
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
  const equipGrid = d3
    .axisLeft(equipScaleY)
    .ticks(4)
    .tickPadding(10)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  const loadGrid = d3
    .axisLeft(loadScaleY)
    .ticks(4)
    .tickPadding(10)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  // line -> equipLine
  // PV -> 太陽能
  const linePV = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => equipScaleY(d.PV))
    .curve(d3.curveCardinal);

  // WT -> 風能
  const lineWT = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => equipScaleY(d.WT))
    .curve(d3.curveCardinal);

  // ESS -> 儲能系統
  const lineESS = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => equipScaleY(d.ESS))
    .curve(d3.curveCardinal);

  // EV -> 充電樁
  const lineEV = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => equipScaleY(d.EV))
    .curve(d3.curveCardinal);

  // line -> loadLine
  // Consume -> 用電
  const lineConsume = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => loadScaleY(d.Consume))
    .curve(d3.curveCardinal);

  // Generate -> 產電
  const lineGenerate = d3
    .line<IApiData>()
    .x((d: IApiData) => scaleX(new Date(d.Date)))
    .y((d: IApiData) => loadScaleY(d.Generate))
    .curve(d3.curveCardinal);

  // React-Hook: useEffect -> render chart
  useEffect(() => {
    const svg = d3.select(chartContainer.current);

    // tooltip-canvas
    const tooltipCvs = svg
      .append('rect')
      .attr('width', width - padding.right - padding.left - padding.axisX)
      .attr('height', height - padding.top - padding.bottom)
      .attr('x', padding.right - padding.axisX / 2)
      .attr('y', padding.top)
      .attr('opacity', 0);

    // tooltip-rect
    const tooltipRect = svg
      .append('rect')
      .attr('fill', '#e5e5e5')
      .style('display', 'none');

    // tooltip-line
    const tooltipLine = svg
      .append('line')
      .attr('stroke', '#717171')
      .attr('stroke-width', '1px')
      .style('display', 'none');

    // tooltip-text-title-equip
    const tooltipTitlePV = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleWT = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleESS = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleEV = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-data-equip
    const tooltipDataPV = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataWT = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataESS = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataEV = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-title-load
    const tooltipTitleConsume = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleGenerate = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleDemand = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-Data-load
    const tooltipDataConsume = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataGenerate = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataDemand = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    /*
    // interpolate
    const ipSolar = d3.interpolateBasis(
      equipData.dataSolar.map((d) => d.value),
    );

    const ipWind = d3.interpolateBasis(
      equipData.dataWind.map((d) => d.value),
    );

    const ipStorage = d3.interpolateBasis(
      equipData.dataStorage.map((d) => d.value),
    );

    const ipCharge = d3.interpolateBasis(
      equipData.dataCharge.map((d) => d.value),
    );

    const ipUse = d3.interpolateBasis(
      loadData.dataUse.map((d) => d.value),
    );

    const ipMake = d3.interpolateBasis(
      loadData.dataMake.map((d) => d.value),
    );
    */

    // tooltip-circle
    const tooltipCirclePV = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleWT = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleESS = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleEV = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleConsume = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleGenerate = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    // append svg
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white');

    // append axis title
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', 0)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .text('kW');

    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width - padding.right / 2)
      .attr('y', height - padding.bottom / 2.7)
      .attr('fill', '#707070')
      .attr('font-size', '15px')
      .text('日期');

    if (mode === '產能設備') {
      // append axis
      svg
        .append('g')
        .call(axisX)
        .call((g) => g.select('.domain').remove())
        .attr('color', '#707070')
        .attr('font-size', '12px')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${
            height - padding.bottom
          })`,
        );

      // append grid
      svg
        .append('g')
        .call(equipGrid)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick').attr('color', 'gray'))
        .call((g) =>
          g
            .select(':nth-child(3)')
            .select('line')
            .attr('stroke-dasharray', '3'),
        )
        .attr('stroke-width', '0.5px')
        .call((g) =>
          g.select(':nth-child(3)').select('line').attr('stroke-width', '2px'),
        )
        .attr('fill', 'none')
        .attr('font-size', '12px')
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

      // append legend(圖例)
      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 1.3)
        .attr('r', 5)
        .attr('fill', '#f7c015');

      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 1.9)
        .attr('r', 5)
        .attr('fill', '#2d3361');

      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 2.5)
        .attr('r', 5)
        .attr('fill', '#696464');

      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 3.1)
        .attr('r', 5)
        .attr('fill', '#a243c9');

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 1.4)
        .attr('fill', '#707070')
        .attr('font-size', '14px')
        .text('太陽能');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 2)
        .attr('fill', '#707070')
        .attr('font-size', '14px')
        .text('風能');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 2.6)
        .attr('fill', '#707070')
        .attr('font-size', '14px')
        .text('儲能系統');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 3.2)
        .attr('fill', '#707070')
        .attr('font-size', '14px')
        .text('充電樁');

      // append line of dataPV
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', linePV)
        .attr('y', 0)
        .attr('stroke', '#f7c015')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append line of dataEV
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', lineEV)
        .attr('y', 0)
        .attr('stroke', '#a243c9')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append line of dataESS
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', lineESS)
        .attr('y', 0)
        .attr('stroke', '#696464')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append line of dataWT
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', lineWT)
        .attr('y', 0)
        .attr('stroke', '#2d3361')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append tooltip
      tooltipCvs
        .raise()
        .on('mouseover', () => {
          // tooltip-line
          tooltipLine.style('display', 'block');

          // tooltip-circle
          tooltipCirclePV.style('display', 'block').raise();
          tooltipCircleWT.style('display', 'block').raise();
          tooltipCircleESS.style('display', 'block').raise();
          tooltipCircleEV.style('display', 'block').raise();

          // tooltip-rect
          tooltipRect
            .style('display', 'block')
            .attr('width', 135)
            .attr('height', 113)
            .raise();

          // tooltip-title
          tooltipTitlePV.style('display', 'block').raise();
          tooltipTitleWT.style('display', 'block').raise();
          tooltipTitleESS.style('display', 'block').raise();
          tooltipTitleEV.style('display', 'block').raise();

          // tooltip-data
          tooltipDataPV.style('display', 'block').raise();
          tooltipDataWT.style('display', 'block').raise();
          tooltipDataESS.style('display', 'block').raise();
          tooltipDataEV.style('display', 'block').raise();
        })
        .on('mousemove', () => {
          // tooltip-rect
          tooltipRect
            .attr('x', `${d3.event.pageX - 200}`)
            .attr('y', `${d3.event.pageY - 100}`);

          // tooltip-line
          tooltipLine
            .attr(
              'x1',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  equipScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].PV,
                  ),
                  equipScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].WT,
                  ),
                  equipScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].ESS,
                  ),
                  equipScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].EV,
                  ),
                ),
            )
            .attr(
              'x2',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr('y2', height - padding.bottom);

          // tooltip-title-PV
          tooltipTitlePV
            .text('太陽能:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 75}`);

          // tooltip-data-PV
          tooltipDataPV
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].PV
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 75}`);

          // tooltip-title-WT
          tooltipTitleWT
            .text('風能:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 50}`);

          // tooltip-data-WT
          tooltipDataWT
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].WT
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 50}`);

          // tooltip-title-ESS
          tooltipTitleESS
            .text('儲能系統:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-data-ESS
          tooltipDataESS
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].ESS
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-title-EV
          tooltipTitleEV
            .text('充電樁:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 0}`);

          // tooltip-data-EV
          tooltipDataEV
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].EV
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 0}`);

          // tooltip-circle
          tooltipCirclePV
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              equipScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].PV,
              ) + padding.top,
            );

          tooltipCircleWT
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              equipScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].WT,
              ) + padding.top,
            );

          tooltipCircleESS
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              equipScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].ESS,
              ) + padding.top,
            );

          tooltipCircleEV
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              equipScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].EV,
              ) + padding.top,
            );
        })
        .on('mouseout', () => {
          // tooltip-rect
          tooltipRect.style('display', 'none');

          // tooltip-line
          tooltipLine.style('display', 'none');

          // tooltip-title
          tooltipTitlePV.style('display', 'none');
          tooltipTitleWT.style('display', 'none');
          tooltipTitleESS.style('display', 'none');
          tooltipTitleEV.style('display', 'none');

          // tooltip-data
          tooltipDataPV.style('display', 'none');
          tooltipDataWT.style('display', 'none');
          tooltipDataESS.style('display', 'none');
          tooltipDataEV.style('display', 'none');

          // tooltip-circle
          tooltipCirclePV.style('display', 'none');
          tooltipCircleWT.style('display', 'none');
          tooltipCircleESS.style('display', 'none');
          tooltipCircleEV.style('display', 'none');
        });
    } else {
      // append line of dataConsume
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', lineConsume)
        .attr('y', 0)
        .attr('stroke', '#d32f2f')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append line of dataGenerate
      svg
        .append('path')
        .datum(apiDataArr)
        .attr('d', lineGenerate)
        .attr('y', 0)
        .attr('stroke', '#2e7d32')
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
        .attr('font-size', '12px')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${
            height - padding.bottom
          })`,
        );

      // append grid
      svg
        .append('g')
        .call(loadGrid)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick').attr('color', 'gray'))
        .attr('stroke-width', '0.5px')
        .attr('fill', 'none')
        .attr('font-size', '12px')
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

      // append legend(圖例)
      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 1.9)
        .attr('r', 5)
        .attr('fill', '#d32f2f');

      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 2.5)
        .attr('r', 5)
        .attr('fill', '#2e7d32');

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 2)
        .attr('fill', '#707070')
        .attr('font-size', '15px')
        .text('用電');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 2.6)
        .attr('fill', '#707070')
        .attr('font-size', '15px')
        .text('產電');

      // test for tooltip
      tooltipCvs
        .raise()
        .on('mouseover', () => {
          // tooltip-line
          tooltipLine.style('display', 'block');

          // tooltip-circle
          tooltipCircleConsume.style('display', 'block').raise();
          tooltipCircleGenerate.style('display', 'block').raise();

          // tooltip-rect
          tooltipRect
            .style('display', 'block')
            .attr('width', 135)
            .attr('height', 87)
            .raise();

          // tooltip-title
          tooltipTitleConsume.style('display', 'block').raise();
          tooltipTitleGenerate.style('display', 'block').raise();
          tooltipTitleDemand.style('display', 'block').raise();

          // tooltip-data
          tooltipDataConsume.style('display', 'block').raise();
          tooltipDataGenerate.style('display', 'block').raise();
          tooltipDataDemand.style('display', 'block').raise();
        })
        .on('mousemove', () => {
          tooltipRect
            .attr('x', `${d3.event.pageX - 200}`)
            .attr('y', `${d3.event.pageY - 100}`);

          tooltipLine
            .attr(
              'x1',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  loadScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].Consume,
                  ),
                  loadScaleY(
                    apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(scaleX.invert(d3.event.pageX - 310)),
                      )
                    ].Generate,
                  ),
                ),
            )
            .attr(
              'x2',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr('y2', height - padding.bottom);

          tooltipTitleConsume
            .text('用電:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 75}`);

          tooltipDataConsume
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Consume
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 75}`);

          tooltipTitleGenerate
            .text('產電:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 50}`);

          tooltipDataGenerate
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Generate
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 50}`);

          tooltipTitleDemand
            .text('淨負載:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 25}`);

          tooltipDataDemand
            .text(
              `${
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Consume -
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Generate
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-circle
          tooltipCircleConsume
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              loadScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Consume,
              ) + padding.top,
            );

          tooltipCircleGenerate
            .attr(
              'cx',
              scaleX(new Date(timeFormat(scaleX.invert(d3.event.pageX - 160)))),
            )
            .attr(
              'cy',
              loadScaleY(
                apiDataArr[
                  bisectDate(
                    apiDataArr,
                    timeFormat(scaleX.invert(d3.event.pageX - 310)),
                  )
                ].Generate,
              ) + padding.top,
            );
        })
        .on('mouseout', () => {
          // tooltip-rect
          tooltipRect.style('display', 'none');

          // tooltip-line
          tooltipLine.style('display', 'none');

          // tooltip-circle
          tooltipCircleConsume.style('display', 'none');
          tooltipCircleGenerate.style('display', 'none');

          // tooltip-title
          tooltipTitleConsume.style('display', 'none');
          tooltipTitleGenerate.style('display', 'none');
          tooltipTitleDemand.style('display', 'none');

          // tooltip-data
          tooltipDataConsume.style('display', 'none');
          tooltipDataGenerate.style('display', 'none');
          tooltipDataDemand.style('display', 'none');
        });
    }

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  });

  // React-Hook: useEffect -> get api data
  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [lastDate]);

  // React-Hook: useEffect -> define variables depends on api data
  useEffect(() => {}, [apiDataArr]);

  return (
    <div className={classNames('powerinfo-chart-container')}>
      <svg
        className={classNames('powerinfo-chart-svg')}
        ref={chartContainer}
        viewBox="0 0 1020 220"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default Chart;
