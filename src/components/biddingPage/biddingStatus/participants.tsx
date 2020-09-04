import React from 'react';

interface IProps {
  participants: number;
}

const Participants: React.FC<IProps> = ({ participants }) => {
  return (
    <div>
      即時交易人數:
      {participants}
    </div>
  );
};

export default Participants;
