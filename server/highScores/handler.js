import { createClient } from 'redis';
import Promise from 'bluebird';

const client = createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});
Promise.promisifyAll(client);

export default () => client.pingAsync();
