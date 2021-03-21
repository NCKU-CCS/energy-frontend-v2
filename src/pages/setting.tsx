import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts/generalLayout';
import Container from '../components/settingpage';

const SettingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('settingpage.pageTitle')}>
      <Container />
    </Layout>
  );
};

export default SettingPage;
