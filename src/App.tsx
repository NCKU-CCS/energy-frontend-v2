import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuthorization from './utils/withAuthorization';

import IndexPage from './pages/index';
import LoginPage from './pages/login';
import SettingPage from './pages/setting';
import StatusPage from './pages/status';
import ElectronPage from './pages/electron';
import BiddingPage from './pages/bidding';
import ErrorPage from './pages/_error';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={withAuthorization(IndexPage)} />
    <Route path="/setting" component={withAuthorization(SettingPage)} />
    <Route path="/status" component={withAuthorization(StatusPage)} />
    <Route path="/electron" component={withAuthorization(ElectronPage)} />
    <Route path="/bidding" component={withAuthorization(BiddingPage)} />
    <Route path="/login" component={LoginPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
