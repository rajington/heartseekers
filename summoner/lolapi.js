import { fetchJSON } from './fetch';

function sanitize(name) {
  return name.replace(/\s+/g, '').toLowerCase();
}

function fetchAPI(url) {
  return fetchJSON(`https://${url}?api_key=${process.env.RIOT_API_KEY}`);
}

export function getSummoner(region, name) {
  return fetchAPI(`${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}`)
    .get(sanitize(name));
}
