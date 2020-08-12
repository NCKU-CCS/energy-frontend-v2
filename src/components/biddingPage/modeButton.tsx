import React from 'react';

interface IProps {
  changeMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ changeMode }) => {
  return (
    <div>
      <button type="button" onClick={() => changeMode('綠能交易')}>
        綠能交易
      </button>
      <button type="button" onClick={() => changeMode('需量反應')}>
        需量反應
      </button>
    </div>
  );
};

export default ModeButton;
