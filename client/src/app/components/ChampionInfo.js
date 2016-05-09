import React from 'react';
import LolImg from './LolImg';

const ChampionInfo = ({ info }, { data: { champions } }) => {
  const champion = champions[info.id];
  return (
    <li>
      <LolImg src={`/champion/${champion.key}.png`} alt={champion.key} />
      {champion.name}: {champion.title} <br />
      {info.highestGrade}: {info.points} <br />
      {info.chestGranted ? 'X' : 'O'}: {info.lastPlayTime} <br />
    </li>
  );
};

ChampionInfo.propTypes = {
  info: React.PropTypes.object.isRequired,
};

ChampionInfo.contextTypes = {
  data: React.PropTypes.object,
};

export default ChampionInfo;
