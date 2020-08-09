import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';

const IndexPage: React.FC = () => {
  const { t } = useTranslation();
  return <Layout title={t('indexpage.pageTitle')}>INDEX</Layout>;
};

export default IndexPage;
