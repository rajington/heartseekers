import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import Summoner from './components/Summoner';
import NoMatch from './components/NoMatch';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/summoners/:region/:name" component={Summoner} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));
