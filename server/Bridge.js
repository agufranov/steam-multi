class Bridge {
  constructor(steamApi) {
    this.steamApi = steamApi;
  }

  getUserId(username) {
    return this.steamApi.resolveVanityUrl(username)
      .then(({ response }) => ({
        userId: response.success === 1 ? response.steamid : null
      }))
  }

  getUserInfo(userId) {
    return this.steamApi.getPlayerSummaries(userId)
      .then(({ response }) => response.players.player[0])
  }
}

module.exports = Bridge;
