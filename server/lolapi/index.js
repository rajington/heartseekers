import uri from 'urijs';
import { fetchJSON } from './fetch';
import platforms from './platforms';

function fetchAPI(url) {
  return fetchJSON(uri(url).addQuery({ api_key: process.env.RIOT_API_KEY }).toString());
}

function sanitize(name) {
  return unescape(name).replace(/ /g, '').toLowerCase();
}

export function getKey(summoner) {
  return `${summoner.region.toLowerCase()}-${summoner.name}`;
}

function prepareSummoner({ id, name, profileIconId, summonerLevel, revisionDate }, region) {
  return {
    id,
    name,
    region,
    icon: profileIconId,
    level: summonerLevel,
    lastActive: revisionDate,
  };
}

export function lookupSummoner(region, name) {
  return fetchAPI(`https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}`)
    .get(sanitize(name))
    .then((summoner) => prepareSummoner(summoner, region));
}

function getPlatform(region) {
  return platforms[region.toLowerCase()];
}

function prepareChampions(champions) {
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

export function getChampions(summoner) {
  const platform = getPlatform(summoner.region);
  return fetchAPI(`https://${summoner.region}.api.pvp.net/championmastery/location/${platform}/player/${summoner.id}/champions`)
    .then(prepareChampions);
}

function prepareStaticData({ version, data }) {
  const prepared = {
    version,
    champions: {},
  };

  Object.keys(data).forEach(id => {
    const { key, name, title } = data[id];
    prepared.champions[id] = {
      key,
      name,
      title,
    };
  });

  return prepared;
}

export function getStaticData() {
  return fetchAPI('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true')
    .then(prepareStaticData);
}
