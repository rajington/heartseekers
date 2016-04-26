import { getSummoner } from './lolapi';

export default function ({ region, name }) {
  return getSummoner(region, name);
}
