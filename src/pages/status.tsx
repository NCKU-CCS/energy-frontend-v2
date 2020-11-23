import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
import Status from '../components/status';

const StatusPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('statuspage.pageTitle')}>
      <Status />
    </Layout>
  );
};

export default StatusPage;
