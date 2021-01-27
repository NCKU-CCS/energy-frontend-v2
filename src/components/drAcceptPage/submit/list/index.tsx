import React from 'react';
import classNames from 'classnames';
import ListTitle from './listTitle';
import ListItem from './listItem';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface IProps {
  date: string;
  apiData: IData[];
}

const List: React.FC<IProps> = ({ date, apiData }) => {
  // map data and create list items
  const createList = apiData.map((d) => {
    return <ListItem date={date} data={d} />;
  });

  return (
    <div className={classNames('draccept-submit-list-container-in')}>
      <ListTitle />
      <div className={classNames('draccept-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
