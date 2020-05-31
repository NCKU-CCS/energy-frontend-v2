import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRequire from './utils/AuthRequire';

import IndexPage from './pages/index';
import SettingPage from './pages/setting';
import StatusPage from './pages/status';
import ElectronPage from './pages/electron';
import BiddingPage from './pages/bidding';
import ErrorPage from './pages/_error';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={AuthRequire(IndexPage)} />
    <Route path="/setting" component={AuthRequire(SettingPage)} />
    <Route path="/status" component={AuthRequire(StatusPage)} />
    <Route path="/electron" component={AuthRequire(ElectronPage)} />
    <Route path="/bidding" component={AuthRequire(BiddingPage)} />
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
