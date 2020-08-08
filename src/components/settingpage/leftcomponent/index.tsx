import React from 'react';
import classnames from 'classnames';
import Img from './img';
import Content from './content';

interface IUserInfo {
  username: string;
  avatar: string;
  address: string;
  ethAddress: string;
}

const LeftContainer: React.FC<IUserInfo> = ({
  username,
  avatar,
  address,
  ethAddress,
}) => {
  return (
    <div className={classnames('setting-left--container')}>
      <Img img={avatar} username={username} />
      <Content address={address} ethAddress={ethAddress} />
    </div>
  );
};

export default LeftContainer;
