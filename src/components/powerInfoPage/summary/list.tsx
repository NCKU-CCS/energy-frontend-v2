import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IApiData {
  Consume: number;
  Demand: number;
  ESS: number;
  EV: number;
  PV: number;
  WT: number;
}

interface IListItem {
  type: string;
  value: number;
}

interface IProps {
  date: string; // not type: Date
  apiData: IApiData;
}

const List: React.FC<IProps> = ({ date, apiData }) => {
  // i18n
  const { t } = useTranslation();

  // positive and negative data from apiData
  const [posData, setPosData] = useState<IListItem[]>([]);
  const [negData, setNegData] = useState<IListItem[]>([]);

  // create posData and negData
  useEffect(() => {
    // temp array
    const tmpPosData: IListItem[] = [];
    const tmpNegData: IListItem[] = [];

    // Consume
    if (apiData.Consume >= 0)
      tmpPosData.push({
        type: 'Consume',
        value: apiData.Consume,
      });
    else
      tmpNegData.push({
        type: 'Consume',
        value: apiData.Consume,
      });

    // ESS
    if (apiData.ESS >= 0)
      tmpPosData.push({
        type: 'ESS',
        value: apiData.ESS,
      });
    else
      tmpNegData.push({
        type: 'ESS',
        value: apiData.ESS,
      });

    // EV
    if (apiData.EV >= 0)
      tmpPosData.push({
        type: 'EV',
        value: apiData.EV,
      });
    else
      tmpNegData.push({
        type: 'EV',
        value: apiData.EV,
      });

    // PV
    if (apiData.PV >= 0)
      tmpPosData.push({
        type: 'PV',
        value: apiData.PV,
      });
    else
      tmpNegData.push({
        type: 'PV',
        value: apiData.PV,
      });

    // WT
    if (apiData.WT >= 0)
      tmpPosData.push({
        type: 'WT',
        value: apiData.WT,
      });
    else
      tmpNegData.push({
        type: 'WT',
        value: apiData.WT,
      });

    // set posData and negData
    setPosData(tmpPosData);
    setNegData(tmpNegData);
  }, [date, apiData]);

  // return data type
  const dataType = (str: string) => {
    switch (str) {
      case 'Consume':
        return t('powerinfopage.normalConsume');
      case 'NetLoad':
        return t('powerinfopage.netLoad');
      case 'ESS':
        return t('powerinfopage.ESS');
      case 'EV':
        return t('powerinfopage.EV');
      case 'WT':
        return t('powerinfopage.WT');
      case 'PV':
        return t('powerinfopage.PV');
      default:
        return 'error';
    }
  };

  // map positive data and return a list
  const posDataList = posData.map((d) => {
    return (
      <div
        className={classNames('powerinfo-summary-list-posdata-item-container')}
      >
        <span id="type">{dataType(d.type)}</span>
        <span id="value">{d.value}</span>
      </div>
    );
  });

  // map positive data and return a list
  const negDataList = negData.map((d) => {
    return (
      <div
        className={classNames('powerinfo-summary-list-negdata-item-container')}
      >
        <span id="type">{dataType(d.type)}</span>
        <span id="value">{d.value}</span>
      </div>
    );
  });

  return (
    <div className={classNames('powerinfo-summary-list-container')}>
      <div className={classNames('powerinfo-summary-list-date')}>{date}</div>
      <div className={classNames('powerinfo-summary-list-mode')}>
        {t('powerinfopage.netLoadSummary')}
        {/* <span>({t('powerinfopage.consume')}-{t('powerinfopage.generate')})</span> */}
      </div>
      <div className={classNames('powerinfo-summary-list-data-container')}>
        <div className={classNames('powerinfo-summary-list-posdata-container')}>
          {posDataList}
        </div>
        <div className={classNames('powerinfo-summary-list-negdata-container')}>
          {negDataList}
        </div>
        <hr />
        <div className={classNames('powerinfo-summary-list-demand-container')}>
          <span id="type">{t('powerinfopage.netLoad')}</span>
          <span id="value">{apiData.Demand}kWh</span>
        </div>
      </div>
    </div>
  );
};

export default List;
