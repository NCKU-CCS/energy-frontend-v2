import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

type SuccessReturn = {
  id: string;
  bearer: string;
  is_aggregator: boolean;
};

type FailureReturn = {
  error: string;
};

const LoginForm: React.FC = () => {
  // i18n
  const { t } = useTranslation();

  // component state and reference
  const [isRemember, setRemember] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Submit Event Handler
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // POST to LOGIN API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/login`,
      {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ account, password }),
      },
    );
    if (response.status === 200) {
      // Login Success
      const successMsg: SuccessReturn = await response.json();
      if (isRemember) {
        localStorage.setItem('BEMS_USER', JSON.stringify(successMsg));
      } else {
        sessionStorage.setItem('BEMS_USER', JSON.stringify(successMsg));
      }
      window.location.replace('/');
    } else {
      // Login Fail
      const failureMsg: FailureReturn = await response.json();
      // eslint-disable-next-line no-alert
      alert(failureMsg.error);
    }
  };

  // OnChange Event for Account Input
  const handleAccountChange = () => {
    const value = document.querySelector<HTMLInputElement>('#account')?.value;
    setAccount(value || account);
  };

  // OnChange Event for Password Input
  const handlePasswordChange = () => {
    const value = document.querySelector<HTMLInputElement>('#password')?.value;
    setPassword(value || password);
  };

  return (
    <form className={classnames('login-form')} onSubmit={handleSubmit}>
      <h1>{t('loginpage.title')}</h1>
      <div className={classnames('login-form-input')}>
        <label htmlFor="account">{t('loginpage.account')}</label>
        <input
          type="text"
          id="account"
          name="account"
          onChange={handleAccountChange}
        />
        <label htmlFor="password">{t('loginpage.password')}</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <div className={classnames('login-form-select')}>
          <span
            onClick={() => setRemember(!isRemember)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            className={classnames('login-form-span', {
              'login-form-span--select': isRemember,
            })}
          >
            {t('loginpage.remember')}
          </span>
          <span>{t('loginpage.forget')}</span>
        </div>
      </div>
      <button type="submit">{t('loginpage.login')}</button>
    </form>
  );
};

export default LoginForm;
