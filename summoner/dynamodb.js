import AWS from 'aws-sdk';
import Promise from 'bluebird';

const docClient = new AWS.DynamoDB.DocumentClient();
Promise.promisifyAll(docClient);

function getScore(champions) {
  return champions.reduce(
    (total, champion) => total + champion.championPoints
  , 0);
}

function prepareChampionsList(champions) {
  return champions
    .map(({
      championId,
      championPoints,
      chestGranted,
      highestGrade,
      lastPlayTime,
    }) => ({
      id: championId,
      points: championPoints,
      chestGranted,
      highestGrade,
      lastPlayTime,
    }));
}

export function persistSummoner(region, summoner, champions) {
  return docClient.putAsync({
    TableName: process.env.SUMMONERS_TABLE,
    Item: {
      key: `${region.toLowerCase()}-${summoner.name}`,
      id: summoner.id,
      score: getScore(champions),
      champions: prepareChampionsList(champions),
    },
  });
}
