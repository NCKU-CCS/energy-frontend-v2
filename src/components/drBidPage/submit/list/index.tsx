/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ListTitle from './listTitle';
import ListItem from './listItem';
// import AddBidBtn from './addBidBtn';

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
  // i18n
  const { t } = useTranslation();

  // map data and create list items
  const createList = apiData.map((d) => {
    return <ListItem date={date} data={d} />;
  });

  return (
    <div className={classNames('drbid-submit-list-container-in')}>
      <ListTitle />
      <div className={classNames('drbid-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
