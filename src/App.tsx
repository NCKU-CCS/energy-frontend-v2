import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IndexPage from './pages/index';
import LoginPage from './pages/login';
import SettingPage from './pages/setting';
import StatusPage from './pages/status';
import ElectronPage from './pages/electron';
import BiddingPage from './pages/bidding';
import ErrorPage from './pages/_error';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <IndexPage />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/setting">
      <SettingPage />
    </Route>
    <Route path="/status">
      <StatusPage />
    </Route>
    <Route path="/electron">
      <ElectronPage />
    </Route>
    <Route path="/bidding">
      <BiddingPage />
    </Route>
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
