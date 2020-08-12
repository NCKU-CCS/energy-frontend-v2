import React from 'react';

interface IProps {
  changeMode(mode: string): void;
}

const ModeButton: React.FC<IProps> = ({ changeMode }) => {
  return (
    <div>
      <button type="button" onClick={() => changeMode('淨負載')}>
        淨負載
      </button>
      <button type="button" onClick={() => changeMode('產能設備')}>
        產能設備
      </button>
    </div>
  );
};

export default ModeButton;
