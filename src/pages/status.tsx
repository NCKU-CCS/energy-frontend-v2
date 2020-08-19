import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';

const StatusPage: React.FC = () => {
  const { t } = useTranslation();
  return <Layout title={t('statuspage.pageTitle')}>STATUS</Layout>;
};

export default StatusPage;
