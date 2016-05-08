import React from 'react';
import { PromiseState } from 'react-refetch';
import connect from '../api-connector';
import PromiseStateContainer from './PromiseStateContainer';

const Summoner = ({ summonerFetch }) => (
  <PromiseStateContainer
    ps={summonerFetch}
    onFulfillment={({ summoner }) => (
      <p>{summoner.name}</p>
    )}
  />
);

Summoner.propTypes = {
  summonerFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ routeParams: { region, name } }) => ({
  summonerFetch: `/summoner/${region}/${name}`,
}))(Summoner);
