import React from 'react';
import classnames from 'classnames';
import data from './test.json';

const Content: React.FC = () => {
  const datacontainer = classnames('setting-left--datacontainer');
  const content = classnames('setting-left--datacontent');
  const title = classnames('setting-left--datatitle');
  const password = () => {
    const long = data[0].password.length;
    let word = '';
    for (let i = 0; i < long; i += 1) word += '*';
    return word;
  };

  return (
    <div className={classnames('setting-left--contentcontainer')}>
      <div className={datacontainer}>
        <div className={title}>帳號：</div>
        <div className={content}>{data[0].account}</div>
      </div>
      <div id="passwordcontainer1">
        <div id="passwordcontainer2">
          <div className={title}>密碼：</div>
          <div className={content}>{password()}</div>
        </div>
        <button type="button">更改密碼</button>
      </div>
      <div className={datacontainer}>
        <div className={title}>地址：</div>
        <div className={content}>{data[0].address}</div>
      </div>
      <div className={datacontainer}>
        <div className={title}>乙太坊地址：</div>
        <div className={content}>{data[0].ethereum}</div>
      </div>
      <div className={datacontainer}>
        <div className={title}>語言：</div>
        <button type="button">ENGLISH</button>
      </div>
    </div>
  );
};

export default Content;
