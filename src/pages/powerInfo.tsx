import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
import Container from '../components/powerInfoPage';

const PowerInfoPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('powerinfopage.pageTitle')}>
      <Container />
    </Layout>
  );
};

export default PowerInfoPage;
