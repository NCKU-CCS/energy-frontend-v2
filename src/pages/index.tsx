import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
// components
import Home from '../components/home';

const IndexPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('indexpage.pageTitle')}>
      <Home />
    </Layout>
  );
};

export default IndexPage;
