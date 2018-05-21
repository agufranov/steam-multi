import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';

export default class AppModel {
  @observable players = [];
  @observable inputState = 'EMPTY';
  inputRequestCounter = 0;

  @action
  addPlayer(username) {
    this.getUserId(username)
      .then(({ userId }) => {
        if (_.find(this.players, { userId })) {
          throw new Error('User already has been added');
        }
        return this.getUserInfo(userId)
      })
      .then((player) => {
          this.players.push({ ...player, userId: player.steamid, username });
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
    this.getUserId(username)
      .then(({ userId }) => {
        if (currentInputRequestCounter !== this.inputRequestCounter) {
          return;
        }
        this.inputState = userId !== null ? 'FOUND' : 'NOT_FOUND';
      });
  }

  request = (method, params) => {
    const paramsStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    return fetch(`http://localhost:3000/${method}?${paramsStr}`)
      .then(response => response.json());
  }

  getUserId = (username) => this.request('getUserId', { username });

  getUserInfo = (userId) => this.request('getUserInfo', { userId });

  getOwnedGames = (userId) => this.request('getOwnedGames', { userId });
}
