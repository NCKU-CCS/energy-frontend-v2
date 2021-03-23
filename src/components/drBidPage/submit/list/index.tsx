import React from 'react';
import classNames from 'classnames';
import ListTitle from './listTitle';
import ListItem from './listItem';

interface IData {
  uuid: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  status: string;
}

interface IProps {
  date: string;
  apiData: IData[];
  dataType: string;
}

const List: React.FC<IProps> = ({ date, apiData, dataType }) => {
  // map data and create list items
  const createList = apiData.map((d) => {
    return <ListItem date={date} data={d} />;
  });

  return (
    <div className={classNames('drbid-submit-list-container-in')}>
      <ListTitle dataType={dataType} />
      <div className={classNames('drbid-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
