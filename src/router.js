import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Page from './routes/Page';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/:filter?" exact component={Page} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
