import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';

export default class AppModel {
  @observable players = [];
  @observable inputState = 'EMPTY';
  inputRequestCounter = 0;

  @action
  addPlayer(username) {
    this.getSteamId(username)
      .then(({ steamid }) => {
        if (_.find(this.players, { steamid })) {
          throw new Error('User already has been added');
        }
        return this.getUserInfo(steamid)
      })
      .then((player) => {
          this.players.push({ ...player, username });
        this.inputState = 'EMPTY';
      });
  }

  @action
  deletePlayer(player) {
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

  getUserInfo = (steamid) => this.request('getUserInfo', { steamid });

  getOwnedGames = (steamid) => this.request('getOwnedGames', { steamid });
}
