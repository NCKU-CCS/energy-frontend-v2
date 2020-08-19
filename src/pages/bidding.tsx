import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';

const BiddingPage: React.FC = () => {
  const { t } = useTranslation();
  return <Layout title={t('biddingpage.pageTitle')}>BIDDING</Layout>;
};

export default BiddingPage;
