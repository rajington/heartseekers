import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import Summoner from './components/Summoner';
import NoMatch from './components/NoMatch';
import history from './history';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// useRouterHistory creates a composable higher-order function
render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/summoners/:region/:name" component={Summoner} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));
