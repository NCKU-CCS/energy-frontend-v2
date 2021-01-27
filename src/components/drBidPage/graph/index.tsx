import React from 'react';
import classNames from 'classnames';

interface IProps {
  values: number[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Graph: React.FC<IProps> = ({ values }) => (
  <div className={classNames('drbid-graph-container')} />
);

export default Graph;
