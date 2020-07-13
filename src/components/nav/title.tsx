import React from 'react';
import { useTranslation } from 'react-i18next';

const Title: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar-title">
      <span>{t('navbar.title')}</span>
    </div>
  );
};

export default Title;
