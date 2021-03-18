/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { testingData } from './data';
import {
  buildingsPos,
  buildingsNamePos,
  paths,
  achievePos,
} from './coordinate';

const emptyData = {
  date: '2019/01/01',
  time: '00:00',
  transactions: [
    {
      seller: 'Juguang_Tower',
      buyer: 'Juguang_Tower',
      achievement: 0.0,
    },
  ],
};

const GraphContainer: React.FC = () => {
  const { t } = useTranslation();

  const [inputData, setInputData] = useState(emptyData);
  const [currUser, setCurrUser] = useState('');
  // 4*4 matrix, record if the lighting are triggered and the role of transaction
  // prettier-ignore
  const [lightingType, setLightingType] = useState([
    'off', 'off', 'off', 'off',
    'off', 'off', 'off', 'off',
    'off', 'off', 'off', 'off',
    'off', 'off', 'off', 'off',
  ]);
  const [dataReady, setDataReady] = useState(false);
  // parameter
  const refreshTime = 50;
  const buildings = ['KKL', 'Juguang_Tower', 'NQU', 'Ever_Rich'];
  const buildingsName = [
    t('indexpage.KKL'),
    t('indexpage.Juguang_Tower'),
    t('indexpage.NQU'),
    t('indexpage.Ever_Rich'),
  ];
  // lighting info, record each lighting's position
  const lightingPos: number[][] = [];
  // lighting info, record each lighting is on which fragment of it's path
  const lightingFrag: number[] = [];
  // define image
  let building1: HTMLImageElement;
  let building2: HTMLImageElement;
  let building3: HTMLImageElement;
  let building4: HTMLImageElement;
  // current interval
  const [currIntervalId, setCurrIntervalId] = useState<any>();

  // init data
  useEffect(() => {
    (async () => {
      /**
       * testing data, need to change these data source to API
       * inputData: transmission data
       */
      setInputData(testingData);

      // set currUser
      const { bearer } = JSON.parse(
        localStorage.getItem('BEMS_USER') ||
          sessionStorage.getItem('BEMS_USER') ||
          '{}',
      );
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/user`,
        {
          mode: 'cors',
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          }),
        },
      );
      const userInfo = await res.json();
      setCurrUser(userInfo.account);
    })();
  }, []);

  // init graph
  useEffect(() => {
    if (inputData !== emptyData && currUser && dataReady) {
      initDraw();
    }
  }, [inputData, currUser, dataReady]);

  useEffect(() => {
    if (inputData !== emptyData && currUser) {
      // init lighting info.
      // prettier-ignore
      const currLightingType = [
        'off', 'off', 'off', 'off',
        'off', 'off', 'off', 'off',
        'off', 'off', 'off', 'off',
        'off', 'off', 'off', 'off',
      ];
      for (const data of inputData.transactions) {
        // just set info related to currUser
        if (data.buyer !== currUser && data.seller !== currUser) {
          continue;
        }
        const sellerIndex = buildings.indexOf(data.seller);
        const buyerIndex = buildings.indexOf(data.buyer);
        const lightingIndex = sellerIndex * 4 + buyerIndex;
        currLightingType[lightingIndex] =
          data.seller === currUser ? 'sell' : 'buy';
      }
      setLightingType(currLightingType);
      setDataReady(true);
    }
  }, [inputData, currUser]);

  const initDraw = () => {
    // init img element
    building1 = document.createElement('img');
    building2 = document.createElement('img');
    building3 = document.createElement('img');
    building4 = document.createElement('img');
    // load image
    building1.src = `${process.env.PUBLIC_URL}/home/Asset 20@2x.png`;
    building2.src = `${process.env.PUBLIC_URL}/home/Asset 19@2x.png`;
    building3.src = `${process.env.PUBLIC_URL}/home/Asset 21@2x.png`;
    building4.src = `${process.env.PUBLIC_URL}/home/Asset 22@2x.png`;

    // init lighing pos & frag
    for (const path of paths) {
      if (path.length === 0) {
        // if no path, push -1
        lightingPos.push([-1, -1]);
        lightingFrag.push(-1);
      } else {
        lightingPos.push(path[0].slice(0));
        lightingFrag.push(0);
      }
    }

    if (currIntervalId) {
      clearInterval(currIntervalId);
    }
    setCurrIntervalId(setInterval(drawGraph, refreshTime));
  };

  const drawGraph = () => {
    // init canvas
    const canvas = document.getElementById('transmit') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, 2700, 930);

    // draw path
    for (const path of paths) {
      drawPath(ctx, path);
    }

    // draw achievement
    for (const transaction of inputData.transactions) {
      const index =
        4 * buildings.indexOf(transaction.seller) +
        buildings.indexOf(transaction.buyer);
      if (lightingType[index] === 'off') {
        continue;
      }
      drawAchievement(
        ctx,
        achievePos[index][0],
        achievePos[index][1],
        lightingType[index],
        transaction.achievement,
      );
    }

    drawLightings(ctx);

    // draw building
    ctx.drawImage(building1, buildingsPos[0][0], buildingsPos[0][1]);
    ctx.drawImage(building2, buildingsPos[1][0], buildingsPos[1][1]);
    ctx.drawImage(building3, buildingsPos[2][0], buildingsPos[2][1]);
    ctx.drawImage(building4, buildingsPos[3][0], buildingsPos[3][1]);

    // draw buildings' name
    drawBuildingName(ctx);
  };

  const drawPath = (ctx: CanvasRenderingContext2D, pathInfo: number[][]) => {
    if (pathInfo.length < 2) {
      return 0;
    }
    ctx.save();
    // setting style
    ctx.strokeStyle = '#DDD';
    ctx.lineWidth = 7;
    // draw
    ctx.beginPath();
    ctx.moveTo(pathInfo[0][0], pathInfo[0][1]);
    for (let i = 1; i < pathInfo.length; i += 1) {
      ctx.lineTo(pathInfo[i][0], pathInfo[i][1]);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const drawLightings = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < lightingType.length; i += 1) {
      if (i % 5 === 0) {
        // pass 1-1, 2-2, 3-3, 4-4
        continue;
      }
      if (lightingType[i] === 'off') {
        // init lighting info
        lightingPos[i] = paths[i][0].slice(0);
        lightingFrag[i] = 0;
      } else {
        // draw
        const fragIndex = lightingFrag[i];
        const slope =
          (paths[i][fragIndex + 1][1] - paths[i][fragIndex][1]) /
          (paths[i][fragIndex + 1][0] - paths[i][fragIndex][0]);
        const arc = Math.atan(slope); // transfer slope to radian
        drawLighting(
          ctx,
          lightingPos[i][0],
          lightingPos[i][1],
          lightingType[i],
          arc,
        );
        if (paths[i][fragIndex + 1][0] > paths[i][fragIndex][0]) {
          // move right
          if (lightingPos[i][0] + 5 < paths[i][fragIndex + 1][0]) {
            lightingPos[i][0] += 5; // move x
            lightingPos[i][1] += 5 * slope; // move y
          } else {
            // move to next fragment
            lightingFrag[i] = (lightingFrag[i] + 1) % (paths[i].length - 1);
            lightingPos[i] = paths[i][lightingFrag[i]].slice(0);
          }
        } else {
          // move left
          // eslint-disable-next-line no-lonely-if
          if (lightingPos[i][0] - 5 > paths[i][fragIndex + 1][0]) {
            lightingPos[i][0] -= 5; // move x
            lightingPos[i][1] -= 5 * slope; // move y
          } else {
            // move to next fragment
            lightingFrag[i] = (lightingFrag[i] + 1) % (paths[i].length - 1);
            lightingPos[i] = paths[i][lightingFrag[i]].slice(0);
          }
        }
      }
    }
  };

  const drawLighting = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: string,
    arc: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(arc);
    ctx.fillStyle = type === 'sell' ? '#d32f2f' : '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(12, -18);
    ctx.lineTo(9, 0);
    ctx.moveTo(6, 0);
    ctx.lineTo(3, 18);
    ctx.lineTo(15, 0);
    ctx.fill();
    ctx.restore();
  };

  const drawBuildingName = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.font = '40px Roboto';
    for (let i = 0; i < buildingsNamePos.length; i += 1) {
      ctx.fillStyle = buildings[i] === currUser ? '#ffa000' : '#000000';
      ctx.fillText(
        buildingsName[i],
        buildingsNamePos[i][0],
        buildingsNamePos[i][1],
      );
    }
    ctx.restore();
  };

  const drawAchievement = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: string,
    achieve: number,
  ) => {
    ctx.save();
    ctx.font = '40px Roboto';
    ctx.fillStyle = type === 'sell' ? '#d32f2f' : '#2e7d32';
    ctx.fillText(`${achieve * 100}%`, x, y);
    ctx.restore();
  };

  return (
    <canvas
      id="transmit"
      className={classnames('home-canvas')}
      width="2700"
      height="930"
    />
  );
};

export default GraphContainer;
