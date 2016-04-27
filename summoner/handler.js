import 'babel-polyfill';
import { getSummoner, getChampions, getScore } from './lolapi';
import { persistSummoner } from './dynamodb';

export default async function ({ region, name }) {
  const summoner = await getSummoner(region, name);
  const champions = await getChampions(region, summoner.id);
  const score = getScore(champions);

  const result = await persistSummoner(region, summoner, score, champions);

  return {
    summoner,
    score,
    result,
  };
}
