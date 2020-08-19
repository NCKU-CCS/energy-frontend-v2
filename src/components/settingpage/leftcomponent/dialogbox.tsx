import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  changeState: (display: boolean) => void;
}

const DialogBox: React.FC<IProps> = ({ changeState }) => {
  const { t } = useTranslation();

  const title = classnames('setting-left-dialogtitle');
  const passwordInput = classnames('setting-left-passwordInput');

  const [oldPassword, changeOldPassword] = useState<string>('');
  const [newPassword, changeNewPassword] = useState<string>('');
  const [confirmPassword, changeConfirmPassword] = useState<string>('');

  const changeRequest = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/user`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          original_passwd: oldPassword,
          new_passwd: newPassword,
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      // eslint-disable-next-line no-alert
      window.alert(t('settingpage.successChange'));
      changeState(false);
    } else {
      // fetch failure
      // eslint-disable-next-line no-alert
      window.alert(t('settingpage.oldPasswordWrong'));
    }
  };

  function changePassword() {
    if (newPassword !== confirmPassword)
      // eslint-disable-next-line no-alert
      window.alert(t('settingpage.newPasswordWrong'));
    else changeRequest();
    changeOldPassword('');
    changeNewPassword('');
    changeConfirmPassword('');
  }

  return (
    <div className={classnames('setting-left-background')}>
      <div className={classnames('setting-left-dialogcontainer')}>
        <button
          type="button"
          className={classnames('setting-left-fork')}
          onClick={() => changeState(false)}
        >
          ✕
        </button>
        <div className={classnames('setting-left-changePasswordContainer')}>
          <div className={title}>{t('settingpage.oldPassword')}</div>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(event) => changeOldPassword(event.target.value)}
            className={passwordInput}
          />
          <div className={title}>{t('settingpage.newPassword')}</div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => changeNewPassword(event.target.value)}
            className={passwordInput}
          />
          <div className={title}>{t('settingpage.confirmPassword')}</div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => changeConfirmPassword(event.target.value)}
            className={passwordInput}
          />
          <button
            type="button"
            className={classnames('setting-left-changePasswordButton')}
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
