import 'babel-polyfill';
import { getSummoner } from './lolapi';

export default async function ({ region, name }) {
  const summoner = await getSummoner(region, name);
  return summoner;
}
