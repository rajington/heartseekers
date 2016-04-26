import 'babel-polyfill';
import { getSummoner } from './lolapi';

export default async function ({ region = 'na', name }) {
  const summoner = await getSummoner(region, name);
  return summoner;
}
