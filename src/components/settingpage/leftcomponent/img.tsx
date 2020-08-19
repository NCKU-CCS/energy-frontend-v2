import React from 'react';
import classnames from 'classnames';

interface IUserImg {
  img: string;
  username: string;
}

const Img: React.FC<IUserImg> = ({ img, username }) => {
  return (
    <div className={classnames('setting-left-imgcontainer')}>
      <img className="setting-left-img" alt="img" src={img} />
      <div className={classnames('setting-left-imgtext')}>{username}</div>
    </div>
  );
};

export default Img;
