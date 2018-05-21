class Bridge {
  constructor(steamApi) {
    this.steamApi = steamApi;
  }

  getSteamId(username) {
    return this.steamApi.resolveVanityUrl(username)
      .then(({ response }) => ({
        steamid: response.success === 1 ? response.steamid : null
      }))
  }

  getPlayerInfo(steamid) {
    return Promise.all([
      this.steamApi.getPlayerSummaries(steamid),
      this.steamApi.getOwnedGames(steamid)
    ])
      .then(([playerSummaries, ownedGames]) => ({
        info: playerSummaries.response.players.player[0],
        ownedGames: ownedGames.response.games
      }))
  }

  getPlayerGames(steamid) {
    return this.steamApi.getOwnedGames(steamid)
      .then(({ response }) => {
        console.log(response);
        return Promise.all(response.games.map(({ appid }) => this.steamApi.getSchemaForGame(appid)));
      });
  }
}

module.exports = Bridge;
