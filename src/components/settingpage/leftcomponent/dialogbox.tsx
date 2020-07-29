import React, { useState } from 'react';
import classnames from 'classnames';
import data from './test.json';

interface IProps {
  changestate: (display: boolean) => void;
}

const DialogBox: React.FC<IProps> = ({ changestate }) => {
  const title = classnames('setting-left--dialogtitle');
  const passwordinput = classnames('setting-left--passwordInput');

  const [oldPassword, changeoldPassword] = useState<string>('');
  const [newPassword, changenewPassword] = useState<string>('');
  const [confirmPassword, changeconfirmPassword] = useState<string>('');

  function changePassword() {
    if (oldPassword === data[0].password) {
      if (newPassword === confirmPassword) {
        window.confirm('修改成功');
        // change password
      } else if (newPassword !== confirmPassword)
        window.confirm('新密碼確認錯誤');
    } else window.confirm('舊密碼輸入錯誤');
    changeoldPassword('');
    changenewPassword('');
    changeconfirmPassword('');
  }

  return (
    <div className={classnames('setting-left--background')}>
      <div className={classnames('setting-left--dialogcontainer')}>
        <button
          type="button"
          className={classnames('setting-left--fork')}
          onClick={() => changestate(false)}
        >
          ✕
        </button>
        <div className={classnames('setting-left--changePasswordContainer')}>
          <div className={title}>輸入舊密碼</div>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(event) => changeoldPassword(event.target.value)}
            className={passwordinput}
          />
          <div className={title}>輸入新密碼</div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => changenewPassword(event.target.value)}
            className={passwordinput}
          />
          <div className={title}>再次輸入新密碼</div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => changeconfirmPassword(event.target.value)}
            className={passwordinput}
          />
          <button
            type="button"
            className={classnames('setting-left--changePasswordButton')}
            onClick={changePassword}
          >
            更改密碼
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
