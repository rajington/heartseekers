import React from 'react';
import { PromiseState } from 'react-refetch';
import connect from '../api-connector';
import PromiseStateContainer from './PromiseStateContainer';
import ChampionInfo from './ChampionInfo';
import LolImg from './LolImg';

const Summoner = ({ summonerFetch }) => (
  <PromiseStateContainer
    ps={summonerFetch}
    onFulfillment={({ summoner: { name, level, icon }, score, champions }) => (
      <div>
        <p>{name}</p>
        <p>{level}</p>
        <LolImg src={`/profileicon/${icon}.png`} alt={name} />
        <p>{score}</p>
        <ul>
        {
          champions.map(champion => (
            <ChampionInfo info={champion} />
          ))
        }
        </ul>
      </div>
    )}
  />
);

Summoner.propTypes = {
  summonerFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ routeParams: { region, name } }) => ({
  summonerFetch: `/summoner/${region}/${name}`,
}))(Summoner);
