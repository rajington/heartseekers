import React from 'react';
import { Link } from 'react-router';
import { PromiseState } from 'react-refetch';
import connect from '../api-connector';
import PromiseStateContainer from './PromiseStateContainer';

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
      data: this.props.data,
    };
  }
  render() {
    const { data: { version }, children } = this.props;
    return (
      <div>
        <h1><Link to="/">heartseekers {version}</Link></h1>

        <ul>
        {
          SUMMONERS.na.map((summoner, index) => (
            <li key={index}><Link to={`/summoners/na/${summoner}`}>{summoner}</Link></li>
          ))
        }
        </ul>

        {children}
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};

App.childContextTypes = {
  data: React.PropTypes.object,
};

const AppLoader = ({ appFetch, children }) => (
  <PromiseStateContainer
    ps={appFetch}
    onFulfillment={
      (data) => (
        <App data={data}>
          {children}
        </App>
      )
    }
  />
);

AppLoader.propTypes = {
  appFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
  children: React.PropTypes.element.isRequired,
};

export default connect(() => ({
  appFetch: '/static-data',
}))(AppLoader);
