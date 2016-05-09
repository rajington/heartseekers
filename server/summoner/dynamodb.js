import AWS from 'aws-sdk';
import Promise from 'bluebird';
import { getKey } from '../lolapi';
import { isEmpty } from 'lodash';

const docClient = new AWS.DynamoDB.DocumentClient();
Promise.promisifyAll(docClient);

export function getSummoner(summoner) {
  return docClient.getAsync({
    TableName: process.env.SUMMONERS_TABLE,
    Key: {
      key: getKey(summoner),
    },
  }).then(response => {
    if (isEmpty(response)) {
      return null;
    }
    return response;
  });
}

export function persistSummoner(summoner) {
  return docClient.putAsync({
    TableName: process.env.SUMMONERS_TABLE,
    Item: {
      key: getKey(summoner),
      ...summoner,
    },
  });
}
