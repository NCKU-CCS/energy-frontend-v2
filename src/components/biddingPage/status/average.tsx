import React from 'react';

interface IProps {
  averagePrice: number;
  averageVolume: number;
}

const Average: React.FC<IProps> = ({ averagePrice, averageVolume }) => {
  return (
    <div>
      <div>
        平均交易價:
        {averagePrice}
      </div>
      <div>
        平均交易量:
        {averageVolume}
      </div>
    </div>
  );
};

export default Average;
