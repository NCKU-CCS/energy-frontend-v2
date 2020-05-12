import React from 'react';
import Layout from '../layouts/loginLayout';
import Container from '../components/loginContainer';
import Form from '../components/loginForm';

const LoginPage: React.FC = () => (
  <Layout>
    <Container type="left" />
    <Container type="right">
      <Form />
    </Container>
  </Layout>
);

export default LoginPage;
