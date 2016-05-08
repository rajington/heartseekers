import React from 'react';
import { PromiseState } from 'react-refetch';
import connect from '../api-connector';
import PromiseStateContainer from './PromiseStateContainer';

const Summoner = ({ summonerFetch }) => (
  <PromiseStateContainer
    ps={summonerFetch}
    onFulfillment={({ summoner, score, champions }) => (
      <div>
        <p>{summoner.name}</p>
        <p>{summoner.level}</p>
        <img src={`http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/${summoner.icon}.png`} alt="icon" />
        <p>{score}</p>
        <ul>
        {
          champions.map((champion, index) => (
            <li key={index}>{champion.highestGrade}</li>
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
