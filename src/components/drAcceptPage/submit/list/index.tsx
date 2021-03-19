import React from 'react';
import classNames from 'classnames';
import ListTitle from './listTitle';
import ListItem from './listItem';

interface IData {
  uuid: string;
  executor: string;
  acceptor: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  result: boolean;
}

interface IProps {
  userType: string;
  apiData: IData[];
}

const List: React.FC<IProps> = ({ userType, apiData }) => {
  // map data and create list items
  const createList = apiData.map((d) => {
    return <ListItem userType={userType} data={d} />;
  });

  return (
    <div className={classNames('draccept-submit-list-container-in')}>
      <ListTitle userType={userType} />
      <div className={classNames('draccept-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
