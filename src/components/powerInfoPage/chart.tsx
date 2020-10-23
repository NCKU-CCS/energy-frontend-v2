/* eslint-disable @typescript-eslint/indent */
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

  // axis time format of different width
  const [axisTimeFormat, setAxisTimeFormat] = useState('%Y/%m/%d');

  // tick padding of axes
  const [tickPaddingX, setTickPaddingX] = useState(0);
  const [tickPaddingY, setTickPaddingY] = useState(0);

  // bisector
  const bisectDate = d3.bisector((d: IApiData) => d.Date).left;

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

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  let tooltipWidth = width * 0.11;
  let tooltipHeightOfEquip = height * 0.469;
  let tooltipHeightOfLoad = height * 0.361;
  let padding = {
    top: height * 0.207,
    bottom: height * 0.166,
    left: width * 0.0407,
    right: width * 0.097,
    axisX: width * 0.065,
  };

  const [axisTextSize, setAxisTextSize] = useState('');
  const [unitTextSize, setUnitTextSize] = useState('');
  const [legendTextSize, setLegendTextSize] = useState('');
  const [tooltipTextSize, setTooltipTextSize] = useState('');

  // scales
  const scaleX = d3
    .scaleTime()
    .range([0, width - padding.left - padding.right - 2 * padding.axisX])
    .domain([
      new Date(dayjs(lastDate).subtract(6, 'day').format('YYYY/MM/DD')),
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
    .tickPadding(tickPaddingX)
    .tickFormat(
      d3.timeFormat(axisTimeFormat) as (
        value: Date | { valueOf(): number },
        i: number,
      ) => string,
    );

  // grid
  const equipGrid = d3
    .axisLeft(equipScaleY)
    .ticks(4)
    .tickPadding(tickPaddingY)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  const loadGrid = d3
    .axisLeft(loadScaleY)
    .ticks(4)
    .tickPadding(tickPaddingY)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  // line -> equipLine
  // PV -> 太陽能
  const linePV = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(equipScaleY(d.PV)))
    .curve(d3.curveCardinal);

  // WT -> 風能
  const lineWT = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(equipScaleY(d.WT)))
    .curve(d3.curveCardinal);

  // ESS -> 儲能系統
  const lineESS = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(equipScaleY(d.ESS)))
    .curve(d3.curveCardinal);

  // EV -> 充電樁
  const lineEV = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(equipScaleY(d.EV)))
    .curve(d3.curveCardinal);

  // line -> loadLine
  // Consume ->
  const lineConsume = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(loadScaleY(d.Consume)))
    .curve(d3.curveCardinal);

  // Generate -> 產電
  const lineGenerate = d3
    .line<IApiData>()
    .x((d: IApiData) => Number(scaleX(new Date(d.Date))))
    .y((d: IApiData) => Number(loadScaleY(d.Generate)))
    .curve(d3.curveCardinal);

  // React-Hook: useEffect -> render chart
  useEffect(() => {
    const svg: any = d3.select(chartContainer.current);

    // first time determine sizes
    setWidth(svg.node().getBoundingClientRect().width);
    setHeight(svg.node().getBoundingClientRect().height);
    padding = {
      top: height * 0.207,
      bottom: height * 0.166,
      left: width * 0.0407,
      right: width * 0.097,
      axisX: width * 0.065,
    };
    tooltipWidth = width * 0.11;
    tooltipHeightOfEquip = height * 0.469;
    tooltipHeightOfLoad = height * 0.361;
    // text size
    if (window.innerWidth > 1920) {
      setAxisTextSize('16px');
      setUnitTextSize('20px');
      setLegendTextSize('21px');
      setTooltipTextSize('20px');
      // set axis time format
      setAxisTimeFormat('%Y/%m/%d');
      // set tick padding
      setTickPaddingX(15);
      setTickPaddingY(10);
    } else if (window.innerWidth > 1280) {
      setAxisTextSize('11px');
      setUnitTextSize('13px');
      setLegendTextSize('14px');
      setTooltipTextSize('14px');
      // set axis time format
      setAxisTimeFormat('%Y/%m/%d');
      // set tick padding
      setTickPaddingX(15);
      setTickPaddingY(10);
    } else if (window.innerWidth > 720) {
      setAxisTextSize('10px');
      setUnitTextSize('12px');
      setLegendTextSize('12px');
      setTooltipTextSize('10px');
      // set axis time format
      setAxisTimeFormat('%m/%d');
      // set tick padding
      setTickPaddingX(15);
      setTickPaddingY(5);
    } else {
      setAxisTextSize('10px');
      setUnitTextSize('10px');
      setLegendTextSize('10px');
      setTooltipTextSize('10px');
      // set axis time format
      setAxisTimeFormat('%d');
      // set tick padding
      setTickPaddingX(5);
      setTickPaddingY(2);
    }

    // set padding depends on different window width
    if (window.innerWidth <= 720 && window.innerWidth > 320) {
      padding = {
        top: height * 0.207,
        bottom: height * 0.166,
        left: width * 0.1,
        right: width * 0.1,
        axisX: width * 0.065,
      };
    }
    if (window.innerWidth <= 320) {
      padding = {
        top: height * 0.207,
        bottom: height * 0.166,
        left: width * 0.08,
        right: width * 0.1,
        axisX: width * 0.065,
      };
    }

    // determine tooltip's width and height by window's width
    if (window.innerWidth > 1280) {
      tooltipWidth = width * 0.11;
      tooltipHeightOfEquip = height * 0.469;
      tooltipHeightOfLoad = height * 0.361;
    } else if (window.innerWidth > 720) {
      tooltipWidth = width * 0.11;
      tooltipHeightOfEquip = height * 0.469;
      tooltipHeightOfLoad = height * 0.361;
    } else if (window.innerWidth > 320) {
      tooltipWidth = width * 0.21;
      tooltipHeightOfEquip = height * 0.469;
      tooltipHeightOfLoad = height * 0.361;
    } else {
      tooltipWidth = width * 0.3;
      tooltipHeightOfEquip = height * 0.469;
      tooltipHeightOfLoad = height * 0.361;
    }

    const handleResize = () => {
      setWidth(svg.node().getBoundingClientRect().width);
      setHeight(svg.node().getBoundingClientRect().height);
      padding = {
        top: height * 0.207,
        bottom: height * 0.166,
        left: width * 0.0407,
        right: width * 0.097,
        axisX: width * 0.065,
      };
      tooltipWidth = width * 0.11;
      tooltipHeightOfEquip = height * 0.469;
      tooltipHeightOfLoad = height * 0.361;
      // text size
      if (window.innerWidth > 1920) {
        setAxisTextSize('16px');
        setUnitTextSize('20px');
        setLegendTextSize('21px');
        setTooltipTextSize('20px');
        // set axis time format
        setAxisTimeFormat('%Y/%m/%d');
        // set tick padding
        setTickPaddingX(15);
        setTickPaddingY(10);
      } else if (window.innerWidth > 1280) {
        setAxisTextSize('11px');
        setUnitTextSize('13px');
        setLegendTextSize('14px');
        setTooltipTextSize('14px');
        // set axis time format
        setAxisTimeFormat('%Y/%m/%d');
        // set tick padding
        setTickPaddingX(15);
        setTickPaddingY(10);
      } else if (window.innerWidth > 720) {
        setAxisTextSize('10px');
        setUnitTextSize('12px');
        setLegendTextSize('12px');
        setTooltipTextSize('10px');
        // set axis time format
        setAxisTimeFormat('%m/%d');
        // set tick padding
        setTickPaddingX(15);
        setTickPaddingY(5);
      } else {
        setAxisTextSize('10px');
        setUnitTextSize('10px');
        setLegendTextSize('10px');
        setTooltipTextSize('10px');
        // set axis time format
        setAxisTimeFormat('%d');
        // set tick padding
        setTickPaddingX(5);
        setTickPaddingY(2);
      }
    };

    // determine sizes when window resized
    window.addEventListener('resize', handleResize);

    // tooltip-canvas
    const tooltipCvs = svg
      .append('rect')
      .attr('width', width - padding.right - padding.left - padding.axisX * 1.5)
      .attr('height', height - padding.top - padding.bottom)
      .attr('x', padding.left + padding.axisX)
      .attr('y', padding.top)
      .attr('opacity', 0);

    // tooltip-rect
    const tooltipRect = svg
      .append('rect')
      .attr('fill', '#e5e5e5')
      .attr('rx', '5px')
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
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipTitleWT = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipTitleESS = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipTitleEV = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    // tooltip-text-data-equip
    const tooltipDataPV = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipDataWT = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipDataESS = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipDataEV = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    // tooltip-text-title-load
    const tooltipTitleConsume = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipTitleGenerate = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipTitleDemand = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    // tooltip-text-Data-load
    const tooltipDataConsume = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipDataGenerate = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

    const tooltipDataDemand = svg
      .append('text')
      .text('text')
      .attr('font-size', tooltipTextSize)
      .style('display', 'none');

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
      .attr('x', padding.left / 1.2)
      .attr('y', padding.top / 1.5)
      .attr('fill', '#707070')
      .attr('font-size', unitTextSize)
      .text('kW');

    svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', width - padding.right / 1.3)
      .attr('y', height - padding.bottom / 2.5)
      .attr('fill', '#707070')
      .attr('font-size', unitTextSize)
      .text('日期');

    if (mode === '產能設備') {
      // append axis
      svg
        .append('g')
        .call(axisX)
        .call((g: any) => g.select('.domain').remove())
        .attr('color', '#707070')
        .attr('font-size', axisTextSize)
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
        .call((g: any) => g.select('.domain').remove())
        .call((g: any) => g.selectAll('.tick').attr('color', 'gray'))
        .call((g: any) =>
          g
            .select(':nth-child(3)')
            .select('line')
            .attr('stroke-dasharray', '3'),
        )
        .attr('stroke-width', '0.5px')
        .call((g: any) =>
          g.select(':nth-child(3)').select('line').attr('stroke-width', '2px'),
        )
        .attr('fill', 'none')
        .attr('font-size', axisTextSize)
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

      // append legend(圖例)
      let yellowCirclePos = {
        cx: 0,
        cy: 0,
      };
      let blueCirclePos = {
        cx: 0,
        cy: 0,
      };
      let grayCirclePos = {
        cx: 0,
        cy: 0,
      };
      let purpleCirclePos = {
        cx: 0,
        cy: 0,
      };
      if (window.innerWidth > 720) {
        yellowCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.top * 1.4,
        };
        blueCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.top * 2.15,
        };
        grayCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.top * 2.85,
        };
        purpleCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.top * 3.6,
        };
      } else {
        yellowCirclePos = {
          cx: padding.left * 2,
          cy: padding.top / 2,
        };
        blueCirclePos = {
          cx: padding.left * 4,
          cy: padding.top / 2,
        };
        grayCirclePos = {
          cx: padding.left * 5.5,
          cy: padding.top / 2,
        };
        purpleCirclePos = {
          cx: padding.left * 8,
          cy: padding.top / 2,
        };
      }
      svg
        .append('circle')
        .attr('cx', yellowCirclePos.cx)
        .attr('cy', yellowCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#f7c015');

      svg
        .append('circle')
        .attr('cx', blueCirclePos.cx)
        .attr('cy', blueCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#2d3361');

      svg
        .append('circle')
        .attr('cx', grayCirclePos.cx)
        .attr('cy', grayCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#696464');

      svg
        .append('circle')
        .attr('cx', purpleCirclePos.cx)
        .attr('cy', purpleCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#a243c9');

      let yellowTextPos = {
        x: 0,
        y: 0,
      };
      let blueTextPos = {
        x: 0,
        y: 0,
      };
      let grayTextPos = {
        x: 0,
        y: 0,
      };
      let purpleTextPos = {
        x: 0,
        y: 0,
      };
      if (window.innerWidth > 720) {
        yellowTextPos = {
          x: width - padding.right / 1.5,
          y: padding.top * 1.5,
        };
        blueTextPos = {
          x: width - padding.right / 1.5,
          y: padding.top * 2.25,
        };
        grayTextPos = {
          x: width - padding.right / 1.5,
          y: padding.top * 2.95,
        };
        purpleTextPos = {
          x: width - padding.right / 1.5,
          y: padding.top * 3.7,
        };
      } else {
        yellowTextPos = {
          x: padding.left * 2.2,
          y: padding.top / 1.7,
        };
        blueTextPos = {
          x: padding.left * 4.2,
          y: padding.top / 1.7,
        };
        grayTextPos = {
          x: padding.left * 5.7,
          y: padding.top / 1.7,
        };
        purpleTextPos = {
          x: padding.left * 8.2,
          y: padding.top / 1.7,
        };
      }

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', yellowTextPos.x)
        .attr('y', yellowTextPos.y) // 1.4 -> 1.5
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
        .text('太陽能');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', blueTextPos.x)
        .attr('y', blueTextPos.y) // 2 -> 2.25
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
        .text('風能');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', grayTextPos.x)
        .attr('y', grayTextPos.y) // 2.6 -> 2.95
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
        .text('儲能系統');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', purpleTextPos.x)
        .attr('y', purpleTextPos.y) // 3.2 -> 3.7
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
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
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeightOfEquip)
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
            .attr('x', d3.mouse(d3.event.currentTarget)[0] + 50) // -200
            .attr('y', d3.mouse(d3.event.currentTarget)[1] - 50); // -100

          // tooltip-line
          tooltipLine
            .attr(
              'x1',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  Number(
                    equipScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].PV
                        : 0,
                    ),
                  ),
                  Number(
                    equipScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].WT
                        : 0,
                    ),
                  ),
                  Number(
                    equipScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].ESS
                        : 0,
                    ),
                  ),
                  Number(
                    equipScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].EV
                        : 0,
                    ),
                  ),
                ),
            )
            .attr(
              'x2',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr('y2', height - padding.bottom);

          // tooltip-title-PV
          tooltipTitlePV
            .text('太陽能:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.221 -
                50,
            );

          // tooltip-data-PV
          tooltipDataPV
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].PV
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.221 -
                50,
            );

          // tooltip-title-WT
          tooltipTitleWT
            .text('風能:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.442 -
                50,
            );

          // tooltip-data-WT
          tooltipDataWT
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].WT
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.442 -
                50,
            );

          // tooltip-title-ESS
          tooltipTitleESS
            .text('儲能系統:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.663 -
                50,
            );

          // tooltip-data-ESS
          tooltipDataESS
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].ESS
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.663 -
                50,
            );

          // tooltip-title-EV
          tooltipTitleEV
            .text('充電樁:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.884 -
                50,
            );

          // tooltip-data-EV
          tooltipDataEV
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].EV
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfEquip * 0.884 -
                50,
            );

          // tooltip-circle
          tooltipCirclePV
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                equipScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].PV
                    : 0,
                ),
              ) + padding.top,
            );

          tooltipCircleWT
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                equipScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].WT
                    : 0,
                ),
              ) + padding.top,
            );

          tooltipCircleESS
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                equipScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].ESS
                    : 0,
                ),
              ) + padding.top,
            );

          tooltipCircleEV
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                equipScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].EV
                    : 0,
                ),
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
        .call((g: any) => g.select('.domain').remove())
        .attr('color', '#707070')
        .attr('font-size', axisTextSize)
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
        .call((g: any) => g.select('.domain').remove())
        .call((g: any) => g.selectAll('.tick').attr('color', 'gray'))
        .attr('stroke-width', '0.5px')
        .attr('fill', 'none')
        .attr('font-size', axisTextSize)
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

      // append legend(圖例)
      let redCirclePos = {
        cx: 0,
        cy: 0,
      };

      let greenCirclePos = {
        cx: 0,
        cy: 0,
      };

      if (window.innerWidth > 720) {
        redCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.bottom + (height - padding.top - padding.bottom) * 0.46,
        };

        greenCirclePos = {
          cx: width - padding.right / 1.3,
          cy: padding.bottom + (height - padding.top - padding.bottom) * 0.68,
        };
      } else {
        redCirclePos = {
          cx: width - padding.right * 5,
          cy: padding.top / 2,
        };

        greenCirclePos = {
          cx: width - padding.right * 2.5,
          cy: padding.top / 2,
        };
      }

      svg
        .append('circle')
        .attr('cx', redCirclePos.cx)
        .attr('cy', redCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#d32f2f');

      svg
        .append('circle')
        .attr('cx', greenCirclePos.cx)
        .attr('cy', greenCirclePos.cy)
        .attr('r', 5)
        .attr('fill', '#2e7d32');

      let redTextPos = {
        x: 0,
        y: 0,
      };

      let greenTextPos = {
        x: 0,
        y: 0,
      };

      if (window.innerWidth > 720) {
        redTextPos = {
          x: width - padding.right / 1.5,
          y: padding.bottom + (height - padding.top - padding.bottom) * 0.49,
        };

        greenTextPos = {
          x: width - padding.right / 1.5,
          y: padding.bottom + (height - padding.top - padding.bottom) * 0.71,
        };
      } else {
        redTextPos = {
          x: width - padding.right * 4.7,
          y: padding.top / 1.75,
        };

        greenTextPos = {
          x: width - padding.right * 2.2,
          y: padding.top / 1.75,
        };
      }

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', redTextPos.x)
        .attr('y', redTextPos.y)
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
        .text('用電');

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', greenTextPos.x)
        .attr('y', greenTextPos.y)
        .attr('fill', '#707070')
        .attr('font-size', legendTextSize)
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
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeightOfLoad)
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
            .attr('x', d3.mouse(d3.event.currentTarget)[0] + 50)
            .attr('y', d3.mouse(d3.event.currentTarget)[1] - 50);

          tooltipLine
            .attr(
              'x1',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  Number(
                    loadScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].Consume
                        : 0,
                    ),
                  ),
                  Number(
                    loadScaleY(
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      ) < apiDataArr.length
                        ? apiDataArr[
                            bisectDate(
                              apiDataArr,
                              timeFormat(
                                scaleX.invert(
                                  d3.mouse(d3.event.currentTarget)[0] -
                                    (padding.axisX + padding.left),
                                ),
                              ),
                            )
                          ].Generate
                        : 0,
                    ),
                  ),
                ),
            )
            .attr(
              'x2',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr('y2', height - padding.bottom);

          tooltipTitleConsume
            .text('用電:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.287 -
                50,
            );

          tooltipDataConsume
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].Consume
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.287 -
                50,
            );

          tooltipTitleGenerate
            .text('產電:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.574 -
                50,
            );

          tooltipDataGenerate
            .text(
              `${
                bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].Generate
                  : 0
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.574 -
                50,
            );

          tooltipTitleDemand
            .text('淨負載:')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.074 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.861 -
                50,
            );

          tooltipDataDemand
            .text(
              `${
                (bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].Consume
                  : 0) -
                (bisectDate(
                  apiDataArr,
                  timeFormat(
                    scaleX.invert(
                      d3.mouse(d3.event.currentTarget)[0] -
                        (padding.axisX + padding.left),
                    ),
                  ),
                ) < apiDataArr.length
                  ? apiDataArr[
                      bisectDate(
                        apiDataArr,
                        timeFormat(
                          scaleX.invert(
                            d3.mouse(d3.event.currentTarget)[0] -
                              (padding.axisX + padding.left),
                          ),
                        ),
                      )
                    ].Generate
                  : 0)
              }`,
            )
            .attr('text-anchor', 'end')
            .attr(
              'x',
              d3.mouse(d3.event.currentTarget)[0] + tooltipWidth * 0.904 + 50,
            )
            .attr(
              'y',
              d3.mouse(d3.event.currentTarget)[1] +
                tooltipHeightOfLoad * 0.861 -
                50,
            );

          // tooltip-circle
          tooltipCircleConsume
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                loadScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].Consume
                    : 0,
                ),
              ) + padding.top,
            );

          tooltipCircleGenerate
            .attr(
              'cx',
              Number(
                scaleX(
                  new Date(
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ),
                ),
              ) +
                padding.axisX +
                padding.left,
            )
            .attr(
              'cy',
              Number(
                loadScaleY(
                  bisectDate(
                    apiDataArr,
                    timeFormat(
                      scaleX.invert(
                        d3.mouse(d3.event.currentTarget)[0] -
                          (padding.axisX + padding.left),
                      ),
                    ),
                  ) < apiDataArr.length
                    ? apiDataArr[
                        bisectDate(
                          apiDataArr,
                          timeFormat(
                            scaleX.invert(
                              d3.mouse(d3.event.currentTarget)[0] -
                                (padding.axisX + padding.left),
                            ),
                          ),
                        )
                      ].Generate
                    : 0,
                ),
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
      window.removeEventListener('resize', handleResize);
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
      <svg className={classNames('powerinfo-chart-svg')} ref={chartContainer} />
    </div>
  );
};

export default Chart;
