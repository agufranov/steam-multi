const fetch = require('isomorphic-fetch');

class SteamAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  req(method, params) {
    const paramsStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    const url = `${this.baseUrl}${method}?key=${this.apiKey}&${paramsStr}`;
    return fetch(url)
      .then(res => res.json())
  }

  resolveVanityUrl(vanityurl) {
    return this.req(`ResolveVanityURL/v0001`, { vanityurl })
  }

  getOwnedGames(steamid) {
    return this.req(`GetOwnedGames/v0001`, { steamid })
  }

  getSchemaForGame(gameId) {
    return this.req(`GetSchemaForGame/v0002`, { gameId })
  }

  getPlayerSummaries(steamids) {
    const steamidsStr = Array.isArray(steamids) ? steamids.join(',') : steamids;
    return this.req(`GetPlayerSummaries/v0001`, { steamids: steamidsStr });
  }
}

module.exports = SteamAPI;
