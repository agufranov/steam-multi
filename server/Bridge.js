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
    return this.steamApi.getPlayerSummaries(steamid)
      .then(({ response }) => response.players.player[0])
  }

  getGames(steamid) {
  }
}

module.exports = Bridge;
