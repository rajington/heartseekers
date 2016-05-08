import React from 'react';
import { Link } from 'react-router';

const SUMMONERS = {
  na: [
    'tubstep',
    'jbunnies',
    'SURPRISE PARTY',
  ],
};

function App({ children }) {
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

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
