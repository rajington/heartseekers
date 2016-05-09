import AWS from 'aws-sdk';
import Promise from 'bluebird';

const docClient = new AWS.DynamoDB.DocumentClient();
Promise.promisifyAll(docClient);

export function persistSummoner(region, summoner, score, champions) {
  return docClient.putAsync({
    TableName: process.env.SUMMONERS_TABLE,
    Item: {
      key: `${region.toLowerCase()}-${summoner.name}`,
      id: summoner.id,
      icon: summoner.profileIconId,
      lastUpdate: summoner.revisionDate,
      score,
      champions,
    },
  });
}
