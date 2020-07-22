import React from 'react';
import classnames from 'classnames';
import data from './test.json';

const RightContainer: React.FC = () => {
  const listcontainer = classnames('setting-right--listcontainer');
  const number = classnames('setting-right--number');
  const code = classnames('setting-right--code');
  const name = classnames('setting-right--name');
  const contentlistcontainer = classnames(
    'setting-right--contentlistcontainer',
  );
  const contentcontainer = classnames('setting-right--contentcontainer');
  const contentnumber = classnames(
    'setting-right--number',
    'setting-right--content',
  );
  const contentcode = classnames(
    'setting-right--code',
    'setting-right--content',
  );
  const contentname = classnames(
    'setting-right--name',
    'setting-right--content',
  );

  const listItems = data.map((content) => {
    return (
      <div className={contentlistcontainer}>
        <div className={contentnumber}>{content.number}</div>
        <div className={contentcode}>{content.code}</div>
        <div className={contentname}>{content.name}</div>
      </div>
    );
  });

  return (
    <div className={classnames('setting-right--container')}>
      <div className={classnames('setting-right--title')}>已連接電錶</div>
      <div className={listcontainer}>
        <div className={number}>電錶編號</div>
        <div className={code}>電錶辨識碼</div>
        <div className={name}>名稱</div>
      </div>
      <div className={contentcontainer}>{listItems}</div>
    </div>
  );
};

export default RightContainer;
