import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import * as _ from 'lodash';

@observer
export default class PlayerInput extends React.Component {
  @observable inputText = 'a';
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
          <div key={player.userId}>{player.username} [{player.userId}]</div>
        ))}
      </div>
    )
  }
}
