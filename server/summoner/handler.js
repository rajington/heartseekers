import 'babel-polyfill';
import { lookupSummoner, getChampions } from '../lolapi';
import { getSummoner, persistSummoner } from './dynamodb';

export default async function ({ region, name }) {
  try {
    const summoner = await lookupSummoner(region, name);

    const persistedSummoner = await getSummoner(summoner);
    if (persistedSummoner && persistedSummoner.lastUpdate === summoner.lastUpdate) {
      return persistedSummoner;
    }
    summoner.champions = await getChampions(summoner);
    await persistSummoner(summoner);
    return summoner;
  } catch (e) {
    return {
      error: e.message,
    };
  }
}
