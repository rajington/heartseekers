import 'babel-polyfill';
import { getSummoner, getChampions } from './lolapi';

export default async function ({ region = 'na', name }) {
  const summoner = await getSummoner(region, name);
  const champions = await getChampions(region, summoner.id);
  return {
    summoner,
    champions,
  };
}
