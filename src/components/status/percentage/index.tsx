import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

interface IStatus {
  status: string;
}

interface IInput {
  input: IStatus[];
  nowIndex: number;
}

const Percentage: React.FC<IInput> = ({ input, nowIndex }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    `${process.env.PUBLIC_URL}/status/box_grey.png`,
  );
  const [percent, setPercent] = useState<string>('—');
  useEffect(() => {
    if (input.length > 0) {
      if (nowIndex > -1)
        setImgSrc(`${process.env.PUBLIC_URL}/status/box_orange.png`);
      else setImgSrc(`${process.env.PUBLIC_URL}/status/box_grey.png`);
      let dataPercent = '—';
      if (input[nowIndex].status === '投標中') dataPercent = '20';
      else if (input[nowIndex].status === '已投標') dataPercent = '40';
      else if (
        input[nowIndex].status === '已得標' ||
        input[nowIndex].status === '未得標'
      )
        dataPercent = '60';
      else if (input[nowIndex].status === '執行中') dataPercent = '80';
      else if (input[nowIndex].status === '結算中') dataPercent = '100';
      else if (input[nowIndex].status === '已結算') dataPercent = '100';
      else dataPercent = '—';
      setPercent(dataPercent);
    }
  }, [nowIndex]);
  return (
    <div className={classnames('status-percentage')}>
      <img
        alt=""
        src={imgSrc}
        className={classnames('status-percentage-img')}
      />
      <div className={classnames('status-percentage-title')}>達成率</div>
      <div className={classnames('status-percentage-percentage')}>
        {percent}%
      </div>
    </div>
  );
};

export default Percentage;
