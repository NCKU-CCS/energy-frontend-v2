import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './test.json';

interface IProps {
  changestate: (display: boolean) => void;
}

const DialogBox: React.FC<IProps> = ({ changestate }) => {
  const { t } = useTranslation();

  const title = classnames('setting-left--dialogtitle');
  const passwordinput = classnames('setting-left--passwordInput');

  const [oldPassword, changeoldPassword] = useState<string>('');
  const [newPassword, changenewPassword] = useState<string>('');
  const [confirmPassword, changeconfirmPassword] = useState<string>('');

  function changePassword() {
    if (oldPassword === data[0].password) {
      if (newPassword === confirmPassword) {
        window.alert(t('settingpage.successChange'));
        // change password
      } else if (newPassword !== confirmPassword)
        window.alert(t('settingpage.newPasswordWrong'));
    } else window.alert(t('settingpage.oldPasswordWrong'));
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
          <div className={title}>{t('settingpage.oldPassword')}</div>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(event) => changeoldPassword(event.target.value)}
            className={passwordinput}
          />
          <div className={title}>{t('settingpage.newPassword')}</div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => changenewPassword(event.target.value)}
            className={passwordinput}
          />
          <div className={title}>{t('settingpage.confirmPassword')}</div>
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
            {t('settingpage.changePassword')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
