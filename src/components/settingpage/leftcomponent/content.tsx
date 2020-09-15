import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './test.json';
import Dialog from './dialogbox';
import i18n from '../../../i18n';

interface IUserInfo {
  address: string;
  ethAddress: string;
  account: string;
}

const Content: React.FC<IUserInfo> = ({ address, ethAddress, account }) => {
  const { t } = useTranslation();

  const datacontainer = classnames('setting-left-datacontainer');
  const content = classnames('setting-left-datacontent');
  const title = classnames('setting-left-datatitle');
  const buttonStyle = classnames('setting-left-buttonStyle');

  const password = () => {
    const long = data[0].password.length;
    let word = '';
    for (let i = 0; i < long; i += 1) word += '*';
    return word;
  };
  let ShortEthAddress = '';
  if (i18n.language === 'en-US') {
    ShortEthAddress = `${ethAddress.substr(0, 15)}...`;
  } else if (i18n.language === 'zh-TW') {
    ShortEthAddress = `${ethAddress.substr(0, 22)}...`;
  }

  const [dialogState, setDialog] = useState<boolean>(false);

  return (
    <div className={classnames('setting-left-contentcontainer')}>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.account')}</div>
        <div className={content}>{account}</div>
      </div>
      <div className={classnames('setting-left-passwordcontainer1')}>
        <div className={classnames('setting-left-passwordcontainer2')}>
          <div className={title}>{t('settingpage.password')}</div>
          <div className={content}>{password()}</div>
        </div>
        <button
          type="button"
          onClick={() => setDialog(true)}
          className={buttonStyle}
        >
          {t('settingpage.changePassword')}
        </button>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.address')}</div>
        <div className={content}>{address}</div>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.ethereumAddress')}</div>
        <div
          className={classnames(
            'setting-left-datacontent',
            'setting-left-ethAddress',
          )}
        >
          {ShortEthAddress}
        </div>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.language')}</div>
        <button
          type="button"
          onClick={() => {
            if (i18n.language === 'en-US') i18n.changeLanguage('zh-TW');
            else i18n.changeLanguage('en-US');
            sessionStorage.setItem('Language', i18n.language);
          }}
          className={buttonStyle}
        >
          {t('settingpage.changelanguage')}
        </button>
      </div>
      {dialogState && <Dialog changeState={setDialog} />}
    </div>
  );
};

export default Content;
