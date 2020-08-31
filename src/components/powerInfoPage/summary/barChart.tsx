import React from 'react';

interface IProps {
  date: string;
}

const BarChart: React.FC<IProps> = ({ date }) => {
  return (
    <div>
      BarChart
      {date}
    </div>
  );
};

export default BarChart;
