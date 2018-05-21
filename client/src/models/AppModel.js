import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';

export default class AppModel {
  @observable players = [];
  @observable inputState = 'EMPTY';
  inputRequestCounter = 0;

  @computed get playersCount() {
    return this.players.length;
  }

  @action
  addPlayer(username) {
    this.getSteamId(username)
      .then(({ steamid }) => {
        if (_.find(this.players, { steamid })) {
          throw new Error('Player already has been added');
        }
        return this.getPlayerInfo(steamid)
      })
      .then((player) => {
          this.players.push({ ...player, username, steamid: player.info.steamid });
        this.inputState = 'EMPTY';
      });
  }

  @action
  deletePlayer = (steamid) => {
    const player = _.find(this.players, { steamid });
    _.pull(this.players, player);
  }

  @action
  findPlayer(username) {
    if (!username.length) {
      this.inputState = 'EMPTY';
      return;
    }
    if (_.find(this.players, { username })) {
      this.inputState = 'DUPLICATE';
      return;
    }
    const currentInputRequestCounter = ++this.inputRequestCounter;
    this.inputState = 'LOADING';
    this.getSteamId(username)
      .then(({ steamid }) => {
        if (currentInputRequestCounter !== this.inputRequestCounter) {
          return;
        }
        this.inputState = steamid !== null ? 'FOUND' : 'NOT_FOUND';
      });
  }

  request = (method, params) => {
    const paramsStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    return fetch(`http://localhost:3000/${method}?${paramsStr}`)
      .then(response => response.json());
  }

  getSteamId = (username) => this.request('getSteamId', { username });

  getPlayerInfo = (steamid) => this.request('getPlayerInfo', { steamid });

  getOwnedGames = (steamid) => this.request('getOwnedGames', { steamid });
}
