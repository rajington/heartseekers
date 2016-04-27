import { fetchJSON } from './fetch';
import platforms from './platforms';

function fetchAPI(url) {
  return fetchJSON(`${url}?api_key=${process.env.RIOT_API_KEY}`);
}

function sanitize(name) {
  return name.replace(/\s+/g, '').toLowerCase();
}

export function getSummoner(region, name) {
  return fetchAPI(`https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}`)
    .get(sanitize(name));
}

function getPlatform(region) {
  return platforms[region.toLowerCase()];
}

function prepareChampionsList(champions) {
  return champions
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
}

export function getChampions(region, id) {
  const platform = getPlatform(region);
  return fetchAPI(`https://${region}.api.pvp.net/championmastery/location/${platform}/player/${id}/champions`)
    .then(prepareChampionsList);
}

export function getScore(champions) {
  return champions.reduce(
    (total, champion) => total + champion.points
  , 0);
}
