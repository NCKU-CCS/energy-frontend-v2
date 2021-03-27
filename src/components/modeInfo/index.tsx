import React, { useState } from 'react';
import classNames from 'classnames';

const ModeInfo: React.FC = () => {
  // open info modal or not
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={classNames('modeinfo-container')}>
      {open ? (
        <button type="button" onClick={() => setOpen(true)}>
          模式說明
        </button>
      ) : (
        <div>Modal</div>
      )}
    </div>
  );
};

export default ModeInfo;
