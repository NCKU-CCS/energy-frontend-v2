import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';

const PowerInfoPage: React.FC = () => {
  const { t } = useTranslation();
  return <Layout title={t('powerinfopage.pageTitle')}>POWERINFO</Layout>;
};

export default PowerInfoPage;
