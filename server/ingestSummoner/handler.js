import 'babel-polyfill';
import { createClient } from 'redis';
import Promise from 'bluebird';

function getScriptHash(client) {
  // number of high scores to save
  const N = 10;
  return client.getAsync('INSERTSCRIPT').then(hash => {
    if (hash) {
      return hash;
    }

    // usage: high.scores:CHAMP high.scores.range SCORE SUMMONERKEY
    // add the score to the table
    // remove everything but the top N scores
    // get the new bottom score in the range
    // persist the new bottom score in the range
    // return the updated list of bottom scores
    return client.scriptAsync('load', `
      redis.call("ZADD", KEYS[1], ARGV[1], ARGV[2])
      redis.call("ZREMRANGEBYRANK", KEYS[1], 0, -${N + 1})
      local new_bottom_score = redis.call("ZRANGE", KEYS[1], -${N}, -${N}, "WITHSCORES")
      redis.call("HSET", KEYS[2], KEYS[1], new_bottom_score[2])
      return redis.call("HGETALL", KEYS[2])`)
      .then(scriptHash => client.setAsync('INSERTSCRIPT', scriptHash)
      .then(() => scriptHash));
  });
}

function redisArrayToHash(array) {
  const hash = {};
  for (let i = 0; i < array.length; i += 2) {
    hash[array[i]] = array[i + 1];
  }
  return hash;
}

export default async function () {
  const client = createClient({
    // host: process.env.REDIS_URL,
    // port: process.env.REDIS_PORT,
  });
  Promise.promisifyAll(client);

  const scriptHash = await getScriptHash(client);

  // fake summoners
  const summs = [];
  for (let i = 0; i < 200; i++) {
    const summ = { name: `newersumm${i}`, champs: [] };
    for (let j = 0; j < 10; j++) {
      const score = Math.floor(Math.random() * 10000);
      summ.champs.push({ id: j, score });
    }
    summs.push(summ);
  }

  let highScoresRange = await client.hgetallAsync('high.scores.range');
  for (const summ of summs) {
    for (const champ of summ.champs) {
      if (champ.score > highScoresRange[`test${champ.id}`]) {
        highScoresRange = redisArrayToHash(await client.evalshaAsync(
          scriptHash, 2, `test${champ.id}`, 'high.scores.range', champ.score, summ.name
        ));
      }
    }
  }

  const highScores = {};
  for (let champ = 0; champ < 10; champ++) {
    const champHighScores = [];
    const champHighScoresArr = await client.zrevrangeAsync(`test${champ}`, 0, -1, 'WITHSCORES');
    for (let i = 0; i < champHighScoresArr.length; i += 2) {
      const summoner = champHighScoresArr[i];
      const score = champHighScoresArr[i + 1];
      const summonerScore = {};
      summonerScore[summoner] = score;
      champHighScores.push(summonerScore);
    }
    highScores[`champ${champ}`] = champHighScores;
  }

  client.quit();
  return highScores;
};
