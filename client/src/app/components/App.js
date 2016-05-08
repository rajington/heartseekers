import React from 'react';
import { Link } from 'react-router';

const SUMMONERS = {
  na: [
    'tubstep',
    'jbunnies',
    'SURPRISE PARTY',
  ],
};

class App extends React.Component {
  getChildContext() {
    return {
      version: '6.9.1',
    };
  }
  render() {
    const { children } = this.props;
    return (<div>
      <h1><Link to="/">heartseekers</Link></h1>

      <ul>
      {
        SUMMONERS.na.map((summoner, index) => (
          <li key={index}><Link to={`/summoners/na/${summoner}`}>{summoner}</Link></li>
        ))
      }
      </ul>

      {children}
    </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

App.childContextTypes = {
  version: React.PropTypes.string,
};

export default App;
