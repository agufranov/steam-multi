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
}

module.exports = Bridge;
