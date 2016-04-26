export function persistSummoner(region, summoner, champions) {
  const key = `${region.toLowerCase()}-${summoner.name}`;

  const championsList = champions
    .map(({
      championId,
      championPoints,
      chestGranted,
      highestGrade,
      lastPlayTime,
    }) => ({
      id: championId,
      points: championPoints,
      chestGranted,
      highestGrade,
      lastPlayTime,
    }));

  const score = champions.reduce(
    (total, champion) => total + champion.championPoints
  , 0);

  return {
    key,
    id: summoner.id,
    score,
    championsList,
  };
}
