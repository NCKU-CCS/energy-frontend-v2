import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuthorization from './utils/withAuthorization';

import IndexPage from './pages/index';
import LoginPage from './pages/login';
import SettingPage from './pages/setting';
import StatusPage from './pages/status';
import ElectronPage from './pages/electron';
import BiddingPage from './pages/bidding';
import PowerInfoPage from './pages/powerInfo';
import ErrorPage from './pages/_error';
import i18n from './i18n';

const App: React.FC = () => {
  i18n.changeLanguage(sessionStorage.getItem('Language') || 'zh-TW');
  return (
    <Switch>
      <Route exact path="/" component={withAuthorization(IndexPage)} />
      <Route path="/setting" component={withAuthorization(SettingPage)} />
      <Route path="/status" component={withAuthorization(StatusPage)} />
      <Route path="/electron" component={withAuthorization(ElectronPage)} />
      <Route path="/dr_bid" component={withAuthorization(BiddingPage)} />
      <Route path="/power_info" component={withAuthorization(PowerInfoPage)} />
      <Route path="/login" component={LoginPage} />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default App;
