import React, { useEffect, useState } from 'react';

interface IApiData {
  Consume: number;
  Date: string;
  Demand: number;
  ESS: number;
  EV: number;
  Generate: number;
  PV: number;
  WT: number;
}

const TestApi: React.FC = () => {
  const [apiDataArr, setApiDataArr] = useState<IApiData[]>([]);

  const chartDate = '2020/07/29';

  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/power_info?chart_date=${chartDate}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );

    // get response successfully or not
    if (response.status === 200) {
      const tmp = await response.json();
      setApiDataArr(tmp);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, []);

  useEffect(() => {
    console.log(apiDataArr);
  });

  return <div>TestApi</div>;
};

export default TestApi;
