import fetch from 'node-fetch';
import Promise from 'bluebird';
fetch.Promise = Promise;

function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function getJSON(response) {
  return response.json();
}

export function fetchJSON(url) {
  return fetch(url)
          .then(checkStatus)
          .then(getJSON);
}
