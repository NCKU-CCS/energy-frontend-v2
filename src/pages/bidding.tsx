import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
import Container from '../components/biddingPage';

const BiddingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('biddingpage.pageTitle')}>
      <Container />
    </Layout>
  );
};

export default BiddingPage;
