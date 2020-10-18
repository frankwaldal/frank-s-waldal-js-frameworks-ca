import base64 from 'base-64';

import { API_USER_AGENT } from '../constants/apiConstants';
import { apikey } from '../constants/apiKeys';

export async function fetchSingleOrListOfGames(apiUrl) {
  return (await fetch(apiUrl, {
      headers: {
          "User-Agent": API_USER_AGENT
      }
  })).json();
}

export async function sendEmail(body) {
    return (await fetch(`https://cors-anywhere.herokuapp.com/http://bronto.freeddns.org:3001/api/sendEmail`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${base64.encode(apikey)}`
        },
        body: JSON.stringify(body),
        redirect: 'follow'
    })).json();
}
