import React from 'react';
import classNames from 'classnames';
import ListTitle from './listTitle';
import ListItem from './listItem';

interface IData {
  mode: number;
  aggregator?: string;
  executor?: string;
  interval: string;
  total_volume: number;
  price: number;
  total_price: number;
  is_accepted: boolean;
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
