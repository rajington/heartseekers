import 'babel-polyfill';
import { getSummoner, getChampions } from './lolapi';
import { persistSummoner } from './dynamodb';

export default async function ({ region, name }) {
  const summoner = await getSummoner(region, name);
  const champions = await getChampions(region, summoner.id);

  const result = await persistSummoner(region, summoner, champions);

  return result;
}
