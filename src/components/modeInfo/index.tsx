import React, { useState } from 'react';
import classNames from 'classnames';

const ModeInfo: React.FC = () => {
  // open info modal or not
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={classNames('modeinfo-container')}>
      <button type="button" onClick={() => setOpen(true)}>
        模式說明
      </button>
      {open && (
        <div className={classNames('modeinfo-modal-canvas')}>
          <div className={classNames('modeinfo-modal-container')}>
            <div className={classNames('modeinfo-modal-header')}>
              <h5>模式說明</h5>
              <button type="button" onClick={() => setOpen(false)}>
                X
              </button>
            </div>
            <div className={classNames('modeinfo-modal-content')}>
              <p>模式一：小用戶抵抑負載（即時電價）</p>
              <p>
                模式二：市電 &rarr; 儲能系統 &rarr; 需量反應（單位容量價格）
              </p>
              <p>模式三：PV &rarr; 儲能系統 &rarr; 需量反應（即時電價）</p>
              <p>
                模式一：模式四：PV(非FIT) &rarr; VPP 平台 &rarr;
                需量反應（即時電價）
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeInfo;
