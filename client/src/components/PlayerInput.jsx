import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import * as _ from 'lodash';
import Player from './Player';

@observer
export default class PlayerInput extends React.Component {
  @observable inputText = '';
  counter = 0;

  @action
  onChange = (e) => {
    const value = e.target.value;
    this.inputText = value;
    this.onChangeDebounced(value);
  };

  onChangeDebounced = _.debounce((value) => {
    this.props.store.findPlayer(value);
  }, 200);

  @action
  onSubmit = (event) => {
    event.preventDefault();
    this.props.store.addPlayer(this.inputText);
    this.inputText = '';
  }

  onPlayerDelete = (player) => {
    this.props.store.deletePlayer(player);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type='text' placeholder='Enter player name' onChange={this.onChange} value={this.inputText}/>
          <button disabled={this.props.store.inputState !== 'FOUND'}>Add</button>
          { this.props.store.inputState === 'LOADING' ? (
            <span>Loading...</span>
          ) : null}
          { this.props.store.inputState === 'EMPTY' ? (
            <span>Empty</span>
          ) : null}
          { this.props.store.inputState === 'DUPLICATE' ? (
            <span>User already added</span>
          ) : null}
        </form>
        {this.props.store.players.map(player => (
          <Player player={player} onDelete={this.onPlayerDelete}/>
        ))}
      </div>
    )
  }
}
