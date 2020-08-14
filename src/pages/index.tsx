import React from 'react';
import Layout from '../layouts/generalLayout';
// components
import Home from '../components/home';

const IndexPage: React.FC = () => (
  <Layout title="首頁">
    <Home />
  </Layout>
);

export default IndexPage;
