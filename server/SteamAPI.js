const fetch = require('isomorphic-fetch');

class SteamAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  req(method, params) {
    const paramsStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    const url = `${this.baseUrl}${method}?key=${this.apiKey}&${paramsStr}`;
    console.log(url);
    return fetch(url)
      .then(res => res.json())
  }

  resolveVanityUrl(vanityurl) {
    return this.req(`ISteamUser/ResolveVanityURL/v0001`, { vanityurl })
  }

  getOwnedGames(steamid) {
    return this.req(`IPlayerService/GetOwnedGames/v0001`, { steamid })
  }

  getSchemaForGame(appid) {
    return this.req(`ISteamUserStats/GetSchemaForGame/v0002`, { appid })
  }

  getPlayerSummaries(steamids) {
    const steamidsStr = Array.isArray(steamids) ? steamids.join(',') : steamids;
    return this.req(`ISteamUser/GetPlayerSummaries/v0001`, { steamids: steamidsStr });
  }
}

module.exports = SteamAPI;
