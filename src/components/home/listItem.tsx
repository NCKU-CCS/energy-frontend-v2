import React from 'react';
import classnames from 'classnames';
import ListContent from './listContent';

interface IResult {
  status: string;
  time: string;
  date: string;
  wins: {
    price: number;
    value: number;
  };
}

interface IIput {
  input: IResult[];
}

const ListItem: React.FC<IIput> = ({ input }) => {
  const listItem = input.map((content) => {
    return (
      <ListContent
        status={content.status}
        time={content.time}
        date={content.date}
        price={content.wins.price}
        value={content.wins.value}
      />
    );
  });

  return <div className={classnames('home-bid-info-list')}>{listItem}</div>;
};

export default ListItem;
