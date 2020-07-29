import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './test.json';
import Dialog from './dialogbox';
import i18n from '../../../i18n';

const Content: React.FC = () => {
  const { t } = useTranslation();

  const datacontainer = classnames('setting-left--datacontainer');
  const content = classnames('setting-left--datacontent');
  const title = classnames('setting-left--datatitle');

  const password = () => {
    const long = data[0].password.length;
    let word = '';
    for (let i = 0; i < long; i += 1) word += '*';
    return word;
  };

  const [dialogState, setDialog] = useState<boolean>(false);

  return (
    <div className={classnames('setting-left--contentcontainer')}>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.account')}</div>
        <div className={content}>{data[0].account}</div>
      </div>
      <div id="passwordcontainer1">
        <div id="passwordcontainer2">
          <div className={title}>{t('settingpage.password')}</div>
          <div className={content}>{password()}</div>
        </div>
        <button type="button" onClick={() => setDialog(true)}>
          {t('settingpage.changePassword')}
        </button>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.address')}</div>
        <div className={content}>{data[0].address}</div>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.ethereumAddress')}</div>
        <div className={content}>{data[0].ethereum}</div>
      </div>
      <div className={datacontainer}>
        <div className={title}>{t('settingpage.language')}</div>
        <button
          type="button"
          onClick={() =>
            i18n.language === 'en-US'
              ? i18n.changeLanguage('zh-TW')
              : i18n.changeLanguage('en-US')
          }
        >
          {t('settingpage.changelanguage')}
        </button>
      </div>
      {dialogState && <Dialog changestate={setDialog} />}
    </div>
  );
};

export default Content;
