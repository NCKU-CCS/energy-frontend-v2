import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
import Container from '../components/drAcceptPage';

const DrBidPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('dracceptpage.pageTitle')}>
      <Container />
    </Layout>
  );
};

export default DrBidPage;
