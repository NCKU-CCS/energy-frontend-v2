import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import data1 from './test1.json';
import data2 from './test2.json';
import data3 from './test3.json';
import data4 from './test4.json';

interface IData {
  date: string;
  value: number;
}

interface IProps {
  mode: string;
  date: string;
}

const Chart: React.FC<IProps> = ({ mode, date }) => {
  const chartContainer = useRef(null);
  const [equipData, setEquipData] = useState(data1);
  const [loadData, setLoadData] = useState(data3);

  // props
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
  const equipScaleX = d3
    .scaleTime()
    .range([0, width - padding.left - padding.right - 2 * padding.axisX])
    .domain([
      new Date(equipData.dataSolar[0].date),
      new Date(equipData.dataSolar[6].date),
    ]);

  const loadScaleX = d3
    .scaleTime()
    .range([0, width - padding.left - padding.right - 2 * padding.axisX])
    .domain([
      new Date(loadData.dataUse[0].date),
      new Date(loadData.dataUse[6].date),
    ]);

  const equipScaleY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([-40, 40]);

  const loadScaleY = d3
    .scaleLinear()
    .range([height - padding.top - padding.bottom, 0])
    .domain([0, 40]);

  // axisX
  const equipAxisX = d3
    .axisBottom(equipScaleX)
    .ticks(7)
    .tickSize(0)
    .tickPadding(20)
    .tickFormat(
      d3.timeFormat('%Y/%m/%d') as (
        value: Date | { valueOf(): number },
        i: number,
      ) => string,
    );

  const loadAxisX = d3
    .axisBottom(loadScaleX)
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
    .tickPadding(15)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  const loadGrid = d3
    .axisLeft(loadScaleY)
    .ticks(4)
    .tickPadding(15)
    .tickFormat(null)
    .tickSize(0 - width + padding.left + padding.right);

  // line
  const equipLine = d3
    .line<IData>()
    .x((d: IData) => equipScaleX(new Date(d.date)))
    .y((d: IData) => equipScaleY(d.value))
    .curve(d3.curveCardinal);

  const loadLine = d3
    .line<IData>()
    .x((d: IData) => loadScaleX(new Date(d.date)))
    .y((d: IData) => loadScaleY(d.value))
    .curve(d3.curveCardinal);

  // handle change data
  const changeData = () => {
    if (mode === '淨負載') {
      if (loadData === data3) {
        setLoadData(data4);
      } else {
        setLoadData(data3);
      }
    } else if (equipData === data1) {
      setEquipData(data2);
    } else {
      setEquipData(data1);
    }
  };

  // React-Hook: useEffect
  useEffect(() => {
    const svg = d3.select(chartContainer.current);

    const timeFormat = d3.timeFormat('%Y/%m/%d');

    const bisectDate = d3.bisector((d: IData) => d.date).left;

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
    const tooltipTitleSolar = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleWind = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleStorage = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleCharge = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-data-equip
    const tooltipDataSolar = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataWind = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataStorage = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataCharge = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-title-load
    const tooltipTitleUse = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleMake = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipTitleNet = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    // tooltip-text-Data-load
    const tooltipDataUse = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataMake = svg
      .append('text')
      .text('text')
      .style('display', 'none');

    const tooltipDataNet = svg
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
    const tooltipCircleSolar = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleWind = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleStorage = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleCharge = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleUse = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    const tooltipCircleMake = svg
      .append('circle')
      .attr('fill', '#717171')
      .attr('r', 6)
      .style('display', 'none');

    // append svg
    svg
      .attr('width', width)
      .attr('height', height)
      .style('border-radius', '10px')
      .style('background-color', 'white');

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

    if (mode === '產能設備') {
      // append line of dataSolar
      svg
        .append('path')
        .datum(equipData.dataSolar)
        .attr('d', equipLine)
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
        .datum(equipData.dataCharge)
        .attr('d', equipLine)
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
        .datum(equipData.dataStorage)
        .attr('d', equipLine)
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
        .datum(equipData.dataWind)
        .attr('d', equipLine)
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
        .call(equipAxisX)
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
        .call(equipGrid)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick').attr('color', 'gray'))
        .call((g) =>
          g.select(':nth-child(3) line').attr('stroke-dasharray', '3'),
        )
        .attr('stroke-width', '0.5px')
        .call((g) => g.select(':nth-child(3) line').attr('stroke-width', '2px'))
        .attr('fill', 'none')
        .attr('font-size', '15px')
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

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

      // append tooltip
      tooltipCvs
        .raise()
        .on('mouseover', () => {
          // tooltip-line
          tooltipLine.style('display', 'block');

          // tooltip-circle
          tooltipCircleSolar.style('display', 'block').raise();
          tooltipCircleWind.style('display', 'block').raise();
          tooltipCircleStorage.style('display', 'block').raise();
          tooltipCircleCharge.style('display', 'block').raise();

          // tooltip-rect
          tooltipRect
            .style('display', 'block')
            .attr('width', 135)
            .attr('height', 113)
            .raise();

          // tooltip-title
          tooltipTitleSolar.style('display', 'block').raise();
          tooltipTitleWind.style('display', 'block').raise();
          tooltipTitleStorage.style('display', 'block').raise();
          tooltipTitleCharge.style('display', 'block').raise();

          // tooltip-data
          tooltipDataSolar.style('display', 'block').raise();
          tooltipDataWind.style('display', 'block').raise();
          tooltipDataStorage.style('display', 'block').raise();
          tooltipDataCharge.style('display', 'block').raise();
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
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  equipScaleY(
                    equipData.dataSolar[
                      bisectDate(
                        equipData.dataSolar,
                        timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                  equipScaleY(
                    equipData.dataWind[
                      bisectDate(
                        equipData.dataSolar,
                        timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                  equipScaleY(
                    equipData.dataStorage[
                      bisectDate(
                        equipData.dataSolar,
                        timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                  equipScaleY(
                    equipData.dataCharge[
                      bisectDate(
                        equipData.dataSolar,
                        timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                ),
            )
            .attr(
              'x2',
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr('y2', height - padding.bottom);

          // tooltip-title-solar
          tooltipTitleSolar
            .text('太陽能:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 75}`);

          // tooltip-data-solar
          tooltipDataSolar
            .text(
              `${
                equipData.dataSolar[
                  bisectDate(
                    equipData.dataSolar,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 75}`);

          // tooltip-title-wind
          tooltipTitleWind
            .text('風能:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 50}`);

          // tooltip-data-wind
          tooltipDataWind
            .text(
              `${
                equipData.dataWind[
                  bisectDate(
                    equipData.dataWind,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 50}`);

          // tooltip-title-storage
          tooltipTitleStorage
            .text('儲能系統:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-data-storage
          tooltipDataStorage
            .text(
              `${
                equipData.dataStorage[
                  bisectDate(
                    equipData.dataStorage,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-title-charge
          tooltipTitleCharge
            .text('充電樁:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 0}`);

          // tooltip-data-charge
          tooltipDataCharge
            .text(
              `${
                equipData.dataCharge[
                  bisectDate(
                    equipData.dataCharge,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 0}`);

          // tooltip-circle
          tooltipCircleSolar
            .attr(
              'cx',
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              equipScaleY(
                equipData.dataSolar[
                  bisectDate(
                    equipData.dataSolar,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );

          tooltipCircleWind
            .attr(
              'cx',
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              equipScaleY(
                equipData.dataWind[
                  bisectDate(
                    equipData.dataWind,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );

          tooltipCircleStorage
            .attr(
              'cx',
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              equipScaleY(
                equipData.dataStorage[
                  bisectDate(
                    equipData.dataStorage,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );

          tooltipCircleCharge
            .attr(
              'cx',
              equipScaleX(
                new Date(timeFormat(equipScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              equipScaleY(
                equipData.dataCharge[
                  bisectDate(
                    equipData.dataCharge,
                    timeFormat(equipScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );
        })
        .on('mouseout', () => {
          // tooltip-rect
          tooltipRect.style('display', 'none');

          // tooltip-line
          tooltipLine.style('display', 'none');

          // tooltip-title
          tooltipTitleSolar.style('display', 'none');
          tooltipTitleWind.style('display', 'none');
          tooltipTitleStorage.style('display', 'none');
          tooltipTitleCharge.style('display', 'none');

          // tooltip-data
          tooltipDataSolar.style('display', 'none');
          tooltipDataWind.style('display', 'none');
          tooltipDataStorage.style('display', 'none');
          tooltipDataCharge.style('display', 'none');

          // tooltip-circle
          tooltipCircleSolar.style('display', 'none');
          tooltipCircleWind.style('display', 'none');
          tooltipCircleStorage.style('display', 'none');
          tooltipCircleCharge.style('display', 'none');
        });
    } else {
      // append line of dataUse
      svg
        .append('path')
        .datum(loadData.dataUse)
        .attr('d', loadLine)
        .attr('y', 0)
        .attr('stroke', '#d32f2f')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr(
          'transform',
          `translate(${padding.axisX + padding.left}, ${padding.top})`,
        );

      // append line of dataMake
      svg
        .append('path')
        .datum(loadData.dataMake)
        .attr('d', loadLine)
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
        .call(loadAxisX)
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
        .call(loadGrid)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick').attr('color', 'gray'))
        .attr('stroke-width', '0.5px')
        .attr('fill', 'none')
        .attr('font-size', '15px')
        .attr('transform', `translate(${padding.left}, ${padding.top})`);

      // append legend(圖例)
      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 1.9)
        .attr('r', 7)
        .attr('fill', '#d32f2f');

      svg
        .append('circle')
        .attr('cx', width - padding.right / 1.3)
        .attr('cy', padding.top * 2.5)
        .attr('r', 7)
        .attr('fill', '#2e7d32');

      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 1.95)
        .attr('fill', '#707070')
        .attr('font-size', '20px')
        .text('用電');
      svg
        .append('text')
        .attr('text-anchor', 'start')
        .attr('x', width - padding.right / 1.5)
        .attr('y', padding.top * 2.55)
        .attr('fill', '#707070')
        .attr('font-size', '20px')
        .text('產電');

      // test for tooltip
      tooltipCvs
        .raise()
        .on('mouseover', () => {
          // tooltip-line
          tooltipLine.style('display', 'block');

          // tooltip-circle
          tooltipCircleUse.style('display', 'block').raise();
          tooltipCircleMake.style('display', 'block').raise();

          // tooltip-rect
          tooltipRect
            .style('display', 'block')
            .attr('width', 135)
            .attr('height', 87)
            .raise();

          // tooltip-title
          tooltipTitleUse.style('display', 'block').raise();
          tooltipTitleMake.style('display', 'block').raise();
          tooltipTitleNet.style('display', 'block').raise();

          // tooltip-data
          tooltipDataUse.style('display', 'block').raise();
          tooltipDataMake.style('display', 'block').raise();
          tooltipDataNet.style('display', 'block').raise();
        })
        .on('mousemove', () => {
          tooltipRect
            .attr('x', `${d3.event.pageX - 200}`)
            .attr('y', `${d3.event.pageY - 100}`);

          tooltipLine
            .attr(
              'x1',
              loadScaleX(
                new Date(timeFormat(loadScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'y1',
              padding.top +
                Math.min(
                  loadScaleY(
                    loadData.dataUse[
                      bisectDate(
                        loadData.dataUse,
                        timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                  loadScaleY(
                    loadData.dataMake[
                      bisectDate(
                        loadData.dataMake,
                        timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                      )
                    ].value,
                  ),
                ),
            )
            .attr(
              'x2',
              loadScaleX(
                new Date(timeFormat(loadScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr('y2', height - padding.bottom);

          tooltipTitleUse
            .text('用電:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 75}`);

          tooltipDataUse
            .text(
              `${
                loadData.dataUse[
                  bisectDate(
                    loadData.dataUse,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 75}`);

          tooltipTitleMake
            .text('產電:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 50}`);

          tooltipDataMake
            .text(
              `${
                loadData.dataMake[
                  bisectDate(
                    loadData.dataMake,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 50}`);

          tooltipTitleNet
            .text('淨負載:')
            .attr('x', `${d3.event.pageX - 190}`)
            .attr('y', `${d3.event.pageY - 25}`);

          tooltipDataNet
            .text(
              `${
                loadData.dataUse[
                  bisectDate(
                    loadData.dataUse,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value -
                loadData.dataMake[
                  bisectDate(
                    loadData.dataMake,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value
              }`,
            )
            .attr('text-anchor', 'end')
            .attr('x', `${d3.event.pageX - 80}`)
            .attr('y', `${d3.event.pageY - 25}`);

          // tooltip-circle
          tooltipCircleUse
            .attr(
              'cx',
              loadScaleX(
                new Date(timeFormat(loadScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              loadScaleY(
                loadData.dataUse[
                  bisectDate(
                    loadData.dataUse,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );

          tooltipCircleMake
            .attr(
              'cx',
              loadScaleX(
                new Date(timeFormat(loadScaleX.invert(d3.event.pageX - 160))),
              ),
            )
            .attr(
              'cy',
              loadScaleY(
                loadData.dataMake[
                  bisectDate(
                    loadData.dataMake,
                    timeFormat(loadScaleX.invert(d3.event.pageX - 310)),
                  )
                ].value,
              ) + padding.top,
            );
        })
        .on('mouseout', () => {
          // tooltip-rect
          tooltipRect.style('display', 'none');

          // tooltip-line
          tooltipLine.style('display', 'none');

          // tooltip-circle
          tooltipCircleUse.style('display', 'none');
          tooltipCircleMake.style('display', 'none');

          // tooltip-title
          tooltipTitleUse.style('display', 'none');
          tooltipTitleMake.style('display', 'none');
          tooltipTitleNet.style('display', 'none');

          // tooltip-data
          tooltipDataUse.style('display', 'none');
          tooltipDataMake.style('display', 'none');
          tooltipDataNet.style('display', 'none');
        });
    }

    // clear effect
    return () => {
      svg.selectAll('*').remove();
    };
  });

  useEffect(() => {
    console.log(dayjs(date).format('YYYY/MM/DD'));
  }, [date]);

  return (
    <div>
      <button type="button" onClick={() => changeData()}>
        Change Data
      </button>
      <svg className="chart" ref={chartContainer} />
    </div>
  );
};

export default Chart;
