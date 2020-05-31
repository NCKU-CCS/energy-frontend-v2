import React from 'react';
import classnames from 'classnames';

type SuccessReturn = {
  id: string;
  bearer: string;
  is_aggregator: boolean;
};

type FailureReturn = {
  error: string;
};

const LoginForm: React.FC = () => {
  // component state and reference
  const [isRemember, setRemember] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  // event handler
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/login`,
      {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ account, password }),
      },
    );
    if (response.status >= 200) {
      const successMsg: SuccessReturn = await response.json();
      if (isRemember) {
        localStorage.setItem('BEMS_USER', JSON.stringify(successMsg));
      } else {
        sessionStorage.setItem('BEMS_USER', JSON.stringify(successMsg));
      }
      window.location.replace('/');
    } else {
      const failureMsg: FailureReturn = await response.json();
      // eslint-disable-next-line no-alert
      alert(failureMsg.error);
    }
  };

  const handleAccountChange = () => {
    const value = document.querySelector<HTMLInputElement>('#account')?.value;
    setAccount(value || account);
  };

  const handlePasswordChange = () => {
    const value = document.querySelector<HTMLInputElement>('#password')?.value;
    setPassword(value || password);
  };

  return (
    <form className={classnames('login-form')} onSubmit={handleSubmit}>
      <h1>綠能交易平台</h1>
      <div className={classnames('login-form-input')}>
        <label htmlFor="account">帳號</label>
        <input
          type="text"
          id="account"
          name="account"
          onChange={handleAccountChange}
        />
        <label htmlFor="password">密碼</label>
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
            記住我
          </span>
          <span>忘記密碼？</span>
        </div>
      </div>
      <button type="submit">登入</button>
    </form>
  );
};

export default LoginForm;
